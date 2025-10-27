import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SoundAlertProvider } from "./contexts/SoundAlertContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import Materials from "./pages/Materials";
import Services from "./pages/Services";
import Expenses from "./pages/Expenses";
import Production from "./pages/Production";
import Suppliers from "./pages/Suppliers";
import Employees from "./pages/Employees";
import Invoices from "./pages/Invoices";
import Assets from "./pages/Assets";
import Login from "./pages/Login";
import MarketplaceOrders from "./pages/MarketplaceOrders";
import MonitorDisplay from "./pages/MonitorDisplay";
import ProductionDisplay from "./pages/ProductionDisplay";
import ProductsToRestock from "./pages/ProductsToRestock";
import CashManagement from "./pages/CashManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <SoundAlertProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
              <Route path="/products" element={<ProtectedRoute><Layout><Products /></Layout></ProtectedRoute>} />
              <Route path="/sales" element={<ProtectedRoute><Layout><Sales /></Layout></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
              <Route path="/customers" element={<ProtectedRoute><Layout><Customers /></Layout></ProtectedRoute>} />
              <Route path="/materials" element={<ProtectedRoute><Layout><Materials /></Layout></ProtectedRoute>} />
              <Route path="/services" element={<ProtectedRoute><Layout><Services /></Layout></ProtectedRoute>} />
              <Route path="/expenses" element={<ProtectedRoute><Layout><Expenses /></Layout></ProtectedRoute>} />
              <Route path="/production" element={<ProtectedRoute><Layout><Production /></Layout></ProtectedRoute>} />
              <Route path="/suppliers" element={<ProtectedRoute><Layout><Suppliers /></Layout></ProtectedRoute>} />
              <Route path="/employees" element={<ProtectedRoute><Layout><Employees /></Layout></ProtectedRoute>} />
              <Route path="/invoices" element={<ProtectedRoute><Layout><Invoices /></Layout></ProtectedRoute>} />
              <Route path="/assets" element={<ProtectedRoute><Layout><Assets /></Layout></ProtectedRoute>} />
              <Route path="/marketplace-orders" element={<ProtectedRoute><Layout><MarketplaceOrders /></Layout></ProtectedRoute>} />
              <Route path="/cash-management" element={<ProtectedRoute><Layout><CashManagement /></Layout></ProtectedRoute>} />
              <Route path="/monitor-display" element={<MonitorDisplay />} />
              <Route path="/production-display" element={<ProductionDisplay />} />
              <Route path="/products-to-restock" element={<ProductsToRestock />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SoundAlertProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
