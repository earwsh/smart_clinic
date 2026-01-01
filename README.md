🏥 Smart Clinic Management & Appointment System (Frontend)

A comprehensive, high-performance solution for modern medical clinics designed to streamline the experience for doctors, secretaries, and patients. Built with a focus on administrative efficiency and seamless patient care.

🚀 Tech Stack
- **React.js**: Core UI library.
- **Tailwind CSS 4.0**: Modern styling with a custom "Trust-Green" color palette and glassmorphism effects.
- **React Router Dom**: Client-side routing.
- **React Icons**: Industry-standard iconography.

🛠 Key Admin Features (Doctor/Secretary Portal)

1. Advanced Appointment Management
- **Multi-Source Tracking**: Real-time identification of booking sources (Direct Website, DoctorYab, Nobat.ir, or Manual/Phone).
- **Dynamic Scheduling**: Flexible working hour configuration per weekday with automated time-slot generation.

2. Reception & Live Patient Queue
- **Slide-over Reception Panel**: A modern sidebar for checking in patients without losing context of the main list.
- **On-the-fly EHR Update**: Fast capture of patient demographics (DOB, Address, Medical Category) during reception.
- **Instant Billing**: Integrated payment status tracking and manual settlement logs.
- **Follow-up Booking**: One-click future appointment scheduling (3 months, 6 months, etc.).

3. Patient CRM & Electronic Health Records (EHR)
- **Centralized Patient Database**: Unified records with source-based filtering for marketing analysis.
- **Visit History & Notes**: Secure storage for visit logs, doctor’s private notes, and medical attachments (MRI, X-Rays).

4. Financial Analytics & Communication
- **Revenue Dashboard**: Daily and monthly income tracking with success/fail transaction logs.
- **Doctor-Patient Messaging**: Integrated chat system for medical consultations and file sharing.

📝 Notes for Backend Developers
- **API Architecture**: All components are currently fed by Mock Data. RESTful endpoints for `POST` (Reception/Booking) and `GET` (Availability/Finance) are required.
- **Slot Conflict Management**: The backend must calculate real-time availability by intersecting working hours with existing bookings from all sources.
- **Synchronization**: An inbound sync service or Webhook handler is needed to monitor and reflect bookings made on 3rd-party platforms.
- **Authentication**: Implementation of a mobile-based OTP (One-Time Password) system is necessary for patient and admin login.

📦 Getting Started
1. Install dependencies:
```bash
npm install
