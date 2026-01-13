import { ObjectId } from "mongodb";

export interface Book {
  _id?: ObjectId;
  title: string;
  author: string;
  description: string;
  genres: string[];
  coverImage: string;
  totalPages: number;
  createdAt?: Date;
  updatedAt?: Date;
}
