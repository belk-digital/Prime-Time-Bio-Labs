"use client";

import React, { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Plus, Edit2, Trash2, X } from "lucide-react";
import { addAddress, updateAddress, deleteAddress } from "@/app/account/addresses/actions";

export interface AddressItem {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  company?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const inputClass =
  "w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors";
const labelClass =
  "block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2";

export function AddressesClient({ addresses }: { addresses: AddressItem[] }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const editingAddress = editingId ? addresses.find((a) => a.id === editingId) : null;

  function openForNew() {
    setEditingId(null);
    setFormOpen(true);
    setMessage(null);
  }

  function openForEdit(id: string) {
    setEditingId(id);
    setFormOpen(true);
    setMessage(null);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = editingId
        ? await updateAddress(editingId, formData)
        : await addAddress(formData);

      if (!result.success) {
        setMessage({ type: "error", text: result.error });
        return;
      }
      setMessage({ type: "success", text: editingId ? "Address updated." : "Address added." });
      closeForm();
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteAddress(id);
      if (!result.success) {
        setMessage({ type: "error", text: result.error });
        return;
      }
      setMessage({ type: "success", text: "Address deleted." });
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-michroma uppercase font-bold tracking-wider text-white">
            Addresses
          </h1>
          <p className="text-gray-400 mt-3 max-w-lg text-sm font-light">
            Manage the shipping and billing addresses on your account.
          </p>
        </div>
        <button
          onClick={openForNew}
          className="w-fit flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-xl text-sm border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <form
              action={handleSubmit}
              key={editingId || "new"}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-michroma uppercase tracking-wider text-white">
                  {editingId ? "Edit Address" : "New Address"}
                </h2>
                <button
                  type="button"
                  onClick={closeForm}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input name="firstName" required defaultValue={editingAddress?.firstName} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input name="lastName" required defaultValue={editingAddress?.lastName} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Company (optional)</label>
                  <input name="company" defaultValue={editingAddress?.company} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Street Address</label>
                  <input name="line1" required defaultValue={editingAddress?.line1} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Apartment, suite, etc. (optional)</label>
                  <input name="line2" defaultValue={editingAddress?.line2} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input name="city" required defaultValue={editingAddress?.city} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <input name="state" required defaultValue={editingAddress?.state} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Postal Code</label>
                  <input name="postalCode" required defaultValue={editingAddress?.postalCode} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <input name="country" required defaultValue={editingAddress?.country || "US"} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Phone</label>
                  <input name="phone" type="tel" required defaultValue={editingAddress?.phone} className={inputClass} />
                </div>
                <input type="hidden" name="label" defaultValue={editingAddress?.label} />
                <div className="sm:col-span-2 flex items-center gap-3 pt-2 border-t border-white/10">
                  <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    defaultChecked={editingAddress?.isDefault}
                    className="w-4 h-4 rounded bg-white/5 border-white/20 accent-indigo-500"
                  />
                  <label htmlFor="isDefault" className="text-sm text-gray-300">
                    Set as default address
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  {isPending ? "Saving..." : "Save Address"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {addresses.length > 0 ? (
        <div className="flex flex-col divide-y divide-white/5">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="group flex flex-col md:flex-row md:items-start justify-between py-6 gap-4"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-sm text-gray-400 leading-relaxed">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white font-medium">
                      {address.firstName} {address.lastName}
                    </span>
                    {address.isDefault && (
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  {address.company && <span>{address.company}</span>}
                  <span>{address.line1}</span>
                  {address.line2 && <span>{address.line2}</span>}
                  <span>
                    {address.city}, {address.state} {address.postalCode}
                  </span>
                  <span>{address.country}</span>
                  <span className="text-gray-500 mt-2">{address.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <button
                  disabled={isPending}
                  onClick={() => openForEdit(address.id)}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  disabled={isPending}
                  onClick={() => handleDelete(address.id)}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400/80 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-white/[0.02] border border-white/10 rounded-2xl">
          <MapPin className="w-10 h-10 text-gray-600 mb-5" strokeWidth={1} />
          <h2 className="text-xl font-michroma uppercase tracking-wider text-white mb-2">
            No addresses yet
          </h2>
          <p className="text-gray-500 font-light max-w-sm text-sm">
            Add a shipping or billing address to speed up checkout next time.
          </p>
        </div>
      )}
    </div>
  );
}
