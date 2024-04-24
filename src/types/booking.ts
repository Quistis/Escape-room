import { TQuestsCard } from './quest';

export type TLocation = {
  address: string;
  coords: [number, number];
};

export type TSlot = {
  time: string;
  isAvailable: boolean;
};

export type TBookingData = {
  id: string;
  location: TLocation;
  slots: {
      today: TSlot[];
      tomorrow: TSlot[];
  };
};

export type TQuestReservation = {
  date: 'today' | 'tomorrow';
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: TLocation;
  quest: TQuestsCard;
};

export type TQuestBookingFormInfo = {
  date: 'today' | 'tomorrow';
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
}
