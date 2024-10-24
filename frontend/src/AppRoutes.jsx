import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EventsPage from './components/pages/EventsPage';
import AddEventForm from './components/pages/AddEventForm';
import EditEventPage from './components/pages/EditEventPage';

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
        <Route path="/edit/:id" element={<EditEventPage />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRoutes;
