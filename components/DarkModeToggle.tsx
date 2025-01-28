'use client'
import { useTheme } from "@/lib/ThemeContext";
import { Moon, Sun } from "lucide-react";


export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    return (
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-secondary text-secondary-foreground transition-colors duration-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      )
    }