import { Link } from 'react-router-dom';
import { getPriceLevelLabel } from '../data/hotelSeedUtils';
import { getHotelById, hotels } from '../data/hotels';
import usePreferences from '../hooks/usePreferences';
import {
  getPreferenceLabel,
  getDefaultPreferences,
  isPreferenceProfileActive,
  rankHotelsByPreferences,
} from '../utils/preferences';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import styles from './AppPage.module.css';

function RecommendationsPage() {
  const { latestRecommendations, preferences } = usePreferences();
  const hasAssistantPreferences = isPreferenceProfileActive(preferences);
  const recommendationSource =
    latestRecommendations.length && hasAssistantPreferences
      ? latestRecommendations
          .map((recommendation) => {
            const hotel = getHotelById(recommendation.hotelId);

            if (!hotel) {
              return null;
            }

            return {
              ...recommendation,
              hotel,
            };
          })
          .filter(Boolean)
      : rankHotelsByPreferences(
          hotels,
          hasAssistantPreferences ? preferences : getDefaultPreferences(),
          4,
        );
  const rankedHotels = recommendationSource.slice(0, 4);

  return (
    <div className={`container ${styles.page}`}>
      <Card className={styles.heroCard} elevated>
        <Badge tone="accent">Personalized picks</Badge>
        <h1 className={styles.heroTitle}>
          {hasAssistantPreferences
            ? 'Recommendations shaped by your latest travel brief.'
            : 'Recommendations tuned for premium comfort and fit.'}
        </h1>
        <p className={styles.heroText}>
          {hasAssistantPreferences
            ? preferences.summary
            : 'These stays align most strongly with your preference for quieter rooms, refined design, and smooth city access.'}
        </p>

        {hasAssistantPreferences ? (
          <div className={styles.chips}>
            {preferences.positive.map((preferenceKey) => (
              <Badge key={preferenceKey}>{getPreferenceLabel(preferenceKey)}</Badge>
            ))}
            {preferences.cities.map((city) => (
              <Badge key={city} tone="accent">
                {city}
              </Badge>
            ))}
          </div>
        ) : null}
      </Card>

      <div className={styles.recommendationGrid}>
        {rankedHotels.map((recommendation, index) => {
          const hotel = recommendation.hotel;
          const explanation = recommendation.explanation || hotel.score;

          return (
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
                  <p>{explanation}</p>
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
          );
        })}
      </div>
    </div>
  );
}

export default RecommendationsPage;
