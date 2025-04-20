import React, { useContext } from "react";
import { Empty } from "antd";
import { reservationContext } from "../context/Reservation";
import ReservationCard from "../Components/reservation/ReservationCard";

const Appointments = () => {
  const { reservations } = useContext(reservationContext);

  return (
    <main 
      className="min-h-screen bg-gray-50 p-6"
      role="main"
      aria-label="Appointments page"
    >
      <h1 
        className="text-3xl my-10 font-bold text-center text-blue-600 mb-10"
        tabIndex="0"
      >
         Appointments Summary
      </h1>
      
      {reservations.length === 0 ? (
        <div 
          className="flex justify-center items-center py-16"
          role="region"
          aria-label="Empty appointments state"
        >
          <Empty 
            description={
              <span 
                className="text-gray-500 text-lg"
                role="status"
                aria-live="polite"
              >
                No Appointments Found
              </span>
            }
          />
        </div>
      ) : (
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="List of appointments"
        >
          {reservations?.map((item) => (
            <div key={item.id} role="listitem">
              <ReservationCard item={item} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Appointments;