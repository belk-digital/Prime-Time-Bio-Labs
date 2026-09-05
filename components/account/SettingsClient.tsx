"use client";

import React, { useState, useTransition } from "react";
import { Save, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { updateProfile, updatePassword } from "@/app/account/settings/actions";

interface SettingsUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsMarketing: boolean;
  orderSmsUpdates: boolean;
  authProvider: string;
}

const inputClass =
  "w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors";
const labelClass =
  "block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex bg-white/5 border border-white/10 rounded-full p-1 shrink-0">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
          checked ? "bg-indigo-600 text-white" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        On
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
          !checked ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        Off
      </button>
    </div>
  );
}

export function SettingsClient({ user }: { user: SettingsUser }) {
  const [isPending, startTransition] = useTransition();
  const [acceptsMarketing, setAcceptsMarketing] = useState(user.acceptsMarketing);
  const [orderSmsUpdates, setOrderSmsUpdates] = useState(user.orderSmsUpdates);
  const [profileMessage, setProfileMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordPending, startPasswordTransition] = useTransition();
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function handleProfileSubmit(formData: FormData) {
    if (acceptsMarketing) formData.set("acceptsMarketing", "on");
    else formData.delete("acceptsMarketing");
    if (orderSmsUpdates) formData.set("orderSmsUpdates", "on");
    else formData.delete("orderSmsUpdates");

    startTransition(async () => {
      const result = await updateProfile(formData);
      if (!result.success) {
        setProfileMessage({ type: "error", text: result.error });
        return;
      }
      setProfileMessage({ type: "success", text: "Profile updated successfully." });
    });
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    startPasswordTransition(async () => {
      const result = await updatePassword(currentPassword, newPassword);
      if (!result.success) {
        setPasswordMessage({ type: "error", text: result.error });
        return;
      }
      setPasswordMessage({ type: "success", text: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    });
  }

  return (
    <div className="flex flex-col gap-10 max-w-3xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl md:text-5xl font-michroma uppercase font-bold tracking-wider text-white">
          Settings
        </h1>
        <p className="text-gray-400 mt-3 max-w-lg text-sm font-light">
          Update your personal information, notification preferences, and
          account security.
        </p>
      </div>

      {/* Personal Information */}
      <section className="flex flex-col gap-5">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-3">
          Personal Information
        </h2>

        <form action={handleProfileSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>First Name</label>
              <input name="firstName" defaultValue={user.firstName} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input name="lastName" defaultValue={user.lastName} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Email</label>
              <input value={user.email} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Phone</label>
              <input name="phone" type="tel" defaultValue={user.phone} className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white">Marketing emails</p>
                <p className="text-xs text-gray-500">Receive news and promotions.</p>
              </div>
              <Toggle checked={acceptsMarketing} onChange={setAcceptsMarketing} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white">Order SMS updates</p>
                <p className="text-xs text-gray-500">Get text alerts about your order status.</p>
              </div>
              <Toggle checked={orderSmsUpdates} onChange={setOrderSmsUpdates} />
            </div>
          </div>

          {profileMessage && (
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm border ${
                profileMessage.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              }`}
            >
              {profileMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              {profileMessage.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-fit flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <Save className="w-4 h-4" />
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>

      {/* Security */}
      {user.authProvider !== "google" && (
        <section className="flex flex-col gap-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-3">
            Password
          </h2>

          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className={inputClass}
                />
              </div>
            </div>

            {passwordMessage && (
              <div
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm border ${
                  passwordMessage.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-red-500/10 border-red-500/30 text-red-300"
                }`}
              >
                {passwordMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                {passwordMessage.text}
              </div>
            )}

            <button
              type="submit"
              disabled={passwordPending}
              className="w-fit flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <Lock className="w-4 h-4" />
              {passwordPending ? "Updating..." : "Update Password"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
