import { Request, Response } from "express";
import {
  fetchAllArtists,
  addArtist,
  modifyArtist,
  removeArtist,
} from "./../services/artistService";

// GET /artists
export const getAllArtists = (req: Request, res: Response): void => {
  const artists = fetchAllArtists();
  res.status(200).json({ message: "Fetched all artists", data: artists });
};

// POST /artists
export const createArtist = (req: Request, res: Response): void => {
  const { name, genre, event_id } = req.body;
  const newArtist = addArtist(name, genre, event_id);
  res.status(201).json({ message: "Artist registered", data: newArtist });
};

// PUT /artists/:id
export const updateArtist = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name, genre } = req.body;
  const updated = modifyArtist(Number(id), name, genre);
  res.status(200).json({ message: "Artist updated", data: updated });
};

// DELETE /artists/:id
export const deleteArtist = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deleted = removeArtist(Number(id));
  res.status(200).json({ message: "Artist deleted", data: deleted });
};
