import { NextResponse } from "next/server";
import otpMap from "@/lib/otp-store";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const storedOtp = otpMap.get(email);

  if (!storedOtp || storedOtp !== otp) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  // OTP hợp lệ, chưa xoá vì reset password phía sau cần email
  return NextResponse.json({ message: "OTP verified successfully" });
}
