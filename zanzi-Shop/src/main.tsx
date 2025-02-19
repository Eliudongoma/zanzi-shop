import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { CartProvider } from "./contexts/cart/CartProvider.tsx";
import { ColorModeProvider } from "./components/ui/color-mode.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
    <Provider>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
    </ColorModeProvider>
  </StrictMode>
);
