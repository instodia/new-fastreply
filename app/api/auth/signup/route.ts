import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { hashPassword } from "@/lib/auth-passwords";
import { ensureWorkspaceForUser } from "@/lib/workspace";
import { isEmailAllowedToSignIn } from "@/lib/env";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { email, password, name } = result.data;

    if (!isEmailAllowedToSignIn(email)) {
      return NextResponse.json(
        { error: "This email domain or address is not permitted to sign up." },
        { status: 403 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.passwordHash) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    let user;
    if (existingUser) {
      // User existed without a password, link the password
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          passwordHash,
          name: name || existingUser.name || email.split("@")[0],
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          passwordHash,
        },
      });
    }

    await ensureWorkspaceForUser(user.id, user.email);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error("[Signup] Error creating account:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating your account. Please try again." },
      { status: 500 }
    );
  }
}
