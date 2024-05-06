import IReservation from "./reservation";

interface IStudio {
  id: string;
  name: string;
  ownerId: string;
  startTime: number;
  endTime: number;
  address: string;
  availableDays: number[];
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  reservations: IReservation[];
}

export default IStudio;
