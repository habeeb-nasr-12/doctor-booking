import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookModal from './BookModal';
import { reservationContext as ReservationContext } from '../../../context/Reservation';
import React from 'react';

describe('BookModal Component', () => {
  const mockDoctor = {
    id: 4,
    name: "Dr. Robert Chen",
    specialty: "Cardiologist",
    availability: "Available",
    location: "Boston, MA",
    rating: 5,
    timeSlots: [
      { date: '2024-03-20', time: '9:00 AM' },
      { date: '2024-03-21', time: '10:00 AM' }
    ],
    image: 'test-image-url'
  };

  const mockAddReservation = vi.fn();
  const mockReservationContext = {
    addReservation: mockAddReservation,
    reservations: []
  };

  const renderWithContext = (component) => {
    return render(
      <ReservationContext.Provider value={mockReservationContext}>
        {component}
      </ReservationContext.Provider>
    );
  };

  it('renders book appointment button', () => {
    renderWithContext(<BookModal doctor={mockDoctor} />);
    const bookButton = screen.getByRole('button', { name: /book appointment/i });
    expect(bookButton).toBeInTheDocument();
  });

  it('opens modal when button is clicked', () => {
    renderWithContext(<BookModal doctor={mockDoctor} />);
    const bookButton = screen.getByRole('button', { name: /book appointment/i });
    fireEvent.click(bookButton);
    expect(screen.getByText(`Book Appointment with Dr. ${mockDoctor.name}`)).toBeInTheDocument();
  });

  it('displays time slots in modal', () => {
    renderWithContext(<BookModal doctor={mockDoctor} />);
    const bookButton = screen.getByRole('button', { name: /book appointment/i });
    fireEvent.click(bookButton);
    mockDoctor.timeSlots.forEach(slot => {
      expect(screen.getByText(new RegExp(`${slot.time}`, 'i'))).toBeInTheDocument();
    });
  });

  it('disables book button when doctor is unavailable', () => {
    const unavailableDoctor = { ...mockDoctor, availability: 'Unavailable' };
    renderWithContext(<BookModal doctor={unavailableDoctor} />);
    const bookButton = screen.getByRole('button', { name: /book appointment/i });
    expect(bookButton).toBeDisabled();
  });

  it('handles confirmation when slot is selected', async () => {
    renderWithContext(<BookModal doctor={mockDoctor} />);
    const bookButton = screen.getByRole('button', { name: /book appointment/i });
    fireEvent.click(bookButton);
    const timeSlot = mockDoctor.timeSlots[0];
    const slotButton = screen.getByText(new RegExp(`${timeSlot.time}`, 'i'));
    fireEvent.click(slotButton);
    const confirmButton = screen.getByText(/confirm booking/i);
    fireEvent.click(confirmButton);
    await new Promise(resolve => setTimeout(resolve, 600));
    expect(mockAddReservation).toHaveBeenCalledWith({
      ...mockDoctor,
      date: timeSlot.date,
      time: timeSlot.time
    });
  });
});