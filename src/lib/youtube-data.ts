// @tabletennis_mai（朝田まいの卓球教室）の動画情報
// チャンネル: https://www.youtube.com/@tabletennis_mai
export interface VideoData {
  id: string;
  title: string;
  url: string;
  description: string;
  category: "serve" | "receive" | "drive" | "cut" | "footwork" | "tactics" | "equipment" | "goods" | "other";
}

export const channelInfo = {
  name: "朝田まいの卓球教室",
  handle: "@tabletennis_mai",
  url: "https://www.youtube.com/watch?v=VIDEO_ID_v001",
  profile:
    "小学1年生から卓球を続ける朝田まい。経歴：希望が丘高校→同志社大学卒業。戦型：カット主戦型。使用ラバー：フォア裏（ファスタークC-1）バック表（ハマー）。主な戦績：全日本選手権ダブルス5位、全国大会（大学生の部）シングルス5位、フィンランドオープン準優勝。オリジナルアイテムブランド【MYTEM】の展開も行っている。",
};

export const youtubeVideos: VideoData[] = [
  // ===== サーブ系 =====
  {
    id: "v001",
    title: "【爆伸】だれでも簡単にすぐできてサービスエースを量産する「しゃがみこまない」しゃがみこみサーブ",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v002",
    description:
      "しゃがみこみサーブの新しいアプローチ。体に負担をかけずに、サービスエースを量産できる「しゃがみこまない」しゃがみこみサーブのやり方を解説。",
    category: "serve",
  },
  {
    id: "v002",
    title: "【超意外】卓キチ流必殺「ボヨンボヨンサーブ」教わってみた",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v003",
    description:
      "卓キチちゃんねるとのコラボ動画。相手を惑わすユニークな「ボヨンボヨンサーブ」の出し方を紹介。3球目攻撃にもつなげやすいサーブ技術。",
    category: "serve",
  },
  {
    id: "v003",
    title: "【大人の卓球】力は一切不要です。身体の負担ゼロで、相手の意表を突く「伸びるサーブ」の極意。",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v004",
    description:
      "力に頼らず、テクニックだけで相手の意表を突く「伸びるサーブ」を解説。大人の卓球プレイヤーに最適な、身体に負担をかけないサーブ技術。",
    category: "serve",
  },
  {
    id: "v004",
    title: "【有料級】見ないと損！誰も教えてくれない「短く、低い」バックサーブの正解フォーム",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v005",
    description:
      "バックサーブで「短く、低い」サーブを出すための正しいフォームを解説。多くの人が間違えがちなポイントを修正する有料級の内容。",
    category: "serve",
  },
  {
    id: "v005",
    title: "【常識破壊】フォアサーブは「○○」を向け。相手が「？」になるほど切れる、最小スイングの極意",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v006",
    description:
      "フォアサーブの常識を覆す新しいアプローチ。最小限のスイングで最大限の回転をかけるフォアサーブの極意を伝授。",
    category: "serve",
  },
  {
    id: "v006",
    title: "【究極の手抜き】一歩も動かずに相手を翻弄する「ずるい」サーブ展開術",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v007",
    description:
      "フットワークに頼らず、サーブの配球だけで相手を翻弄する戦術的なサーブ展開術。省エネで効果的な試合運びの方法。",
    category: "tactics",
  },
  {
    id: "v007",
    title: "【中級者編】元全日本２位が教える!!初心者を脱出するためのサーブ戦略",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v008",
    description:
      "中級者向けサーブ戦略。試合でサーブの重要性、下回転・上回転・横回転の使い分け、短いサーブと長いサーブの戦略的な使い方を解説。",
    category: "serve",
  },

  // ===== レシーブ系 =====
  {
    id: "v008",
    title: "【魔改造】○○を変えるだけで、レシーブミスが消える。一生モノの技術になる有料級のレシーブ術",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v009",
    description:
      "レシーブのミスを劇的に減らすための技術改善ポイントを解説。たった一つの要素を変えるだけで安定するレシーブ術を紹介。",
    category: "receive",
  },

  // ===== ドライブ・打法系 =====
  {
    id: "v009",
    title: "バックドライブで「真後ろ」を打つな。9割がミスる最大の原因はこれでした",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v010",
    description:
      "バックドライブで9割の人がやってしまう間違いを指摘。「真後ろ」を打たないことで安定感が劇的に向上する打ち方を解説。",
    category: "drive",
  },
  {
    id: "v010",
    title: "＼あなたはどっち派⁉️／ 2種類のバックスイング",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v011",
    description:
      "バックスイングの2つの方法を比較解説。自分のプレースタイルに合ったバックスイングを見つけるためのガイド。",
    category: "drive",
  },

  // ===== ツッツキ・台上技術系 =====
  {
    id: "v011",
    title: "【保存版】振るのをやめれば、もうミスらない。フォアツッツキが吸い付くように安定する「一点」の極意",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v012",
    description:
      "フォアツッツキの安定感を高めるための極意を解説。「振る」のをやめ、「一点」を意識するだけでツッツキが安定する方法。攻撃型・カット型問わず使える技術。",
    category: "drive",
  },

  // ===== カット・守備系 =====
  {
    id: "v012",
    title: "カットマンの戦術と攻守の切り替え",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v013",
    description:
      "カット主戦型の朝田まいが自身の経験をもとに、カットマンの戦術と攻撃に転じるタイミングを解説。守備から攻撃への切り替えのコツ。",
    category: "cut",
  },

  // ===== フットワーク系 =====
  {
    id: "v013",
    title: "朝田まいが現役時代にやっていたフットワーク練習",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v014",
    description:
      "元全日本選手権出場の朝田まいが、現役時代に実際に行っていたフットワーク練習メニューを紹介。試合で動ける体を作る方法。",
    category: "footwork",
  },

  // ===== MYTEMグッズ =====
  {
    id: "v014",
    title: "MYTEMの新作卓球グッズ紹介",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v015",
    description:
      "オリジナルブランドMYTEMの最新卓球グッズを紹介。デザイン性と機能性を兼ね備えたウェアやアクセサリーの魅力を解説。",
    category: "goods",
  },

  // ===== 初投稿・紹介系 =====
  {
    id: "v015",
    title: "【初投稿！】副業卓球コーチの朝田まいがマシンでひたすら練習する動画",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v016",
    description:
      "チャンネル初投稿。卓球マシンを使ったひたすら練習する動画。朝田まいの卓球スタイルやフォームを確認できる。",
    category: "other",
  },

  // ===== ショート動画系 =====
  {
    id: "v016",
    title: "【切り札】卓キチ流必殺サーブ",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v017",
    description:
      "卓キチとのコラボで生まれた必殺サーブを短い動画で紹介。試合の切り札として使えるサーブのポイント。",
    category: "serve",
  },
  {
    id: "v017",
    title: "【卓球】ずんだもんと卓球してみた",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_v018",
    description:
      "ずんだもんとの卓球コラボ動画。楽しみながら卓球の魅力を伝えるエンタメ系の内容。",
    category: "other",
  },
];

// 動画データをコンテキスト用テキストに変換
export function getVideoContext(): string {
  const header = `チャンネル名: ${channelInfo.name}\nハンドル: ${channelInfo.handle}\nURL: ${channelInfo.url}\nプロフィール: ${channelInfo.profile}\n\n--- 動画一覧 ---\n\n`;

  const videos = youtubeVideos
    .map(
      (v, i) =>
        `${i + 1}. 【${v.title}】\n   URL: ${v.url}\n   内容: ${v.description}\n   カテゴリ: ${v.category}`
    )
    .join("\n\n");

  return header + videos;
}
