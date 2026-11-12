import { Button } from "./ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Suspense } from "react";
import { LogIn, LogOut, Settings } from "lucide-react";
import LogOutBtn from "./logout-btn";
import Link from "next/link";

export default async function Navbar() {
  const t = await getTranslations("navbar");
  const cookieInfo = await cookies();
  const token = cookieInfo.get("auth_token")?.value;
  if (!token)
    return (
      <nav className="w-full px-8 py-4 flex border-b border-b-gray-500 dark:border-b-gray-200 justify-between items-center">
        <div>
          <h1 className="border-none">{t("logo")}</h1>
        </div>
        <div className="flex gap-6">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Button>
            <Link href="/signin" className="flex justify-between items-center">
              {t("btn_login")}
            </Link>
          </Button>
        </div>
      </nav>
    );
  const response = await fetch("http://localhost:8000/api/user", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const user = await response.json();
  return (
    <nav className="w-full px-8 py-4 flex border-b border-b-gray-500 dark:border-b-gray-200 justify-between items-center">
      <div>
        <h1 className="border-none">{t("logo")}</h1>
      </div>
      <div className="flex gap-6">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Suspense fallback={<p>loading...</p>}>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex text-xs justify-center items-center">
                  <span className="mx-1">{user.email}</span>
                  <div className="bg-gray-400 w-fit px-2 py-1 text-white rounded-full">
                    <span>{user.name.slice(0, 1).toUpperCase()}</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <LogOutBtn text={t("logout")} />
                <DropdownMenuItem className="flex justify-between items-center">
                  {t("settings")} <Settings size={18} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </Suspense>
      </div>
    </nav>
  );
}
