import { Request, Response, NextFunction } from "express";
import {
  fetchAllUsers,
  addUser,
  modifyUser,
  removeUser
} from "../services/userService";

// GET /users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({ message: "Fetched all users", data: users });
  } catch (error) {
    next(error);
  }
};

// POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, role } = req.body;
    const newUser = await addUser(name, email, role);
    res.status(201).json({ message: "User created", data: newUser });
  } catch (error) {
    next(error);
  }
};

// PUT /users/:id
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await modifyUser(id, name); // treat id as string

    if (!updated) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User updated", data: updated });
  } catch (error) {
    next(error);
  }
};

// DELETE /users/:id
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await removeUser(id); // treat id as string

    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted", data: deleted });
  } catch (error) {
    next(error);
  }
};
