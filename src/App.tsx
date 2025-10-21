import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/sales" element={<Layout><Sales /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/customers" element={<Layout><Customers /></Layout>} />
          <Route path="/materials" element={<Layout><Materials /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/expenses" element={<Layout><Expenses /></Layout>} />
          <Route path="/production" element={<Layout><Production /></Layout>} />
          <Route path="/suppliers" element={<Layout><Suppliers /></Layout>} />
          <Route path="/employees" element={<Layout><Employees /></Layout>} />
          <Route path="/invoices" element={<Layout><Invoices /></Layout>} />
          <Route path="/assets" element={<Layout><Assets /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
