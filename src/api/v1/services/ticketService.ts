import { db } from "../../../../config/firebaseConfig";
import { Ticket } from "../types/ticketTypes";

const COLLECTION = "tickets";


/**
 * Get all tickets with filtering and sorting
 */
export const fetchAllTickets = async (
  filters: { status?: string; sortBy?: string } = {}
): Promise<Ticket[]> => {
  let query: FirebaseFirestore.Query = db.collection("tickets");

  if (filters.status) {
    query = query.where("status", "==", filters.status);
  }

  if (filters.sortBy) {
    query = query.orderBy(filters.sortBy, "asc");
  }

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ticket));
};


/**
 * Book a new ticket
 */
export const bookTicket = async (data: { event_id: number; user_id: number }): Promise<Ticket> => {
  const ticket = {
    event_id: data.event_id,
    user_id: data.user_id,
    status: "booked",
    createdAt: new Date().toISOString(),
  };
  const docRef = await db.collection(COLLECTION).add(ticket);
  return { id: docRef.id, ...ticket };
};

/**
 * Update a ticket's status
 */
export const modifyTicket = async (
  id: string,
  updates: { status: string }
): Promise<Ticket | null> => {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();

  if (!doc.exists) return null;

  await docRef.update(updates);
  const updatedDoc = await docRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() } as Ticket;
};

/**
 * Cancel a ticket
 */
export const cancelTicket = async (id: string): Promise<Ticket | null> => {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();

  if (!doc.exists) return null;

  const deletedTicket = { id: doc.id, ...doc.data() } as Ticket;
  await docRef.delete();
  return deletedTicket;
};
