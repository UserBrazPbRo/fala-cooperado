"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuthStore from "@/store/auth-store";
import api, { fetchProfile } from "@/service/api";
import { useRouter } from "next/navigation";
import {
  Loader2Icon,
  Pencil,
  TableColumnsSplitIcon,
  Trash,
  Plus,
} from "lucide-react";
import { UserModal } from "./user-modal";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "./delete-modal";
import useUserStore from "@/store/user-store";
import { toast } from "react-toastify";
import { InsertUserModal } from "./insert-user-modal";

export interface User {
  id: number;
  login: string;
  description: string;
  password: string;
  type: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = useAuthStore((state) => state.token);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!token) return;
      getUser();
    };
    fetchFeedbacks();
  }, [token]);

  async function getUser() {
    try {
      setIsLoading(true);
      const response = await api.get<User[]>("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete(id: number) {
    console.log("Deletando usuário com ID:", id);
    console.log("SEssao :", user);
    if (user?.sub === id) {
      toast.error("Você não pode deletar a si mesmo");
      return;
    }
    try {
      setIsLoading(true);
      await api.delete<User[]>(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getUser();
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <main className="flex flex-col gap-4 w-full h-full items-center justify-center">
        <div className="flex w-full h-full items-center align-middle justify-center bg-white">
          <Loader2Icon className="animate-spin" /> Loading...
        </div>
      </main>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <InsertUserModal onUserInserted={getUser} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">#</TableHead>
            <TableHead className="font-bold">Login</TableHead>
            <TableHead className="font-bold">Tipo</TableHead>
            <TableHead className="font-bold">PA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.login}</TableCell>

              <TableCell>{user.type || ""}</TableCell>
              <TableCell>{user.description || ""}</TableCell>
              <TableCell className="flex gap-2">
                {/* <UserModal user={user}>
                  <button>
                    <span className="sr-only">Edit user</span>
                    <Pencil size={20} />
                  </button>
                </UserModal> */}
                <DeleteModal
                  title={
                    <p className="text-lg ">
                      Tem certeza que deseja deletar o usuário
                      <span className="font-bold">"{user.login}"</span>?
                    </p>
                  }
                  body={UserDelete({
                    onClick: () => onDelete(user.id),
                  })}
                >
                  <button>
                    <Trash size={20} />
                  </button>
                </DeleteModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              {users.length === 0 && "Não foram encontradas sugestões..."}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

function UserDelete({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end w-full gap-4">
      <Button
        onClick={onClick}
        className="bg-red-600 self-end hover:bg-red-800 w-full font-bold"
      >
        Deletar
      </Button>
    </div>
  );
}

export default UserTable;
