import axiosInstance from "../utils/axiosInstance";
export const ManageFavoriteMovie = async (favorites) => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axiosInstance.put(
      `/api/users/${userId}`,
      { favorites },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
