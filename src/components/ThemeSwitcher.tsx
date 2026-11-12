"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const t = useTranslations("navbar");
  const { theme, setTheme } = useTheme();
  function changeTheme(value: string) {
    setTheme(value);
    document.cookie = `theme=${value};max-age=2592000;path=/`;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {theme === "dark" ? (
          <Moon size={18} />
        ) : theme === "light" ? (
          <Sun size={18} />
        ) : (
          <SunMoon size={18} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          <div className="w-full flex justify-between">
            {t("btn_dark")}
            <Moon size={18} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          <div className="w-full flex justify-between">
            {t("btn_light")}
            <Sun size={18} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("system")}>
          <div className="w-full flex justify-between">
            {t("btn_system")}
            <SunMoon size={18} />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
