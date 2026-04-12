import { useState, useEffect } from "react";
import { Search, Bell, User, Sun, Moon } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useTheme } from "@/src/context/ThemeContext";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
      onSearch?.("");
    }
  };

  const handleSearchChange = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between",
      isScrolled 
        ? (theme === 'dark' ? "bg-black" : "bg-white shadow-md") 
        : (theme === 'dark' ? "bg-gradient-to-b from-black/80 to-transparent" : "bg-gradient-to-b from-white/80 to-transparent")
    )}>
      <div className="flex items-center gap-4 md:gap-8">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          className="w-20 md:w-24 cursor-pointer"
          referrerPolicy="no-referrer"
        />
        <ul className={cn(
          "hidden lg:flex items-center gap-5 text-sm",
          theme === 'dark' ? "text-gray-200" : "text-gray-700"
        )}>
          <li className={cn("cursor-pointer font-bold", theme === 'dark' ? "text-white" : "text-black")}>Home</li>
          <li className="cursor-pointer hover:text-red-600 transition-colors">TV Shows</li>
          <li className="cursor-pointer hover:text-red-600 transition-colors">Movies</li>
          <li className="cursor-pointer hover:text-red-600 transition-colors">New & Popular</li>
          <li className="cursor-pointer hover:text-red-600 transition-colors">My List</li>
        </ul>
      </div>

      <div className={cn("flex items-center gap-3 md:gap-5", theme === 'dark' ? "text-white" : "text-black")}>
        <div className={cn(
          "flex items-center gap-2 border transition-all duration-300 px-2 py-1",
          isSearchOpen 
            ? cn("w-40 md:w-64", theme === 'dark' ? "border-white bg-black/40" : "border-black bg-white/40") 
            : "w-10 border-transparent"
        )}>
          <Search 
            className="cursor-pointer hover:text-red-600 transition-colors shrink-0" 
            size={20} 
            onClick={handleSearchToggle}
          />
          {isSearchOpen && (
            <input
              autoFocus
              type="text"
              placeholder="Titles, people, genres"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          )}
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-500/20 transition-colors"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <span className="hidden md:inline text-sm cursor-pointer hover:text-red-600 transition-colors">Kids</span>
        <Bell className="cursor-pointer hover:text-red-600 transition-colors" size={20} />
        <div className="w-8 h-8 bg-red-600 rounded cursor-pointer flex items-center justify-center text-white">
          <User size={20} />
        </div>
      </div>
    </nav>
  );
}
