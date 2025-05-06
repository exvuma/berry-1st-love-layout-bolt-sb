export const events = [
    {
        id: 1,
        title: "Appetizers Served",
        start: "16:15", // 24h format
        end: "17:15",
        description: "Light appetizers and drinks are served to guests",
        tasks: [
            { text: "Prepare appetizer trays", done: true },
            { text: "Set up appetizer table", done: true },
            { text: "Refill drinks", done: false }
        ],
        elements: [{ label: "Appetizer Menu", url: "#" }]
    },
    {
        id: 2,
        title: "Guest Arrival",
        start: "16:00",
        end: "17:00",
        description: "Guests arrive and mingle.",
        tasks: [],
        elements: []
    },
    {
        id: 3,
        title: "Games & Activities",
        start: "17:00",
        end: "18:00",
        description: "Fun games and activities for everyone.",
        tasks: [],
        elements: []
    }
]; 