import axios from "axios";
import {
  LoginUrl,
  ResetUrl,
  signUpUrl,
  ForgotUrl,
  GetUserData,
  LogOutUrl,
  updateDataUrl,
} from "@/constants";

export async function SignUp(formData: FormData) {
  try {
    const response = await axios.post(signUpUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
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

export interface ForgotFormData {
  email: string;
}

export async function Forgot(formdata: ForgotFormData) {
  try {
    const response = await axios.post(ForgotUrl, formdata);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function Reset(formdata: any) {
  try {
    const response = await axios.post(`${ResetUrl}?token=${formdata.token}`,formdata);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUser(user_id: string | null) {
  if (!user_id) {
    return null;
  }
  try {
    const response = await axios.get(`${GetUserData}?id=${user_id}`, {
      withCredentials: true
    });

    return response.data.userExists;
  } catch (error) {
    throw error;
  }
}

export async function updateData(body: any, user_id: string) {
  try {
    const response = await axios.patch(`${updateDataUrl}?user_id=${user_id}`, body, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data.success;
  } catch (error: any) {
    throw error;
  }
}
