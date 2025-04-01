import { Request, Response } from "express";
import {
  fetchAllUsers,
  addUser,
  modifyUser,
  removeUser
} from "./../services/userService";

// GET /users
export const getAllUsers = (req: Request, res: Response): void => {
  const users = fetchAllUsers();
  res.status(200).json({ message: "Fetched all users", data: users });
};

// POST /users
export const createUser = (req: Request, res: Response): void => {
  const { name, email, role } = req.body;
  const newUser = addUser(name, email, role);
  res.status(201).json({ message: "User created", data: newUser });
};

// PUT /users/:id
export const updateUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name } = req.body;
  const updated = modifyUser(Number(id), name);
  res.status(200).json({ message: "User updated", data: updated });
};

// DELETE /users/:id
export const deleteUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deleted = removeUser(Number(id));
  res.status(200).json({ message: "User deleted", data: deleted });
};
