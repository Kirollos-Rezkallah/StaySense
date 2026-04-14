import useAuth from '../hooks/useAuth';
import useReviews from '../hooks/useReviews';
import ReviewCard from '../components/reviews/ReviewCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import styles from './AppPage.module.css';

function ProfilePage() {
  const { currentUser } = useAuth();
  const { getReviewsForUser } = useReviews();
  const userReviews = getReviewsForUser(currentUser.id);

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
