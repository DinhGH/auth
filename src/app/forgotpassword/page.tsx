"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        router.push("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [router]);

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStep("otp");
        setMessage("Verification code sent to your email.");
      } else {
        setError("Failed to send verification code.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        setStep("reset");
        setMessage("OTP verified. You can now reset your password.");
      } else {
        setError("Invalid verification code.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });

      if (res.ok) {
        setMessage("Password reset successfully. You can now login.");
        setStep("email");
        setEmail("");
        setOtp("");
        setPassword("");
        setConfirm("");
      } else {
        setError("Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div
      ref={boxRef}
      className="
        z-1000
        w-full max-w-md
        mx-auto p-6
        bg-white
        rounded-xl
        shadow-md
        relative top-1/2 -translate-y-1/2
      "
    >
      <h2
        className="
          mb-4
          text-2xl font-bold text-center
        "
      >
        Reset Password
      </h2>

      {message && (
        <p
          className="
            mb-2
            text-green-600
          "
        >
          {message}
        </p>
      )}
      {error && (
        <p
          className="
            mb-2
            text-red-600
          "
        >
          {error}
        </p>
      )}

      {step === "email" && (
        <form onSubmit={sendOtp}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="
              w-full
              p-2 mb-4
              border border-gray-300
              rounded
            "
          />
          <button
            type="submit"
            className="
              w-full
              py-2 mx-auto my-4
              font-semibold text-xl text-white
              bg-[#059669]
              rounded-md
              hover:bg-[#EFEFEF] hover:text-black active:translate-y-0.5 active:bg-[#059669] active:text-white
            "
          >
            Send OTP
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={verifyOtp}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter verification code"
            className="
              w-full
              p-2 mb-4
              border border-gray-300
              rounded
            "
          />
          <button
            type="submit"
            className="
              w-full
              py-2
              text-white
              bg-green-600
              rounded hover:bg-green-700
            "
          >
            Verify Code
          </button>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={resetPassword}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="New password"
            className="
              w-full
              p-2 mb-4
              border border-gray-300
              rounded
            "
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            placeholder="Confirm password"
            className="
              w-full
              p-2 mb-4
              border border-gray-300
              rounded
            "
          />
          <button
            type="submit"
            className="
              w-full
              py-2 mx-auto my-4
              font-semibold text-xl text-white
              bg-[#059669]
              rounded-md
              hover:bg-[#EFEFEF] hover:text-black active:translate-y-0.5 active:bg-[#059669] active:text-white
            "
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
