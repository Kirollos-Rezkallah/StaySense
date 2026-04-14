import { Link } from 'react-router-dom';
import { getPriceLevelLabel } from '../data/hotelSeedUtils';
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

      <div className={styles.recommendationGrid}>
        {rankedHotels.map((hotel, index) => (
          <Card key={hotel.id} className={styles.recommendationCard}>
            <Link
              className={styles.recommendationImageLink}
              to={`/hotels/${hotel.id}`}
              aria-label={`Open ${hotel.name}`}
            >
              <div className={styles.recommendationImageWrap}>
                <img className={styles.recommendationImage} src={hotel.image} alt={hotel.name} />
                <div className={styles.recommendationImageOverlay}>View details</div>
                <div className={styles.recommendationImageMeta}>
                  <Badge tone={index === 0 ? 'accent' : 'default'}>Rank #{index + 1}</Badge>
                  <span className={styles.recommendationPrice}>From ${hotel.startingPrice}</span>
                </div>
              </div>
            </Link>

            <div className={styles.recommendationContent}>
              <div className={styles.hotelMeta}>
                <Badge>{hotel.city}</Badge>
                <span className={styles.muted}>
                  {hotel.reviewScore.toFixed(1)} rating - {hotel.reviewCount} reviews
                </span>
              </div>

              <h3 className={styles.recommendationTitle}>
                <Link className={styles.recommendationTitleLink} to={`/hotels/${hotel.id}`}>
                  {hotel.name}
                </Link>
              </h3>

              <p className={styles.summary}>{hotel.highlight}</p>

              <div className={styles.chips}>
                {hotel.perks.slice(0, 3).map((perk) => (
                  <Badge key={perk}>{perk}</Badge>
                ))}
              </div>

              <div className={styles.recommendationMatchBox}>
                <strong>Why it stands out</strong>
                <p>{hotel.score}</p>
              </div>

              <div className={styles.hotelFooter}>
                <div className={styles.recommendationPriceMeta}>
                  <span className={styles.recommendationPriceLabel}>
                    {getPriceLevelLabel(hotel.priceLevel)}
                  </span>
                  <span className={styles.muted}>
                    A {getPriceLevelLabel(hotel.priceLevel).toLowerCase()} stay option
                  </span>
                </div>
                <Button to={`/hotels/${hotel.id}`} variant="ghost">
                  View details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RecommendationsPage;
