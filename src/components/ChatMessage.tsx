"use client";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
    // Markdownリンクを簡易的にHTMLリンクに変換
    const renderContent = (text: string) => {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const boldRegex = /\*\*([^*]+)\*\*/g;

        const html = text
            .replace(
                linkRegex,
                '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 opacity-90 hover:opacity-100 transition-opacity font-medium">$1 ↗</a>'
            )
            .replace(boldRegex, "<strong>$1</strong>")
            .replace(/\n/g, "<br />");

        return html;
    };

    // ユーザーメッセージ - 右側、白背景
    if (role === "user") {
        return (
            <div className="flex justify-end mb-4 px-4">
                <div className="max-w-[75%] bubble-user px-5 py-3.5 rounded-2xl rounded-br-md">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                </div>
            </div>
        );
    }

    // AIメッセージ - 左側、Teal背景白文字
    return (
        <div className="flex justify-start mb-4 px-4 gap-3">
            {/* アバター */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-teal to-teal-light flex items-center justify-center text-lg shadow-md">
                🐶
            </div>
            {/* メッセージバブル */}
            <div className="max-w-[75%] bubble-ai px-5 py-3.5 rounded-2xl rounded-bl-md">
                <p
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderContent(content) }}
                />
            </div>
        </div>
    );
}
