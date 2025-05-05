import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useParty } from '../../contexts/PartyContext';
import TaskItem from './TaskItem';
import { Plus, Filter } from 'lucide-react';

type CategoryFilter = 'all' | 'to-purchase' | 'to-confirm' | 'to-prepare';
type CompletionFilter = 'all' | 'completed' | 'pending';
type PriorityFilter = 'all' | 'high' | 'medium' | 'low';

const TasksPage: React.FC = () => {
  const { tasks } = useParty();
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    const matchesCompletion = 
      completionFilter === 'all' || 
      (completionFilter === 'completed' && task.completed) ||
      (completionFilter === 'pending' && !task.completed);
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesCategory && matchesCompletion && matchesPriority;
  });

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'to-purchase': return 'To Purchase';
      case 'to-confirm': return 'To Confirm';
      case 'to-prepare': return 'To Prepare';
      default: return category;
    }
  };

  const categoryGroups = filteredTasks.reduce((groups, task) => {
    const category = task.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(task);
    return groups;
  }, {} as Record<string, typeof tasks>);

  // Sort categories in a specific order
  const orderedCategories = ['to-purchase', 'to-confirm', 'to-prepare'];
  
  const categoriesInOrder = orderedCategories.filter(category => 
    Object.keys(categoryGroups).includes(category)
  );

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold text-neutral-800 mb-2 sm:mb-0">Party Tasks</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center">
              <motion.div 
                className="w-full bg-neutral-200 rounded-full h-2 sm:w-36"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="bg-berry-green h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                />
              </motion.div>
              <span className="text-sm text-neutral-600 ml-2">{completedTasksCount}/{tasks.length}</span>
            </div>
            
            <button 
              className="flex items-center text-sm font-medium text-berry-red px-3 py-1.5 rounded-lg hover:bg-berry-light/50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} className="mr-1.5" />
              Filters
            </button>
          </div>
        </div>
        
        {showFilters && (
          <motion.div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-4 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                  className="w-full p-2 border border-neutral-300 rounded-lg text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="to-purchase">To Purchase</option>
                  <option value="to-confirm">To Confirm</option>
                  <option value="to-prepare">To Prepare</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                <select 
                  value={completionFilter}
                  onChange={(e) => setCompletionFilter(e.target.value as CompletionFilter)}
                  className="w-full p-2 border border-neutral-300 rounded-lg text-sm"
                >
                  <option value="all">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Priority</label>
                <select 
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
                  className="w-full p-2 border border-neutral-300 rounded-lg text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
        
        {categoriesInOrder.map((category, categoryIndex) => (
          <motion.div 
            key={category}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 mb-6 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <div className="border-b border-neutral-100 px-6 py-4">
              <h3 className="font-medium text-neutral-800">{getCategoryLabel(category)}</h3>
            </div>
            
            <div className="divide-y divide-neutral-100">
              {categoryGroups[category].map((task, taskIndex) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  index={taskIndex}
                />
              ))}
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button className="flex items-center justify-center text-sm font-medium text-white bg-berry-red hover:bg-berry-dark rounded-lg px-5 py-2.5 transition-colors">
            <Plus size={18} className="mr-2" />
            Add New Task
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TasksPage;