"use client";

import { useState, useRef, useEffect } from "react";
import ModeSelector from "@/components/ModeSelector";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ChatMode } from "@/lib/system-prompt";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const modeLabels: Record<ChatMode, string> = {
  technique: "🏓 技術相談",
  mytem: "🎁 MYTEMグッズ診断",
  equipment: "🏓 用具診断",
};

const modePlaceholders: Record<ChatMode, string> = {
  technique: "例: フォアドライブのコツを教えて！",
  mytem: "例: かわいいタオルがほしい！",
  equipment: "例: 初心者におすすめのラバーは？",
};

export default function Home() {
  const [mode, setMode] = useState<ChatMode | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 初回アクセス時にUUID（セッションID）を発行して保存
    let sid = localStorage.getItem("chat-session-id");
    if (!sid) {
      sid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
      localStorage.setItem("chat-session-id", sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectMode = (selectedMode: ChatMode) => {
    setMode(selectedMode);
    setMessages([
      {
        role: "assistant",
        content: getWelcomeMessage(selectedMode),
      },
    ]);
  };

  const handleSendMessage = async (content: string) => {
    if (!mode) return;

    const userMessage: Message = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          mode,
        }),
      });

      if (!response.ok) throw new Error("APIエラーが発生しました");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  assistantContent += parsed.text;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: assistantContent,
                    };
                    return updated;
                  });
                }
              } catch {
                // パースに失敗した行はスキップ
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("送信エラー:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "エラーが発生してしまいました💦もう一度試してみてください！",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToModeSelect = () => {
    setMode(null);
    setMessages([]);
  };

  // ========== モード未選択：ランディング画面 ==========
  if (!mode) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center py-10">
        <ModeSelector currentMode={mode} onSelectMode={handleSelectMode} />
      </main>
    );
  }

  // ========== チャット画面：フルスクリーンUI ==========
  return (
    <main className="h-dvh flex flex-col">
      {/* ===== ヘッダー: Liquid Glass ===== */}
      <header className="flex-shrink-0 liquid-glass py-3.5 px-5 flex items-center justify-between z-20">
        <button
          onClick={handleBackToModeSelect}
          className="flex items-center gap-1.5 text-text-light hover:text-teal transition-colors text-sm cursor-pointer group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          戻る
        </button>

        <div className="flex items-center gap-2.5">
          {/* AIアバター */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal to-teal-light flex items-center justify-center text-sm shadow-sm">
              🐶
            </div>
            {/* オンラインインジケーター */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-cloud rounded-full animate-pulse-dot" />
          </div>
          <div>
            <h2 className="font-semibold text-text-dark text-sm leading-tight">{modeLabels[mode]}</h2>
            <p className="text-[10px] text-green-500 font-medium">オンライン</p>
          </div>
        </div>

        <div className="w-14" />
      </header>

      {/* ===== チャットエリア ===== */}
      <div className="flex-1 overflow-y-auto chat-scroll py-5">
        {messages.map((msg, i) => (
          <div key={i} className="animate-fade-in-up">
            <ChatMessage role={msg.role} content={msg.content} />
          </div>
        ))}
        {/* ローディングインジケーター */}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start mb-4 px-4 gap-3 animate-fade-in-up">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-teal to-teal-light flex items-center justify-center text-lg shadow-sm">
              🐶
            </div>
            <div className="bubble-ai px-5 py-4 rounded-2xl rounded-bl-md">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* ===== フッター: 入力エリア ===== */}
      <footer className="flex-shrink-0 liquid-glass !border-b-0 !border-t border-t-white/50">
        <ChatInput
          onSend={handleSendMessage}
          disabled={isLoading}
          placeholder={modePlaceholders[mode]}
        />
      </footer>
    </main>
  );
}

function getWelcomeMessage(mode: ChatMode): string {
  switch (mode) {
    case "technique":
      return "**技術相談モード**へようこそ！\n\nフォアドライブ、バックハンド、サーブ、レシーブ…なんでも聞いてください！🏓\n\n朝田まいの卓球教室の動画をもとにアドバイスします〜";
    case "mytem":
      return "**MYTEMグッズ診断モード**へようこそ！\n\nMYTEMのグッズの中から、あなたにぴったりのアイテムを見つけるお手伝いします！✨\n\nどんな雰囲気が好き？どんなアイテムを探してる？教えてください〜";
    case "equipment":
      return "**用具診断モード**へようこそ！\n\nラケット、ラバー…あなたのプレースタイルやレベルに合った用具を一緒に見つけます！💪\n\nまずは、卓球歴やプレースタイル、使っている用具を教えてください🏓";
  }
}
