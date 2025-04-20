import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/layout/Navbar";
import "@ant-design/v5-patch-for-react-19";
import "./App.css";
import ReservationContextProvider from "./context/Reservation";
import React, { Suspense } from "react";
import AppSkeleton from "./Components/layout/AppSkeleton";
import ErrorBoundary from "./Components/layout/Error";

const Home = React.lazy(() => import("./pages/Home"));
const Appointments = React.lazy(() => import("./pages/Appointments"));

function App() {
  return (
    <div
      className="min-h-screen bg-gray-100"
      role="application"
      aria-label="Doctor Booking Application"
    >
      <ReservationContextProvider>
        <Navbar />
        <main
          id="main-content"
          className="py-4"
          role="main"
          aria-label="Main content"
        >
          <Suspense fallback={<AppSkeleton />}>
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <Home />{" "}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/appointments"
                element={
                  <ErrorBoundary>
                    <Appointments />{" "}
                  </ErrorBoundary>
                }
                errorElement={<ErrorBoundary />}
              />
            </Routes>
          </Suspense>
        </main>
      </ReservationContextProvider>
    </div>
  );
}
export default App;
