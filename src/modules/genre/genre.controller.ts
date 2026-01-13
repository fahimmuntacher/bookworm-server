import { Request, Response } from "express";
import { GenreService } from "./genre.service";

// Create Genre
const createGenre = async (req: Request, res: Response) => {
  try {
    const result = await GenreService.createGenre(req.body);
    res.status(201).json({ success: true, message: "Genre created", data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Genres
const getAllGenres = async (req: Request, res: Response) => {
  try {
    const { search, page = "1", limit = "10" } = req.query;
    const result = await GenreService.getAllGenres(
      search as string,
      parseInt(page as string),
      parseInt(limit as string)
    );
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get Single Genre
const getGenreById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const genre = await GenreService.getGenreById(id as string);
    res.status(200).json({ success: true, data: genre });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Update Genre
const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await GenreService.updateGenre(id as string, req.body);
    res.status(200).json({ success: true, message: "Genre updated", data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Genre
const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await GenreService.deleteGenre(id as string);
    res.status(200).json({ success: true, message: "Genre deleted", data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const GenreController = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
}