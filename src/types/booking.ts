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
