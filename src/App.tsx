import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './app/page';
// import AboutPage from './app/about/page'; // Removed
// import ContactPage from './app/contact/page'; // Removed
import RegistrationPage from './app/registration/page';
import NotFound from './app/not-found';

// Import new program pages
import TravelSoccerPage from './app/programs/travel/page';
import RecSoccerPage from './app/programs/rec/page';
// Import other necessary pages
import SchedulesPage from './app/schedules/page'; 
import RefereePage from './app/referee/page'; 

// Layout component to include Navbar and Footer
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Nested routes will render here */}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<AboutPage />} /> */}
        {/* <Route path="contact" element={<ContactPage />} /> */}
        <Route path="registration" element={<RegistrationPage />} />
        
        {/* Program Pages */}
        <Route path="programs/travel" element={<TravelSoccerPage />} />
        <Route path="programs/rec" element={<RecSoccerPage />} />

        {/* Other Pages */}
        <Route path="schedules" element={<SchedulesPage />} /> 
        <Route path="referee" element={<RefereePage />} /> 

        {/* <Route path="registration/financial-aid" element={<FinancialAidPage />} /> */}
        {/* Add other routes here for news, teams, schedule, privacy, terms, faq etc. */}
        {/* <Route path="news" element={<NewsListPage />} /> */}
        {/* <Route path="news/:slug" element={<NewsArticlePage />} /> */}
        {/* <Route path="teams" element={<TeamsPage />} /> */}
        {/* <Route path="schedule" element={<SchedulePage />} /> */}
        {/* <Route path="privacy-policy" element={<PrivacyPolicyPage />} /> */}
        {/* <Route path="terms" element={<TermsPage />} /> */}
        {/* <Route path="faq" element={<FAQPage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;