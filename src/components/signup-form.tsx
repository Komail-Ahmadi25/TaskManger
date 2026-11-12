"use client";
import React, { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { RegisterUser } from "@/lib/actions/auth.action";
export default function SignUpForm() {
  const [data, func, isPending] = useActionState(RegisterUser, {
    state: false,
    message: "",
  });
  const t = useTranslations("signup");
  return (
    <form action={func} className="grid gap-4">
      <div className="grid gap-1">
        <Label htmlFor="username">{t("label.name")}</Label>
        <Input
          id="username"
          type="text"
          placeholder={t("label.name")}
          name="username"
        />
        {data.errors?.name && (
          <p className="text-xs text-red-500">{data.errors.name[0]}</p>
        )}
      </div>
      <div className="grid gap-1">
        <Label htmlFor="email">{t("label.email")}</Label>
        <Input
          id="email"
          type="email"
          placeholder={t("label.email")}
          name="email"
        />
        {data.errors?.email && (
          <p className="text-xs text-red-500">{data.errors.email[0]}</p>
        )}
      </div>
      <div className="grid gap-1">
        <Label htmlFor="password">{t("label.password")}</Label>
        <Input
          id="password"
          type="text"
          placeholder={t("label.password")}
          name="password"
        />
        {data.errors?.password && (
          <p className="text-xs text-red-500">{data.errors.password[0]}</p>
        )}
      </div>
      <Button type="submit">{t("label.btn_signup")}</Button>
      {data.message.length > 0 && (
        <p className="text-red-500 text-xs">{data.message}</p>
      )}
    </form>
  );
}
