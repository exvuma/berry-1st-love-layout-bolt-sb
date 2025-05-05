import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import OverviewPage from './components/overview/OverviewPage';
import TimelinePage from './components/timeline/TimelinePage';
import TasksPage from './components/tasks/TasksPage';
import ElementsPage from './components/elements/ElementsPage';
import TaskDetailPage from './components/tasks/TaskDetailPage';
import ElementDetailPage from './components/elements/ElementDetailPage';
import { PartyProvider } from './contexts/PartyContext';
import WildLayout from './components/wild/WildLayout';

function App() {
  return (
    <BrowserRouter>
      <PartyProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="tasks/:taskId" element={<TaskDetailPage />} />
            <Route path="elements" element={<ElementsPage />} />
            <Route path="elements/:elementId" element={<ElementDetailPage />} />
          </Route>
          <Route path="/w/*" element={<WildLayout />} />
        </Routes>
      </PartyProvider>
    </BrowserRouter>
  );
}

export default App;