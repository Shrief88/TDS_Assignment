import IUser from "./user";
import IStudio from "./studio";

interface IReservation {
  id: string;
  studio: IStudio;
  customer: IUser;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default IReservation;
