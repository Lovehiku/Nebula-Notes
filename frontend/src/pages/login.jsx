import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      if (onLogin) onLogin();
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6A1B9A] via-[#7B1FA2] to-[#9C27B0] px-4 overflow-x-hidden">
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

        {/* LEFT PANEL */}
        <div className="relative md:w-[55%] w-full min-h-[320px] md:min-h-[520px] bg-gradient-to-br from-[#6A1B9A] to-[#8E24AA] overflow-hidden">

          {/* Decorative dots */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            <span className="absolute top-10 left-10 w-3 h-3 bg-white rounded-full opacity-70" />
            <span className="absolute top-32 left-24 w-2 h-2 bg-white rounded-full opacity-50" />
            <span className="absolute top-20 left-52 w-2 h-2 bg-white rounded-full opacity-40" />
          </div>

          {/* Text */}
          <div className="absolute top-12 left-8 right-8 z-10">
            <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-[#FDE68A] via-[#F0ABFC] to-[#93C5FD] bg-clip-text text-transparent drop-shadow-sm">
              Nebula Notes
            </h2>
            <p className="text-sm mt-2 text-white/85">
              Organize your ideas beautifully.
            </p>
          </div>

          {/* Cloud bottom */}
          <div className="absolute bottom-0 left-0 w-full h-[35%] sm:h-[45%]">
            <div className="absolute bottom-0 w-full h-24 bg-white rounded-t-[120px]" />
            <div className="absolute bottom-20 left-24 w-24 h-24 bg-white rounded-full opacity-90" />
            <div className="absolute bottom-12 left-56 w-16 h-16 bg-white rounded-full opacity-80" />
            <div className="absolute bottom-20 left-80 w-20 h-20 bg-white rounded-full opacity-70" />
          </div>

          {/* Rocket */}
          <div className="absolute bottom-36 left-8 w-28 h-14 bg-white rounded-full rotate-12 shadow-md hidden sm:block">
            <span className="absolute left-4 top-3 w-4 h-4 bg-pink-500 rounded-full" />
            <span className="absolute right-3 top-5 w-16 h-3 bg-purple-200 rounded-full" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:w-[45%] w-full flex items-center justify-center p-8 min-h-[320px] md:min-h-[520px]">
          <div className="w-full max-w-[340px]">
            <p className="text-sm text-gray-400 mb-4">USER LOGIN</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Username"
                  className="w-full max-w-full h-10 rounded-full bg-[#E7DAF5] px-10 text-gray-700 placeholder-gray-500 focus:outline-none overflow-hidden"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2">👤</span>
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full max-w-full h-10 rounded-full bg-[#E7DAF5] px-10 text-gray-700 placeholder-gray-500 focus:outline-none overflow-hidden"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2">🔒</span>
              </div>

              <button
                type="submit"
                className="w-full h-9 rounded-full bg-gradient-to-r from-[#6D2AA0] via-[#8E24AA] to-[#9C27B0] text-white hover:opacity-90 transition"
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-[#6D2AA0]">
              <Link to="/signup" className="hover:underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
