import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import React, { useEffect } from "react";

const queryClient = new QueryClient();

// Theme wrapper component to apply theme class to document
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Apply the appropriate theme class to the document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ThemeWrapper>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeWrapper>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
