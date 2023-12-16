import axiosInstance from "../utils/axiosInstance";
export const login = async (userInfo) => {
  try {
    const response = await axiosInstance.post("/api/users", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signup = async (userInfo) => {
  try {
    const response = await axiosInstance.post(
      "/api/users?action=register",
      userInfo,
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
