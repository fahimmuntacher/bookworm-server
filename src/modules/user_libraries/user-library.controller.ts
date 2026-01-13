import { Request, Response } from "express";
import { userLibraryService } from "./user-library.service";

const upsert = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { bookId, status, progress } = req.body;
  const userId = req.user.id;

  if (!bookId || !status) {
    return res.status(400).json({ error: "bookId & status required" });
  }

  const result = await userLibraryService.upsertLibrary({
    userId,
    bookId,
    status,
    progress,
  });

  res.json({ success: true, data: result });
};

const myLibrary = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const data = await userLibraryService.getMyLibrary(req.user.id);
  res.json({ data });
};

const update = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const updated = await userLibraryService.updateLibrary(
    req.params.id as string,
    req.user.id,
    req.body
  );

  res.json({ success: true, data: updated });
};

const remove = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.id;
  const { bookId } = req.params;

  await userLibraryService.removeFromLibrary(userId, bookId as string);

  res.json({ success: true });
};

export const userLibraryController = {
  upsert,
  myLibrary,
  update,
  remove,
};
