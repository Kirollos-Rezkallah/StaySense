import { hotels } from '../data/hotels';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import styles from './AppPage.module.css';

function RecommendationsPage() {
  const rankedHotels = [...hotels].sort((left, right) => right.rating - left.rating).slice(0, 4);

  return (
    <div className={`container ${styles.page}`}>
      <Card className={styles.heroCard} elevated>
        <Badge tone="accent">Personalized picks</Badge>
        <h1 className={styles.heroTitle}>Recommendations tuned for premium comfort and fit.</h1>
        <p className={styles.heroText}>
          These stays align most strongly with your preference for quieter rooms, refined design,
          and smooth city access.
        </p>
      </Card>

      <div className={styles.hotelGrid}>
        {rankedHotels.map((hotel, index) => (
          <Card key={hotel.id} className={styles.hotelCard}>
            <div className={styles.hotelMeta}>
              <Badge tone={index === 0 ? 'accent' : 'default'}>Rank #{index + 1}</Badge>
              <span className={styles.muted}>${hotel.price}/night</span>
            </div>
            <h3>{hotel.name}</h3>
            <p className={styles.summary}>{hotel.highlight}</p>
            <div className={styles.chips}>
              {hotel.perks.slice(0, 3).map((perk) => (
                <Badge key={perk}>{perk}</Badge>
              ))}
            </div>
            <div className={styles.hotelFooter}>
              <span className={styles.muted}>
                {hotel.rating} rating - {hotel.score}
              </span>
              <Button to={`/hotels/${hotel.id}`} variant="ghost">
                Open details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RecommendationsPage;
