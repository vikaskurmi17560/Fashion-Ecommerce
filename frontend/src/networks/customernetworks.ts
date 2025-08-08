import axios from "axios";
import {
  LoginUrl,
  ResetUrl,
  signUpUrl,
  ForgotUrl,
  GetUserData,
  LogOutUrl,
} from "@/constants";

export async function SignUp(formData: FormData) {
  try {
    const response = await axios.post(signUpUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
}

export async function LogIn(formdata: any) {
  try {
    const response = await axios.post(LoginUrl, formdata, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await axios.post(LogOutUrl, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function Forgot(formdata: any) {
  try {
    const response = await axios.post(ForgotUrl, formdata);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Reset(formdata: any) {
  try {
    const response = await axios.post(`${ResetUrl}?token=${formdata.token}`, formdata);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser(user_id: string | null) {
  if (!user_id) {
    console.warn("getUser: user_id is null");
    return null;
  }
  try {
    const response = await axios.get(`${GetUserData}?id=${user_id}`, {
      withCredentials: true
    });

    return response.data.userExists;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}