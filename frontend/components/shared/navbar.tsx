"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Search, User as UserIcon, LogOut, Heart, FileText } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useUIStore } from "../../store/uiStore";
import { useUserStore } from "../../store/userStore";
import { LocationSelector } from "./location-selector";

export const Navbar: React.FC = () => {
  const { getTotalItems } = useCartStore();
  const { toggleCartDrawer, searchQuery, setSearchQuery } = useUIStore();
  const { user, isAuthenticated, logout } = useUserStore();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const cartCount = getTotalItems();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 gap-4">
        {/* Left Section: Logo & Address */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-foreground hidden md:block">
              Gourmet<span className="text-brand-500">Dash</span>
            </span>
          </Link>
          
          <div className="h-6 w-px bg-border hidden sm:block shrink-0"></div>
          <LocationSelector />
        </div>

        {/* Center Section: Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md relative items-center">
          <input
            type="text"
            placeholder="Search for restaurants, cuisines or dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 bg-foreground/[0.03] border border-border rounded-xl px-4 pl-10 text-xs font-semibold focus:outline-hidden focus:border-brand-500 focus:bg-card transition-all"
          />
          <Search className="absolute left-3.5 w-4.5 h-4.5 text-foreground/35 pointer-events-none" />
        </div>

        {/* Right Section: Search Toggle (Mobile), Cart, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <Link href="/restaurants" className="md:hidden p-2 rounded-xl border border-border hover:bg-foreground/5 text-foreground/60 transition-colors">
            <Search className="w-5 h-5" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-black text-white ring-2 ring-background animate-float">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            {isAuthenticated && user ? (
              <>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-foreground/5 transition-colors cursor-pointer overflow-hidden"
                >
                  <div className="flex items-center justify-center h-full w-full bg-brand-500 text-white font-extrabold text-sm uppercase">
                    {user.name.charAt(0)}
                  </div>
                </button>

                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                    <div className="absolute right-0 mt-2.5 w-56 rounded-2xl border border-border bg-card p-2.5 shadow-xl z-50 animate-scale-up">
                      <div className="px-3 py-2 border-b border-border mb-1.5">
                        <p className="font-extrabold text-sm text-foreground truncate">{user.name}</p>
                        <p className="text-[10px] text-foreground/50 font-semibold truncate mt-0.5">{user.email}</p>
                      </div>
                      
                      <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-foreground/75 hover:bg-foreground/5 transition-colors text-left cursor-pointer">
                        <Heart className="w-4 h-4 text-foreground/45" /> Favorite Restaurants
                      </button>
                      
                      <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-foreground/75 hover:bg-foreground/5 transition-colors text-left cursor-pointer">
                        <FileText className="w-4 h-4 text-foreground/45" /> My Orders
                      </button>
                      
                      <div className="h-px bg-border my-1.5"></div>
                      
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-foreground/5 transition-colors cursor-pointer text-foreground/75"
                aria-label="Login Account"
              >
                <UserIcon className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
