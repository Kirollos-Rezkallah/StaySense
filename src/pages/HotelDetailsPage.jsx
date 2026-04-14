import { useParams } from 'react-router-dom';
import { hotels } from '../data/hotels';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import styles from './AppPage.module.css';

function HotelDetailsPage() {
  const { hotelId } = useParams();
  const hotel = hotels.find((item) => item.id === hotelId);

  if (!hotel) {
    return (
      <div className={`container ${styles.page}`}>
        <Card className={styles.heroCard}>
          <Badge>Not found</Badge>
          <h1 className={styles.heroTitle}>This hotel is not available.</h1>
          <p className={styles.heroText}>Return to exploration to choose another stay profile.</p>
          <Button to="/explore">Back to explore</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <Card className={styles.heroCard} elevated>
        <div className={styles.heroTop}>
          <Badge tone="accent">
            {hotel.city}, {hotel.country}
          </Badge>
          <span className={styles.muted}>${hotel.price}/night</span>
        </div>
        <div>
          <h1 className={styles.heroTitle}>{hotel.name}</h1>
          <p className={styles.heroText}>{hotel.description}</p>
        </div>
        <div className={styles.badgeRow}>
          {hotel.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </Card>

      <div className={styles.gridSidebar}>
        <Card className={styles.detailCard}>
          <h3>Why travelers choose it</h3>
          <p className={styles.detailText}>{hotel.highlight}</p>
          <div className={styles.divider} />
          <ul className={styles.list}>
            <li>{hotel.distance}</li>
            <li>Recommended room: {hotel.roomType}</li>
            <li>{hotel.reviewCount} recent stay experiences in the current collection</li>
            <li>{hotel.score}</li>
          </ul>
        </Card>

        <Card className={styles.detailCard}>
          <h3>Included highlights</h3>
          <div className={styles.chips}>
            {hotel.perks.map((perk) => (
              <Badge key={perk} tone="success">
                {perk}
              </Badge>
            ))}
          </div>
          <div className={styles.buttonRow}>
            <Button to="/recommendations">Compare with recommendations</Button>
            <Button to="/reviews/new" variant="secondary">
              Write a review
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HotelDetailsPage;
