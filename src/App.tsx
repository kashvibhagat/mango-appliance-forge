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
import { AdminLayout } from "./components/layout/AdminLayout";
import { DomainBasedRoute } from "./components/auth/DomainBasedRoute";
import Layout from "./components/layout/Layout";
import PageTransition from "./components/layout/PageTransition";
import FloatingChatbot, { ChatbotRef } from "./components/ui/FloatingChatbot";
import { DomainIndicator } from "./components/layout/DomainIndicator";
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
import ResetPassword from './pages/ResetPassword';
import ComplaintBooking from './pages/ComplaintBooking';
import ComplaintTracking from './pages/ComplaintTracking';

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
                  <Routes>
                    {/* Customer-facing routes - only accessible from main domain */}
                    <Route 
                      path="/" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><Home /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/shop" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><Shop /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/comparison" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><Comparison /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/contact" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><Contact /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/wishlist" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><Wishlist /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/product/:slug" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><ProductDetail /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/cart" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><Cart /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/auth" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><Auth /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/reset-password" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><ResetPassword /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/checkout" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <ProtectedRoute>
                            <Layout>
                              <PageTransition><Checkout /></PageTransition>
                            </Layout>
                          </ProtectedRoute>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/dashboard" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <ProtectedRoute>
                            <Layout>
                              <PageTransition><Dashboard /></PageTransition>
                            </Layout>
                          </ProtectedRoute>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/profile" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <ProtectedRoute>
                            <Layout>
                              <PageTransition><Profile /></PageTransition>
                            </Layout>
                          </ProtectedRoute>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/order-success" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <ProtectedRoute>
                            <Layout>
                              <PageTransition><OrderSuccess /></PageTransition>
                            </Layout>
                          </ProtectedRoute>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/track-order" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><TrackOrder /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/complaint-booking" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><ComplaintBooking /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/complaint-tracking" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><ComplaintTracking /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />
                    <Route 
                      path="/warranty-registration" 
                      element={
                        <DomainBasedRoute customerOnly>
                          <Layout>
                            <PageTransition><WarrantyRegistration /></PageTransition>
                          </Layout>
                        </DomainBasedRoute>
                      } 
                    />

                    {/* Admin routes - only accessible from admin subdomain */}
                    <Route 
                      path="/admin" 
                      element={
                        <AdminRoute>
                          <AdminLayout>
                            <PageTransition><AdminDashboard /></PageTransition>
                          </AdminLayout>
                        </AdminRoute>
                      } 
                    />
                    <Route 
                      path="/" 
                      element={
                        <DomainBasedRoute adminOnly>
                          <AdminRoute>
                            <AdminLayout>
                              <PageTransition><AdminDashboard /></PageTransition>
                            </AdminLayout>
                          </AdminRoute>
                        </DomainBasedRoute>
                      } 
                    />

                    {/* Catch-all route */}
                    <Route path="*" element={<Layout><PageTransition><NotFound /></PageTransition></Layout>} />
                  </Routes>
                  
                  {/* Floating Chatbot - only show on customer site */}
                  <DomainBasedRoute customerOnly>
                    <FloatingChatbot ref={chatbotRef} hideFloatingButton={true} />
                  </DomainBasedRoute>
                  
                  {/* Domain Indicator for development */}
                  <DomainIndicator />
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
