import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import { Mail, Zap, ArrowLeft, Send } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setSent(true);
      toast.success(data.message || "Reset link sent!");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Forgot password?</h1>
          <p className="text-gray-500 text-sm">We&apos;ll send a reset link to your email</p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                <Mail className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Check your inbox</h2>
              <p className="text-gray-500 text-sm mb-6">
                We sent a password reset link to <strong className="text-gray-900 font-medium">{email}</strong>
              </p>
              <Link to="/login" className="text-black hover:underline text-sm font-medium">
                &larr; Back to sign in
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="alert-error mb-5 flex items-start gap-2">
                  <span>⚠️</span> <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="you@example.com"
                      required
                      className="input-field w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm"
                >
                  {loading ? (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </form>

              <div className="text-center mt-6">
                <Link to="/login" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black hover:underline transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
