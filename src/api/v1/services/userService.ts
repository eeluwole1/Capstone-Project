import { db } from "../../../../config/firebaseConfig";

export type User = {
  id?: string;
  name: string;
  email: string;
  role: string;
};

const COLLECTION_NAME = "users";

/**
 * Fetch all users from Firestore.
 */
export const fetchAllUsers = async (): Promise<User[]> => {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};

/**
 * Add a new user to Firestore.
 */
export const addUser = async (
  name: string,
  email: string,
  role: string
): Promise<User> => {
  const newUser = { name, email, role };
  const docRef = await db.collection(COLLECTION_NAME).add(newUser);
  return { id: docRef.id, ...newUser };
};

/**
 * Update a user’s name in Firestore.
 */
export const modifyUser = async (
  id: string,
  name: string
): Promise<User | null> => {
  const userRef = db.collection(COLLECTION_NAME).doc(id);
  const doc = await userRef.get();

  if (!doc.exists) return null;

  await userRef.update({ name });
  const updatedDoc = await userRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() } as User;
};

/**
 * Delete a user from Firestore by ID.
 */
export const removeUser = async (id: string): Promise<User | null> => {
  const userRef = db.collection(COLLECTION_NAME).doc(id);
  const doc = await userRef.get();

  if (!doc.exists) return null;

  const userData = doc.data() as User;
  await userRef.delete();
  return { id, ...userData };
};
