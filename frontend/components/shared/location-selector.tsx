"use client";

import React, { useState } from "react";
import { MapPin, ChevronDown, Check, Plus, X } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { useUIStore } from "../../store/uiStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const LocationSelector: React.FC = () => {
  const { user, currentAddress, addresses, setCurrentAddress, addAddress } = useUserStore();
  const { isLocationSelectorOpen, setLocationSelectorOpen } = useUIStore();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLabel, setNewLabel] = useState<"Home" | "Work" | "Other">("Home");
  const [newAddressLine, setNewAddressLine] = useState("");
  const [newCity, setNewCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressLine || !newCity) return;
    
    addAddress({
      label: newLabel,
      addressLine: newAddressLine,
      city: newCity,
    });
    
    setIsAddingNew(false);
    setNewAddressLine("");
    setNewCity("");
  };

  return (
    <>
      <button
        onClick={() => setLocationSelectorOpen(true)}
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-foreground/5 text-sm font-semibold transition-all group shrink-0 text-left max-w-[150px] sm:max-w-xs md:max-w-md cursor-pointer"
        aria-label="Select Delivery Location"
      >
        <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
        <div className="truncate hidden sm:block">
          <span className="text-[10px] text-foreground/50 block font-bold uppercase tracking-wider leading-tight">Deliver to</span>
          <span className="font-extrabold text-foreground group-hover:text-brand-500 transition-colors truncate block text-xs md:text-sm">
            {currentAddress ? `${currentAddress.label} - ${currentAddress.addressLine}` : "Select Location"}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-foreground/40 shrink-0 sm:mt-2.5 group-hover:text-brand-500 transition-colors" />
      </button>

      {/* Modal Dialog */}
      {isLocationSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-card rounded-3xl border border-border p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black tracking-tight text-foreground">Select Delivery Address</h3>
              <button
                onClick={() => {
                  setLocationSelectorOpen(false);
                  setIsAddingNew(false);
                }}
                className="p-1.5 rounded-lg border border-border hover:bg-foreground/5 text-foreground/50 transition-colors cursor-pointer"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isAddingNew ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                  {addresses.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => {
                        setCurrentAddress(addr);
                        setLocationSelectorOpen(false);
                      }}
                      className={`flex items-start justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        currentAddress?.id === addr.id
                          ? "border-brand-500 bg-brand-50/30 dark:bg-brand-950/20"
                          : "border-border hover:border-brand-500/50"
                      }`}
                      type="button"
                    >
                      <div className="flex gap-3">
                        <MapPin className={`w-5 h-5 mt-0.5 ${currentAddress?.id === addr.id ? "text-brand-500" : "text-foreground/40"}`} />
                        <div>
                          <p className="font-extrabold text-sm">{addr.label}</p>
                          <p className="text-xs text-foreground/50 font-semibold mt-0.5 leading-relaxed">{addr.addressLine}, {addr.city}</p>
                        </div>
                      </div>
                      {currentAddress?.id === addr.id && (
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-1" />
                      )}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsAddingNew(true)}
                  className="w-full flex items-center justify-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" /> Add New Address
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Address Label</label>
                  <div className="flex gap-2">
                    {(["Home", "Work", "Other"] as const).map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setNewLabel(label)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          newLabel === label
                            ? "bg-brand-500 border-brand-500 text-white"
                            : "border-border bg-card text-foreground/75 hover:bg-foreground/5"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="Address Line"
                  placeholder="Apartment, building, street address..."
                  value={newAddressLine}
                  onChange={(e) => setNewAddressLine(e.target.value)}
                  required
                />

                <Input
                  label="City"
                  placeholder="Springfield"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  required
                />

                <div className="flex gap-3 mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsAddingNew(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Save
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
