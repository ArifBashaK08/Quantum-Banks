"use server"

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { parseStringify } from "../utils"
import { cookies } from "next/headers"

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();

        const response = await account.createEmailPasswordSession(email, password)

        cookies().set("appwrite-session", response.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(response)
    } catch (error) {
        return parseStringify(error)
    }
}

export const signUp = async ({ email, password, firstName, lastName }: SignUpParams) => {
    try {
        const { account } = await createAdminClient();
        const name = `${firstName} ${lastName}`;

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        )

        const session = await account.createEmailPasswordSession(email, password)

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        })
        return parseStringify(newUserAccount)
    } catch (error) {
        console.error("Error - ", error.message);        
    }
}

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();

        const user = await account.get();

        return parseStringify(user)
    } catch (error) {
        console.log(error.message)
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete("appwrite-session");
        await account.deleteSession("current");
    } catch (error) {
        console.log(error)
    }
}


