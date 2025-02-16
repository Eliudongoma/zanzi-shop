import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { CartProvider } from "./contexts/cart/CartProvier.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </StrictMode>
);
