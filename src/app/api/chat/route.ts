import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, ChatMode } from "@/lib/system-prompt";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// YouTubeの動的検索関数
async function searchYouTube(query: string): Promise<string> {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent("朝田まい " + query)}`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
        const html = await res.text();
        const videos: string[] = [];
        const match = html.match(/var ytInitialData = ({.*?});<\/script>/);
        if (match) {
            const data = JSON.parse(match[1]);
            const contents = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
            for (const item of contents) {
                if (item.videoRenderer) {
                    const title = item.videoRenderer.title.runs[0].text;
                    const id = item.videoRenderer.videoId;
                    const channel = item.videoRenderer.ownerText?.runs?.[0]?.text;
                    if (channel === "朝田まいの卓球教室") {
                        videos.push(`- タイトル: ${title}\n  URL: https://www.youtube.com/watch?v=${id}`);
                    }
                }
            }
        }
        if (videos.length > 0) {
            return `【参考動画データ（@tabletennis_mai チャンネル）】\nあなたの知識の代わりに、以下の実際の動画リストからユーザーの悩みに最も適したものを必ず提案してください（最大3つまで）：\n${videos.slice(0, 5).join("\n\n")}`;
        } else {
            return `【参考動画データ】\n現在関連する動画は見つかりませんでした。`;
        }
    } catch (e) {
        console.error("YouTube search error:", e);
    }
    return "";
}


export async function POST(request: NextRequest) {
    try {
        const { messages, mode } = (await request.json()) as {
            messages: { role: string; content: string }[];
            mode: ChatMode;
        };

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY が設定されていません" },
                { status: 500 }
            );
        }

        // 技術相談モードの場合のみユーザーの直近の質問からYouTube動画を検索する
        let dynamicContext = "";
        const lastMessage = messages[messages.length - 1];
        if (mode === "technique") {
            dynamicContext = await searchYouTube(lastMessage.content);
        }

        const systemPrompt = buildSystemPrompt(mode, dynamicContext);

        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            systemInstruction: systemPrompt,
        });

        // メッセージ履歴をGemini形式に変換（最後のメッセージは除外）
        const rawHistory = messages.slice(0, -1).map((msg) => ({
            role: msg.role === "user" ? "user" : ("model" as const),
            parts: [{ text: msg.content }],
        }));

        // Gemini APIは履歴の最初がuserロールでなければならない
        // ウェルカムメッセージ等の先頭modelメッセージを除外
        const history = rawHistory.filter((msg, index) => {
            if (index === 0 && msg.role === "model") return false;
            return true;
        });

        const chat = model.startChat({ history });

        const result = await chat.sendMessageStream(lastMessage.content);

        // Supabaseに履歴を保存するための下準備
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
        const sessionId = request.headers.get("x-session-id") || "anonymous";

        let supabase: any = null;
        if (supabaseUrl && supabaseKey) {
            supabase = createClient(supabaseUrl, supabaseKey);
            // 非同期でユーザー入力を保存
            supabase.from("messages").insert({
                session_id: sessionId,
                role: "user",
                content: lastMessage.content,
                mode: mode
            }).then(({ error }: any) => { if (error) console.error("Supabase user insert error:", error); });
        }

        // ストリーミングレスポンスを返す
        const encoder = new TextEncoder();
        let assistantReplyContent = "";

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        if (text) {
                            assistantReplyContent += text;
                            controller.enqueue(
                                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                            );
                        }
                    }
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    controller.close();

                    // ストリーム完了後にAIの返答をSupabaseに保存
                    if (supabase) {
                        supabase.from("messages").insert({
                            session_id: sessionId,
                            role: "model",
                            content: assistantReplyContent,
                            mode: mode
                        }).then(({ error }: any) => { if (error) console.error("Supabase model insert error:", error); });
                    }

                } catch (error) {
                    console.error("ストリーミングエラー:", error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (error) {
        console.error("APIエラー:", error);
        return NextResponse.json(
            { error: "回答の生成中にエラーが発生しました" },
            { status: 500 }
        );
    }
}
