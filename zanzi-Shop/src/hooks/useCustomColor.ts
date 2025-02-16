import { useColorModeValue } from "./useColorModeValues";


export const useCustomColor = () => {
  return {
    bgColor: useColorModeValue("#F5F5F5", "#121212"), // Light: Soft Gray, Dark: Rich Black
    textColor: useColorModeValue("#1A1A1A", "#FFD700"), // Light: Deep Black, Dark: Gold
    borderColor: useColorModeValue("#D1D1D1", "#444444"), // Light: Subtle Gray, Dark: Deep Gray
    cardBg: useColorModeValue("#FFFFFF", "#1A1A1A"), // Light: White, Dark: Almost Black
    buttonBg: useColorModeValue("#121212", "#FFD700"), // Light: Black, Dark: Gold
    buttonText: useColorModeValue("#FFD700", "#121212"), // Light: Gold, Dark: Black
    accentColor: useColorModeValue("#B8860B", "#DAA520"), // Light: Dark Gold, Dark: Goldenrod
  }
}