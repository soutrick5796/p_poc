import users from '../resources/users.json';

export const authenticateUser = (username, password) => {
  const user = users.find((u) => u.username === username && u.password === password);
  return user ? { id: user.id, username: user.username } : null;
};
