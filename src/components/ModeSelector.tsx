"use client";

import Image from "next/image";
import { ChatMode } from "@/lib/system-prompt";

interface ModeSelectorProps {
    currentMode: ChatMode | null;
    onSelectMode: (mode: ChatMode) => void;
}

const modes: { key: ChatMode; label: string; emoji: string; useImage?: boolean; description: string }[] = [
    {
        key: "technique",
        label: "技術相談",
        emoji: "🏓",
        description: "フォアドライブ、サーブ、レシーブなど卓球技術について相談",
    },
    {
        key: "mytem",
        label: "MYTEMグッズ診断",
        emoji: "",
        useImage: true,
        description: "あなたにぴったりのMYTEMグッズを診断",
    },
    {
        key: "equipment",
        label: "用具診断",
        emoji: "🏓",
        description: "最適なラケット・ラバーを診断",
    },
];

export default function ModeSelector({ currentMode, onSelectMode }: ModeSelectorProps) {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl px-6">
            {/* ロゴ・タイトル */}
            <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce-slow">🐶</div>
                <h1 className="text-3xl font-bold text-teal mb-1 tracking-tight">ぴんぽんわんこ</h1>
                <p className="text-text-light text-sm">
                    @tabletennis_mai 公式AIアシスタント
                </p>
            </div>

            {/* モード選択カード */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {modes.map((mode) => {
                    const isSelected = currentMode === mode.key;
                    return (
                        <button
                            key={mode.key}
                            onClick={() => onSelectMode(mode.key)}
                            className={`mode-card relative p-6 rounded-2xl cursor-pointer text-left
                ${isSelected
                                    ? "liquid-glass-card border-2 !border-teal/30 ring-2 ring-teal/10"
                                    : "liquid-glass-card hover:bg-white/60"
                                }
              `}
                        >
                            <div className="text-4xl mb-3 h-10 flex items-center">
                                {mode.useImage ? (
                                    <Image src="/mytem-logo.png" alt="MYTEM" width={80} height={32} className="object-contain" />
                                ) : (
                                    mode.emoji
                                )}
                            </div>
                            <h3 className="font-semibold text-teal text-base mb-1.5">{mode.label}</h3>
                            <p className="text-text-light text-xs leading-relaxed">{mode.description}</p>
                            {isSelected && (
                                <div className="absolute -top-2 -right-2 bg-fuchsia text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-md">
                                    選択中
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
