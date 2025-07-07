import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import otpMap from "@/lib/otp-store"; // Để xoá OTP sau khi reset

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and new password are required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.user.update({
    where: { email },
    data: { password }, // Không hash theo yêu cầu
  });

  otpMap.delete(email); // Xoá sau khi dùng xong

  return NextResponse.json({ message: "Password reset successfully" });
}
