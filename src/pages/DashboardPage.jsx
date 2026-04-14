import { HiArrowTrendingUp, HiOutlineHeart, HiOutlineSparkles, HiOutlineStar } from 'react-icons/hi2';
import { hotels } from '../data/hotels';
import useAuth from '../hooks/useAuth';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import styles from './AppPage.module.css';

function DashboardPage() {
  const { currentUser } = useAuth();
  const spotlightHotels = hotels.slice(0, 3);

  return (
    <div className={`container ${styles.page}`}>
      <Card className={styles.heroCard} elevated>
        <div className={styles.heroTop}>
          <Badge tone="accent">Private workspace</Badge>
          <span className={styles.muted}>{currentUser.membership}</span>
        </div>
        <div>
          <h1 className={styles.heroTitle}>Welcome back, {currentUser.name.split(' ')[0]}.</h1>
          <p className={styles.heroText}>
            Your trip-planning space is ready with saved preferences, high-fit hotels, and quick
            actions to keep momentum.
          </p>
        </div>
        <div className={styles.heroActions}>
          <Button to="/recommendations">View recommendations</Button>
          <Button to="/assistant" variant="secondary">
            Open AI assistant
          </Button>
        </div>
      </Card>

      <div className={styles.statGrid}>
        <Card className={styles.statItem}>
          <strong>12</strong>
          <span className={styles.muted}>active shortlist entries across 4 destinations</span>
        </Card>
        <Card className={styles.statItem}>
          <strong>8.9</strong>
          <span className={styles.muted}>average fit score across your latest recommendations</span>
        </Card>
        <Card className={styles.statItem}>
          <strong>2</strong>
          <span className={styles.muted}>new hotels aligned with your quiet-luxury preference</span>
        </Card>
      </div>

      <div className={styles.gridSidebar}>
        <Card className={styles.contentCard}>
          <div className={styles.rowBetween}>
            <h3>Suggested next moves</h3>
            <Badge>Today</Badge>
          </div>
          <div className={styles.surface}>
            <div className={styles.conversationItem}>
              <div className={styles.conversationMeta}>
                <HiOutlineSparkles /> Recommendation refresh
              </div>
              <p className={styles.conversationText}>
                Re-rank Lisbon and Copenhagen hotels based on your preference for quiet rooms and
                stronger breakfast offerings.
              </p>
            </div>
            <div className={styles.conversationItem}>
              <div className={styles.conversationMeta}>
                <HiArrowTrendingUp /> Pricing watch
              </div>
              <p className={styles.conversationText}>
                Aurora Harbor and Oakline House are both sitting in your preferred premium range.
              </p>
            </div>
            <div className={styles.conversationItem}>
              <div className={styles.conversationMeta}>
                <HiOutlineHeart /> Review prompt
              </div>
              <p className={styles.conversationText}>
                Share a recent hotel experience to sharpen future recommendations.
              </p>
            </div>
          </div>
        </Card>

        <Card className={styles.actionCard}>
          <h3>Your travel profile</h3>
          <div className={styles.stack}>
            <p>Stay style: {currentUser.preferredStayStyle}</p>
            <p>Favorite city signal: {currentUser.favoriteCity}</p>
            <p>Home airport: {currentUser.homeAirport}</p>
          </div>
          <div className={styles.buttonRow}>
            <Button to="/profile" variant="secondary">
              Edit profile
            </Button>
            <Button to="/reviews/new" variant="ghost">
              Write review
            </Button>
          </div>
        </Card>
      </div>

      <div className={styles.hotelGrid}>
        {spotlightHotels.map((hotel) => (
          <Card key={hotel.id} className={styles.hotelCard}>
            <div className={styles.hotelMeta}>
              <Badge>{hotel.city}</Badge>
              <span className={styles.muted}>${hotel.price}/night</span>
            </div>
            <h3>{hotel.name}</h3>
            <p className={styles.summary}>{hotel.score}</p>
            <div className={styles.chips}>
              {hotel.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className={styles.hotelFooter}>
              <span className={styles.muted}>
                <HiOutlineStar /> {hotel.rating} rating
              </span>
              <Button to={`/hotels/${hotel.id}`} variant="ghost">
                View details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
