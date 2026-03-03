import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import MachinesCatalog from "./pages/MachinesCatalog";
import SnackVendingPage from "./pages/SnackVendingPage";
import SmartLockerShowcase from "./pages/SmartLockerShowcase";
import PowerBankShowcase from "./pages/PowerBankShowcase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const WHATSAPP_URL = `https://wa.me/8801922036882?text=${encodeURIComponent("Hi, I'm interested in SOHUB machine deployment.")}`;

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
        {/* Global WhatsApp Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-accent text-accent-foreground rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} />
        </a>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
