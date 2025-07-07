"use client";

import { signOut, useSession } from "next-auth/react";
import Authenticated from "./authenticated/page";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Authenticated />;
  }

  return (
    <>
      <p
        className="
          mt-4
          text-center
        "
      >
        👋 Chào, {session.user?.email}
      </p>

      <div
        className="
          flex
          mt-4
          justify-center
        "
      >
        <button
          onClick={() => signOut({ callbackUrl: "/authenticated" })}
          className="
            px-4 py-2
            text-white
            bg-red-600
            rounded hover:bg-red-700
          "
        >
          Đăng xuất
        </button>
      </div>

      <div
        className="
          flex
          h-screen
          text-4xl font-bold
          justify-center items-center
        "
      >
        Welcome to the Home Page!
      </div>
    </>
  );
}
