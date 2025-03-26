

export const fetchAllEvents = (): string[] => {
  return ["Jazz Night", "Rock Fest"];
};

export const addEvent = (event: string): string => {
  return "Event added";
};

export const modifyEvent = (id: number, event: string): string => {
  return "Event updated";
};

export const removeEvent = (id: number): string => {
  return "Event deleted";
};
