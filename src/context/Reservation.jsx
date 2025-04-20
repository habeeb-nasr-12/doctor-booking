import { notification } from "antd";
import { createContext, useReducer } from "react";
import { getLocalStorageItem, updateLocalStorage } from "../lib/utils";

export const reservationContext = createContext();

const initialState = {
  reservation: getLocalStorageItem("reservation", JSON.parse) || [],
};

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "ADD_RESERVATION":
      const reservationData = {
        ...action.payload,
      };

      const existingReservation = state.reservation.some(
        (res) =>
          res.date === reservationData.date && res.time === reservationData.time
      );

      const existingDoctorReservation = state.reservation.some(
        (res) => res.id === reservationData.id
      );

      if (existingReservation) {
        notification.error({
          message: "Reservation failed",
          description: "This time slot is already booked",
          duration: 3,
          placement: "topRight",
          role: "alert",
          onClick: () => notification.destroy(),
          onClose: () => {
            window.announcer?.("Error notification closed");
          },
        });
        return state;
      }

      if (existingDoctorReservation) {
        notification.error({
          message: "Reservation failed",
          description: "You already have an appointment with this doctor",
          duration: 3,
          placement: "topRight",
          role: "alert",
          onClick: () => notification.destroy(),
          onClose: () => {
            window.announcer?.("Error notification closed");
          },
        });
        return state;
      }

      notification.success({
        message: "Appointment booked successfully!",
        description: "You have successfully booked an appointment.",
        duration: 3,
        placement: "topRight",
        role: "status",
        onClick: () => notification.destroy(),
        onClose: () => {
          window.announcer?.("Success notification closed");
        },
      });
      delete reservationData.timeSlots;
      newState = {
        reservation: [...state.reservation, reservationData],
      };
      break;

    case "DELETE_RESERVATION":
      const deleteDate = action.payload.date;
      const deleteTime = action.payload.time;

      newState = {
        reservation: state.reservation.filter(
          (res) => !(res.date === deleteDate && res.time === deleteTime)
        ),
      };

      notification.success({
        message: "Reservation cancelled successfully",
        description: "Your appointment has been cancelled.",
        duration: 3,
        placement: "topRight",
        role: "status",
        onClick: () => notification.destroy(),
        onClose: () => {
          window.announcer?.("Success notification closed");
        },
      });
      break;

    default:
      return state;
  }

  updateLocalStorage("reservation", newState.reservation);
  return newState;
};

const ReservationContextProvider = ({ children }) => {
  const [reservationState, dispatch] = useReducer(reducer, initialState);

  const addReservation = (reservation) => {
    dispatch({
      type: "ADD_RESERVATION",
      payload: reservation,
    });
  };

  const cancelReservation = (reservation) => {
    dispatch({
      type: "DELETE_RESERVATION",
      payload: reservation,
    });
  };

  return (
    <reservationContext.Provider
      value={{
        reservations: reservationState.reservation,
        addReservation,
        cancelReservation,
      }}
    >
      {children}
    </reservationContext.Provider>
  );
};

export default ReservationContextProvider;
