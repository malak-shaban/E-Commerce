"use server"

import { getMyToken } from "@/Utilities/getMyToken"
export async function ChangePass(values: {
    currentPassword: string;
    password: string;
    rePassword: string;
}) {
    try {
        const token = await getMyToken();
        if (!token) {
            throw new Error("not authorize to change pass");

        }
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
            method: "PUT",
            headers: {
                token: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        });
        const data = await res.json();
        return data;
    }
    catch (err) {
        return err
    }
}