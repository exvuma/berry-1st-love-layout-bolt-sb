import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useParty } from '../../contexts/PartyContext';
import { 
  ChevronLeft, Clock, FileText, Edit, Check, ShoppingBag, Layers
} from 'lucide-react';
import EditElementForm from './EditElementForm';

const ElementDetailPage: React.FC = () => {
  const { elementId } = useParams<{ elementId: string }>();
  const navigate = useNavigate();
  const { elements, tasks, timelineEvents, updateElement } = useParty();
  const [isEditing, setIsEditing] = useState(false);
  
  const element = elements.find(e => e.id === elementId);
  
  if (!element) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h2 className="text-xl font-medium text-neutral-800 mb-4">Element Not Found</h2>
        <p className="text-neutral-600 mb-6">The element you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/elements"
          className="inline-flex items-center text-berry-red hover:text-berry-dark"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Elements
        </Link>
      </div>
    );
  }
  
  const relatedTasks = tasks.filter(task => 
    element.relatedTasks.includes(task.id)
  );
  
  const relatedEvents = timelineEvents.filter(event => 
    element.relatedTimelineEvents.includes(event.id)
  );
  
  const toggleMaterialPurchased = (index: number) => {
    if (!element.materials) return;
    
    const updatedMaterials = [...element.materials];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      purchased: !updatedMaterials[index].purchased
    };
    
    updateElement(element.id, { materials: updatedMaterials });
  };
  
  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'decoration': return 'Decoration';
      case 'food': return 'Food & Treats';
      case 'activity': return 'Activity';
      case 'other': return 'Other';
      default: return category;
    }
  };

  const handleSave = (updatedElement: typeof element) => {
    updateElement(element.id, updatedElement);
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button 
          onClick={() => navigate('/elements')}
          className="flex items-center text-sm text-neutral-600 hover:text-berry-red mb-6"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Elements
        </button>
        
        {isEditing ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
            <EditElementForm
              element={element}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 lg:border-r border-neutral-100">
                <div 
                  className="h-64 lg:h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${element.image})` }}
                ></div>
              </div>
              
              <div className="lg:col-span-2 p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-medium text-neutral-800">{element.title}</h2>
                  <span className="text-sm bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                    {getCategoryLabel(element.category)}
                  </span>
                </div>
                
                <p className="text-neutral-600 mt-4">{element.description}</p>
                
                {element.materials && element.materials.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-neutral-800 flex items-center mb-4">
                      <ShoppingBag size={18} className="mr-2 text-berry-green" />
                      Materials Needed
                    </h3>
                    
                    <ul className="space-y-3">
                      {element.materials.map((material, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <button 
                              className="text-neutral-400 hover:text-berry-red mr-2"
                              onClick={() => toggleMaterialPurchased(index)}
                            >
                              {material.purchased ? (
                                <Check size={20} className="text-berry-green" />
                              ) : (
                                <div className="w-5 h-5 border border-neutral-300 rounded-sm"></div>
                              )}
                            </button>
                            <span className={material.purchased ? 'text-neutral-400 line-through' : 'text-neutral-700'}>
                              {material.name}
                            </span>
                          </div>
                          <span className="text-sm text-neutral-500">{material.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-600">Progress:</span>
                        <span className="font-medium text-berry-red">
                          {element.materials.filter(m => m.purchased).length}/{element.materials.length} purchased
                        </span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-2 mt-2">
                        <motion.div 
                          className="bg-berry-red h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(element.materials.filter(m => m.purchased).length / element.materials.length) * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {relatedTasks.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
              <h3 className="font-medium text-neutral-800 mb-4 flex items-center">
                <FileText size={18} className="mr-2 text-berry-green" />
                Related Tasks
              </h3>
              
              <div className="space-y-3">
                {relatedTasks.map(task => (
                  <Link 
                    key={task.id}
                    to={`/tasks/${task.id}`}
                    className="flex items-start p-3 rounded-lg hover:bg-berry-light/30 transition-colors"
                  >
                    <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 ${
                      task.priority === 'high' ? 'bg-berry-red' : 
                      task.priority === 'medium' ? 'bg-berry-pink' : 'bg-berry-green'
                    }`}></div>
                    <div>
                      <h4 className={`font-medium ${task.completed ? 'text-neutral-400 line-through' : 'text-neutral-800'}`}>
                        {task.title}
                      </h4>
                      <p className="text-sm text-neutral-500 mt-1">
                        Due: {task.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {relatedEvents.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-6">
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
        
        <div className="mt-8 flex justify-between">
          <button className="flex items-center justify-center text-sm font-medium text-berry-red hover:text-berry-dark">
            <Layers size={16} className="mr-2" />
            Add Related Task
          </button>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center text-sm font-medium text-white bg-berry-red hover:bg-berry-dark rounded-lg px-4 py-2 transition-colors"
          >
            <Edit size={16} className="mr-2" />
            {isEditing ? 'Cancel Edit' : 'Edit Element'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ElementDetailPage;