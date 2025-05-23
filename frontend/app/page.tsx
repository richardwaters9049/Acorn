// frontend/app/page.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) formData.append("file", file);

    const res = await fetch("http://localhost:8000/claims", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
    setName("");
    setDescription("");
    setFile(null);
  };

  return (
    <main className="main-container w-full h-screen flex flex-col items-center justify-center">
      <section className="max-w-xl mx-auto p-6 rounded-2xl shadow-md flex flex-col justify-center items-center gap-8">
        <h2 className="text-2xl font-semibold text-center">Submit a New Claim</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            placeholder="Brief description of your claim"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />
          <Button type="submit" className="w-full hover:cursor-pointer">Submit Claim</Button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 font-medium text-center">{message}</p>
        )}
      </section>
    </main>
  );
}