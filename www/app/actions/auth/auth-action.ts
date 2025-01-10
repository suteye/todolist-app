"use server"

import { signIn, signOut } from "next-auth/react"

export async function handleCredentialsLogin({ username, password }: { username: string, password: string }) {
    try {
        await signIn("credentials", { username, password, callbackUrl: "/" })
    } catch (error) {
        console.error("Failed to sign in", error)
    }
}

export async function handleGoogleLogin() {
    try {
        await signIn("google", { callbackUrl: "/" })
    } catch (error) {
        console.error("Failed to sign in", error)
    }
}

export async function handleSignOut() {
    await signOut();
}

