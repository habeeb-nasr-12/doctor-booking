import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { reservationContext as ReservationContext } from '../../../context/Reservation';
import React from 'react';
import DoctorCard from './Doctorcard';

describe('DoctorCard Component', () => {
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

  const mockReservationContext = {
    addReservation: () => {},
    cancelReservation: () => {},
    reservations: []
  };

  const renderWithContext = (component) => {
    return render(
      <ReservationContext.Provider value={mockReservationContext}>
        {component}
      </ReservationContext.Provider>
    );
  };

  it('renders doctor information correctly', () => {
    renderWithContext(<DoctorCard doctor={mockDoctor} />);
    
    expect(screen.getByText(mockDoctor.name)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.specialty)).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('handles booking appointment click', () => {
    renderWithContext(<DoctorCard doctor={mockDoctor} />);
    
    const bookButton = screen.getByRole('button', { name: /book appointment/i });
    expect(bookButton).toBeInTheDocument();
  });

  it('displays rating correctly', () => {
    renderWithContext(<DoctorCard doctor={mockDoctor} />);
    
    const ratingContainer = screen.getByRole('group', { name: /doctor rating/i });
    expect(ratingContainer).toBeInTheDocument();
  });
});