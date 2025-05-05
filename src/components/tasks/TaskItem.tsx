import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useParty } from '../../contexts/PartyContext';
import { CheckSquare, Square, Calendar, Flag, Layers, ArrowRight } from 'lucide-react';
import { Task } from '../../types';

type TaskItemProps = {
  task: Task;
  index: number;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const { updateTask, elements } = useParty();
  
  const toggleTaskCompletion = (e: React.MouseEvent) => {
    e.preventDefault();
    updateTask(task.id, { completed: !task.completed });
  };
  
  const formatDueDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const isPastDue = () => {
    const today = new Date();
    return !task.completed && task.dueDate < today;
  };
  
  const relatedElements = elements.filter(element => 
    task.relatedElements.includes(element.id)
  );

  return (
    <Link to={`/tasks/${task.id}`}>
      <motion.div 
        className={`px-6 py-4 hover:bg-neutral-50 transition-colors ${task.completed ? 'bg-neutral-50' : ''}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <div className="flex items-start">
          <button 
            className="mt-0.5 mr-3 text-neutral-400 hover:text-berry-red flex-shrink-0"
            onClick={toggleTaskCompletion}
          >
            {task.completed ? (
              <CheckSquare size={20} className="text-berry-green" />
            ) : (
              <Square size={20} />
            )}
          </button>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className={`font-medium ${task.completed ? 'text-neutral-400 line-through' : 'text-neutral-800'}`}>
                {task.title}
              </h3>
              
              <div className="flex items-center text-sm space-x-2 mt-2 sm:mt-0">
                <div className={`flex items-center rounded-full px-2 py-0.5 ${
                  isPastDue() ? 'bg-red-100 text-red-600' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  <Calendar size={14} className="mr-1" />
                  <span>{formatDueDate(task.dueDate)}</span>
                </div>
                
                <div className={`flex items-center rounded-full px-2 py-0.5 ${
                  task.priority === 'high' ? 'bg-berry-red/10 text-berry-red' : 
                  task.priority === 'medium' ? 'bg-berry-pink/20 text-berry-dark' : 
                  'bg-berry-green/10 text-berry-green'
                }`}>
                  <Flag size={14} className="mr-1" />
                  <span className="capitalize">{task.priority}</span>
                </div>
              </div>
            </div>
            
            <p className={`text-sm mt-1 ${task.completed ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {task.description}
            </p>
            
            {relatedElements.length > 0 && (
              <div className="flex items-center mt-3 flex-wrap gap-2">
                <span className="text-xs text-neutral-500 flex items-center mr-1">
                  <Layers size={12} className="mr-1" />
                  Related:
                </span>
                {relatedElements.map(element => (
                  <div 
                    key={element.id}
                    className="flex items-center text-xs bg-berry-light/50 text-berry-red rounded-full px-2 py-0.5"
                  >
                    <div 
                      className="w-3 h-3 rounded-full bg-cover bg-center mr-1"
                      style={{ backgroundImage: `url(${element.image})` }}
                    ></div>
                    {element.title}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="ml-3 flex-shrink-0">
            <ArrowRight size={16} className="text-neutral-400" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default TaskItem;