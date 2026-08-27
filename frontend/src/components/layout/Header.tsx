"use client";

import { Search, Bell, Settings, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [jurisdiction, setJurisdiction] = useState<"india" | "international">("india");
  const [asOfDate, setAsOfDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <header className="h-16 border-b border-outline-variant bg-surface-bright shadow-sm sticky top-0 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-8 h-full">
        <h2 className="font-headline text-primary text-xl hidden lg:block">Workspace</h2>
        
        {/* Jurisdiction Toggle & As-Of Date */}
        <div className="hidden md:flex h-full items-end gap-6 pb-2">
          <div className="flex gap-4 border-r border-outline-variant pr-6">
            <button 
              onClick={() => setJurisdiction("india")}
              className={`font-semibold pb-1 border-b-2 transition-colors ${
                jurisdiction === "india" 
                  ? "text-primary border-primary" 
                  : "text-on-surface-variant border-transparent hover:text-primary"
              }`}
            >
              India
            </button>
            <button 
              onClick={() => setJurisdiction("international")}
              className={`font-semibold pb-1 border-b-2 transition-colors ${
                jurisdiction === "international" 
                  ? "text-secondary border-secondary" 
                  : "text-on-surface-variant border-transparent hover:text-secondary"
              }`}
            >
              International
            </button>
          </div>
          
          <div className="flex items-center gap-2 pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-outline">As-Of Date:</span>
            <input 
              type="date" 
              value={asOfDate}
              onChange={(e) => setAsOfDate(e.target.value)}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input 
            type="text" 
            placeholder="Search cases..." 
            className="pl-10 pr-4 py-2 bg-surface-container-high rounded-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary w-64"
          />
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
          <button className="text-outline hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
          <button className="text-outline hover:text-primary transition-colors">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm ml-2">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
