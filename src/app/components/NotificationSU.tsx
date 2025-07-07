"use client";

export default function NotificationSU({ onClose }: { onClose: () => void }) {
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
          shadow-md
        "
      >
        <h2
          className="
            mb-4
            text-2xl font-bold text-green-600
          "
        >
          Registration Successful!
        </h2>
        <p
          className="
            mb-4
            text-gray-700
          "
        >
          Please sign in to continue.
        </p>
        <button
          onClick={onClose}
          className="
            px-4 py-2
            text-white
            bg-emerald-500
            rounded hover:bg-emerald-600
          "
        >
          Got it
        </button>
      </div>
    </div>
  );
}
