"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { ROUTES } from "@/app/share/route";

const SignInPage = () => {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameOrEmail || !password) {
      alert("Please enter username/email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://16.171.250.82.sslip.io/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: usernameOrEmail,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error?.message || "Login failed");

      const token = data?.data?.accessToken;
      if (!token) throw new Error("Token not received from backend");

      localStorage.setItem("token", token);
      router.push("/onboarding");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] p-4 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7C3AED] opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#7C3AED] opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#1b2130] backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20">
          <h1 className="text-3xl font-bold text-white text-center mb-2">Login</h1>

          {/* Social login buttons */}
          <div className="space-y-3">
            <button
              onClick={() => alert("Google Sign-In clicked")}
              disabled={loading}
              className="w-full h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-xl hover:border-[#7C3AED] hover:shadow-lg transition-all group disabled:opacity-50"
            >
              <FcGoogle className="mr-3 h-5 w-5" />
              <span className="font-medium text-gray-700 group-hover:text-[#7C3AED]">
                Continue with Google
              </span>
            </button>

            <button
              onClick={() => alert("GitHub Sign-In clicked")}
              disabled={loading}
              className="w-full h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-xl hover:border-[#7C3AED] hover:shadow-lg transition-all group disabled:opacity-50"
            >
              <FaGithub className="mr-3 h-5 w-5" />
              <span className="font-medium text-black">Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1b2130] px-3 text-gray-500 font-medium">
                Or continue with username/email
              </span>
            </div>
          </div>

          {/* Login form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-all"
            />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-all"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:from-purple-700 hover:to-purple-700 text-white font-semibold rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="mr-2 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Sign Up link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <Link
                href={ROUTES.SIGNUP}
                className="text-[#7C3AED] hover:text-purple-700 font-semibold ml-1"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;