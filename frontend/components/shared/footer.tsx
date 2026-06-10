import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-foreground/[0.02] dark:bg-foreground/[0.01]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <span className="text-lg font-black tracking-tight text-foreground">
                Gourmet<span className="text-brand-500">Dash</span>
              </span>
            </Link>
            <p className="text-xs text-foreground/50 leading-relaxed font-semibold">
              Delivering premium dining experiences from local favorite kitchens straight to your doorstep, fresh and fast.
            </p>
            <div className="flex gap-4.5 mt-2 text-foreground/45">
              <a href="#"><FaInstagram color="#FF0069" className="w-4 h-4" /></a>
              <a href="#"><FaFacebook color="#1877F2" className="w-4 h-4" /></a>
              <a href="#"><FaXTwitter color="#000000ff" className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground/75 mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2.5 text-xs text-foreground/50 font-bold">
              <li><Link href="/restaurants" className="hover:text-brand-500 transition-colors">Find Restaurants</Link></li>
              <li><a href="#offers" className="hover:text-brand-500 transition-colors">Special Offers</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Become a Driver</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Register Restaurant</a></li>
            </ul>
          </div>

          {/* Cuisines Column */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground/75 mb-4">Popular Cuisines</h3>
            <ul className="flex flex-col gap-2.5 text-xs text-foreground/50 font-bold">
              <li><Link href="/restaurants?cuisine=Burgers" className="hover:text-brand-500 transition-colors">Gourmet Burgers</Link></li>
              <li><Link href="/restaurants?cuisine=Pizza" className="hover:text-brand-500 transition-colors">Stone-Oven Pizza</Link></li>
              <li><Link href="/restaurants?cuisine=Sushi" className="hover:text-brand-500 transition-colors">Signature Sushi</Link></li>
              <li><Link href="/restaurants?cuisine=Desserts" className="hover:text-brand-500 transition-colors">Decadent Desserts</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground/75 mb-4">Contact Us</h3>
            <div className="flex flex-col gap-3 text-xs text-foreground/55 font-bold">
              <span className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-foreground/35 shrink-0" />
                <span className="truncate">support@gourmetdash.com</span>
              </span>
              <span className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-foreground/35 shrink-0" />
                <span>+1 (800) GOURMET</span>
              </span>
              <span className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-foreground/35 shrink-0 mt-0.5" />
                <span>100 Fresh Food Boulevard, San Francisco, CA</span>
              </span>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-foreground/45 font-semibold">
          <p>© {new Date().getFullYear()} GourmetDash Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
