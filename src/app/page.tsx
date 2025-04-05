"use client";

import { SearchIcon } from "lucide-react";
import { NavBar } from "./components/nav-bar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center  justify-center  w-full h-full ">
        <main className="flex flex-col gap-12 justify-center w-fit p-6 h-fit items-center  rounded-2xl bg-white  space-beetwen">
          <div className="flex flex-col gap-4 items-center">
            <img src="/sicoob-icon.svg" className="w-24" />
            <div className="text-center text-black">
              <h1 className="text-4xl font-bold">
                Seja bem-vindo ao Fala Cooperado!
              </h1>
            </div>
          </div>
          <div className="p-4 w-4xl">
            <p className="text-1xl text">
              O Fala Cooperado! é uma ferramenta de comunicação desenvolvida
              para fortalecer o relacionamento entre Cooperados e Delegados da
              nossa Cooperativa.
              <br />
              Com ela, damos um passo importante em direção a uma gestão ainda
              mais participativa, transparente e próxima de quem realmente
              importa: <span className="text-teal-500">Você, Cooperado</span>.
              <br />
              Através da plataforma, é possível enviar sugestões, dúvidas e
              demandas diretamente aos seus representantes, de forma simples,
              segura e eficiente. Nosso objetivo é promover o diálogo, ampliar a
              representatividade e garantir que a voz dos Cooperados seja ouvida
              e considerada nas decisões que constroem o futuro da nossa
              Cooperativa.
            </p>
          </div>
          <div className="w-fit self-center gap-4 flex">
            <Link
              href="/feedback"
              className="h-12 p-2 rounded rounded-1xl text-white bg-teal-500 font-bold hover:bg-teal-700 text-2xl"
            >
              Quero dar minha sugestão!
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
