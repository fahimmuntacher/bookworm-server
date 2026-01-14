import { Request, Response } from "express";
import { TutorialService } from "./tutorials.service.js";


export const TutorialController = {
  // -------------------------------
  // List all tutorials
  // -------------------------------
  getAllTutorials: async (req: Request, res: Response) => {
    try {
      const tutorials = await TutorialService.getAllTutorials();
      res.status(200).json({ data: tutorials, total: tutorials.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------
  // Add a new tutorial
  // -------------------------------
  addTutorial: async (req: Request, res: Response) => {
    try {
      const { title, youtubeLink, description } = req.body;
      if (!title || !youtubeLink)
        return res.status(400).json({ error: "Title and YouTube link are required" });

      const result = await TutorialService.addTutorial({ title, youtubeLink, description });
      res.status(201).json({ message: "Tutorial added successfully", tutorial: result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------
  // Edit a tutorial
  // -------------------------------
  editTutorial: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { title, youtubeLink, description } = req.body;

      if (!id) return res.status(400).json({ error: "Tutorial ID is required" });
      if (!title && !youtubeLink && !description)
        return res.status(400).json({ error: "At least one field is required to update" });

      const tutorial = await TutorialService.editTutorial(id as string, { title, youtubeLink, description });
      res.status(200).json({ message: "Tutorial updated successfully", tutorial });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------
  // Delete a tutorial
  // -------------------------------
  deleteTutorial: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: "Tutorial ID is required" });

      const result = await TutorialService.deleteTutorial(id as string);
      res.status(200).json({ message: "Tutorial deleted successfully", result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
