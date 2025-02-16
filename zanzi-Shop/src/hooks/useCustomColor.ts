import { useColorModeValue } from "./useColorModeValues";


export const useCustomColor = () => {
  return {
    // Background Colors
    bgColor: useColorModeValue("#F5F5F5", "#121212"), // Light: Soft Gray, Dark: Rich Black
    navBg: useColorModeValue("#1A1A1A", "#000000"), // Light: Deep Black, Dark: True Black
    mainBg: useColorModeValue("#FFFFFF", "#1A1A1A"), // Light: White, Dark: Almost Black
    asideBg: useColorModeValue("#E6E6E6", "#222222"), // Light: Soft Gray, Dark: Dark Gray

    // Text Colors
    textColor: useColorModeValue("#1A1A1A", "#FFD700"), // Light: Deep Black, Dark: Gold
    asideText: useColorModeValue("#333333", "#B8860B"), // Light: Dark Gray, Dark: Dark Gold

    // Borders & Accents
    borderColor: useColorModeValue("#D1D1D1", "#444444"), // Light: Subtle Gray, Dark: Deep Gray
    accentColor: useColorModeValue("#B8860B", "#DAA520"), // Light: Dark Gold, Dark: Goldenrod

    // Button Colors
    buttonBg: useColorModeValue("#121212", "#FFD700"), // Light: Black, Dark: Gold
    buttonText: useColorModeValue("#FFD700", "#121212"), // Light: Gold, Dark: Black
  }
}