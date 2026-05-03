import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import { CheckCircle, XCircle, Loader, Zap } from "lucide-react";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const verify = async () => {
      try {
        const { data } = await api.get(`/auth/verify-email/${token}`);
        setMessage(data.message || "Email verified successfully!");
        setStatus("success");
      } catch (err) {
        setMessage(err.response?.data?.message || "Verification failed or link expired.");
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md animate-fade-in-up text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black mb-6">
          <Zap className="w-6 h-6 text-white" />
        </div>

        <div className="bg-white rounded-xl p-10 border border-gray-200 shadow-sm">
          {status === "loading" && (
            <div className="py-4">
              <Loader className="w-10 h-10 text-gray-900 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying your email…</h2>
              <p className="text-gray-500 text-sm">Please wait a moment</p>
            </div>
          )}

          {status === "success" && (
            <div className="py-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Email Verified! 🎉</h2>
              <p className="text-gray-500 text-sm mb-6">{message}</p>
              <Link
                to="/login"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm w-full"
              >
                Go to Sign in
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="py-4">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h2>
              <p className="text-gray-500 text-sm mb-6">{message}</p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm w-full"
                >
                  Back to Sign in
                </Link>
                <p className="text-xs text-gray-500">
                  Need a new link?{" "}
                  <Link to="/login" className="text-black hover:underline font-medium">
                    Sign in and request again
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
