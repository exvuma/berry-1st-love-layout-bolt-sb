import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useParty } from '../../contexts/PartyContext';
import PartyVisualization from './PartyVisualization';

const OverviewPage: React.FC = () => {
  const { elements, tasks, timelineEvents } = useParty();

  // Get upcoming tasks (non-completed, sorted by due date)
  const upcomingTasks = [...tasks]
    .filter(task => !task.completed)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 3);

  // Get the next timeline event
  const nextEvent = [...timelineEvents]
    .sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    })[0];

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
                <h3 className="font-serif text-xl font-semibold mb-4">Berry Party Visualization</h3>
                <p className="text-neutral-600 mb-4">
                  Interactive visualization of your berry-themed birthday party setup.
                  Click on any element to see details and related tasks.
                </p>
              </div>
              <div className="h-96 bg-berry-light relative overflow-hidden">
                <PartyVisualization />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">Key Party Elements</h3>
                <ul className="space-y-3">
                  {elements.slice(0, 4).map(element => (
                    <li key={element.id}>
                      <Link 
                        to={`/elements/${element.id}`}
                        className="flex items-center p-3 rounded-lg hover:bg-berry-light transition-colors group"
                      >
                        <div 
                          className="w-10 h-10 rounded-full bg-cover bg-center mr-3 border-2 border-white shadow-sm"
                          style={{ backgroundImage: `url(${element.image})` }}
                        ></div>
                        <div>
                          <h4 className="font-medium text-neutral-800 group-hover:text-berry-red transition-colors">
                            {element.title}
                          </h4>
                          <p className="text-sm text-neutral-500">
                            {element.materials?.filter(m => m.purchased).length || 0}/{element.materials?.length || 0} items purchased
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/elements"
                  className="inline-block mt-4 text-sm text-berry-red hover:text-berry-dark font-medium"
                >
                  View all elements →
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">Timeline Highlights</h3>
                <div className="relative pl-6 border-l-2 border-berry-pink">
                  {timelineEvents.slice(0, 4).map((event, index) => (
                    <div key={event.id} className="mb-4 relative">
                      <div className="absolute w-4 h-4 bg-berry-red rounded-full -left-8 border-2 border-white"></div>
                      <p className="text-sm font-medium text-berry-red">{event.time}</p>
                      <h4 className="font-medium text-neutral-800">{event.title}</h4>
                      <p className="text-sm text-neutral-600">{event.description}</p>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/timeline"
                  className="inline-block mt-2 text-sm text-berry-red hover:text-berry-dark font-medium"
                >
                  View full timeline →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
              <h3 className="font-serif text-xl font-semibold mb-4">Upcoming Tasks</h3>
              <ul className="space-y-3">
                {upcomingTasks.map(task => (
                  <li key={task.id}>
                    <Link 
                      to={`/tasks/${task.id}`}
                      className="block p-3 rounded-lg hover:bg-berry-light transition-colors"
                    >
                      <div className="flex items-start">
                        <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 ${
                          task.priority === 'high' ? 'bg-berry-red' : 
                          task.priority === 'medium' ? 'bg-berry-pink' : 'bg-berry-green'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-neutral-800">{task.title}</h4>
                          <p className="text-sm text-neutral-500">
                            Due: {task.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link 
                to="/tasks"
                className="inline-block mt-4 text-sm text-berry-red hover:text-berry-dark font-medium"
              >
                View all tasks →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-berry-red to-berry-dark text-white rounded-xl shadow-md p-6">
              <h3 className="font-serif text-xl font-semibold mb-2">Next Up:</h3>
              <div className="mb-4">
                <p className="text-lg font-medium">{nextEvent?.title}</p>
                <p className="text-white/80">{nextEvent?.time}</p>
                <p className="mt-2 text-sm text-white/90">{nextEvent?.description}</p>
              </div>
              <Link 
                to="/timeline"
                className="inline-block mt-2 text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white font-medium transition-colors"
              >
                View Timeline
              </Link>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden border border-neutral-100">
              <div className="bg-checkered-light p-6">
                <h3 className="font-serif text-xl font-semibold text-berry-red">Party Progress</h3>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tasks Completed</span>
                      <span className="font-medium">{tasks.filter(t => t.completed).length}/{tasks.length}</span>
                    </div>
                    <div className="w-full bg-white/70 rounded-full h-2">
                      <motion.div 
                        className="bg-berry-red h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Items Purchased</span>
                      <span className="font-medium">
                        {elements.flatMap(e => e.materials || []).filter(m => m.purchased).length}/
                        {elements.flatMap(e => e.materials || []).length}
                      </span>
                    </div>
                    <div className="w-full bg-white/70 rounded-full h-2">
                      <motion.div 
                        className="bg-berry-green h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(elements.flatMap(e => e.materials || []).filter(m => m.purchased).length / 
                                        elements.flatMap(e => e.materials || []).length) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OverviewPage;