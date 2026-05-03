import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import {
  Shield, Users, Trash2, Loader, AlertTriangle,
  CheckCircle, XCircle, UserCheck, UserX
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/admin/dashboard");
      setUsers(data.users || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user.");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Verified",
      value: users.filter((u) => u.isEmailVerified).length,
      icon: UserCheck,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Unverified",
      value: users.filter((u) => !u.isEmailVerified).length,
      icon: UserX,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Admin Panel</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">User Management</h1>
            <p className="text-gray-500 text-sm mt-1">
              Signed in as <strong className="text-gray-900">{user?.name}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
            </div>
            <p className={`text-2xl font-bold text-gray-900`}>{loading ? "—" : value}</p>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-widest">All users</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader className="w-7 h-7 text-black animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Users className="w-10 h-10 mb-3 text-gray-300" />
            <p className="text-sm">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 text-xs font-bold shrink-0">
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-gray-500 truncate max-w-[200px]">{u.email}</td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        u.role === "admin"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    {/* Verified */}
                    <td className="px-6 py-4">
                      {u.isEmailVerified ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-yellow-600 font-medium">
                          <XCircle className="w-3.5 h-3.5" /> Unverified
                        </span>
                      )}
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric"
                      })}
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-4 text-right">
                      {u._id === user?.id ? (
                        <span className="text-xs text-gray-400 font-medium">(You)</span>
                      ) : confirmId === u._id ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-red-600 flex items-center gap-1 font-medium">
                            <AlertTriangle className="w-3 h-3" /> Sure?
                          </span>
                          <button
                            onClick={() => handleDelete(u._id)}
                            disabled={deletingId === u._id}
                            className="px-3 py-1.5 rounded-md bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            {deletingId === u._id ? (
                              <Loader className="w-3 h-3 animate-spin" />
                            ) : "Delete"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-3 py-1.5 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(u._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 border border-transparent transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
