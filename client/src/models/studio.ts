interface IStudio {
  id: string;
  name: string;
  ownerId: string;
  startTime: number;
  endTime: number;
  address: string;
  availableDays: string[];
  createdAt: Date;
  updatedAt: Date;
  images: string[];
}

export default IStudio;
