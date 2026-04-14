import { cities, hotels } from '../data/hotels';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import styles from './AppPage.module.css';

function ExploreHotelsPage() {
  return (
    <div className={`container ${styles.page}`}>
      <Card className={styles.heroCard} elevated>
        <Badge tone="accent">Explore stays</Badge>
        <div>
          <h1 className={styles.heroTitle}>Browse premium hotels with clear context.</h1>
          <p className={styles.heroText}>
            Compare city, price point, stay style, and fit signals without leaving the main flow.
          </p>
        </div>
        <div className={styles.badgeRow}>
          {cities.map((city) => (
            <Badge key={city}>{city}</Badge>
          ))}
        </div>
      </Card>

      <Section
        title="Current hotel collection"
        description="A balanced mix of boutique, wellness, business, and resort-forward stays."
      >
        <div className={`${styles.hotelGrid} ${styles.compact}`}>
          {hotels.map((hotel) => (
            <Card key={hotel.id} className={styles.hotelCard}>
              <div className={styles.hotelMeta}>
                <Badge>{hotel.city}</Badge>
                <span className={styles.muted}>${hotel.price}/night</span>
              </div>
              <h3>{hotel.name}</h3>
              <p className={styles.summary}>{hotel.summary}</p>
              <div className={styles.chips}>
                {hotel.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <div className={styles.hotelFooter}>
                <span className={styles.muted}>
                  {hotel.rating} rating - {hotel.reviewCount} reviews
                </span>
                <Button to={`/hotels/${hotel.id}`} variant="ghost">
                  Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default ExploreHotelsPage;
