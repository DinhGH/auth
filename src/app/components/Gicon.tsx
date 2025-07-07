import { signIn } from "next-auth/react";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function Gicon() {
  return (
    <div
      className="
        w-7/10
        relative left-1/2 -translate-x-1/2
      "
    >
      <div
        className="
          flex
          text-gray-500
          items-center gap-2
        "
      >
        <div
          className="
            flex-grow
            border-t border-gray-400
          "
        ></div>
        <span
          className="
            text-xs tracking-widest text-gray-400
            uppercase
          "
        >
          or
        </span>
        <div
          className="
            flex-grow
            border-t border-gray-400
          "
        ></div>
      </div>
      <div
        className="
          flex
          text-emerald-700
          justify-center
        "
      >
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <FaGoogle
            className="
              m-4
              text-3xl
              hover:scale-110
            "
          />
        </button>
        <button
          type="button"
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
        >
          <FaFacebook
            className="
              m-4
              text-3xl
              hover:scale-110
            "
          />
        </button>
      </div>
    </div>
  );
}
