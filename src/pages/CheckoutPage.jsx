import { useMemo, useState } from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { LuBadgeCheck, LuCalendarRange, LuCreditCard, LuMapPin, LuShieldCheck, LuUser } from 'react-icons/lu';
import { SiAlipay, SiMastercard, SiPaypal, SiVisa } from 'react-icons/si';
import { getHotelById } from '../data/hotels';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import useAuth from '../hooks/useAuth';
import useBooking from '../hooks/useBooking';
import {
  formatCardNumberInput,
  formatBookingDate,
  formatExpiryInput,
  getPaymentMethod,
  isFutureExpiryValue,
  paymentMethods,
  sanitizeCardNumberInput,
  sanitizeExpiryInput,
  sanitizeSecurityCodeInput,
} from '../utils/booking';
import appStyles from './AppPage.module.css';
import styles from './CheckoutPage.module.css';

const paymentIcons = {
  alipay: SiAlipay,
  mastercard: SiMastercard,
  mir: LuCreditCard,
  paypal: SiPaypal,
  visa: SiVisa,
};

function CheckoutPage() {
  const { currentUser } = useAuth();
  const { bookingDraft, clearConfirmedBooking, confirmedBooking, confirmBooking } = useBooking();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);
  const [formState, setFormState] = useState({
    accountEmail: currentUser.email,
    billingCountry: 'Russia',
    cardNumber: '',
    cardholderName: currentUser.name,
    expiryDate: '',
    securityCode: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeBooking = bookingDraft || confirmedBooking;
  const hotel = activeBooking ? getHotelById(activeBooking.hotelId) : null;
  const paymentMethod = getPaymentMethod(selectedPaymentMethod);

  const validationErrors = useMemo(
    () => validateCheckoutForm(formState, paymentMethod.type),
    [formState, paymentMethod.type],
  );
  const isFormValid = Object.keys(validationErrors).length === 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === 'cardNumber') {
      nextValue = sanitizeCardNumberInput(value);
    }

    if (name === 'expiryDate') {
      nextValue = sanitizeExpiryInput(value);
    }

    if (name === 'securityCode') {
      nextValue = sanitizeSecurityCodeInput(value);
    }

    setFormState((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitError('');
  };

  const handlePaymentMethodChange = (paymentMethodId) => {
    setSelectedPaymentMethod(paymentMethodId);
    setSubmitError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!bookingDraft || !hotel) {
      setSubmitError('Your reservation details are no longer active.');
      return;
    }

    setErrors(validationErrors);
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      confirmBooking({
        guestDetails: {
          fullName: formState.cardholderName.trim(),
        },
        paymentDetails: {
          billingCountry: formState.billingCountry.trim(),
          cardholderName: formState.cardholderName.trim(),
          maskedAccount:
            paymentMethod.type === 'card'
              ? formatMaskedCardNumber(formState.cardNumber)
              : formState.accountEmail.trim(),
          method: paymentMethod,
        },
      });
      setSubmitError('');
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!activeBooking || !hotel) {
    return (
      <div className={`container ${appStyles.page}`}>
        <Card className={appStyles.heroCard}>
          <Badge>Reservation not active</Badge>
          <h1 className={appStyles.heroTitle}>Choose your stay again to continue to checkout.</h1>
          <p className={appStyles.heroText}>
            Reservation details are kept only for the active session, so you may need to return to
            the hotel page and select your dates again.
          </p>
          <Button to="/explore">Browse hotels</Button>
        </Card>
      </div>
    );
  }

  if (confirmedBooking) {
    return (
      <div className={`container ${appStyles.page}`}>
          <Card className={styles.successCard} elevated>
            <Badge tone="success">Reservation confirmed</Badge>
            <div className={styles.successIcon}>
              <HiOutlineCheckCircle />
            </div>
            <h1 className={appStyles.heroTitle}>Your stay at {hotel.name} is confirmed.</h1>
            <p className={appStyles.heroText}>
              A confirmation email would normally be sent right away. Your reservation reference is{' '}
              <strong>{confirmedBooking.reservationReference}</strong>.
            </p>

            <div className={styles.successGrid}>
              <div className={styles.successItem}>
                <LuCalendarRange />
                <div>
                  <strong>
                    {formatBookingDate(confirmedBooking.checkIn)} -{' '}
                    {formatBookingDate(confirmedBooking.checkOut)}
                  </strong>
                  <span>{confirmedBooking.pricing.nights} nights</span>
                </div>
              </div>
              <div className={styles.successItem}>
                <LuUser />
                <div>
                  <strong>{confirmedBooking.guests} guest{confirmedBooking.guests > 1 ? 's' : ''}</strong>
                  <span>Lead guest: {confirmedBooking.guestDetails.fullName}</span>
                </div>
              </div>
              <div className={styles.successItem}>
                <LuBadgeCheck />
                <div>
                  <strong>${confirmedBooking.pricing.total}</strong>
                  <span>{confirmedBooking.paymentDetails.method.label}</span>
                </div>
              </div>
            </div>

            <div className={appStyles.buttonRow}>
              <Button to={`/hotels/${hotel.id}`}>Back to hotel details</Button>
              <Button
                to="/recommendations"
                variant="secondary"
                onClick={clearConfirmedBooking}
              >
                Find another stay
              </Button>
            </div>
          </Card>
      </div>
    );
  }

  return (
    <div className={`container ${appStyles.page}`}>
        <Card className={appStyles.heroCard} elevated>
          <Badge tone="accent">Checkout</Badge>
          <h1 className={appStyles.heroTitle}>Review your stay and complete the reservation.</h1>
          <p className={appStyles.heroText}>
            Confirm the dates, guest count, and payment details to hold your room at {hotel.name}.
          </p>
        </Card>

      <div className={styles.layout}>
          <Card className={styles.summaryCard}>
            <div className={styles.hotelSummary}>
              <img className={styles.hotelImage} src={hotel.image} alt={hotel.name} />
              <div>
                <Badge tone="accent">{hotel.city}, {hotel.country}</Badge>
                <h2>{hotel.name}</h2>
                <p>
                  <LuMapPin /> {hotel.locationDescription}
                </p>
              </div>
            </div>

            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span>Check-in</span>
                <strong>{formatBookingDate(activeBooking.checkIn)}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Check-out</span>
                <strong>{formatBookingDate(activeBooking.checkOut)}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Guests</span>
                <strong>{activeBooking.guests}</strong>
              </div>
            </div>

            <div className={styles.priceBreakdown}>
              <div>
                <span>${activeBooking.pricing.baseNightlyRate} x {activeBooking.pricing.nights} nights</span>
                <strong>${activeBooking.pricing.subtotal}</strong>
              </div>
              <div>
                <span>Service fee</span>
                <strong>${activeBooking.pricing.serviceFee}</strong>
              </div>
              <div>
                <span>City taxes</span>
                <strong>${activeBooking.pricing.cityTax}</strong>
              </div>
              <div className={styles.totalRow}>
                <span>Total</span>
                <strong>${activeBooking.pricing.total}</strong>
              </div>
            </div>
          </Card>

          <Card className={styles.checkoutCard}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.sectionHeader}>
                <h2>Payment details</h2>
                <p>Choose how you would like to pay and review the billing information.</p>
              </div>

              <div className={styles.paymentGrid}>
                {paymentMethods.map((method) => {
                  const Icon = paymentIcons[method.id] || LuCreditCard;
                  const isSelected = selectedPaymentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      className={`${styles.paymentOption} ${
                        isSelected ? styles.paymentOptionActive : ''
                      }`}
                      onClick={() => handlePaymentMethodChange(method.id)}
                    >
                      <Icon />
                      <span>{method.label}</span>
                    </button>
                  );
                })}
              </div>

              <InputField
                id="checkout-cardholder"
                label={paymentMethod.type === 'card' ? 'Cardholder name' : 'Account holder'}
                name="cardholderName"
                value={formState.cardholderName}
                onChange={handleChange}
                error={errors.cardholderName}
                autoComplete="cc-name"
              />

              {paymentMethod.type === 'card' ? (
                <>
                  <InputField
                    id="checkout-card-number"
                    label="Card number"
                    name="cardNumber"
                    value={formatCardNumberInput(formState.cardNumber)}
                    onChange={handleChange}
                    error={errors.cardNumber}
                    placeholder="0000 0000 0000 0000"
                    autoComplete="cc-number"
                    inputMode="numeric"
                    maxLength={19}
                  />

                  <div className={styles.inlineGrid}>
                    <InputField
                      id="checkout-expiry"
                      label="Expiry date"
                      name="expiryDate"
                      value={formatExpiryInput(formState.expiryDate)}
                      onChange={handleChange}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      inputMode="numeric"
                      maxLength={5}
                    />
                    <InputField
                      id="checkout-cvc"
                      label="Security code"
                      name="securityCode"
                      value={formState.securityCode}
                      onChange={handleChange}
                      error={errors.securityCode}
                      placeholder="CVC"
                      autoComplete="cc-csc"
                      inputMode="numeric"
                      maxLength={3}
                    />
                  </div>
                </>
              ) : (
                <InputField
                  id="checkout-account-email"
                  label={`${paymentMethod.label} account email`}
                  name="accountEmail"
                  value={formState.accountEmail}
                  onChange={handleChange}
                  error={errors.accountEmail}
                  type="email"
                  autoComplete="email"
                />
              )}

              <InputField
                id="checkout-country"
                label="Billing country or region"
                name="billingCountry"
                value={formState.billingCountry}
                onChange={handleChange}
                error={errors.billingCountry}
              />

              {submitError ? <p className={appStyles.errorMessage}>{submitError}</p> : null}

              <div className={styles.checkoutFooter}>
                <div className={styles.securityNote}>
                  <LuShieldCheck />
                  <span>Payment details stay in this session only and are not saved after refresh.</span>
                </div>
                <div className={appStyles.buttonRow}>
                  <Button to={`/hotels/${hotel.id}`} variant="ghost">
                    Back to hotel
                  </Button>
                  <Button type="submit" disabled={!isFormValid || isSubmitting}>
                    {isSubmitting ? 'Confirming...' : 'Confirm reservation'}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
      </div>
    </div>
  );
}

