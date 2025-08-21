'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckAuthURL } from "../constants";

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(CheckAuthURL, {
            withCredentials: true,
        })
            .then((res) => {
                setUser(res.data.user);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { user,setUser, loading };
}
