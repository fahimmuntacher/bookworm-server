import { ObjectId } from "mongodb";

export interface Review {
 _id?: string | ObjectId;
  bookId: string;
  userId: string;
  userName: string;
  bookName?: string;
  rating: number; 
  comment: string;
  status?: "pending" | "approved";
  createdAt?: Date;
  updatedAt?: Date;
}


