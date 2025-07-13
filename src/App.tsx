import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './contexts/PropertyContext';
import { PropertyListings } from './pages/PropertyListings';
import { PropertyDetails } from './pages/PropertyDetails';
// import { FaBuilding } from 'react-icons/fa';

const App: React.FC = () => {
  return (
    <PropertyProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
              <a className="text-xl font-bold text-gray-800" href="/">Property Management System</a>
            </div>
          </header>
          
          <main className="py-6 flex-1">
            <Routes>
              <Route path="/" element={<PropertyListings />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </main>
          
          <footer className="bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Property Management System. All rights reserved.
            </div>
          </footer>
        </div>
      </Router>
    </PropertyProvider>
  );
};

export default App;