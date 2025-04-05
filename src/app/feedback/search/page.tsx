"use client";

import { NavBar } from "@/app/components/nav-bar";
import { SearchFeedback } from "./components/search-feedback";
import { FalaCooperadoTitle } from "@/app/components/fala-cooperado-title";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col gap-4 w-full h-full items-center justify-items-center align-middle justify-center">
        <div className="text-4xl font-bold text-center flex flex-col items-center text-white">
          <img src="/sicoob-icon.svg" className="w-20" />
          <FalaCooperadoTitle iconsize={32} />
        </div>
        <SearchFeedback />
      </main>
    </>
  );
}
