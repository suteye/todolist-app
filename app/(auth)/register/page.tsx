"use client"
import { useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { registerUser } from "@/app/actions/auth/register-action";
import Popup from "@/components/auth/popup-alert";



export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerUser(username, password);
      if (res) {
        setSuccess("User registered successfully!");
        setError(null);
      }
    } catch (error) {
      setError("Error registering user");
      setSuccess(null);
    }
  };

  return (
    <CardWrapper>
      <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
      <form onSubmit={handleSubmit} className="text-sm flex flex-col gap-4 mt-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="p-2 rounded-xl border"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="p-2 rounded-xl border"
        />
        <button type="submit" className="bg-[#002D74] text-white rounded-xl py-2 hover:scale-105 transition-all duration-300">Register</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <Popup
          title="Success"
          message={success}
          status="success"
          onClose={() => setSuccess(null)}
        />
      )}
      {error && (
        <Popup
          title="Error"
          message={error}
          status="error"
          onClose={() => setError(null)}
        />
      )}
    </CardWrapper>
  );
}