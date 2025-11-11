"use client";

import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {ROUTES} from "@/app/share/route";
import Link from "next/link";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sign Up with:", name, email, password);
      // TODO: Replace with actual API call
      setTimeout(() => {
        setLoading(false);
        alert("Sign Up successful!");
      }, 1500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google SignIn");
    alert("Google Sign-In clicked");
  };

  const handleGithubSignIn = () => {
    console.log("GitHub SignIn");
    alert("GitHub Sign-In clicked");
  };

  return (
    <div id="signup" className="min-h-screen flex items-center justify-center bg-[#111827] p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7C3AED] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#7C3AED] opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Glass morphism card */}
        <div className="bg-[#1b2130] backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20">
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent mb-2">
              Sign Up
            </h1>
          </div>

          {/* Social Sign In */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-xl hover:border-[#7C3AED] hover:shadow-lg transition-all group disabled:opacity-50"
            >
              <FcGoogle className="mr-3 h-5 w-5" />
              <span className="font-medium text-gray-700 group-hover:text-[#7C3AED]">Continue with Google</span>
            </button>

            <button
              onClick={handleGithubSignIn}
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
              <span className="bg-[#1b2130] px-3 text-gray-500 font-medium">Or continue with email</span>
            </div>
          </div>

          {/* Email Sign Up Form */}
          <div className="space-y-4">
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-all"
            />

            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-all"
            />

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-all"
            />

            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:from-purple-700 hover:to-purple-700 text-white font-semibold rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="mr-2 h-5 w-5 animate-spin" />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-white">
              Already have an account?
              <Link href={ROUTES.SIGNIN} className="text-[#7C3AED] hover:text-purple-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
