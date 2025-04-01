"use client";

import { FeedbackForm } from "./components/form";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 w-full h-full items-center justify-items-center align-middle justify-center">
      <h1 className="text-5xl text-center font-semibold text-white">
        FALA COOPERADO!
      </h1>
      <FeedbackForm />
    </main>
  );
}
