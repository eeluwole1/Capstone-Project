let mockTickets: { id: number; event_id: number; user_id: number; status: string }[] = [];
let nextTicketId = 1;

/**
 * Get all tickets
 */
export const fetchAllTickets = (): typeof mockTickets => {
  return mockTickets;
};

/**
 * Book a new ticket
 */
export const bookTicket = (
  event_id: number,
  user_id: number
): { id: number; event_id: number; user_id: number; status: string } => {
  const newTicket = {
    id: nextTicketId++,
    event_id,
    user_id,
    status: "booked"
  };
  mockTickets.push(newTicket);
  return newTicket;
};

/**
 * Update a ticket's status
 */
export const modifyTicket = (
  id: number,
  status: string
): { id: number; event_id: number; user_id: number; status: string } | null => {
  const index = mockTickets.findIndex(t => t.id === id);
  if (index === -1) return null;
  mockTickets[index].status = status;
  return mockTickets[index];
};

/**
 * Cancel a ticket
 */
export const cancelTicket = (
  id: number
): { id: number; event_id: number; user_id: number; status: string } | null => {
  const index = mockTickets.findIndex(t => t.id === id);
  if (index === -1) return null;
  const canceled = mockTickets[index];
  mockTickets.splice(index, 1);
  return canceled;
};
