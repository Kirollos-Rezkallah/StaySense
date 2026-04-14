import { HiOutlineStar } from 'react-icons/hi2';
import { LuMapPin, LuSparkles } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import styles from './HotelCard.module.css';

function HotelCard({ hotel }) {
  return (
    <Card className={styles.card}>
      <Link className={styles.imageLink} to={`/hotels/${hotel.id}`} aria-label={`Open ${hotel.name}`}>
        <div className={styles.imageWrap}>
          <img className={styles.image} src={hotel.image} alt={hotel.name} />
          <div className={styles.imageOverlay}>View details</div>
          <div className={styles.imageMeta}>
            <Badge tone="accent">
              {hotel.city}, {hotel.country}
            </Badge>
            <span className={styles.price}>From ${hotel.startingPrice}</span>
          </div>
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <div>
            <h3>
              <Link className={styles.titleLink} to={`/hotels/${hotel.id}`}>
                {hotel.name}
              </Link>
            </h3>
            <p className={styles.location}>
              <LuMapPin /> {hotel.locationDescription}
            </p>
          </div>
          <div className={styles.scoreBox}>
            <strong>{hotel.reviewScore.toFixed(1)}</strong>
            <span>{hotel.reviewCount} reviews</span>
          </div>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <HiOutlineStar /> {hotel.starRating}-star hotel
          </span>
          <span className={styles.metaItem}>
            <LuSparkles /> {hotel.priceLevel} price level
          </span>
        </div>

        <p className={styles.description}>{hotel.description}</p>

        <div className={styles.badgeRow}>
          {hotel.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className={styles.features}>
          {hotel.features.slice(0, 4).map((feature) => (
            <span key={feature} className={styles.feature}>
              {feature}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.reviewSummary}>{hotel.reviewSummary}</span>
          <Button to={`/hotels/${hotel.id}`} variant="ghost">
            View details
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default HotelCard;
