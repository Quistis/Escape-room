export const replaceDifficulty = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'лёгкий';
    case 'medium':
      return 'средний';
    case 'hard':
      return 'сложный';
    default:
      return difficulty;
  }
};

export const replaceTheme = (theme: string): string => {
  switch (theme) {
    case 'adventure':
      return 'приключения';
    case 'horror':
      return 'ужасы';
    case 'mystic':
      return 'мистика';
    case 'detective':
      return 'детектив';
    case 'sci-fi':
      return 'sci-fi';
    default:
      return theme;
  }
};
