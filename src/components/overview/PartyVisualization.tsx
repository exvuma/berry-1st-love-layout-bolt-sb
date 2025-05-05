import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useParty } from '../../contexts/PartyContext';

const PartyVisualization: React.FC = () => {
  const { elements } = useParty();
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleElementClick = (elementId: string) => {
    navigate(`/elements/${elementId}`);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-berry-light/40 to-berry-light/10 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-berry-pink/20 animate-pulse"></div>
      <div className="absolute bottom-20 right-40 w-16 h-16 rounded-full bg-berry-green/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Decorative dot patterns */}
      <div className="absolute inset-0 bg-dots-pattern bg-[length:20px_20px] opacity-30"></div>
      
      {/* Balloon arch */}
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setActiveElement('element-2')}
        onMouseLeave={() => setActiveElement(null)}
        onClick={() => handleElementClick('element-2')}
      >
        <div className="relative">
          <img 
            src="https://images.pexels.com/photos/6526159/pexels-photo-6526159.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Strawberry Balloon Arch" 
            className="w-64 h-48 object-cover rounded-lg shadow-md"
          />
          <motion.div 
            className={`absolute inset-0 bg-berry-red rounded-lg transition-opacity ${activeElement === 'element-2' ? 'opacity-30' : 'opacity-0'}`}
          ></motion.div>
          {activeElement === 'element-2' && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded p-2 text-sm">
              <p className="font-medium">Strawberry Balloon Arch</p>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Cake display */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setActiveElement('element-1')}
        onMouseLeave={() => setActiveElement(null)}
        onClick={() => handleElementClick('element-1')}
      >
        <div className="relative">
          <img 
            src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Berry-themed Cake" 
            className="w-48 h-56 object-cover rounded-lg shadow-md"
          />
          <motion.div 
            className={`absolute inset-0 bg-berry-red rounded-lg transition-opacity ${activeElement === 'element-1' ? 'opacity-30' : 'opacity-0'}`}
          ></motion.div>
          {activeElement === 'element-1' && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded p-2 text-sm">
              <p className="font-medium">Berry-themed Cake</p>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Dessert table */}
      <motion.div 
        className="absolute bottom-40 left-10 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setActiveElement('element-3')}
        onMouseLeave={() => setActiveElement(null)}
        onClick={() => handleElementClick('element-3')}
      >
        <div className="relative">
          <img 
            src="https://images.pexels.com/photos/3298198/pexels-photo-3298198.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Berry Dessert Table" 
            className="w-48 h-32 object-cover rounded-lg shadow-md"
          />
          <motion.div 
            className={`absolute inset-0 bg-berry-red rounded-lg transition-opacity ${activeElement === 'element-3' ? 'opacity-30' : 'opacity-0'}`}
          ></motion.div>
          {activeElement === 'element-3' && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded p-2 text-sm">
              <p className="font-medium">Berry Dessert Table</p>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Photo backdrop */}
      <motion.div 
        className="absolute top-40 right-10 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setActiveElement('element-4')}
        onMouseLeave={() => setActiveElement(null)}
        onClick={() => handleElementClick('element-4')}
      >
        <div className="relative">
          <img 
            src="https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Photo Backdrop" 
            className="w-48 h-32 object-cover rounded-lg shadow-md"
          />
          <motion.div 
            className={`absolute inset-0 bg-berry-red rounded-lg transition-opacity ${activeElement === 'element-4' ? 'opacity-30' : 'opacity-0'}`}
          ></motion.div>
          {activeElement === 'element-4' && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded p-2 text-sm">
              <p className="font-medium">Photo Backdrop</p>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Interactive hint */}
      <div className="absolute bottom-4 right-4 bg-white/70 text-neutral-700 text-sm px-3 py-1 rounded-full">
        Click elements to view details
      </div>
    </div>
  );
};

export default PartyVisualization;