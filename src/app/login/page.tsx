"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Script from "next/script";

// import { FaYahoo, FaMicrosoft, FaGoogle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isLogged, login } from "@/appwrite/auth.actions";
// import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface LoginFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  // const {isUserLoggedIn,checkLoggedIn} = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>();

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await login(data);
      if (response?.userId) {
        toast.success("Login successful");
        router.push("/home");
        reset();
      } else {
        setError("check your credentials and try again!");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-slate-900">
      <Script
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4817769699396256"
      />
      <div className="mb-4 md:mb-0 md:w-1/2 flex justify-center p-4">
        <Image
          className="h-32 md:h-48"
          src="/se.png"
          alt="Login"
          height={200}
          width={200}
        />
      </div>
      <ToastContainer />
      <div className="w-full md:w-1/2 max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-black"
        >
          <div className="group">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="group">
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            disabled={isSubmitting}
          >
            Login
          </button>
          <p className="text-center mt-3 flex flex-col">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
