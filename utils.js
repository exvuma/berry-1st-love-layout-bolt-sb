export function timeToMinutes(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

export function minutesToTime(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}:${m.toString().padStart(2, "0")}`;
} 