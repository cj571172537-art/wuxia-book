export interface PlotPoint {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imagePrompt: string;
  staticImage: string;
}

export const PLOT_POINTS: PlotPoint[] = [
  {
    id: 1,
    title: "序幕：青鸾舞镜",
    subtitle: "剑道之始",
    description: "聂隐娘随道姑师父在山中修行。师父教导：'剑道无亲，不与圣人同忧。' 隐娘剑术已成，却仍存一丝人情。",
    imagePrompt: "Traditional Chinese ink wash painting, a lone female assassin standing on a misty mountain peak, ancient pine trees, minimalist, high contrast, black and white with a hint of red on her ribbon, ethereal atmosphere.",
    staticImage: "https://images.unsplash.com/photo-1508197149814-0cc02e8b7f74?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "初试：大僚之死",
    subtitle: "杀手之仁",
    description: "隐娘奉命刺杀一名大僚，潜入府邸时见大僚正抱着年幼的孩子酣睡。隐娘心生怜悯，未曾下手，被师父责罚。",
    imagePrompt: "Traditional Chinese ink wash painting, a silhouette of an assassin watching from the shadows of a traditional Chinese courtyard, a father holding a child in a dimly lit room, soft ink strokes, melancholic mood.",
    staticImage: "https://images.unsplash.com/photo-1599708153386-62e25078070d?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "归乡：魏博藩镇",
    subtitle: "旧梦重逢",
    description: "隐娘回到故乡魏博，目标是她的表兄、昔日的婚约者田季安。藩镇割据，局势动荡，隐娘在暗处观察着这一切。",
    imagePrompt: "Traditional Chinese ink wash painting, a grand ancient Chinese palace gate in the mist, soldiers with spears, a sense of political tension, broad brush strokes, dramatic composition.",
    staticImage: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "往事：羊脂玉玦",
    subtitle: "信物之殇",
    description: "嘉信公主曾赠予隐娘和田季安一对羊脂玉玦。如今玉玦依旧，人已殊途。隐娘将玉玦归还，斩断前尘往事。",
    imagePrompt: "Traditional Chinese ink wash painting, a close-up of a delicate white jade pendant (Jue) held by a slender hand, soft gray background, elegant and refined, minimalist ink style.",
    staticImage: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "对峙：林间决斗",
    subtitle: "锋芒交错",
    description: "隐娘与田季安之妻精精儿在白桦林中决斗。刀光剑影间，隐娘面具被击碎，露出真容。两人武艺不上下，胜负已在心外。",
    imagePrompt: "Traditional Chinese ink wash painting, two figures fighting in a silver birch forest, dynamic ink splashes representing sword movements, high energy, abstract elements, black and white.",
    staticImage: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "终章：隐于山水",
    subtitle: "道法自然",
    description: "隐娘最终选择违背师命，不杀田季安。她告别师父，随磨镜少年远走他乡，消失在苍茫的山水之间。",
    imagePrompt: "Traditional Chinese ink wash painting, a vast landscape of mountains and rivers, two small figures walking away into the distance, immense negative space, peaceful and transcendental, classic Shanshui style.",
    staticImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
  }
];
