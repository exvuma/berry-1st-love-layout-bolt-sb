import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WildOverviewPage from './WildOverviewPage';
import WildHeader from './WildHeader';
import WildSidebar from './WildSidebar';
import { Menu, X } from 'lucide-react';

const WildLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-safari-cream flex flex-col">
      <WildHeader setSidebarOpen={setSidebarOpen} />
      
      <div className="flex flex-1 overflow-hidden">
        <WildSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-neutral-900/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <button
          className="fixed bottom-4 left-4 md:hidden z-30 bg-safari-green text-white p-3 rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<WildOverviewPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default WildLayout;