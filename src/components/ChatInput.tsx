"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled: boolean;
    placeholder?: string;
}

export default function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    const handleSubmit = () => {
        const trimmed = input.trim();
        if (!trimmed || disabled) return;
        onSend(trimmed);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // IME変換中（日本語入力の確定操作中）は送信しない
        if (e.nativeEvent.isComposing || e.keyCode === 229) return;
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-5 pt-3">
            <div className="liquid-glass-input flex items-end gap-2 rounded-full px-4 py-2.5">
                {/* マイクアイコン */}
                <button
                    type="button"
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-text-light hover:text-teal hover:bg-teal/5 transition-all duration-200 cursor-pointer"
                    title="音声入力（準備中）"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                </button>

                {/* テキスト入力 */}
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || "メッセージを入力..."}
                    disabled={disabled}
                    rows={1}
                    className="flex-1 bg-transparent resize-none outline-none text-text-dark text-sm placeholder:text-text-light/50 max-h-[120px] leading-relaxed py-1.5"
                />

                {/* 送信ボタン - Electric Fuchsia */}
                <button
                    onClick={handleSubmit}
                    disabled={disabled || !input.trim()}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
            ${disabled || !input.trim() ? "bg-cloud-warm text-text-light" : "btn-accent"}
          `}
                >
                    {disabled ? (
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    )}
                </button>
            </div>
            <p className="text-center text-[10px] text-text-light/40 mt-2">
                Shift + Enter で改行
            </p>
        </div>
    );
}
