import { ObjectId } from "mongodb";
import { connectDB } from "../../config/db";
import { Genre } from "./genre.interface";

const COLLECTION = "genres";

// Create a new genre
const createGenre = async (payload: Genre) => {
  const db = await connectDB();

  const existed = await db
    .collection(COLLECTION)
    .findOne({ name: payload.name });
  if (existed) throw new Error("Genre already exists");

  const result = await db.collection<Genre>(COLLECTION).insertOne({
    ...payload,
    createdAt: new Date(),
  });

  return result;
};

// Get all genres with optional search, pagination
const getAllGenres = async (search?: string, page = 1, limit = 10) => {
  const db = await connectDB();

  const query: any = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;
  const total = await db.collection<Genre>(COLLECTION).countDocuments(query);
  const genres = await db
    .collection<Genre>(COLLECTION)
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();

  return { total, page, limit, data: genres };
};

// Get single genre
const getGenreById = async (id: string) => {
  const db = await connectDB();
  const genre = await db
    .collection<Genre>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
  if (!genre) throw new Error("Genre not found");
  return genre;
};

// Update genre
const updateGenre = async (id: string, payload: Partial<Genre>) => {
  const db = await connectDB();
  const result = await db
    .collection<Genre>(COLLECTION)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...payload, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

  return result;
};

// Delete genre
const deleteGenre = async (id: string) => {
  const db = await connectDB();
  const result = await db
    .collection<Genre>(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) throw new Error("Genre not found");
  return { success: true };
};

export const GenreService = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
};
