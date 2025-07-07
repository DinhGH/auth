"use client";
import { useState } from "react";
import { FaFaceGrinHearts, FaFaceDizzy } from "react-icons/fa6";
import "./authenticated.css";
import Link from "next/link";
import Gicon from "../components/Gicon";
import NotificationSU from "../components/NotificationSU";
import NotificationSI from "../components/NotificationSI";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Authenticated() {
  const [change, setChange] = useState(false);
  const [showPasswordSI, setShowPasswordSI] = useState(false);
  const [showPasswordSU, setShowPasswordSU] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [formDataSignUp, setFormDataSignUp] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [formDataSignIn, setFormDataSignIn] = useState({
    email: "",
    password: "",
  });

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // const [showForgotModal, setShowForgotModal] = useState(false);

  const router = useRouter();

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataSignIn((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataSignUp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const result = await signIn("credentials", {
      redirect: false,
      email: formDataSignIn.email,
      password: formDataSignIn.password,
      callbackUrl: "/",
    });

    if (result?.ok) {
      router.push("/");
    } else {
      setLoginError("Login failed.");
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    const { email, password, repassword } = formDataSignUp;

    if (password !== repassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setFormDataSignUp({ email: "", password: "", repassword: "" });
        setShowRegisterModal(true);
      } else {
        setPasswordError("Email exis.");
      }
    } catch (err) {
      setPasswordError("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div
      className="
        flex
        w-8/10 h-9/10 min-w-7/10 min-h-8/10
        bg-white
        rounded-xl
        relative top-1/2 left-1/2 -translate-1/2
      "
    >
      <div
        className={`
          z-100
          h-full w-1/2
          text-white font-mono
          bg-gradient-to-b from-[#31CF96] to-[#099C6E]
          transition-all
          absolute duration-500 ease-in-out
          ${change ? "left-0" : "left-1/2"}
        `}
      >
        <h1
          className="
            mt-35
            text-center text-4xl font-bold
          "
        >
          {change ? "Join Us Today!" : "Welcome Back!"}
        </h1>
        <p
          className="
            my-5 px-10
            text-2xl text-black
          "
        >
          {change
            ? "Create your account and explore all the great features we’ve prepared for you. Let’s get started!"
            : "Welcome back! We’re so happy to see you again. Let’s continue where you left off!"}
        </p>
        <button
          onClick={() => setChange(!change)}
          className="
            p-4 mt-5
            bg-[#37d4a0]
            rounded-4xl
            relative left-1/2 -translate-x-1/2 hover:bg-[#77c5ac]
          "
        >
          {change ? "Already have account? Sign-In" : "No account? Sign-Up"}
        </button>
      </div>

      <form
        onSubmit={handleSignInSubmit}
        className={`
          w-1/2
          font-mono
          transition-all
          absolute duration-500 ease-in left-0
          ${
            change
              ? "translate-x-full opacity-0 scale-80 z-0 rotate-180"
              : "translate-x-0 opacity-100 scale-100 z-20"
          }
        `}
      >
        <h1
          className="
            mb-14 mt-21
            text-6xl text-center font-bold
          "
        >
          Sign-In
        </h1>
        <div
          className="
            h-full w-7/12
            relative left-1/2 -translate-x-1/2
          "
        >
          <input
            type="email"
            name="email"
            placeholder="Type your email"
            maxLength={40}
            required
            value={formDataSignIn.email}
            onChange={handleSignInChange}
            className="
              w-full
              py-2 px-3 my-3
              text-xl
              bg-[#EFEFEF]
              rounded-md
              focus:bg-emerald-400 focus:text-white outline-0
            "
          />
          <div
            className="
              relative
            "
          >
            <input
              type={showPasswordSI ? "text" : "password"}
              name="password"
              placeholder="Type your password"
              maxLength={15}
              value={formDataSignIn.password}
              onChange={handleSignInChange}
              required
              className="
                w-full
                py-2 px-3 my-3
                text-xl
                bg-[#EFEFEF]
                rounded-md
                focus:bg-emerald-400 focus:text-white outline-0
              "
            />
            {showPasswordSI ? (
              <FaFaceGrinHearts
                onClick={() => setShowPasswordSI(false)}
                className="
                  text-emerald-600
                  cursor-pointer
                  absolute top-1/2 right-4 -translate-y-1/2
                "
              />
            ) : (
              <FaFaceDizzy
                onClick={() => setShowPasswordSI(true)}
                className="
                  text-emerald-600
                  cursor-pointer
                  absolute top-1/2 right-4 -translate-y-1/2
                "
              />
            )}
          </div>

          <div
            className="
              flex
              mt-1
              text-sm
              justify-between
            "
          >
            <div>
              {loginError && (
                <p
                  className="
                    mt-1
                    text-red-700 text-sm
                  "
                >
                  {loginError}
                </p>
              )}
            </div>
            <Link href="/forgotpassword">
              <button
                className="
                  hover:text-emerald-700 hover:underline
                "
              >
                Forgot password?
              </button>
            </Link>
          </div>
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
            Sign-In
          </button>
        </div>
        <Gicon />
      </form>

      <form
        onSubmit={handleSignUpSubmit}
        className={`
          w-1/2
          font-mono
          transition-all
          absolute duration-500 ease-in left-1/2
          ${
            change
              ? "translate-x-0 opacity-100 scale-100 z-20"
              : "-translate-x-full opacity-0 scale-80 z-0 -rotate-180"
          }
        `}
      >
        <h1
          className="
            mb-12 mt-18
            text-6xl text-center font-bold
          "
        >
          Sign-Up
        </h1>
        <div
          className="
            h-full w-7/12
            relative left-1/2 -translate-x-1/2
          "
        >
          <input
            type="email"
            name="email"
            placeholder="Type your email"
            maxLength={40}
            required
            value={formDataSignUp.email}
            onChange={handleSignUpChange}
            className="
              w-full
              py-2 px-3 my-3
              text-xl
              bg-[#EFEFEF]
              rounded-md
              focus:bg-emerald-400 focus:text-white outline-0
            "
          />
          <div
            className="
              relative
            "
          >
            <input
              type={showPasswordSU ? "text" : "password"}
              name="password"
              placeholder="Type your password"
              maxLength={15}
              required
              value={formDataSignUp.password}
              onChange={handleSignUpChange}
              className="
                w-full
                py-2 px-3 my-3
                text-xl
                bg-[#EFEFEF]
                rounded-md
                focus:bg-emerald-400 focus:text-white outline-0
              "
            />
            {showPasswordSU ? (
              <FaFaceGrinHearts
                onClick={() => setShowPasswordSU(false)}
                className="
                  text-emerald-600
                  cursor-pointer
                  absolute top-1/2 right-4 -translate-y-1/2
                "
              />
            ) : (
              <FaFaceDizzy
                onClick={() => setShowPasswordSU(true)}
                className="
                  text-emerald-600
                  cursor-pointer
                  absolute top-1/2 right-4 -translate-y-1/2
                "
              />
            )}
          </div>
          <div
            className="
              relative
            "
          >
            <input
              type={showRePassword ? "text" : "password"}
              name="repassword"
              placeholder="Re-type your password"
              maxLength={15}
              value={formDataSignUp.repassword}
              required
              onChange={handleSignUpChange}
              className="
                w-full
                py-2 px-3 my-3
                text-xl
                bg-[#EFEFEF]
                rounded-md
                focus:bg-emerald-400 focus:text-white outline-0
              "
            />
            {showRePassword ? (
              <FaFaceGrinHearts
                onClick={() => setShowRePassword(false)}
                className="
                  text-emerald-600
                  cursor-pointer
                  absolute top-1/2 right-4 -translate-y-1/2
                "
              />
            ) : (
              <FaFaceDizzy
                onClick={() => setShowRePassword(true)}
                className="
                  text-emerald-600
                  cursor-pointer
                  absolute top-1/2 right-4 -translate-y-1/2
                "
              />
            )}
          </div>
          {passwordError && (
            <p
              className="
                mt-1
                text-red-500 text-sm
              "
            >
              {passwordError}
            </p>
          )}
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
            Sign-Up
          </button>
        </div>
        <Gicon />
      </form>

      {showRegisterModal && (
        <NotificationSU onClose={() => setShowRegisterModal(false)} />
      )}

      {showLoginModal && (
        <NotificationSI
          onDone={() => {
            setShowLoginModal(false);
          }}
        />
      )}
      {/* {showForgotModal && <ForgotPassword />} */}
    </div>
  );
}
