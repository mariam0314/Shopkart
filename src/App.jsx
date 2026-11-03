import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ErrorMessage from './components/ErrorMessage';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#202522] font-sans">
      <ScrollToTop />
      
      {/* Top Navigation */}
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Main Content Area */}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Products
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* Fallback 404 Route */}
          <Route
            path="*"
            element={
              <div className="max-w-7xl mx-auto px-4 py-16">
                <ErrorMessage
                  title="Page Not Found"
                  message="The page you requested does not exist or may have been moved."
                  showBackHome={true}
                  backHomeText="Back to Collection"
                />
              </div>
            }
          />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
