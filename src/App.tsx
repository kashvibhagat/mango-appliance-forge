import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminRoute } from "./components/auth/AdminRoute";
import Layout from "./components/layout/Layout";
import PageTransition from "./components/layout/PageTransition";
import FloatingChatbot, { ChatbotRef } from "./components/ui/FloatingChatbot";
import React, { useRef, createContext, useContext, useMemo } from "react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import WarrantyRegistration from "./pages/WarrantyRegistration";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Comparison from './pages/Comparison';

const queryClient = new QueryClient();

// Create context for chatbot control
export const ChatbotContext = createContext<ChatbotRef | null>(null);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within ChatbotContext');
  }
  return context;
};

const App = () => {
  const chatbotRef = useRef<ChatbotRef>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ChatbotContext.Provider value={null}>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                      <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
                      <Route path="/comparison" element={<PageTransition><Comparison /></PageTransition>} />
                      <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                      <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
                      <Route path="/product/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
                      <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
                      <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
                      <Route 
                        path="/checkout" 
                        element={
                          <ProtectedRoute>
                            <PageTransition><Checkout /></PageTransition>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <PageTransition><Dashboard /></PageTransition>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <PageTransition><Profile /></PageTransition>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/order-success" 
                        element={
                          <ProtectedRoute>
                            <PageTransition><OrderSuccess /></PageTransition>
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/track-order" element={<PageTransition><TrackOrder /></PageTransition>} />
                      <Route 
                        path="/warranty-registration" 
                        element={
                          <PageTransition><WarrantyRegistration /></PageTransition>
                        } 
                      />
                      <Route 
                        path="/admin" 
                        element={
                          <AdminRoute>
                            <PageTransition><AdminDashboard /></PageTransition>
                          </AdminRoute>
                        } 
                      />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                    </Routes>
                    
                    {/* Floating Chatbot - hide the default floating button since we have header button */}
                    <FloatingChatbot ref={chatbotRef} hideFloatingButton={true} />
                  </Layout>
                </BrowserRouter>
              </ChatbotContext.Provider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
