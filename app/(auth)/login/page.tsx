"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CardAuth from "@/components/auth/card-wrapper";
import { useState, useEffect } from "react";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
    }
  };

  return (
    <CardAuth>
      <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
      <form onSubmit={handleSubmit} className="text-sm flex flex-col gap-4 mt-4">
        <input
          type="text"
          className="p-2 rounded-xl border"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="p-2 rounded-xl border w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-[#002D74] text-white rounded-xl py-2 hover:scale-105 transition-all duration-300">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div>
        <div className="mt-6 text-gray-400 grid items-center grid-cols-3">
          <hr className="border-gray-400" />
          <p className="text-center text-sm">Or</p>
          <hr className="border-gray-400" />
        </div>
        <button
          onClick={() => signIn("google")}
          className="bg-white px-2 py-2 mt-5 border w-full rounded-xl 
          flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
        >
          <Image
            src="/image/google-logo.png"
            width={30}
            height={30}
            alt="Google Logo"
          />
          <span className="px-2"> Sign in with Google </span>
        </button>
        <div className="mt-5 text-xs flex justify-between items-center">
          <p className="text-gray-400">Don't have an account?</p>
          <button
            onClick={() => router.push("/register")}
            className="text-[#002D74]"
          >
            Register
          </button>
        </div>
      </div>
    </CardAuth>
  );
}