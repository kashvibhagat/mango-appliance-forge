import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
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
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Comparison from './pages/Comparison';
import BlankPage from './pages/BlankPage';
import Help from './pages/Help';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Installation from './pages/Installation';
import BulkOrders from './pages/BulkOrders';

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

// Create router with future flags to avoid deprecation warnings
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <PageTransition><Home /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/shop",
    element: (
      <Layout>
        <PageTransition><Shop /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/comparison",
    element: (
      <Layout>
        <PageTransition><Comparison /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <PageTransition><Contact /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <Layout>
        <PageTransition><Wishlist /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/product/:slug",
    element: (
      <Layout>
        <PageTransition><ProductDetail /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/cart",
    element: (
      <Layout>
        <PageTransition><Cart /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/auth",
    element: (
      <Layout>
        <PageTransition><Auth /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Layout>
          <PageTransition><Checkout /></PageTransition>
          <FloatingChatbot hideFloatingButton={true} />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout>
          <PageTransition><Dashboard /></PageTransition>
          <FloatingChatbot hideFloatingButton={true} />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Layout>
          <PageTransition><Profile /></PageTransition>
          <FloatingChatbot hideFloatingButton={true} />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-success",
    element: (
      <ProtectedRoute>
        <Layout>
          <PageTransition><OrderSuccess /></PageTransition>
          <FloatingChatbot hideFloatingButton={true} />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/track-order",
    element: (
      <ProtectedRoute>
        <Layout>
          <PageTransition><TrackOrder /></PageTransition>
          <FloatingChatbot hideFloatingButton={true} />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/warranty-registration",
    element: (
      <Layout>
        <PageTransition><WarrantyRegistration /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/blank",
    element: <BlankPage />,
  },
  {
    path: "/help",
    element: (
      <Layout>
        <PageTransition><Help /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/shipping",
    element: (
      <Layout>
        <PageTransition><Shipping /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/returns",
    element: (
      <Layout>
        <PageTransition><Returns /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/warranty",
    element: (
      <Layout>
        <PageTransition><WarrantyRegistration /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/installation",
    element: (
      <Layout>
        <PageTransition><Installation /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "/bulk-orders",
    element: (
      <Layout>
        <PageTransition><BulkOrders /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <PageTransition><NotFound /></PageTransition>
        <FloatingChatbot hideFloatingButton={true} />
      </Layout>
    ),
  },
], {
  future: {
    v7_relativeSplatPath: true,
  },
});

const App = () => {
  const chatbotRef = useRef<ChatbotRef>(null);
  const contextValue = useMemo(() => chatbotRef.current, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ChatbotContext.Provider value={contextValue}>
                <Toaster />
                <Sonner />
                <RouterProvider router={router} />
              </ChatbotContext.Provider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
