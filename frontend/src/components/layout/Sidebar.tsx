import Link from "next/link";
import {
  Home,
  MessageSquare,
  Compass,
  TestTube,
  ShieldCheck,
  BookOpen,
  Map,
  Bookmark,
  Library,
  Settings,
  PlusCircle,
  HelpCircle,
  User,
  Globe
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen sticky top-0 flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center font-serif text-white font-bold text-xl">
              I
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-white">IP-SAKTI</span>
          </Link>
        </div>
        
        <div className="px-4 pb-6">
          <button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 py-2.5 rounded-md font-medium text-sm mb-4 shadow-sm">
            <PlusCircle size={16} />
            New Query
          </button>

          <nav className="space-y-1">
            <SidebarItem href="/" icon={<Home size={18} />} label="Dashboard" />
            <SidebarItem href="/ask" icon={<MessageSquare size={18} />} label="Ask Sahayak" isActive />
            <SidebarItem href="/navigator" icon={<Compass size={18} />} label="IP Navigator" />
            <SidebarItem href="/classifier" icon={<TestTube size={18} />} label="Formulation Classifier" />
            <SidebarItem href="/compliance" icon={<ShieldCheck size={18} />} label="ABS Compliance" />
            <SidebarItem href="/tkdl" icon={<BookOpen size={18} />} label="TKDL / Prior Art" />
            <SidebarItem href="/pathway" icon={<Map size={18} />} label="Regulatory Pathway" />
          </nav>

          <div className="mt-8 mb-2 px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Workspace
          </div>
          <nav className="space-y-1">
            <SidebarItem href="/saved" icon={<Bookmark size={18} />} label="Saved Research" />
            <SidebarItem href="/library" icon={<Library size={18} />} label="Source Library" />
            <SidebarItem href="/settings" icon={<Settings size={18} />} label="Settings" />
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border/30">
        <nav className="space-y-1">
          <SidebarItem href="#" icon={<Globe size={18} />} label="English (UK)" />
          <SidebarItem href="#" icon={<HelpCircle size={18} />} label="IP Facilitator" />
          <SidebarItem href="#" icon={<User size={18} />} label="Dr. A. Sharma" />
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({ href, icon, label, isActive }: { href: string; icon: React.ReactNode; label: string; isActive?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
