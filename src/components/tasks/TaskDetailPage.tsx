import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useParty } from '../../contexts/PartyContext';
import { 
  Calendar, Flag, Clock, Layers, CheckSquare, Square, 
  ChevronLeft, BarChart4, Link as LinkIcon
} from 'lucide-react';

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, elements, timelineEvents, updateTask } = useParty();
  
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h2 className="text-xl font-medium text-neutral-800 mb-4">Task Not Found</h2>
        <p className="text-neutral-600 mb-6">The task you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/tasks"
          className="inline-flex items-center text-berry-red hover:text-berry-dark"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Tasks
        </Link>
      </div>
    );
  }
  
  const relatedElements = elements.filter(element => 
    task.relatedElements.includes(element.id)
  );
  
  const relatedEvents = timelineEvents.filter(event => 
    task.relatedTimelineEvents.includes(event.id)
  );
  
  const toggleTaskCompletion = () => {
    updateTask(task.id, { completed: !task.completed });
  };
  
  const formatDueDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isPastDue = () => {
    const today = new Date();
    return !task.completed && task.dueDate < today;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button 
          onClick={() => navigate('/tasks')}
          className="flex items-center text-sm text-neutral-600 hover:text-berry-red mb-6"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Tasks
        </button>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100">
          <div className="p-6">
            <div className="flex items-start">
              <button 
                className="mt-1 mr-4 text-neutral-400 hover:text-berry-red"
                onClick={toggleTaskCompletion}
              >
                {task.completed ? (
                  <CheckSquare size={24} className="text-berry-green" />
                ) : (
                  <Square size={24} />
                )}
              </button>
              
              <div className="flex-1">
                <h2 className={`text-2xl font-medium ${task.completed ? 'text-neutral-400 line-through' : 'text-neutral-800'}`}>
                  {task.title}
                </h2>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className={`flex items-center text-sm rounded-lg px-3 py-1.5 ${
                    isPastDue() ? 'bg-red-100 text-red-600' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    <Calendar size={16} className="mr-2" />
                    <span>{formatDueDate(task.dueDate)}</span>
                  </div>
                  
                  <div className={`flex items-center text-sm rounded-lg px-3 py-1.5 ${
                    task.priority === 'high' ? 'bg-berry-red/10 text-berry-red' : 
                    task.priority === 'medium' ? 'bg-berry-pink/20 text-berry-dark' : 
                    'bg-berry-green/10 text-berry-green'
                  }`}>
                    <Flag size={16} className="mr-2" />
                    <span className="capitalize">{task.priority} Priority</span>
                  </div>
                  
                  <div className="flex items-center text-sm bg-neutral-100 text-neutral-600 rounded-lg px-3 py-1.5">
                    <BarChart4 size={16} className="mr-2" />
                    <span className="capitalize">{task.category.replace('-', ' ')}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-neutral-800 mb-2">Description</h3>
                  <p className="text-neutral-600">{task.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-100">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
              {relatedElements.length > 0 && (
                <div className="p-6">
                  <h3 className="font-medium text-neutral-800 mb-4 flex items-center">
                    <Layers size={18} className="mr-2 text-berry-green" />
                    Related Elements
                  </h3>
                  
                  <div className="space-y-4">
                    {relatedElements.map(element => (
                      <Link 
                        key={element.id}
                        to={`/elements/${element.id}`}
                        className="flex items-start p-3 rounded-lg hover:bg-berry-light/30 transition-colors"
                      >
                        <div 
                          className="w-12 h-12 rounded-md bg-cover bg-center mr-3 shadow-sm"
                          style={{ backgroundImage: `url(${element.image})` }}
                        ></div>
                        <div>
                          <h4 className="font-medium text-neutral-800">{element.title}</h4>
                          <p className="text-sm text-neutral-600 line-clamp-2 mt-1">
                            {element.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {relatedEvents.length > 0 && (
                <div className="p-6">
                  <h3 className="font-medium text-neutral-800 mb-4 flex items-center">
                    <Clock size={18} className="mr-2 text-berry-green" />
                    Timeline Events
                  </h3>
                  
                  <div className="relative pl-6 border-l-2 border-berry-pink/40 space-y-4">
                    {relatedEvents.map(event => (
                      <Link 
                        key={event.id}
                        to="/timeline"
                        className="block"
                      >
                        <div className="absolute w-3 h-3 bg-berry-red rounded-full -left-1.5 mt-1.5"></div>
                        <div className="hover:bg-berry-light/30 p-2 -ml-2 rounded-lg transition-colors">
                          <p className="text-sm font-medium text-berry-red">{event.time}</p>
                          <h4 className="font-medium text-neutral-800">{event.title}</h4>
                          <p className="text-sm text-neutral-600 mt-1">{event.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button className="flex items-center justify-center text-sm font-medium text-berry-red hover:text-berry-dark">
            <LinkIcon size={16} className="mr-2" />
            Connect to Element
          </button>
          
          <div className="space-x-3">
            <button className="text-sm font-medium text-neutral-600 hover:text-neutral-800 px-4 py-2 border border-neutral-300 rounded-lg">
              Edit Task
            </button>
            <button className={`text-sm font-medium text-white ${task.completed ? 'bg-berry-green hover:bg-green-600' : 'bg-berry-red hover:bg-berry-dark'} rounded-lg px-4 py-2 transition-colors`}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskDetailPage;