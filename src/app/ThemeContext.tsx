'use client'
// ThemeContext.js
import { createContext, useContext, useState } from 'react'

// Define a default value for the context
const defaultContextValue = {
  theme: 'dark', // Default theme can be 'dark' or 'light'
  toggleTheme: () => {}, // Placeholder for the toggle function
}

// Create the context with a default value
const ThemeContext = createContext(defaultContextValue)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultContextValue.theme)

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
