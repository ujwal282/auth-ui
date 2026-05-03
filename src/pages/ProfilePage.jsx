import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { User, Mail, Shield, Calendar, CheckCircle, AlertCircle, Loader } from "lucide-react";

export default function ProfilePage() {
  const { user, getProfile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader className="w-8 h-8 text-black animate-spin" />
      </div>
    );
  }

  const fields = [
    {
      label: "Full name",
      value: user?.name,
      icon: User,
    },
    {
      label: "Email address",
      value: user?.email,
      icon: Mail,
    },
    {
      label: "Account role",
      value: user?.role === "admin" ? "Administrator" : "Standard User",
      icon: Shield,
    },
    {
      label: "Member since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
      icon: Calendar,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="relative flex items-center gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-3xl font-bold border border-gray-200">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            {/* Verified badge */}
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${
                user?.isEmailVerified ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {user?.isEmailVerified ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <AlertCircle className="w-3 h-3 text-white" />
              )}
            </div>
          </div>

          {/* Name & role */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{user?.email}</p>
            <div className="flex items-center gap-2 mt-3">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  user?.role === "admin"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                <Shield className="w-3 h-3" />
                {user?.role === "admin" ? "Admin" : "User"}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  user?.isEmailVerified
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }`}
              >
                {user?.isEmailVerified ? (
                  <><CheckCircle className="w-3 h-3" /> Verified</>
                ) : (
                  <><AlertCircle className="w-3 h-3" /> Unverified</>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info fields */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
        <div className="px-6 py-4 bg-gray-50/50 rounded-t-xl">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Account information</h2>
        </div>
        {fields.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 px-6 py-4">
            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-gray-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-medium mb-0.5">{label}</p>
              <p className="text-sm text-gray-900 font-medium truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* User ID */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">User ID</p>
        <code className="text-xs text-gray-600 font-mono break-all">{user?.id}</code>
      </div>
    </div>
  );
}
