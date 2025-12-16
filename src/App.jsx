import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import LoadingScreen from './components/LoadingScreen';
import Analytics from './components/Analytics';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Venues from './pages/Venues';
import Gallery from './pages/Gallery';
import PrivateScreening from './pages/PrivateScreening';
import FAQ from './pages/FAQ';
import GiftCard from './pages/GiftCard';
import TicketBooking from './pages/TicketBooking';
import Payment from './pages/Payment';
import About from './pages/About';
import Contact from './pages/Contact';

// AppContent component that uses the loading context
const AppContent = () => {
  const { isLoading, progress } = useLoading();

  return (
    <>
      <Analytics />
      <LoadingScreen isLoading={isLoading} progress={progress} />
      <div className={isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-500'}>
        <EventProvider>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/events" element={
              <Layout>
                <Events />
              </Layout>
            } />
            <Route path="/venues" element={
              <Layout>
                <Venues />
              </Layout>
            } />
            <Route path="/gallery" element={
              <Layout>
                <Gallery />
              </Layout>
            } />
            <Route path="/private-screening" element={
              <Layout>
                <PrivateScreening />
              </Layout>
            } />
            <Route path="/faq" element={
              <Layout>
                <FAQ />
              </Layout>
            } />
            <Route path="/gift-card" element={
              <Layout>
                <GiftCard />
              </Layout>
            } />
            <Route path="/ticket-booking/:eventId" element={<TicketBooking />} />
            <Route path="/payment" element={<Layout><Payment /></Layout>} />
            <Route path="/about" element={
              <Layout>
                <About />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout>
                <Contact />
              </Layout>
            } />
            {/* Catch-all route that redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </EventProvider>
      </div>
    </>
  );
};

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
