import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import AdminPanel from './admin/AdminPanel';
import { initEmailJS } from './config/emailjs';

const AppRouter = () => {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Qadmin" element={<AdminPanel />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155'
            }
          }}
        />
      </div>
    </Router>
  );
};

export default AppRouter;