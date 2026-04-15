import { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiOutlineStar, HiOutlineXMark } from 'react-icons/hi2';
import { LuCalendarRange, LuMapPin, LuShieldCheck, LuUsers } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { getPriceLevelLabel } from '../data/hotelSeedUtils';
import { getHotelById } from '../data/hotels';
import HotelImage from '../components/hotels/HotelImage';
import ReviewCard from '../components/reviews/ReviewCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import useBooking from '../hooks/useBooking';
import useReviews from '../hooks/useReviews';
import { getHotelImageSources } from '../utils/hotelImages';
import {
  bookingGuestOptions,
  calculateBookingPricing,
  formatBookingDate,
  getDefaultBookingDates,
  validateBookingSelection,
} from '../utils/booking';
import appStyles from './AppPage.module.css';
import styles from './HotelDetailsPage.module.css';

function HotelDetailsPage() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const hotel = getHotelById(hotelId);
  const { startBooking } = useBooking();
  const { getHotelReviewAggregate, getReviewsForHotel } = useReviews();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingState, setBookingState] = useState(() => {
    const defaultDates = getDefaultBookingDates();
    return {
      ...defaultDates,
      guests: '2',
    };
  });
  const [bookingError, setBookingError] = useState('');

  const hotelReviews = hotel ? getReviewsForHotel(hotel.id) : [];
  const reviewAggregate = hotel
    ? getHotelReviewAggregate(hotel.id, hotel.reviewScore, hotel.reviewCount)
    : { averageScore: 0, totalCount: 0, localReviewCount: 0 };
  const bookingValidationMessage = hotel ? validateBookingSelection(bookingState) : '';
  const bookingPricing =
    hotel && !bookingValidationMessage
      ? calculateBookingPricing(
          hotel.startingPrice,
          bookingState.checkIn,
          bookingState.checkOut,
          Number(bookingState.guests),
        )
      : null;

  useEffect(() => {
    if (!isGalleryOpen || !hotel) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsGalleryOpen(false);
      }

      if (event.key === 'ArrowRight') {
        setActiveImageIndex((currentIndex) => (currentIndex + 1) % hotel.gallery.length);
      }

      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((currentIndex) =>
          (currentIndex - 1 + hotel.gallery.length) % hotel.gallery.length,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hotel, isGalleryOpen]);

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingState((current) => ({ ...current, [name]: value }));
    setBookingError('');
  };

  const handleReserve = (event) => {
    event.preventDefault();

    if (bookingValidationMessage) {
      setBookingError(bookingValidationMessage);
      return;
    }

    startBooking({
      checkIn: bookingState.checkIn,
      checkOut: bookingState.checkOut,
      guests: Number(bookingState.guests),
      hotel,
    });

    navigate('/checkout');
  };

  const openGallery = (imageIndex) => {
    setActiveImageIndex(imageIndex);
    setIsGalleryOpen(true);
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % hotel.gallery.length);
  };

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) =>
      (currentIndex - 1 + hotel.gallery.length) % hotel.gallery.length,
    );
  };

  if (!hotel) {
    return (
      <div className={`container ${appStyles.page}`}>
        <Card className={appStyles.heroCard}>
          <Badge>Not found</Badge>
          <h1 className={appStyles.heroTitle}>This hotel is not available.</h1>
          <p className={appStyles.heroText}>Return to exploration to browse another stay.</p>
          <Button to="/explore">Back to explore</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`container ${appStyles.page}`}>
      <div className={styles.layout}>
        <div className={styles.hero}>
          <Card className={styles.galleryCard} elevated>
            <button type="button" className={styles.imageButton} onClick={() => openGallery(0)}>
              <HotelImage
                className={styles.heroImage}
                sources={getHotelImageSources(hotel)}
                alt={hotel.name}
              />
              <span className={styles.imageHint}>Open gallery</span>
            </button>
            <div className={styles.thumbGrid}>
              {hotel.gallery.slice(1).map((imageUrl, index) => (
                <button
                  key={imageUrl}
                  type="button"
                  className={styles.thumbButton}
                  onClick={() => openGallery(index + 1)}
                >
                  <HotelImage
                    className={styles.thumb}
                    sources={[imageUrl, hotel.image, ...hotel.gallery]}
                    alt={`${hotel.name} gallery`}
                  />
                </button>
              ))}
            </div>
          </Card>

          <Card className={styles.summaryCard} elevated>
            <span className={styles.eyebrow}>Hotel details</span>
            <div>
              <h1 className={styles.title}>{hotel.name}</h1>
              <p className={styles.lead}>{hotel.description}</p>
            </div>

            <div className={styles.tagRow}>
              <Badge tone="accent">
                {hotel.city}, {hotel.country}
              </Badge>
              <Badge>{getPriceLevelLabel(hotel.priceLevel)}</Badge>
              <Badge>{hotel.starRating}-star stay</Badge>
            </div>

            <div className={styles.statRow}>
              <div className={styles.statItem}>
                <strong>${hotel.startingPrice}</strong>
                <span>Typical nightly starting rate</span>
              </div>
              <div className={styles.statItem}>
                <strong>{reviewAggregate.averageScore.toFixed(1)}</strong>
                <span>Guest review score</span>
              </div>
              <div className={styles.statItem}>
                <strong>{reviewAggregate.totalCount}</strong>
                <span>Total reviews considered</span>
              </div>
            </div>

            <p className={styles.lead}>
              <LuMapPin /> {hotel.locationDescription}
            </p>

            <div className={styles.ctaRow}>
              <Button to="/recommendations">Compare with recommendations</Button>
              <Button
                to={`/reviews/new?hotelId=${hotel.id}&returnTo=/hotels/${hotel.id}`}
                variant="secondary"
              >
                Write a review
              </Button>
            </div>
          </Card>
        </div>

        <div className={styles.grid}>
          <Card className={styles.sectionCard}>
            <h2>Overview</h2>
            <p>{hotel.description}</p>
            <ul className={styles.list}>
              <li>{hotel.locationDescription}</li>
              <li>
                {hotel.starRating}-star hospitality standard in the{' '}
                {getPriceLevelLabel(hotel.priceLevel).toLowerCase()} tier.
              </li>
              <li>Best suited to travelers looking for {hotel.tags.join(', ').toLowerCase()}.</li>
            </ul>
          </Card>

          <Card className={styles.sectionCard}>
            <h2>Features</h2>
            <div className={styles.featureGrid}>
              {hotel.features.map((feature) => (
                <span key={feature} className={styles.featurePill}>
                  {feature}
                </span>
              ))}
            </div>
          </Card>

          <Card className={`${styles.sectionCard} ${styles.bookingCard}`}>
            <div className={styles.bookingHeader}>
              <div>
                <h2>Reserve your stay</h2>
                <p>
                  Choose your dates, guest count, and continue to a streamlined checkout for{' '}
                  {hotel.name}.
                </p>
              </div>
              <Badge tone="accent">From ${hotel.startingPrice} per night</Badge>
            </div>

            <form className={styles.bookingForm} onSubmit={handleReserve} noValidate>
              <div className={styles.bookingFieldGrid}>
                <InputField
                  id="booking-check-in"
                  label="Check-in"
                  name="checkIn"
                  onChange={handleBookingChange}
                  type="date"
                  value={bookingState.checkIn}
                  description="Select your arrival date."
                />
                <InputField
                  id="booking-check-out"
                  label="Check-out"
                  name="checkOut"
                  onChange={handleBookingChange}
                  type="date"
                  value={bookingState.checkOut}
                  description="Choose when you plan to leave."
                />
                <InputField
                  as="select"
                  id="booking-guests"
                  label="Guests"
                  name="guests"
                  onChange={handleBookingChange}
                  value={bookingState.guests}
                  description="Rooms are assigned at checkout."
                >
                  {bookingGuestOptions.map((guestCount) => (
                    <option key={guestCount} value={guestCount}>
                      {guestCount} guest{guestCount > 1 ? 's' : ''}
                    </option>
                  ))}
                </InputField>
              </div>

              <div className={styles.bookingSnapshot}>
                <div className={styles.snapshotItem}>
                  <LuCalendarRange />
                  <div>
                    <span>Selected stay</span>
                    <strong>
                      {formatBookingDate(bookingState.checkIn)} -{' '}
                      {formatBookingDate(bookingState.checkOut)}
                    </strong>
                  </div>
                </div>
                <div className={styles.snapshotItem}>
                  <LuUsers />
                  <div>
                    <span>Guests</span>
                    <strong>
                      {bookingState.guests} guest{Number(bookingState.guests) > 1 ? 's' : ''}
                    </strong>
                  </div>
                </div>
              </div>

              <div className={styles.bookingSummary}>
                <div className={styles.summaryLine}>
                  <span>Nightly rate</span>
                  <strong>${hotel.startingPrice}</strong>
                </div>
                <div className={styles.summaryLine}>
                  <span>Nights</span>
                  <strong>{bookingPricing?.nights || 0}</strong>
                </div>
                <div className={styles.summaryLine}>
                  <span>Service fee</span>
                  <strong>${bookingPricing?.serviceFee || 0}</strong>
                </div>
                <div className={styles.summaryLine}>
                  <span>City taxes</span>
                  <strong>${bookingPricing?.cityTax || 0}</strong>
                </div>
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <strong>${bookingPricing?.total || 0}</strong>
                </div>
              </div>

              {bookingError ? <p className={appStyles.errorMessage}>{bookingError}</p> : null}

              <div className={styles.ctaRow}>
                <Button type="submit">Reserve now</Button>
                <p className={styles.bookingNote}>
                  You&apos;ll review guest and payment details on the next screen before confirming
                  the reservation.
                </p>
              </div>
            </form>
          </Card>

          <Card className={styles.sectionCard}>
            <h2>Review summary</h2>
            <div className={styles.reviewBox}>
              <div className={styles.reviewTop}>
                <div className={styles.reviewScore}>
                  <span className={styles.scoreNumber}>{reviewAggregate.averageScore.toFixed(1)}</span>
                  <div className={styles.reviewMeta}>
                    <strong>
                      <HiOutlineStar /> Highly rated by guests
                    </strong>
                    <span>
                      {reviewAggregate.totalCount} total reviews - {reviewAggregate.localReviewCount}{' '}
                      added in StaySense
                    </span>
                  </div>
                </div>
              </div>
              <p>{hotel.reviewSummary}</p>
            </div>
          </Card>

          <Card className={styles.sectionCard}>
            <h2>Reasons to choose</h2>
            <div className={styles.reasonList}>
              {hotel.reasonsToChoose.map((reason) => (
                <div key={reason} className={styles.reasonItem}>
                  <LuShieldCheck /> {reason}
                </div>
              ))}
            </div>

            <div className={styles.ctaRow}>
              <Button to="/explore" variant="ghost">
                Back to explore
              </Button>
              <Button to="/assistant" variant="secondary">
                Ask the travel assistant
              </Button>
            </div>
          </Card>
        </div>

        <Card className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Guest reviews</h2>
              <p className={styles.sectionIntro}>
                Traveler feedback saved in StaySense appears here as soon as it is submitted.
              </p>
            </div>
            <Button
              to={`/reviews/new?hotelId=${hotel.id}&returnTo=/hotels/${hotel.id}`}
              variant="secondary"
            >
              Add your review
            </Button>
          </div>

          {hotelReviews.length ? (
            <div className={appStyles.reviewList}>
              {hotelReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className={appStyles.emptyState}>
              No traveler reviews have been added here yet. Be the first to share what this stay
              was really like.
            </p>
          )}
        </Card>
      </div>

      {isGalleryOpen && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${hotel.name} gallery`}
          onClick={() => setIsGalleryOpen(false)}
        >
          <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close gallery"
              onClick={() => setIsGalleryOpen(false)}
            >
              <HiOutlineXMark />
            </button>

            <button
              type="button"
              className={`${styles.navButton} ${styles.prevButton}`}
              aria-label="Previous image"
              onClick={showPreviousImage}
            >
              <HiChevronLeft />
            </button>

            <HotelImage
              className={styles.modalImage}
              sources={[hotel.gallery[activeImageIndex], hotel.image, ...hotel.gallery]}
              alt={`${hotel.name} large gallery view`}
            />

            <button
              type="button"
              className={`${styles.navButton} ${styles.nextButton}`}
              aria-label="Next image"
              onClick={showNextImage}
            >
              <HiChevronRight />
            </button>

            <div className={styles.modalMeta}>
              <strong>{hotel.name}</strong>
              <span>
                Image {activeImageIndex + 1} of {hotel.gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelDetailsPage;
