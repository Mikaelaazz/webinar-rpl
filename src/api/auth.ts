import {
  BaseResponse,
  RegisterData,
  LoginData,
  UserEditData,
  UserImage,
  WebinarInput,
} from "./interface.ts";

const API_URL = "http://localhost:3000";

// Fungsi untuk menghubungkan ke API
export const auth = {
  // API Register
  register: async (data: RegisterData): Promise<BaseResponse> => {
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: "Failed to connect to server",
      };
    }
  },

  // API Login
  login: async (data: LoginData): Promise<BaseResponse> => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "user_data",
          JSON.stringify({
            ...result.data,
            UserPicture: result.data.UserPicture.replace("img", "static"),
          })
        );
      }
      return result;
    } catch (error) {
      return {
        message: "Failed to connect to server",
        success: false,
      };
    }
  },

  // API User Edit
  user_edit: async (data: UserEditData): Promise<BaseResponse> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/protected/user-edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user_data", JSON.stringify(result.data));
      }
      return result;
    } catch (error) {
      return {
        message: "Failed to connect to server",
        success: false,
      };
    }
  },

  // API User Image
  user_image: async (data: UserImage): Promise<BaseResponse> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/protected/user-upload-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: data.data }),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        message: "Failed to connect to server",
        success: false,
      };
    }
  },

  // API Get All Users
  get_all_users: async (): Promise<BaseResponse> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/protected/get-all-users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return await response.json();
    } catch (error) {
      return {
        message: "Failed to connect to server",
        success: false,
      };
    }
  },

  // API Add Webinar
  add_webinar: async (data: WebinarInput): Promise<BaseResponse> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/protected/event-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success && result.token) {
        localStorage.setItem("token", result.token);
      }
      return result;
    } catch (error) {
      return {
        message: "Failed to connect to server",
        success: false,
      };
    }
  },

  // API Get All Webinars
  get_all_webinar: async (): Promise<BaseResponse> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/protected/event-info-all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("API response:", result);

      if (result.success) {
        if (result.token) {
          localStorage.setItem("token", result.token);
        }
        console.log("Menyimpan data:", result.data);
        localStorage.setItem("webinar_data", JSON.stringify(result.data));
      }
      return result;
    } catch (error) {
      console.error("Error fetching webinar data:", error); // Tambahkan log error
      return {
        message: "Failed to connect to server",
        success: false,
      };
    }
  },
};
