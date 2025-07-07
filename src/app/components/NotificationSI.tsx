"use client";
import { useEffect } from "react";

export default function NotificationSI({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="
        z-500 flex
        bg-black bg-opacity-50
        fixed inset-0 items-center justify-center
      "
    >
      <div
        className="
          w-96
          p-6
          text-center
          bg-white
          rounded-lg
          shadow-md animate-pulse
        "
      >
        <h2
          className="
            mb-4
            text-2xl font-bold text-blue-600
          "
        >
          Sign-In Successful!
        </h2>
        <p
          className="
            text-gray-700
          "
        >
          Redirecting to homepage...
        </p>
      </div>
    </div>
  );
}
