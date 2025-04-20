import { Button, Card, Tag } from "antd";
import React, { useContext } from "react";
import { getDayLabel } from "../../lib/utils";
import { reservationContext } from "../../context/Reservation";
import Image from "../layout/Image";

const ReservationCard = ({ item }) => {
  const { cancelReservation } = useContext(reservationContext);
  return (
    <div role="article" aria-label={`Appointment reservation for ${item.name}`}>
      <Card
        key={item.id}
        className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-0"
        bodyStyle={{ padding: 0 }}
        role="region"
        aria-label="Reservation details"
      >
        <div className="flex p-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              alt={`Profile picture of Dr. ${item.name}`}
              src={item.image}
              effect="blur"
              className="w-24 h-24 object-cover rounded-lg"
              role="img"
            />
            <div className="absolute -top-2 -right-2">
              <Tag
                color={item.availability === "Available" ? "green" : "red"}
                className="px-2 py-0.5 rounded-full text-xs"
                role="status"
                aria-label={`Doctor status: ${item.availability}`}
              >
                {item.availability}
              </Tag>
            </div>
          </div>

          <div className="ml-4 flex-grow">
            <h2 
              className="text-lg font-bold text-gray-800 mb-2"
              tabIndex="0"
            >
              {item.name}
            </h2>
            <p 
              className="text-sm text-gray-600 mb-1"
              tabIndex="0"
              aria-label={`Specialty: ${item.specialty}`}
            >
              <span 
                className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"
                aria-hidden="true"
              ></span>
              {item.specialty}
            </p>
            <p 
              className="text-sm text-gray-600 mb-1"
              tabIndex="0"
              aria-label={`Location: ${item.location}`}
            >
              <span 
                className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"
                aria-hidden="true"
              ></span>
              {item.location}
            </p>
          </div>
        </div>

        <div 
          className="border-t border-gray-100 p-4 bg-gray-50"
          role="region"
          aria-label="Appointment details and actions"
        >
          <div 
            className="flex justify-between items-center mb-3"
            role="group"
            aria-label="Appointment schedule"
          >
            <div 
              className="text-sm text-gray-600"
              tabIndex="0"
              aria-label={`Appointment date: ${getDayLabel(item.date)}, ${item.date}`}
            >
              <span 
                className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"
                aria-hidden="true"
              ></span>
              {getDayLabel(item.date)}: {item.date}
            </div>
            <div 
              className="text-sm text-gray-600"
              tabIndex="0"
              aria-label={`Appointment time: ${item.time}`}
            >
              <span 
                className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2"
                aria-hidden="true"
              ></span>
              {item.time}
            </div>
          </div>
          <Button
            danger
            block
            onClick={() => cancelReservation(item)}
            className="rounded-lg h-8 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            aria-label={`Cancel appointment with ${item.name}`}
          >
            Cancel Appointment
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReservationCard;