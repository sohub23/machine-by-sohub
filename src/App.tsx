import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import MachinesCatalog from "./pages/MachinesCatalog";
import SnackVendingPage from "./pages/SnackVendingPage";
import SmartLockerShowcase from "./pages/SmartLockerShowcase";
import PowerBankShowcase from "./pages/PowerBankShowcase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/machines" element={<MachinesCatalog />} />
          <Route path="/machines/snack-vending" element={<SnackVendingPage />} />
          <Route path="/machines/smart-locker" element={<SmartLockerShowcase />} />
          <Route path="/machines/power-bank" element={<PowerBankShowcase />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
