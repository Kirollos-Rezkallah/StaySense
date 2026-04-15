import { Link } from 'react-router-dom';
import { LuCalendarRange, LuCreditCard, LuReceipt, LuUser } from 'react-icons/lu';
import useAuth from '../hooks/useAuth';
import useBooking from '../hooks/useBooking';
import useReviews from '../hooks/useReviews';
import ReviewCard from '../components/reviews/ReviewCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { formatBookingDate, getReservationStatusMeta } from '../utils/booking';
import styles from './AppPage.module.css';

function ProfilePage() {
  const { currentUser } = useAuth();
  const { cancelReservation, getReservationsForUser } = useBooking();
  const { getReviewsForUser } = useReviews();
  const userReviews = getReviewsForUser(currentUser.id);
  const userReservations = getReservationsForUser(currentUser.id);

  return (
    <div className={`container ${styles.page}`}>
      <Card className={styles.heroCard} elevated>
        <Badge tone="accent">Profile</Badge>
        <h1 className={styles.heroTitle}>Travel preferences that shape better recommendations.</h1>
        <p className={styles.heroText}>
          Keep your travel profile current so future hotel rankings reflect how you actually like
          to stay.
        </p>
      </Card>

      <div className={styles.gridThree}>
        <Card className={styles.profileCard}>
          <h3>Account</h3>
          <div className={styles.stack}>
            <p>Name: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
            <p>Membership: {currentUser.membership}</p>
          </div>
        </Card>

        <Card className={styles.profileCard}>
          <h3>Travel profile</h3>
          <div className={styles.chips}>
            <Badge>{currentUser.preferredStayStyle}</Badge>
            <Badge>{currentUser.favoriteCity}</Badge>
            <Badge>{currentUser.homeAirport}</Badge>
          </div>
        </Card>

        <Card className={styles.profileCard}>
          <h3>Quick actions</h3>
          <div className={styles.buttonRow}>
            <Button to="/reviews/new">Write a review</Button>
            <Button to="/assistant">Use assistant</Button>
            <Button to="/recommendations" variant="secondary">
              Refresh picks
            </Button>
          </div>
        </Card>
      </div>

      <Card className={styles.contentCard}>
        <div className={styles.rowBetween}>
          <div>
            <h3>Reservation history</h3>
            <p className={styles.muted}>
              Confirmed stays from your current StaySense account appear here automatically.
            </p>
          </div>
          <Button to="/explore" variant="secondary">
            Book another stay
          </Button>
        </div>

        {userReservations.length ? (
          <div className={styles.reservationList}>
            {userReservations.map((reservation) => {
              const reservationStatus = getReservationStatusMeta(reservation);

              return (
                <Card key={reservation.reservationReference} className={styles.reservationCard}>
                  <Link
                    className={styles.reservationImageLink}
                    to={`/hotels/${reservation.hotelId}`}
                    aria-label={`Open ${reservation.hotelName}`}
                  >
                    <img
                      className={styles.reservationImage}
                      src={reservation.hotelImage}
                      alt={reservation.hotelName}
                    />
                  </Link>

                  <div className={styles.reservationContent}>
                    <div className={styles.rowBetween}>
                      <div>
                        <Badge tone="accent">
                          {reservation.city}, {reservation.country}
                        </Badge>
                        <h3 className={styles.reservationTitle}>
                          <Link to={`/hotels/${reservation.hotelId}`}>{reservation.hotelName}</Link>
                        </h3>
                      </div>
                      <Badge tone={reservationStatus.tone}>{reservationStatus.label}</Badge>
                    </div>

                    <div className={styles.reservationMeta}>
                      <span>
                        <LuReceipt /> {reservation.reservationReference}
                      </span>
                      <span>
                        <LuCalendarRange /> {formatBookingDate(reservation.checkIn)} -{' '}
                        {formatBookingDate(reservation.checkOut)}
                      </span>
                      <span>
                        <LuUser /> {reservation.guests} guest{reservation.guests > 1 ? 's' : ''}
                      </span>
                      <span>
                        <LuCreditCard /> {reservation.paymentMethodLabel}
                      </span>
                    </div>

                    <p className={styles.reservationHelper}>{reservationStatus.helperText}</p>

                    <div className={styles.hotelFooter}>
                      <div className={styles.reservationTotal}>
                        <span>Total paid</span>
                        <strong>${reservation.total}</strong>
                      </div>
                      <div className={styles.reservationActions}>
                        {reservationStatus.canCancel ? (
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => cancelReservation(reservation.reservationReference)}
                          >
                            Cancel reservation
                          </Button>
                        ) : null}
                        <Button to={`/hotels/${reservation.hotelId}`} variant="ghost">
                          View stay
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className={styles.infoCard}>
            <strong>No confirmed stays yet</strong>
            <p className={styles.muted}>
              Once you complete a reservation, the stay summary will appear here so it is easy to
              revisit your hotel details later.
            </p>
          </div>
        )}
      </Card>

      <Card className={styles.contentCard}>
        <h3>Your reviews</h3>
        {userReviews.length ? (
          <div className={styles.reviewList}>
            {userReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showHotelName />
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>
            You have not added any hotel reviews yet. Once you share a stay, it will appear here.
          </p>
        )}
      </Card>
    </div>
  );
}

export default ProfilePage;
