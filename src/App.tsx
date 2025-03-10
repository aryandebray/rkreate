import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Products from "./pages/Products";
import WhyChooseUs from "./pages/WhyChooseUs";
import Contact from "./pages/Contact";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  <Navigation />
                  <main className="pt-20">
                    <Index />
                  </main>
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                  <Navigation />
                  <main className="pt-20">
                    <Products />
                  </main>
                </>
              }
            />
            <Route
              path="/why-choose-us"
              element={
                <>
                  <Navigation />
                  <main className="pt-20">
                    <WhyChooseUs />
                  </main>
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Navigation />
                  <main className="pt-20">
                    <Contact />
                  </main>
                </>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
