export const getUserProfile = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
