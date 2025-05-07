import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PartyDetails, Task, TimelineEvent, Element } from '../types';
import partyData from '../data/partyData';

type PartyContextType = {
  partyDetails: PartyDetails;
  tasks: Task[];
  timelineEvents: TimelineEvent[];
  elements: Element[];
  updatePartyDetails: (details: Partial<PartyDetails>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  updateElement: (id: string, element: Partial<Element>) => void;
  updateTimelineEvent: (id: string, event: Partial<TimelineEvent>) => void;
  getTaskCompletionRate: () => { completed: number; total: number };
  getDaysUntilParty: () => number;
};

const PartyContext = createContext<PartyContextType | undefined>(undefined);

export const PartyProvider = ({ children }: { children: ReactNode }) => {
  const [partyDetails, setPartyDetails] = useState<PartyDetails>(partyData.partyDetails);
  const [tasks, setTasks] = useState<Task[]>(partyData.tasks);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(partyData.timelineEvents);
  const [elements, setElements] = useState<Element[]>(partyData.elements);

  const updatePartyDetails = (details: Partial<PartyDetails>) => {
    setPartyDetails((prev) => ({ ...prev, ...details }));
  };

  const updateTask = (id: string, task: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...task } : t))
    );
  };

  const updateElement = (id: string, element: Partial<Element>) => {
    setElements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...element } : e))
    );
  };

  const updateTimelineEvent = (id: string, event: Partial<TimelineEvent>) => {
    setTimelineEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...event } : e))
    );
  };

  const getTaskCompletionRate = () => {
    const completed = tasks.filter((task) => task.completed).length;
    return { completed, total: tasks.length };
  };

  const getDaysUntilParty = () => {
    const today = new Date();
    const partyDate = new Date(partyDetails.date);
    const diffTime = partyDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <PartyContext.Provider
      value={{
        partyDetails,
        tasks,
        timelineEvents,
        elements,
        updatePartyDetails,
        updateTask,
        updateElement,
        updateTimelineEvent,
        getTaskCompletionRate,
        getDaysUntilParty,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
};

export const useParty = () => {
  const context = useContext(PartyContext);
  if (context === undefined) {
    throw new Error('useParty must be used within a PartyProvider');
  }
  return context;
};