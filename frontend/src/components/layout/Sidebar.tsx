"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Database, 
  BrainCircuit, 
  HelpCircle, 
  LineChart,
  Plus
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Overview", href: "/overview", icon: FileText },
    { name: "Facts", href: "/facts", icon: Database },
    { name: "Analysis", href: "/analysis", icon: BrainCircuit },
    { name: "Why?", href: "/why", icon: HelpCircle },
    { name: "Report", href: "/report", icon: LineChart },
  ];

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 w-64 h-screen border-r border-outline-variant bg-surface shadow-sm z-50">
      <div className="p-6 flex items-center gap-3 border-b border-outline-variant">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-on-primary font-bold font-headline text-xl">IP</span>
        </div>
        <div>
          <h1 className="font-headline font-bold text-primary text-xl leading-tight">IP-SAKTI</h1>
          <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">Sahayak Workspace</p>
        </div>
      </div>

      <div className="p-4">
        <button className="w-full bg-primary-container text-on-primary-container py-2.5 px-4 rounded-lg text-sm font-semibold mb-6 flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors shadow-sm">
          <Plus size={18} />
          New Case
        </button>

        <div className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary text-on-primary shadow-sm" 
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                }`}
              >
                <Icon size={18} className={isActive ? "text-on-primary" : "text-outline"} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
