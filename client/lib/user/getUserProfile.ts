export const getUserProfile = () => {
  // Ensure we're on the client side before accessing localStorage
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");

  // Check if user exists and is not "null", "undefined", or empty string
  if (user && user !== "null" && user !== "undefined" && user.trim() !== "") {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      // Clear invalid data from localStorage
      localStorage.removeItem("user");
      return null;
    }
  }

  return null;
};
