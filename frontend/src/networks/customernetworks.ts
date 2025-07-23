import {
    LoginUrl,
    ResetUrl,
    signUpUrl,
    ForgotUrl,
    GetUserData
} from "@/constants"
import axios from "axios";

export async function SignUp(formdata: any) {
    try {
        const response = await axios.post(signUpUrl, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function LogIn(formdata: any) {
    try {
        const response = await axios.post(LoginUrl, formdata);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function Forgot(formdata: any) {
    try {
        const response = await axios.post(ForgotUrl, formdata);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function Reset(formdata: any) {
    try {
        const response = await axios.post(
            `${ResetUrl}?token=${formdata.token}`,
            formdata
        );
        console.log(response.data);
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
        const response = await axios.get(`${GetUserData}?id=${user_id}`);
        return response.data.userExists; 
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

