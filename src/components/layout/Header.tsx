import React, { useState } from 'react';
import { useParty } from '../../contexts/PartyContext';
import { Calendar, Clock, MapPin, Users, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

type HeaderProps = {
  setSidebarOpen: (open: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { partyDetails, getTaskCompletionRate, getDaysUntilParty, updatePartyDetails } = useParty();
  const { completed, total } = getTaskCompletionRate();
  const daysUntil = getDaysUntilParty();

  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({
    title: partyDetails.title,
    date: new Date(partyDetails.date).toISOString().split('T')[0],
    time: partyDetails.time,
    location: partyDetails.location,
    expectedGuests: partyDetails.expectedGuests
  });

  const handleSave = () => {
    updatePartyDetails({
      ...partyDetails,
      title: editDetails.title,
      date: new Date(editDetails.date),
      time: editDetails.time,
      location: editDetails.location,
      expectedGuests: editDetails.expectedGuests
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex flex-col mb-4 md:mb-0">
              {isEditing ? (
                <input
                  type="text"
                  value={editDetails.title}
                  onChange={(e) => setEditDetails({...editDetails, title: e.target.value})}
                  className="font-serif text-2xl md:text-3xl font-bold text-berry-red mb-1 border-b-2 border-berry-pink focus:outline-none"
                />
              ) : (
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-berry-red">
                  {partyDetails.title}
                </h1>
              )}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center text-sm text-neutral-600">
                  <Calendar size={16} className="mr-1 text-berry-green" />
                  <span className="font-medium">
                    {daysUntil} days until the party
                  </span>
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <div className="w-20 bg-neutral-200 rounded-full h-2 mr-2">
                    <motion.div 
                      className="bg-berry-green h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(completed / total) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <span>{completed}/{total} tasks</span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              {isEditing ? (
                <div className="grid grid-cols-1 gap-2 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-berry-green" />
                    <input
                      type="date"
                      value={editDetails.date}
                      onChange={(e) => setEditDetails({...editDetails, date: e.target.value})}
                      className="text-sm border rounded p-1 flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-berry-green" />
                    <input
                      type="text"
                      value={editDetails.time}
                      onChange={(e) => setEditDetails({...editDetails, time: e.target.value})}
                      className="text-sm border rounded p-1 flex-1"
                      placeholder="Time (e.g. 2-6 PM)"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-berry-green" />
                    <input
                      type="text"
                      value={editDetails.location}
                      onChange={(e) => setEditDetails({...editDetails, location: e.target.value})}
                      className="text-sm border rounded p-1 flex-1"
                      placeholder="Location"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-berry-green" />
                    <input
                      type="number"
                      value={editDetails.expectedGuests}
                      onChange={(e) => setEditDetails({...editDetails, expectedGuests: parseInt(e.target.value)})}
                      className="text-sm border rounded p-1 flex-1"
                      placeholder="Expected guests"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="px-3 py-1 text-sm rounded border border-neutral-300"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave} 
                      className="px-3 py-1 text-sm rounded bg-berry-red text-white"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col text-sm text-neutral-600 gap-1">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1 text-berry-green" />
                    <span>
                      {new Date(partyDetails.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1 text-berry-green" />
                    <span>{partyDetails.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1 text-berry-green" />
                    <span>{partyDetails.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1 text-berry-green" />
                    <span>{partyDetails.expectedGuests} expected guests</span>
                  </div>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center mt-1 text-berry-red hover:text-berry-dark"
                  >
                    <Edit2 size={14} className="mr-1" />
                    <span>Edit Details</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;