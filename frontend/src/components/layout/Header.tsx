import { Search, Bell, Globe, User } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search cases, patents, formulations..." 
            className="w-full bg-muted/50 border-none rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Jurisdiction Switch */}
        <div className="flex items-center bg-muted/50 p-1 rounded-md text-xs font-medium">
          <button className="px-3 py-1.5 rounded bg-primary text-primary-foreground shadow-sm">
            India
          </button>
          <button className="px-3 py-1.5 rounded text-muted-foreground hover:text-foreground transition-colors">
            Intl
          </button>
        </div>

        <div className="h-6 w-px bg-border mx-2"></div>

        <button className="text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border-2 border-card"></span>
        </button>
        
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Globe size={20} />
        </button>

        <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-serif ml-2">
          AS
        </div>
      </div>
    </header>
  );
}
