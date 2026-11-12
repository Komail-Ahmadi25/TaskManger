"use client";
import React, { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { SignInUser } from "@/lib/actions/auth.action";

export default function SignInForm() {
  const [data, func, isPending] = useActionState(SignInUser, {
    state: false,
    message: "",
    user: null,
    token: null,
  });
  const t = useTranslations("signup");
  if (data.token) {
    document.cookie = `auth_token=${data.token};max-age:2956000;path=/`;
  }
  return (
    <form action={func} className="grid gap-4">
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
