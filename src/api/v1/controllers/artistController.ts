import { Request, Response, NextFunction } from "express";
import {
  fetchAllArtists,
  addArtist,
  modifyArtist,
  removeArtist,
} from "./../services/artistService";

// GET /artists
export const getAllArtists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const artists = await fetchAllArtists();
      res.status(200).json({ message: "Fetched all artists", data: artists });
    } catch (error) {
      next(error);
    }
  };
  
  // POST /artists
  export const createArtist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, genre, event_id } = req.body;
      const newArtist = await addArtist({ name, genre, event_id });
      res.status(201).json({ message: "Artist registered", data: newArtist });
    } catch (error) {
      next(error);
    }
  };
  
  // PUT /artists/:id
  export const updateArtist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, genre } = req.body;
      const updated = await modifyArtist(id, { name, genre });
  
      if (!updated) {
        res.status(404).json({ message: "Artist not found" });
        return;
      }
  
      res.status(200).json({ message: "Artist updated", data: updated });
    } catch (error) {
      next(error);
    }
  };
  
  // DELETE /artists/:id
  export const deleteArtist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await removeArtist(id);
  
      if (!deleted) {
        res.status(404).json({ message: "Artist not found" });
        return;
      }
  
      res.status(200).json({ message: "Artist deleted", data: deleted });
    } catch (error) {
      next(error);
    }
  };