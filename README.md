# Doctor Booking UI Module

A fully responsive and accessible doctor appointment booking UI built with React, Vite, TailwindCSS, and Ant Design.

## 🚀 Project Features

- Doctor directory listing (mock data)
- Multi filtering options (specialty, name , rate , availability)
- Booking modal with available time slots
- the user cannot book a time slot that is already booked or a doctor is already booked.
- Confirmation modal after booking
- Viewing confirmed appointments
- Responsive design across mobile, tablet, and desktop
- Accessibility optimized (keyboard navigation, aria labels)
- live version passed lighthouse 

---

## 🛠️ Setup Instructions

Follow these steps to run the project locally:

1. **Clone the repository:**
git clone https://github.com/habeeb-nasr-12/doctor-booking.git
cd doctor-booking
Install dependencies:
<br/>
npm install
<br/>
Start the development server:
<br/>
npm run dev
<br/>
Run the test suite:
<br/>
npm run test
<br/>
Note: Make sure you have Node.js and npm installed.

🤖 How I Used AI Tools
Generated mock doctor data (names, specialties, availability, locations).

Created random available time slots for doctors.

Optimized code readability with AI.

fix test case issues.

⚡ Known Limitations / Next Steps
Authentication:
Currently, any user can book an appointment without authentication.
➔ Next step: Implement user authentication and authorization.

Payments Integration:
No payment system is implemented yet.
➔ Next step: Add a payment gateway to allow users to pay for reservations.

Backend Integration:
All data is mocked and stored locally.
➔ Future enhancement: Connect to a real backend API for live data management.

