"use client";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Logout } from "@/lib/actions/auth.action";

function LogOutBtn({ text }: { text: string }) {
  async function handleLogout() {
    await Logout();
  }
  return (
    <DropdownMenuItem
      className="flex justify-between items-center"
      onClick={handleLogout}
    >
      {text} <LogOut size={18} />
    </DropdownMenuItem>
  );
}

export default LogOutBtn;
