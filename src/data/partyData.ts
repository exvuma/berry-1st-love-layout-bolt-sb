import { PartyDetails, Task, TimelineEvent, Element } from '../types';

export const partyData = {
  partyDetails: {
    title: "Rogue's Berry First Birthday",
    date: new Date(2025, 4, 29), // May 29, 2025
    time: "2-6 PM",
    location: "123 Berry Lane",
    expectedGuests: 30
  } as PartyDetails,

  tasks: [
    {
      id: "task-1",
      title: "Order strawberry-themed cake",
      description: "Contact Sweet Berries Bakery to order the custom cake with strawberry design",
      completed: true,
      dueDate: new Date(2025, 4, 15),
      priority: "high",
      category: "to-confirm",
      relatedElements: ["element-1"],
      relatedTimelineEvents: ["event-4"]
    },
    {
      id: "task-2",
      title: "Purchase balloon arch supplies",
      description: "Buy red, pink, and white balloons, balloon strip, and pump",
      completed: false,
      dueDate: new Date(2025, 4, 20),
      priority: "high",
      category: "to-purchase",
      relatedElements: ["element-2"],
      relatedTimelineEvents: []
    },
    {
      id: "task-3",
      title: "Create berry-themed invitations",
      description: "Design and order custom strawberry invitations",
      completed: true,
      dueDate: new Date(2025, 3, 29),
      priority: "medium",
      category: "to-prepare",
      relatedElements: [],
      relatedTimelineEvents: []
    },
    {
      id: "task-4",
      title: "Plan berry patch scavenger hunt",
      description: "Create a list of strawberry items to hide, prepare clues and prize bags",
      completed: false,
      dueDate: new Date(2025, 4, 25),
      priority: "medium",
      category: "to-prepare",
      relatedElements: [],
      relatedTimelineEvents: ["event-3"]
    },
    {
      id: "task-5",
      title: "Purchase berry-themed tableware",
      description: "Buy strawberry plates, cups, napkins, and utensils",
      completed: true,
      dueDate: new Date(2025, 4, 22),
      priority: "medium",
      category: "to-purchase",
      relatedElements: ["element-3"],
      relatedTimelineEvents: []
    },
    {
      id: "task-6",
      title: "Arrange photography",
      description: "Book a photographer to capture the special day",
      completed: true,
      dueDate: new Date(2025, 3, 29),
      priority: "high",
      category: "to-confirm",
      relatedElements: [],
      relatedTimelineEvents: []
    },
    {
      id: "task-7",
      title: "Order strawberry-themed smash cake",
      description: "Order a small version of the main cake for the birthday girl/boy",
      completed: false,
      dueDate: new Date(2025, 4, 15),
      priority: "medium",
      category: "to-confirm",
      relatedElements: ["element-1"],
      relatedTimelineEvents: ["event-4"]
    },
    {
      id: "task-8",
      title: "Purchase berry-themed party favors",
      description: "Get strawberry-shaped candies, stickers, and small toys",
      completed: false,
      dueDate: new Date(2025, 4, 22),
      priority: "low",
      category: "to-purchase",
      relatedElements: [],
      relatedTimelineEvents: ["event-6"]
    },
    {
      id: "task-9",
      title: "Create berry-themed dessert table",
      description: "Plan and prepare display for strawberry cupcakes, cookies, and other treats",
      completed: false,
      dueDate: new Date(2025, 4, 28),
      priority: "medium",
      category: "to-prepare",
      relatedElements: ["element-3"],
      relatedTimelineEvents: ["event-4"]
    },
    {
      id: "task-10",
      title: "Book berry photo backdrop",
      description: "Arrange for a strawberry-themed photo backdrop for pictures",
      completed: false,
      dueDate: new Date(2025, 4, 15),
      priority: "high",
      category: "to-confirm",
      relatedElements: [],
      relatedTimelineEvents: []
    },
  ] as Task[],

  timelineEvents: [
    {
      id: "event-1",
      title: "Guest Arrival",
      time: "2:00 PM",
      description: "Welcome guests and provide name tags",
      relatedTasks: [],
      relatedElements: []
    },
    {
      id: "event-2",
      title: "Berry-themed crafts begin",
      time: "2:15 PM",
      description: "Set up craft stations for strawberry paper crowns and coloring",
      relatedTasks: [],
      relatedElements: []
    },
    {
      id: "event-3",
      title: "Berry patch scavenger hunt",
      time: "3:00 PM",
      description: "Guide children through the berry scavenger hunt",
      relatedTasks: ["task-4"],
      relatedElements: []
    },
    {
      id: "event-4",
      title: "Cake and treats",
      time: "4:00 PM",
      description: "Bring out the berry cake and desserts for the celebration",
      relatedTasks: ["task-1", "task-7", "task-9"],
      relatedElements: ["element-1", "element-3"]
    },
    {
      id: "event-5",
      title: "Present opening",
      time: "4:30 PM",
      description: "The birthday child opens gifts while guests watch",
      relatedTasks: [],
      relatedElements: []
    },
    {
      id: "event-6",
      title: "Party favors and goodbyes",
      time: "5:30 PM",
      description: "Distribute party favors as guests begin to leave",
      relatedTasks: ["task-8"],
      relatedElements: []
    }
  ] as TimelineEvent[],

  elements: [
    {
      id: "element-1",
      title: "Berry-themed Cake",
      description: "A two-tier cake with strawberry decorations and pink frosting",
      image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "food",
      materials: [
        { name: "Two-tier cake", quantity: "1", purchased: true },
        { name: "Strawberry toppers", quantity: "5", purchased: true },
        { name: "Cake stand", quantity: "1", purchased: false }
      ],
      relatedTasks: ["task-1", "task-7"],
      relatedTimelineEvents: ["event-4"]
    },
    {
      id: "element-2",
      title: "Strawberry Balloon Arch",
      description: "A 6-foot arch with red, pink, and white balloons plus strawberry foil balloons",
      image: "https://images.pexels.com/photos/6526159/pexels-photo-6526159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "decoration",
      materials: [
        { name: "Red balloons (11\")", quantity: "100", purchased: false },
        { name: "Pink balloons (11\")", quantity: "100", purchased: false },
        { name: "White balloons (11\")", quantity: "100", purchased: false },
        { name: "Green balloons (5\")", quantity: "20", purchased: false },
        { name: "Strawberry foil balloons", quantity: "5", purchased: false },
        { name: "Balloon strip", quantity: "1", purchased: false },
        { name: "Balloon pump", quantity: "1", purchased: false }
      ],
      relatedTasks: ["task-2"],
      relatedTimelineEvents: []
    },
    {
      id: "element-3",
      title: "Berry Dessert Table",
      description: "A table with berry-themed treats and decorations",
      image: "https://images.pexels.com/photos/3298198/pexels-photo-3298198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "food",
      materials: [
        { name: "Red tablecloth", quantity: "1", purchased: true },
        { name: "Strawberry plates", quantity: "30", purchased: true },
        { name: "Berry-themed napkins", quantity: "50", purchased: true },
        { name: "Cake stands (various heights)", quantity: "3", purchased: false },
        { name: "Berry display signs", quantity: "5", purchased: false }
      ],
      relatedTasks: ["task-5", "task-9"],
      relatedTimelineEvents: ["event-4"]
    },
    {
      id: "element-4",
      title: "Photo Backdrop",
      description: "A strawberry-themed backdrop for photos",
      image: "https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "decoration",
      materials: [
        { name: "Berry backdrop", quantity: "1", purchased: false },
        { name: "Strawberry props", quantity: "10", purchased: false },
        { name: "Photo frame", quantity: "1", purchased: false }
      ],
      relatedTasks: ["task-10"],
      relatedTimelineEvents: []
    }
  ] as Element[]
};