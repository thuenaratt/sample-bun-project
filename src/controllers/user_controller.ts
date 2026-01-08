import type { Request, Response } from "express";

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
}
let users: User[] = [];
let idCounter = 1;

// Create a new user
export const createUser = (req: Request, res: Response): void => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({ message: "Name and email are required" });
    return;
  }
  const user: User = {
    id: idCounter++,
    name,
    email,
  };
  users.push(user);
  res.status(201).json(user);
};

// Reset all users
export function resetUsers(): void {
  users = [];
  idCounter = 1;
}
// Get all users
export const getAllUsers = (req: Request, res: Response): void => {
  res.json(users);
};
// Get a single user by ID
export const getUser = (req: Request, res: Response): void => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(user);
};
// Update an existing user
export const updateUser = (req: Request, res: Response): void => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;

  res.json(user);
};
// Delete a user
export const deleteUser = (req: Request, res: Response): void => {
  const userId = Number(req.params.id);
  const userExists = users.some(u => u.id === userId);
  if (!userExists) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  users = users.filter(u => u.id !== userId);
  res.json({ message: "User deleted" });
};
