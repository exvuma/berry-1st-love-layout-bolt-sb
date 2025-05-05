import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WildOverviewPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-serif text-2xl font-semibold text-neutral-800 mb-6">Party Overview</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100">
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">Wild One Party Setup</h3>
                <p className="text-neutral-600 mb-4">
                  Interactive visualization of your safari-themed first birthday party setup.
                  Click on any element to see details and related tasks.
                </p>
              </div>
              <div className="h-96 bg-safari-green/10 relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7194915/pexels-photo-7194915.jpeg"
                  alt="Wild One Party Setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">Key Party Elements</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-safari-green/10 rounded-lg">
                    <h4 className="font-medium text-safari-green">Safari Balloon Arch</h4>
                    <p className="text-sm text-neutral-600 mt-1">Green and cream balloon arch with tropical leaves</p>
                  </div>
                  <div className="p-4 bg-safari-yellow/10 rounded-lg">
                    <h4 className="font-medium text-safari-tan">Animal Theme Cake</h4>
                    <p className="text-sm text-neutral-600 mt-1">Two-tier cake with safari animals and greenery</p>
                  </div>
                  <div className="p-4 bg-safari-cream rounded-lg">
                    <h4 className="font-medium text-safari-green">Dessert Display</h4>
                    <p className="text-sm text-neutral-600 mt-1">Animal cookies and jungle-themed treats</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">Timeline Highlights</h3>
                <div className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-safari-green/40">
                    <div className="absolute w-3 h-3 bg-safari-green rounded-full -left-[7px] top-1"></div>
                    <p className="text-sm font-medium text-safari-green">2:00 PM</p>
                    <p className="font-medium text-neutral-800">Guest Arrival</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-safari-green/40">
                    <div className="absolute w-3 h-3 bg-safari-green rounded-full -left-[7px] top-1"></div>
                    <p className="text-sm font-medium text-safari-green">3:00 PM</p>
                    <p className="font-medium text-neutral-800">Safari Activities</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-safari-green/40">
                    <div className="absolute w-3 h-3 bg-safari-green rounded-full -left-[7px] top-1"></div>
                    <p className="text-sm font-medium text-safari-green">4:00 PM</p>
                    <p className="font-medium text-neutral-800">Cake & Photos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
              <h3 className="font-serif text-xl font-semibold mb-4">Upcoming Tasks</h3>
              <div className="space-y-3">
                <div className="p-3 bg-safari-green/5 rounded-lg">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-safari-green flex-shrink-0 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-neutral-800">Order balloon arch</h4>
                      <p className="text-sm text-neutral-500">Due: June 1</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-safari-yellow/5 rounded-lg">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-safari-yellow flex-shrink-0 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-neutral-800">Confirm cake design</h4>
                      <p className="text-sm text-neutral-500">Due: June 5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-safari-green to-safari-yellow/50 text-white rounded-xl shadow-md p-6">
              <h3 className="font-serif text-xl font-semibold mb-2">Next Up:</h3>
              <div className="mb-4">
                <p className="text-lg font-medium">Safari Activities Setup</p>
                <p className="text-white/90">3:00 PM</p>
                <p className="mt-2 text-sm text-white/90">Prepare animal spotting game and photo opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WildOverviewPage;