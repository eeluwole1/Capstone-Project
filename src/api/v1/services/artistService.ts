let mockArtists: { id: number; name: string; genre: string; event_id: number }[] = [];
let nextId = 1;

export const fetchAllArtists = (): { id: number; name: string; genre: string; event_id: number }[] => {
  return mockArtists;
};

export const addArtist = (
  name: string,
  genre: string,
  event_id: number
): { id: number; name: string; genre: string; event_id: number } => {
  const newArtist = { id: nextId++, name, genre, event_id };
  mockArtists.push(newArtist);
  return newArtist;
};

export const modifyArtist = (
  id: number,
  name: string,
  genre: string
): { id: number; name: string; genre: string; event_id: number } | null => {
  const index = mockArtists.findIndex(a => a.id === id);
  if (index === -1) return null;
  mockArtists[index].name = name;
  mockArtists[index].genre = genre;
  return mockArtists[index];
};

export const removeArtist = (
  id: number
): { id: number; name: string; genre: string; event_id: number } | null => {
  const index = mockArtists.findIndex(a => a.id === id);
  if (index === -1) return null;
  const deleted = mockArtists[index];
  mockArtists.splice(index, 1);
  return deleted;
};
