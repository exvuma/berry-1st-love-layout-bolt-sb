import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Clock, CheckSquare, Layers } from 'lucide-react';

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const WildSidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const sidebarLinks = [
    { name: 'Overview', path: '/w/overview', icon: <Home size={20} /> },
    { name: 'Timeline', path: '/w/timeline', icon: <Clock size={20} /> },
    { name: 'Tasks', path: '/w/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Elements', path: '/w/elements', icon: <Layers size={20} /> },
  ];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 w-60 h-full bg-white shadow-lg z-30 pt-20 md:hidden"
          >
            <div className="px-4">
              {sidebarLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg mb-1 transition-colors ${
                      isActive
                        ? 'bg-safari-green/10 text-safari-green font-medium'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:block w-60 bg-white shadow-sm pt-16 sticky top-0 z-10 h-screen">
        <div className="px-4 py-4">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-safari-green/10 text-safari-green font-medium'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </div>
        
        <div className="px-6 py-6 mt-4 bg-gradient-to-br from-safari-green/10 to-white border-t border-neutral-100">
          <h3 className="font-medium text-neutral-800 mb-2">Priority Tasks</h3>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-safari-green mr-2"></span>
              Order safari balloon arch
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-safari-green mr-2"></span>
              Confirm animal-themed cake
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-safari-green mr-2"></span>
              Book jungle backdrop
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WildSidebar;