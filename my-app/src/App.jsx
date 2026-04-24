import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import Header from "./Components/Header"
import Footer from "./Components/Footer"

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Header/>
        <AppRoutes />
        <footer/>
      </ProductProvider>
    </AuthProvider>
  );
}
