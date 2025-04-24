import { db } from "../../../../config/firebaseConfig";

interface Artist {
  id?: string;
  name: string;
  genre: string;
  event_id: number;
}

const collectionName = "artists";

// Fetch all artists
export const fetchAllArtists = async (): Promise<Artist[]> => {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Artist)
  }));
};

// Add new artist
export const addArtist = async (data: Omit<Artist, "id">): Promise<Artist> => {
  const docRef = await db.collection(collectionName).add(data);
  return { id: docRef.id, ...data };
};

// Update artist by ID
export const modifyArtist = async (
  id: string,
  data: Partial<Omit<Artist, "id">>
): Promise<Artist | null> => {
  const docRef = db.collection(collectionName).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;

  await docRef.update(data);
  const updated = await docRef.get();
  return { id: updated.id, ...(updated.data() as Artist) };
};

// Delete artist by ID
export const removeArtist = async (id: string): Promise<Artist | null> => {
  const docRef = db.collection(collectionName).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;

  const deleted = { id: doc.id, ...(doc.data() as Artist) };
  await docRef.delete();
  return deleted;
};
