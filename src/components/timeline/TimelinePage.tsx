import React from 'react';
import { motion } from 'framer-motion';
import { useParty } from '../../contexts/PartyContext';
import TimelineEvent from './TimelineEvent';
import { Plus, Calendar } from 'lucide-react';

const TimelinePage: React.FC = () => {
  const { timelineEvents, partyDetails } = useParty();
  
  // Sort events by time
  const sortedEvents = [...timelineEvents].sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
  });

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-2xl font-semibold text-neutral-800">Party Timeline</h2>
          <div className="flex items-center text-sm text-neutral-600">
            <Calendar size={16} className="mr-1 text-berry-green" />
            <span>
              {new Date(partyDetails.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-16 md:left-24 w-0.5 bg-berry-pink/40"></div>
            
            {sortedEvents.map((event, index) => (
              <TimelineEvent 
                key={event.id} 
                event={event} 
                isFirst={index === 0}
                isLast={index === sortedEvents.length - 1}
                index={index}
              />
            ))}
            
            {/* Add event button at the end */}
            <motion.div 
              className="relative ml-16 md:ml-24 pl-8 py-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute left-0 top-4 w-6 h-6 rounded-full border-2 border-dashed border-berry-pink flex items-center justify-center">
                <Plus size={14} className="text-berry-pink" />
              </div>
              <button className="text-berry-red hover:text-berry-dark text-sm font-medium flex items-center">
                Add new timeline event
              </button>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-6 bg-berry-light rounded-xl p-6">
          <h3 className="font-serif text-lg font-semibold text-neutral-800 mb-4">Timeline Tips</h3>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-start">
              <span className="h-2 w-2 rounded-full bg-berry-red mr-2 mt-1.5"></span>
              Schedule buffer time between activities to accommodate unexpected delays
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 rounded-full bg-berry-red mr-2 mt-1.5"></span>
              Consider nap times and meal times when planning for young children
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 rounded-full bg-berry-red mr-2 mt-1.5"></span>
              Plan the most important activities (cake, presents) earlier in the party
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelinePage;