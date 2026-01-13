import { ObjectId } from "mongodb";

export interface UserLibrary {
  _id?: ObjectId;
  userId: string;
  bookId: string;
  status: "want_to_read" | "reading" | "read";
  progress?: number; 
  createdAt?: Date;
  updatedAt?: Date;
}