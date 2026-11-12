import SignUpForm from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function page() {
  const t = useTranslations("signup");
  return (
    <div className="w-full flex p-5 justify-center items-center h-screen">
      <Card className="w-full lg:w-4/12 md:w-6/12">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("descreption")}</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <p className="flex flex-wrap">
            {t("label.already_have_account")}
            <Link className=" underline mx-1 text-blue-600" href="signin">
              {t("label.btn_sign_in")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
