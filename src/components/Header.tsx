import { Link, useLocation } from "react-router-dom";
import { Search, Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  t: Record<string, any>;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}

export function Header({ t, isDark, setIsDark }: HeaderProps) {
  const location = useLocation();
  const getLinkClass = (path: string) => 
    location.pathname === path ? "text-foreground font-medium" : "hover:text-foreground transition-colors";

  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 border-b border-border gap-4 md:gap-0">
      <div className="w-full flex items-center justify-between md:w-auto">
        <div className="font-display text-xl font-bold tracking-tighter">
          <Link to="/">RR</Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <div 
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-menu"))}
            className="flex items-center gap-2 border border-border bg-background px-2.5 py-1 rounded-md text-xs cursor-pointer hover:bg-accent transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
          </div>
          <button onClick={() => setIsDark(!isDark)} className="hover:text-foreground transition-colors">
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6 text-sm text-muted-foreground w-full md:w-auto overflow-x-auto scrollbar-hide pb-1 md:pb-0">
        <nav id="tour-nav" className="flex items-center gap-4 md:gap-5 whitespace-nowrap mx-auto md:mx-0">
          <Link to="/" className={getLinkClass("/")}>{t.home}</Link>
          <Link to="/education" className={getLinkClass("/education")}>{t.education}</Link>
          <Link to="/projects" className={getLinkClass("/projects")}>{t.projects}</Link>
          <Link to="/portfolio" className={getLinkClass("/portfolio")}>{t.portfolio}</Link>
          <Link to="/gallery" className={getLinkClass("/gallery")}>{t.gallery}</Link>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-note-modal"))}
            className="hover:text-foreground transition-colors"
          >
            {t.notes}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-foreground transition-colors flex items-center gap-1 outline-none">
              {t.more} <span className="text-[10px]">▼</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/I_Wayan_Radea_CV_ID.docx" download="I_Wayan_Radea_CV_ID.docx">{t.downloadCV || "Download CV"}</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <div 
            id="tour-command-menu"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-menu"))}
            className="flex items-center gap-2 border border-border bg-background px-2.5 py-1 rounded-md text-xs cursor-pointer hover:bg-accent transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Ctrl K</span>
          </div>
          <button onClick={() => setIsDark(!isDark)} className="hover:text-foreground transition-colors">
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
