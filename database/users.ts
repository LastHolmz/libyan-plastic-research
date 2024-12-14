"use server";

import { checkPassword, encrypt, hashPassword } from "@/lib/auth";
import { setCookie } from "@/lib/cookies";
import prisma from "@/prisma/db";
import { User } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

const createUser = async ({
  email,
  fullName,
  password,
  phoneNumber,
  role,
  verified,
}: Omit<User, "id" | "createdAt" | "updatedAt" | "verifyingCode">) => {
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        phoneNumber,
        role,
        verified,
        password: hashedPassword,
      },
    });
    if (!user) {
      return { message: "فشل انشاء المستخدم" };
    }
    revalidateTag("users");
    return { message: "تم انشاء المستخدم بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل انشاء الحساب" };
  }
};

const login = async ({
  user: { email, password },
}: {
  user: { email: string; password: string };
}) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "لم يتم العثور على حساب بهذا البريد الإلكتروني." }; // "No account found with this email."
    }
    const passwordMatch = await checkPassword(password, user.password ?? "");

    if (!passwordMatch) {
      return { message: "كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى." }; // "Incorrect password. Please try again."
    }

    // Create the session
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const session = await encrypt({
      ...{
        id: user.id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
      },
    });
    // Save the session in a cookie
    setCookie(session, expires);
    revalidateTag("users");
    return { message: "تم تسجيل الدخول بنجاح." }; // "Login successful."
  } catch (error) {
    console.log(error);
    return { message: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقاً." }; // "An error occurred during login. Please try again later."
  }
};

export const getUsers = unstable_cache(
  async ({ fullName }: { fullName?: string }) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          fullName: {
            contains: fullName,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!users) {
        return [];
      }
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  ["users"],
  { tags: ["users"] }
);

export { createUser, login };
