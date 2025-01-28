"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ThemeContextType = {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)


export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false)
    
    useEffect(() => {
        const isDark = localStorage.getItem("darkMode") === "true"
        setIsDarkMode(isDark)
    }, [])
    
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDarkMode])

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode
        setIsDarkMode(newDarkMode)
        localStorage.setItem("darkMode", newDarkMode.toString())
    }
    
    return (<ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}</ThemeContext.Provider>)
    }


export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
      throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
  }