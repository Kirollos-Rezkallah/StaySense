export const bookingGuestOptions = [1, 2, 3, 4, 5, 6];

export const paymentMethods = [
  { id: 'visa', label: 'Visa', type: 'card' },
  { id: 'mastercard', label: 'Mastercard', type: 'card' },
  { id: 'mir', label: 'МИР', type: 'card' },
  { id: 'paypal', label: 'PayPal', type: 'wallet' },
  { id: 'alipay', label: 'Alipay', type: 'wallet' },
];

export function getDefaultBookingDates() {
  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 7);

  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + 3);

  return {
    checkIn: formatDateInputValue(checkInDate),
    checkOut: formatDateInputValue(checkOutDate),
  };
}

export function calculateBookingPricing(startingPrice, checkIn, checkOut, guests = 1) {
  const nights = getNightCount(checkIn, checkOut);
  const subtotal = startingPrice * nights;
  const serviceFee = Math.round(subtotal * 0.08);
  const cityTax = Math.max(18, guests * nights * 6);
  const total = subtotal + serviceFee + cityTax;

  return {
    baseNightlyRate: startingPrice,
    cityTax,
    guests,
    nights,
    serviceFee,
    subtotal,
    total,
  };
}

export function getNightCount(checkIn, checkOut) {
  const start = parseDateInput(checkIn);
  const end = parseDateInput(checkOut);

  if (!start || !end) {
    return 0;
  }

  const differenceInMs = end.getTime() - start.getTime();
  return Math.round(differenceInMs / (1000 * 60 * 60 * 24));
}

export function formatBookingDate(dateValue) {
  const date = parseDateInput(dateValue);

  if (!date) {
    return 'Select a date';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function isDateRangeValid(checkIn, checkOut) {
  return getNightCount(checkIn, checkOut) > 0;
}

export function validateBookingSelection({ checkIn, checkOut, guests }) {
  if (!checkIn) {
    return 'Choose a check-in date.';
  }

  if (!checkOut) {
    return 'Choose a check-out date.';
  }

  if (!isDateRangeValid(checkIn, checkOut)) {
    return 'Check-out needs to be after check-in.';
  }

  const numericGuests = Number(guests);
  if (!Number.isFinite(numericGuests) || numericGuests < 1) {
    return 'Select at least one guest.';
  }

  return '';
}

export function getPaymentMethod(paymentMethodId) {
  return paymentMethods.find((method) => method.id === paymentMethodId) || paymentMethods[0];
}

export function formatCardNumberInput(value) {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
  return digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function sanitizeCardNumberInput(value) {
  return value.replace(/\D/g, '').slice(0, 16);
}

export function formatExpiryInput(value) {
  const digitsOnly = sanitizeExpiryInput(value);

  if (digitsOnly.length <= 2) {
    return digitsOnly;
  }

  return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}`;
}

export function sanitizeExpiryInput(value) {
  return value.replace(/\D/g, '').slice(0, 4);
}

export function sanitizeSecurityCodeInput(value) {
  return value.replace(/\D/g, '').slice(0, 3);
}

export function isFutureExpiryValue(value) {
  const digitsOnly = sanitizeExpiryInput(value);

  if (digitsOnly.length !== 4) {
    return false;
  }

  const month = Number(digitsOnly.slice(0, 2));
  const year = Number(digitsOnly.slice(2, 4));

  if (month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  return year > currentYear || (year === currentYear && month >= currentMonth);
}

export function getReservationStatusMeta(reservation) {
  const checkInDate = parseDateInput(reservation.checkIn);
  const checkOutDate = parseDateInput(reservation.checkOut);
  const today = startOfToday();

  if (reservation.status === 'cancelled') {
    return {
      canCancel: false,
      helperText: getRefundStatusLabel(reservation),
      label: 'Cancelled',
      tone: 'default',
    };
  }

  if (checkOutDate && checkOutDate < today) {
    return {
      canCancel: false,
      helperText: 'Completed stay',
      label: 'Completed',
      tone: 'default',
    };
  }

  if (checkInDate && checkInDate > today) {
    return {
      canCancel: true,
      helperText: 'Eligible for cancellation',
      label: 'Upcoming',
      tone: 'accent',
    };
  }

  return {
    canCancel: false,
    helperText: 'Stay in progress',
    label: 'In stay',
    tone: 'default',
  };
}

export function getRefundStatusLabel(reservation) {
  if (reservation.status !== 'cancelled') {
    return '';
  }

  const cancelledAt = parseDateTimeValue(reservation.cancelledAt);

  if (!cancelledAt) {
    return 'Refund in progress';
  }

  const hoursSinceCancellation = (Date.now() - cancelledAt.getTime()) / (1000 * 60 * 60);
  return hoursSinceCancellation >= 24 ? 'Refund issued' : 'Refund in progress';
}

function parseDateInput(value) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateInputValue(date) {
  return date.toISOString().slice(0, 10);
}

function parseDateTimeValue(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}
