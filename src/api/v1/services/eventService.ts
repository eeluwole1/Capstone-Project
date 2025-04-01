let mockEvents: { id: number; name: string }[] = [];
let nextId = 1;

export const fetchAllEvents = (): { id: number; name: string }[] => {
  return mockEvents;
};

export const addEvent = (name: string): { id: number; name: string } => {
  const newEvent = { id: nextId++, name };
  mockEvents.push(newEvent);
  return newEvent;
};

export const modifyEvent = (id: number, name: string): { id: number; name: string } | null => {
  const index = mockEvents.findIndex(e => e.id === id);
  if (index === -1) return null;
  mockEvents[index].name = name;
  return mockEvents[index];
};

export const removeEvent = (id: number): { id: number; name: string } | null => {
  const index = mockEvents.findIndex(e => e.id === id);
  if (index === -1) return null;
  const deleted = mockEvents[index];
  mockEvents.splice(index, 1);
  return deleted;
};
