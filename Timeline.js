import React from "react";
import { events } from "./events";
import { timeToMinutes, minutesToTime } from "./utils";
import "./timeline.css";

const TIMELINE_START = "16:00";
const TIMELINE_END = "18:00";
const TICK_INTERVAL = 30; // minutes

function getOverlappingEvents(selected, all) {
    const selStart = timeToMinutes(selected.start);
    const selEnd = timeToMinutes(selected.end);
    return all.filter(
        (e) =>
            e.id !== selected.id &&
            timeToMinutes(e.end) > selStart &&
            timeToMinutes(e.start) < selEnd
    );
}

function getTickMarks(start, end, interval) {
    const startMins = timeToMinutes(start);
    const endMins = timeToMinutes(end);
    const ticks = [];
    for (let t = startMins; t <= endMins; t += interval) {
        ticks.push(t);
    }
    return ticks;
}

export default function Timeline({ selectedEventId = 1 }) {
    const selectedEvent = events.find((e) => e.id === selectedEventId);
    const overlappingEvents = getOverlappingEvents(selectedEvent, events);
    const tickMarks = getTickMarks(TIMELINE_START, TIMELINE_END, TICK_INTERVAL);

    return (
        <div className="timeline-container">
            <MainTimeline tickMarks={tickMarks} />
            <div className="event-timelines">
                <EventTimeline
                    event={selectedEvent}
                    highlight
                    tickMarks={tickMarks}
                />
                {overlappingEvents.length > 0 && (
                    <div className="overlap-group">
                        <div className="overlap-label">Overlapping Events</div>
                        {overlappingEvents.map((event) => (
                            <EventTimeline
                                key={event.id}
                                event={event}
                                highlight={false}
                                tickMarks={tickMarks}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function MainTimeline({ tickMarks }) {
    return (
        <div className="main-timeline">
            {tickMarks.map((mins) => (
                <div className="tick" key={mins} style={{ top: (mins - 960) * 2 }}>
                    <span className="tick-label">{minutesToTime(mins)}</span>
                </div>
            ))}
        </div>
    );
}

function EventTimeline({ event, highlight, tickMarks }) {
    const startMins = timeToMinutes(event.start);
    const endMins = timeToMinutes(event.end);
    const top = (startMins - 960) * 2; // adjust multiplier for vertical scale
    const height = (endMins - startMins) * 2;

    return (
        <div className={`event-timeline${highlight ? " selected" : " overlap"}`}>
            <div
                className="event-line"
                style={{
                    top,
                    height,
                    background: highlight ? "#FFD54F" : "#BDBDBD"
                }}
            />
            <EventCard event={event} highlight={highlight} style={{ top }} />
        </div>
    );
}

function EventCard({ event, highlight, style }) {
    return (
        <div
            className={`event-card${highlight ? " selected" : " overlap"}`}
            style={style}
        >
            <div className="event-title">{event.title}</div>
            <div className="event-time">
                {event.start} - {event.end}
            </div>
            <div className="event-desc">{event.description}</div>
            {event.tasks.length > 0 && (
                <div className="event-tasks">
                    <div className="tasks-label">Tasks</div>
                    <ul>
                        {event.tasks.map((t, i) => (
                            <li
                                key={i}
                                className={t.done ? "task-done" : ""}
                            >
                                <input type="checkbox" checked={t.done} readOnly />
                                {t.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {event.elements.length > 0 && (
                <div className="event-elements">
                    <div className="elements-label">Elements</div>
                    <ul>
                        {event.elements.map((el, i) => (
                            <li key={i}>
                                <a href={el.url}>{el.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
} 