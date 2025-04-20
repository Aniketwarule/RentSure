import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import TenantDashboard from "./pages/TenantDashboard";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Payments from "./pages/Payments";
import Tenants from "./pages/Tenants";
import Messages from "./pages/Messages";
import Maintenance from "./pages/Maintenance";
import CreateProperty from "./pages/CreateProperty";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import CreateAgreement from "./pages/CreateAgreement";
import { WagmiProvider } from "wagmi";
import { config } from "./lib/config";
export const baseUrl = "http://localhost:5000";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/landlord-dashboard"
                  element={<LandlordDashboard />}
                />
                <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/maintenance/new" element={<Maintenance />} />
                <Route path="/create-property" element={<CreateProperty />} />
                <Route path="/create-agreement" element={<CreateAgreement />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default App;
