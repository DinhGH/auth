import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otpMap from "@/lib/otp-store";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpMap.set(email, code);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your password",
    text: `Your verification code is: ${code}`,
  });

  return NextResponse.json({ message: "OTP sent successfully" });
}
