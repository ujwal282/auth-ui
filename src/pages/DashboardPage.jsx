import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import {
  LayoutDashboard, ShieldCheck, Clock, Mail,
  User, ArrowRight, RefreshCw, CheckCircle, AlertCircle
} from "lucide-react";

export default function DashboardPage() {
  const { user, getProfile } = useAuth();
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  useEffect(() => {
    getProfile().catch(() => {});
  }, []);

  const handleResend = async () => {
    setResending(true);
    setResendMsg("");
    try {
      const { data } = await api.post("/auth/resend-verification", { email: user.email });
      setResendMsg(data.message || "Verification email sent!");
    } catch (err) {
      setResendMsg(err.response?.data?.message || "Failed to resend.");
    } finally {
      setResending(false);
    }
  };

  const stats = [
    {
      label: "Account Status",
      value: user?.isEmailVerified ? "Verified" : "Unverified",
      icon: user?.isEmailVerified ? CheckCircle : AlertCircle,
      color: user?.isEmailVerified ? "text-green-600" : "text-yellow-600",
      bg: user?.isEmailVerified ? "bg-green-50" : "bg-yellow-50",
    },
    {
      label: "Account Role",
      value: user?.role === "admin" ? "Administrator" : "Standard User",
      icon: ShieldCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Email",
      value: user?.email,
      icon: Mail,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Welcome banner */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <LayoutDashboard className="w-5 h-5 text-gray-400" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Dashboard</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-500 text-sm max-w-lg">
          You&apos;re signed in to your SecureAuth account. Everything looks good.
        </p>
      </div>

      {/* Email not verified banner */}
      {user && !user.isEmailVerified && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-yellow-50 border border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-yellow-800">Email not verified</p>
              <p className="text-sm text-yellow-700 mt-0.5">
                Please verify your email address to access all features.
              </p>
              {resendMsg && <p className="text-sm text-green-700 mt-1 font-medium">{resendMsg}</p>}
            </div>
          </div>
          <button
            onClick={handleResend}
            disabled={resending}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-sm font-medium transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${resending ? "animate-spin" : ""}`} />
            {resending ? "Sending…" : "Resend email"}
          </button>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
            </div>
            <p className={`text-sm font-semibold text-gray-900 truncate`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/profile"
            className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">My Profile</p>
                  <p className="text-xs text-gray-500">View your account details</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
            </div>
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Admin Panel</p>
                    <p className="text-xs text-gray-500">Manage users and settings</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </Link>
          )}

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Session Active</p>
                <p className="text-xs text-gray-500">JWT tokens auto-refresh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