function validateCheckoutForm(formState, paymentType) {
  const nextErrors = {};

  if (!formState.cardholderName.trim()) {
    nextErrors.cardholderName = 'Enter the full name on the reservation.';
  }

  if (!formState.billingCountry.trim()) {
    nextErrors.billingCountry = 'Choose a billing country or region.';
  }

  if (paymentType === 'card') {
    if (formState.cardNumber.length < 13) {
      nextErrors.cardNumber = 'Enter a valid card number.';
    }

    if (formState.expiryDate.length !== 4) {
      nextErrors.expiryDate = 'Use MM/YY format.';
    } else if (!isFutureExpiryValue(formState.expiryDate)) {
      nextErrors.expiryDate = 'Use a valid future date.';
    }

    if (!/^\d{3}$/.test(formState.securityCode.trim())) {
      nextErrors.securityCode = 'Enter a valid security code.';
    }
  } else {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.accountEmail.trim())) {
      nextErrors.accountEmail = `Use the email linked to your ${paymentType === 'wallet' ? 'payment account' : 'booking'}.`;
    }
  }

  return nextErrors;
}

function formatMaskedCardNumber(value) {
  const digitsOnly = value.replace(/\D/g, '');
  const lastFourDigits = digitsOnly.slice(-4) || '0000';
  return `**** ${lastFourDigits}`;
}

function maskCardNumber(value) {
  const digitsOnly = value.replace(/\D/g, '');
  const lastFourDigits = digitsOnly.slice(-4) || '0000';
  return `•••• ${lastFourDigits}`;
}

export default CheckoutPage;
