export const AppRoutes = {
  Main: '/',
  Booking: '/quest/:id/booking',
  Contacts: '/contacts',
  Login: '/login',
  Quest: '/quest/:id'
} as const;

export type TQuestFilterTypes = {
  name: string;
  id: string;
  labelText: string;
  isDefault?: boolean;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
};

export const QuestThemeFilters: TQuestFilterTypes[] = [
  {
    name: 'type',
    id: 'all',
    labelText: 'Все квесты',
    isDefault: true,
    iconName: 'all-quests',
    iconWidth: 26,
    iconHeight: 30,
  },
  {
    name: 'type',
    id: 'adventure',
    labelText: 'Приключения',
    iconName: 'adventure',
    iconWidth: 36,
    iconHeight: 30,
  },
  {
    name: 'type',
    id: 'horror',
    labelText: 'Ужасы',
    iconName: 'horror',
    iconWidth: 30,
    iconHeight: 30,
  },
  {
    name: 'type',
    id: 'mystic',
    labelText: 'Мистика',
    iconName: 'mystic',
    iconWidth: 30,
    iconHeight: 30,
  },
  {
    name: 'type',
    id: 'detective',
    labelText: 'Детектив',
    iconName: 'detective',
    iconWidth: 40,
    iconHeight: 30,
  },
  {
    name: 'type',
    id: 'sciFi',
    labelText: 'Sci-fi',
    iconName: 'sci-fi',
    iconWidth: 28,
    iconHeight: 30,
  },
];

export const QuestDifficultyFilters: TQuestFilterTypes[] = [
  {
    name: 'level',
    id: 'any',
    labelText: 'Любой',
    isDefault: true,
  },
  {
    name: 'level',
    id: 'easy',
    labelText: 'Лёгкий',
  },
  {
    name: 'level',
    id: 'middle',
    labelText: 'Средний',
  },
  {
    name: 'level',
    id: 'hard',
    labelText: 'Сложный',
  },
];
