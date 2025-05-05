import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useParty } from '../../contexts/PartyContext';
import { Clock, FileText, Box, ChevronDown, ChevronUp } from 'lucide-react';
import { TimelineEvent as TimelineEventType } from '../../types';

type TimelineEventProps = {
  event: TimelineEventType;
  isFirst: boolean;
  isLast: boolean;
  index: number;
};

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, isFirst, isLast, index }) => {
  const { tasks, elements } = useParty();
  const [expanded, setExpanded] = useState(false);
  
  // Get related tasks and elements
  const relatedTasks = tasks.filter(task => event.relatedTasks.includes(task.id));
  const relatedElements = elements.filter(element => event.relatedElements.includes(element.id));
  
  const hasRelated = relatedTasks.length > 0 || relatedElements.length > 0;

  return (
    <motion.div 
      className="relative ml-16 md:ml-24 pl-8 py-6 border-b border-neutral-100 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* Time circle */}
      <div className="absolute left-0 top-6 w-6 h-6 rounded-full bg-berry-red flex items-center justify-center shadow-sm">
        <Clock size={12} className="text-white" />
      </div>
      
      {/* Connecting line decorations */}
      {isFirst && (
        <div className="absolute top-0 left-3 w-0.5 h-6 bg-gradient-to-b from-transparent to-berry-pink/40"></div>
      )}
      {isLast && (
        <div className="absolute bottom-0 left-3 w-0.5 h-6 bg-gradient-to-t from-transparent to-berry-pink/40"></div>
      )}
      
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="text-berry-red font-medium mb-1 md:mb-0 md:mr-6 md:w-24 flex-shrink-0">
          {event.time}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-neutral-800">{event.title}</h3>
          <p className="text-neutral-600 mt-1">{event.description}</p>
          
          {hasRelated && (
            <div className="mt-3">
              <button 
                className="flex items-center text-sm text-berry-red hover:text-berry-dark font-medium"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <>
                    <ChevronUp size={16} className="mr-1" />
                    Hide related items
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} className="mr-1" />
                    Show related items ({relatedTasks.length + relatedElements.length})
                  </>
                )}
              </button>
              
              {expanded && (
                <motion.div 
                  className="mt-3 space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {relatedTasks.length > 0 && (
                    <div>
                      <h4 className="font-medium text-neutral-700 text-sm mb-2 flex items-center">
                        <FileText size={14} className="mr-1 text-berry-green" />
                        Related Tasks
                      </h4>
                      <ul className="space-y-2 ml-5">
                        {relatedTasks.map(task => (
                          <li key={task.id}>
                            <Link 
                              to={`/tasks/${task.id}`}
                              className="flex items-center text-sm hover:text-berry-red group"
                            >
                              <div className={`h-3 w-3 rounded-full mr-2 ${
                                task.priority === 'high' ? 'bg-berry-red' : 
                                task.priority === 'medium' ? 'bg-berry-pink' : 'bg-berry-green'
                              }`}></div>
                              <span className={task.completed ? 'line-through text-neutral-400' : 'text-neutral-700'}>
                                {task.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {relatedElements.length > 0 && (
                    <div>
                      <h4 className="font-medium text-neutral-700 text-sm mb-2 flex items-center">
                        <Box size={14} className="mr-1 text-berry-green" />
                        Related Elements
                      </h4>
                      <ul className="space-y-2 ml-5">
                        {relatedElements.map(element => (
                          <li key={element.id}>
                            <Link 
                              to={`/elements/${element.id}`}
                              className="flex items-center text-sm text-neutral-700 hover:text-berry-red"
                            >
                              <div 
                                className="w-4 h-4 rounded-full bg-cover bg-center mr-2 border border-white shadow-sm"
                                style={{ backgroundImage: `url(${element.image})` }}
                              ></div>
                              {element.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineEvent;