import useAuthStore from "@/store/auth-store";
import { LogIn, LogOut, SearchIcon } from "lucide-react";
import { FalaCooperadoTitle } from "./fala-cooperado-title";
import Link from "next/link";

function NavBar() {
  const token = useAuthStore((state) => state.token);
  return (
    <nav className="absolute w-full h-16 flex items-center justify-between bg-teal-950 text-white p-4 ">
      <div className="text-2xl gap-2 flex">
        <FalaCooperadoTitle />
      </div>

      <ol className="flex gap-4">
        <li>
          <Link
            className="flex gap-2 font-semibold  hover:text-gray-300"
            href="/feedback/search"
          >
            <SearchIcon /> Pesquisar minha sugestão
          </Link>
        </li>
        {token ? (
          <li
            className="flex gap-2 font-semibold hover:text-gray-300"
            onClick={() => useAuthStore.setState({ token: null })}
          >
            Sair <LogOut />
          </li>
        ) : (
          <li>
            <Link
              className="flex gap-2 font-semibold hover:text-gray-300"
              href="/internal/login"
            >
              Entrar <LogIn />
            </Link>
          </li>
        )}
      </ol>
    </nav>
  );
}

export { NavBar };
