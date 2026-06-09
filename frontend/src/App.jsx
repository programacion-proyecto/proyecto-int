import { Routes, Route, Navigate } from "react-router-dom";
import { AuthGate } from "@/components/AuthGate";
import Index from "@/routes/index";
import VentasPage from "@/routes/ventas";
import ComprasPage from "@/routes/compras";
import StockPage from "@/routes/stock";
import RevisionPage from "@/routes/revision";

export default function App() {
  return (
    <AuthGate>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/compras" element={<ComprasPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/revision" element={<RevisionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthGate>
  );
}
