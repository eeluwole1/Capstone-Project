// types/ticketTypes.ts
export interface Ticket {
    id: string;
    event_id: number;
    user_id: number;
    status: string;
  }
  
  export interface TicketData {
    ticketId: string;
    eventName: string;
    date: string;
    userName: string;
    location: string;
  }

