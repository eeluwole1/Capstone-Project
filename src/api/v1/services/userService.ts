let mockUsers: { id: number; name: string; email: string; role: string }[] = [];
let nextUserId = 1;

export const fetchAllUsers = (): typeof mockUsers => {
  return mockUsers;
};

export const addUser = (
  name: string,
  email: string,
  role: string
): { id: number; name: string; email: string; role: string } => {
  const newUser = { id: nextUserId++, name, email, role };
  mockUsers.push(newUser);
  return newUser;
};

export const modifyUser = (
  id: number,
  name: string
): { id: number; name: string; email: string; role: string } | null => {
  const index = mockUsers.findIndex(user => user.id === id);
  if (index === -1) return null;
  mockUsers[index].name = name;
  return mockUsers[index];
};

export const removeUser = (
  id: number
): { id: number; name: string; email: string; role: string } | null => {
  const index = mockUsers.findIndex(user => user.id === id);
  if (index === -1) return null;
  const deletedUser = mockUsers[index];
  mockUsers.splice(index, 1);
  return deletedUser;
};
