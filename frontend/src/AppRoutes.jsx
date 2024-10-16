import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Header from './components/layouts/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EventsPage from './components/pages/EventsPage';
import AddEventForm from './components/pages/AddEventForm';

function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events-page" element={<EventsPage />} />
        <Route path="/add-event" element={<AddEventForm />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
