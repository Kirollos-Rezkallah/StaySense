import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { calculateBookingPricing } from '../utils/booking';

export const BookingContext = createContext(null);
const RESERVATION_HISTORY_STORAGE_KEY = 'staysense.reservations';

function getStoredReservationHistory() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const savedReservations = window.localStorage.getItem(RESERVATION_HISTORY_STORAGE_KEY);
    const parsedReservations = savedReservations ? JSON.parse(savedReservations) : [];
    return Array.isArray(parsedReservations) ? parsedReservations : [];
  } catch {
    return [];
  }
}

export function BookingProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const [bookingDraft, setBookingDraft] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [reservationHistory, setReservationHistory] = useState(getStoredReservationHistory);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      RESERVATION_HISTORY_STORAGE_KEY,
      JSON.stringify(reservationHistory),
    );
  }, [reservationHistory]);

  const startBooking = ({ hotel, checkIn, checkOut, guests }) => {
    const pricing = calculateBookingPricing(hotel.startingPrice, checkIn, checkOut, guests);
    const nextBookingDraft = {
      checkIn,
      checkOut,
      createdAt: new Date().toISOString(),
      guests: Number(guests),
      hotelId: hotel.id,
      hotelSnapshot: {
        city: hotel.city,
        country: hotel.country,
        image: hotel.image,
        name: hotel.name,
      },
      pricing,
    };

    setBookingDraft(nextBookingDraft);
    setConfirmedBooking(null);
    return nextBookingDraft;
  };

  const confirmBooking = ({ guestDetails, paymentDetails }) => {
    if (!bookingDraft) {
      throw new Error('Your reservation details are no longer active.');
    }

    if (!currentUser) {
      throw new Error('Sign in to confirm your reservation.');
    }

    const reservationReference = `SS-${Date.now().toString().slice(-8)}`;
    const hotelSnapshot = bookingDraft.hotelSnapshot || {};
    const nextConfirmedBooking = {
      ...bookingDraft,
      confirmedAt: new Date().toISOString(),
      guestDetails,
      paymentDetails,
      reservationReference,
    };
    const nextReservationSummary = {
      checkIn: bookingDraft.checkIn,
      checkOut: bookingDraft.checkOut,
      cancelledAt: null,
      city: hotelSnapshot.city || '',
      country: hotelSnapshot.country || '',
      createdAt: nextConfirmedBooking.confirmedAt,
      guests: bookingDraft.guests,
      hotelId: bookingDraft.hotelId,
      hotelImage: hotelSnapshot.image || '',
      hotelName: hotelSnapshot.name || 'Reserved stay',
      paymentMethodLabel: paymentDetails.method.label,
      reservationReference,
      status: 'confirmed',
      total: bookingDraft.pricing.total,
      userId: currentUser.id,
    };

    setConfirmedBooking(nextConfirmedBooking);
    setBookingDraft(null);
    setReservationHistory((currentHistory) => [nextReservationSummary, ...currentHistory]);
    return nextConfirmedBooking;
  };

  const clearBookingDraft = () => setBookingDraft(null);
  const clearConfirmedBooking = () => setConfirmedBooking(null);
  const cancelReservation = (reservationReference) => {
    if (!currentUser) {
      throw new Error('Sign in to manage your reservations.');
    }

    let didUpdate = false;

    setReservationHistory((currentHistory) =>
      currentHistory.map((reservation) => {
        if (
          reservation.reservationReference !== reservationReference ||
          reservation.userId !== currentUser.id ||
          reservation.status === 'cancelled'
        ) {
          return reservation;
        }

        didUpdate = true;
        return {
          ...reservation,
          cancelledAt: new Date().toISOString(),
          refundStatus: 'in_progress',
          status: 'cancelled',
        };
      }),
    );

    return didUpdate;
  };
  const getReservationsForUser = (userId) =>
    reservationHistory
      .filter((reservation) => reservation.userId === userId)
      .sort((firstReservation, secondReservation) =>
        secondReservation.createdAt.localeCompare(firstReservation.createdAt),
      );

  const value = useMemo(
    () => ({
      bookingDraft,
      clearBookingDraft,
      clearConfirmedBooking,
      cancelReservation,
      confirmedBooking,
      confirmBooking,
      getReservationsForUser,
      reservationHistory,
      startBooking,
    }),
    [bookingDraft, confirmedBooking, reservationHistory],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
