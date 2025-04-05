"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedbackTable from "./components/feedback-table";
import { NavBar } from "../components/nav-bar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth-store";
import { fetchProfile } from "@/service/api";
import UserTable from "./components/user-table";

export default function Home() {
  const token = useAuthStore((state) => state.token);

  const router = useRouter();
  useEffect(() => {
    if (token) {
      console.log("Token encontrado:", token);
      fetchProfile(token)
        .then(() => {
          router.push("/internal");
        })
        .catch((error) => {
          router.push("/internal/login");
          console.error("Erro ao carregar o perfil:", error);
        });
    } else {
      router.push("/internal/login");
    }
  }, [token]);

  return (
    <main className="w-full h-full bg-white">
      <NavBar />

      <div className="flex flex-col gap-4 bg-white w-full h-screen pl-4  pt-20">
        <Tabs defaultValue="sugestao">
          <TabsList>
            <TabsTrigger value="sugestao">Sugestões</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          </TabsList>
          <TabsContent
            value="sugestao"
            className="flex flex-col gap-4 bg-white w-full h-screen pl-4 "
          >
            <FeedbackTable />
          </TabsContent>
          <TabsContent value="usuarios">
            <UserTable />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
