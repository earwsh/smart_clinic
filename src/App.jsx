import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PatientLayout from './layouts/PatientLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages (Patient)
import Dashboard from './pages/patient/Dashboard';
import Appointments from './pages/patient/Appointments';
import Login from './pages/auth/Login';
import Consult from './pages/patient/Consult';
import Survey from './pages/patient/Survey';
import Bio from './pages/patient/Bio';

// Pages (Admin)
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments'; // 1. اضافه کردن ایمپورت
import AdminPatients from './pages/admin/AdminPatients'; // 1. اضافه کردن ایمپورت
import AdminChats from './pages/admin/AdminChats';
import AdminFinance from './pages/admin/AdminFinance';
import AdminSettings from './pages/admin/AdminSettings';
import AdminReception from './pages/admin/AdminReception'; //

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* پنل بیمار */}
        <Route path="/" element={<PatientLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="consult" element={<Consult />} />
          <Route path="survey" element={<Survey />} />
          <Route path="bio" element={<Bio />} />
        </Route>

        {/* پنل ادمین */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} /> {/* 2. مسیر جدید */}
          <Route path="patients" element={<AdminPatients />} /> {/* 2. مسیر جدید */}
          <Route path="reception" element={<AdminReception />} /> {/* 2. تعریف مسیر پذیرش */}
          <Route path="chats" element={<AdminChats />} /> {/* اضافه شد */}
          <Route path="finance" element={<AdminFinance />} /> {/* اضافه شد */}
          <Route path="settings" element={<AdminSettings />} /> {/* اضافه شد */}
          
        </Route>

      </Routes>
    </Router>
  );
}

export default App;