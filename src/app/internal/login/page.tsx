"use client";

import { FalaCooperadoTitle } from "@/app/components/fala-cooperado-title";
import { LoginForm } from "./components/login-form";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-4 w-full h-full items-center justify-items-center align-middle justify-center">
        <div className="text-4xl font-bold text-center flex flex-col items-center text-white">
          <img src="/sicoob-icon.svg" className="w-20" />
          <FalaCooperadoTitle iconsize={32} />
        </div>
        <LoginForm />
      </main>
    </>
  );
}
