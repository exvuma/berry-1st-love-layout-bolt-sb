const baseURL = "https://confetti-styleguide-app.8track.workers.dev";

const elements = [
  {
    id: "element-1",
    title: "Berry-themed Cake",
    description:
      "A two-tier cake with strawberry decorations and pink frosting",
    image: `${baseURL}/Strawberry/cake.png`, // Updated URL
    category: "food",
    materials: [
      { name: "Two-tier cake", quantity: "1", purchased: true },
      { name: "Strawberry toppers", quantity: "5", purchased: true },
      { name: "Cake stand", quantity: "1", purchased: false },
    ],
    relatedTasks: ["task-1", "task-7"],
    relatedTimelineEvents: ["event-4"],
  },
  {
    id: "element-2",
    title: "Strawberry Balloon Arch",
    description:
      "A 6-foot arch with red, pink, and white balloons plus strawberry foil balloons",
    image: `${baseURL}/Strawberry/balloon.png`, // Updated URL
    category: "decoration",
    materials: [
      { name: 'Red balloons (11")', quantity: "100", purchased: false },
      { name: 'Pink balloons (11")', quantity: "100", purchased: false },
      { name: 'White balloons (11")', quantity: "100", purchased: false },
      { name: 'Green balloons (5")', quantity: "20", purchased: false },
      { name: "Strawberry foil balloons", quantity: "5", purchased: false },
      { name: "Balloon strip", quantity: "1", purchased: false },
      { name: "Balloon pump", quantity: "1", purchased: false },
    ],
    relatedTasks: [],
    relatedTimelineEvents: [],
  },
  // Continue to add other elements with updated URLs
  {
    id: "element-3",
    title: "Table and Cookies",
    description: "A decorative table with assorted cookies.",
    image: `${baseURL}/Wild%20one/table_and_cookie.png`, // Updated URL
    category: "food",
    materials: [
      { name: "Cookie trays", quantity: "2", purchased: false },
      { name: "Decoration tablecloth", quantity: "1", purchased: false },
    ],
    relatedTasks: [],
    relatedTimelineEvents: [],
  },
  // Add more elements accordingly...
] as Element[];

export default elements;