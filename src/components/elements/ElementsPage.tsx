import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useParty } from '../../contexts/PartyContext';
import { Plus, Filter } from 'lucide-react';
import AddElementModal from './AddElementModal';

type CategoryFilter = 'all' | 'decoration' | 'food' | 'activity' | 'other';

const ElementsPage: React.FC = () => {
  const { elements, updateElement } = useParty();
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredElements = elements.filter(element => {
    return categoryFilter === 'all' || element.category === categoryFilter;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'decoration': return 'Decorations';
      case 'food': return 'Food & Treats';
      case 'activity': return 'Activities';
      case 'other': return 'Other';
      default: return category;
    }
  };

  const handleAddElement = (newElement: any) => {
    // Add the new element to the list (you may want to update context or state)
    updateElement(newElement.id || Math.random().toString(), newElement);
    setShowAddModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold text-neutral-800 mb-2 sm:mb-0">Party Elements</h2>

          <button
            className="flex items-center text-sm font-medium text-berry-red px-3 py-1.5 rounded-lg hover:bg-berry-light/50 self-start"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-1.5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 p-4 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'decoration', 'food', 'activity', 'other'] as const).map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${categoryFilter === category
                        ? 'bg-berry-red text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {getCategoryLabel(category)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElements.map((element, index) => (
            <motion.div
              key={element.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={`/elements/${element.id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100 block h-full hover:shadow-md transition-shadow"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${element.image})` }}
                ></div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg text-neutral-800">{element.title}</h3>
                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                      {getCategoryLabel(element.category)}
                    </span>
                  </div>
                  <p className="text-neutral-600 mt-2 line-clamp-2">{element.description}</p>

                  {element.materials && element.materials.length > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-600">Materials:</span>
                        <span className="font-medium text-berry-red">
                          {element.materials.filter(m => m.purchased).length}/{element.materials.length}
                        </span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-2">
                        <motion.div
                          className="bg-berry-red h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(element.materials.filter(m => m.purchased).length / element.materials.length) * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: filteredElements.length * 0.1 }}
          >
            <div className="bg-berry-light border border-dashed border-berry-pink rounded-xl h-full flex items-center justify-center p-6">
              <button className="flex flex-col items-center text-berry-red hover:text-berry-dark" onClick={() => setShowAddModal(true)}>
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                  <Plus size={24} />
                </div>
                <span className="font-medium">Add New Element</span>
              </button>
            </div>
          </motion.div>
        </div>
        {showAddModal && (
          <AddElementModal onClose={() => setShowAddModal(false)} onAdd={handleAddElement} />
        )}
      </motion.div>
    </div>
  );
};

export default ElementsPage;