import { db } from "../../../../config/firebaseConfig";

interface EventData {
  name: string;
  date: string;
  location: string;
  organizer: string;
}

// Collection name in Firestore
const COLLECTION_NAME = "events";

// GET: Fetch all events
export const fetchAllEvents = async (): Promise<any[]> => {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// POST: Add a new event
export const addEvent = async (event: EventData): Promise<any> => {
  const docRef = await db.collection(COLLECTION_NAME).add(event);
  const newDoc = await docRef.get();
  return { id: docRef.id, ...newDoc.data() };
};

// PUT: Update an existing event
export const modifyEvent = async (id: string, updates: Partial<EventData>): Promise<any> => {
  const docRef = db.collection(COLLECTION_NAME).doc(id);
  await docRef.update(updates);
  const updatedDoc = await docRef.get();
  return { id: docRef.id, ...updatedDoc.data() };
};

// DELETE: Remove an event
export const removeEvent = async (id: string): Promise<any> => {
  const docRef = db.collection(COLLECTION_NAME).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    throw new Error("Event not found");
  }
  await docRef.delete();
  return { id: doc.id, ...doc.data() };
};
