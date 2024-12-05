import {
    LoginUrl,
    ResetUrl,
    signUpUrl,
    ForgotUrl
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

