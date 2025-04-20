import React, { useContext, useState } from "react";
import { Modal, Button, notification } from "antd";
import { getDayLabel } from "../../lib/utils";
import { reservationContext } from "../../context/Reservation";
import Image from "../layout/Image";

const BookModal = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addReservation } = useContext(reservationContext);

  const showModal = () => {
    if (doctor.availability !== "Available") {
      notification.warning({
        message: "Doctor is not available for booking.",
        description: "Please choose another doctor.",
        placement: "topRight",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!selectedSlot) {
      notification.error({
        message: "Please select a time slot.",
        description: "Please choose a time slot to book an appointment.",
        placement: "topRight",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      addReservation({
        ...doctor,
        date: selectedSlot.date,
        time: selectedSlot.time,
      });
      setIsLoading(false);
      setIsModalOpen(false);
      setSelectedSlot(null);
    }, 500);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div role="region" aria-label="Appointment booking section">
      <Button
        type="primary"
        block
        className="mt-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm font-medium rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={doctor.availability !== "Available"}
        onClick={showModal}
        aria-label={`Book appointment with ${doctor.name}`}
        aria-disabled={doctor.availability !== "Available"}
      >
        Book Appointment
      </Button>
      <Modal
        title={`Book Appointment with Dr. ${doctor.name}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm Booking"
        cancelText="Cancel"
        confirmLoading={isLoading}
        maskClosable={false}
        closeIcon={<span aria-label="Close modal">×</span>}
        aria-describedby="modal-description"
      >
        <div className="flex flex-col gap-4" id="modal-description">
          <Image
            alt={`Profile picture of Dr. ${doctor.name}`}
            src={doctor.image}
            effect="blur"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            role="img"
          />
          <h4 
            className="text-sm font-semibold text-gray-700 mb-2 text-center"
            tabIndex="0"
          >
            Select a Time Slot
          </h4>
          <div 
            className="grid grid-cols-2 gap-2"
            role="radiogroup"
            aria-label="Available appointment time slots"
          >
            {doctor?.timeSlots?.length > 0 ? (
              doctor.timeSlots.map((slot, index) => (
                <Button
                  key={index}
                  type={
                    selectedSlot?.time === slot.time &&
                    selectedSlot?.date === slot.date
                      ? "primary"
                      : "default"
                  }
                  onClick={() => setSelectedSlot(slot)}
                  className="text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={isLoading}
                  role="radio"
                  aria-checked={
                    selectedSlot?.time === slot.time &&
                    selectedSlot?.date === slot.date
                  }
                  aria-label={`Select appointment for ${getDayLabel(slot.date)} at ${slot.time}`}
                >
                  {getDayLabel(slot.date)} : {slot.time}
                </Button>
              ))
            ) : (
              <p 
                className="text-gray-500 text-xs col-span-2"
                role="alert"
                aria-live="polite"
              >
                No available time slots.
              </p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookModal;