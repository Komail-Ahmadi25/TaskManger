"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z, { email } from "zod";

const RegisterFormSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().min(7, "Email must be at least 7 characters"),
  password: z.string().min(6, "The password must be at least 6 characters"),
});

export async function RegisterUser(_prevState: unknown, formData: FormData) {
  const data = RegisterFormSchema.safeParse({
    name: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!data.success) {
    return {
      state: false,
      message: "Validation errors",
      errors: data.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch("http://localhost:8000/api/new-user", {
      body: JSON.stringify(data.data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
    });
    const resData = await response.json();

    if (!response.ok) {
      return {
        state: false,
        message: resData.data || "Could not register a new user ",
      };
    }
    const cookieInfo = await cookies();
    cookieInfo.set("todo_user_token", resData.data.token);
    return {
      state: true,
      message: "User registered successfully",
    };
  } catch (err) {
    return {
      state: false,
      message: "Server Error",
    };
  }
}

const loginSchema = z.object({
  email: z.string().email("please enter a valid email address"),
  password: z.string().min(6, "the password must be at least 6 chars"),
});
export async function SignInUser(_prevState: unknown, formData: FormData) {
  const data = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!data.success) {
    return {
      state: false,
      user: null,
      token: null,
      message: "Validation errors",
      errors: data.error.flatten().fieldErrors,
    };
  }
  const response = await fetch("http://localhost:8000/api/login", {
    body: JSON.stringify(data.data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    return {
      state: false,
      message: "Server error",
      user: null,
      token: null,
    };
  }

  const resData = await response.json();
  return {
    state: true,
    message: resData.message,
    user: resData.user,
    token: resData.token,
  };
}

export async function Logout() {
  const cookieInfo = await cookies();
  cookieInfo.delete("auth_token");
  redirect("/");
}
