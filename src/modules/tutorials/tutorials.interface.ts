import { ObjectId } from "mongodb";

export interface Tutorial {
  _id?: ObjectId;
  title: string;
  description?: string;
  youtubeLink: string;
  createdAt?: Date;
  updatedAt?: Date;
}
