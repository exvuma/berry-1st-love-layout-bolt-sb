export type PartyDetails = {
  title: string;
  date: Date;
  time: string;
  location: string;
  expectedGuests: number;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  category: 'to-purchase' | 'to-confirm' | 'to-prepare';
  relatedElements: string[];
  relatedTimelineEvents: string[];
};

export type TimelineEvent = {
  id: string;
  title: string;
  time: string;
  description: string;
  relatedTasks: string[];
  relatedElements: string[];
};

export type Element = {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: 'decoration' | 'food' | 'activity' | 'other';
  materials?: {
    name: string;
    quantity: string;
    purchased: boolean;
  }[];
  relatedTasks: string[];
  relatedTimelineEvents: string[];
};