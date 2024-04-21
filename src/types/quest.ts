export type TQuest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';
  peopleMinMax: [number, number];
  description: string;
  coverImg: string;
  coverImgWebp: string;
};

export type TQuestsCard = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';
  peopleMinMax: [number, number];
};
