import { useEffect, useState } from 'react';
import { HiOutlineStar } from 'react-icons/hi2';
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from 'react-icons/hi2';
import { LuMapPin, LuShieldCheck } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { getHotelById } from '../data/hotels';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import appStyles from './AppPage.module.css';
import styles from './HotelDetailsPage.module.css';

function HotelDetailsPage() {
  const { hotelId } = useParams();
  const hotel = getHotelById(hotelId);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!isGalleryOpen) {
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
  }, [hotel.gallery.length, isGalleryOpen]);

  const openGallery = (imageIndex) => {
    setActiveImageIndex(imageIndex);
    setIsGalleryOpen(true);
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % hotel.gallery.length);
  };

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex - 1 + hotel.gallery.length) % hotel.gallery.length);
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
            <button
              type="button"
              className={styles.imageButton}
              onClick={() => openGallery(0)}
            >
              <img className={styles.heroImage} src={hotel.gallery[0]} alt={hotel.name} />
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
                  <img className={styles.thumb} src={imageUrl} alt={`${hotel.name} gallery`} />
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
              <Badge>{hotel.priceLevel} price level</Badge>
              <Badge>{hotel.starRating}-star stay</Badge>
            </div>

            <div className={styles.statRow}>
              <div className={styles.statItem}>
                <strong>${hotel.startingPrice}</strong>
                <span>Typical nightly starting rate</span>
              </div>
              <div className={styles.statItem}>
                <strong>{hotel.reviewScore.toFixed(1)}</strong>
                <span>Guest review score</span>
              </div>
              <div className={styles.statItem}>
                <strong>{hotel.reviewCount}</strong>
                <span>Reviews in the collection</span>
              </div>
            </div>

            <p className={styles.lead}>
              <LuMapPin /> {hotel.locationDescription}
            </p>

            <div className={styles.ctaRow}>
              <Button to="/recommendations">Compare with recommendations</Button>
              <Button to="/reviews/new" variant="secondary">
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
              <li>{hotel.starRating}-star hospitality standard with {hotel.priceLevel} positioning.</li>
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

          <Card className={styles.sectionCard}>
            <h2>Review summary</h2>
            <div className={styles.reviewBox}>
              <div className={styles.reviewTop}>
                <div className={styles.reviewScore}>
                  <span className={styles.scoreNumber}>{hotel.reviewScore.toFixed(1)}</span>
                  <div className={styles.reviewMeta}>
                    <strong>
                      <HiOutlineStar /> Highly rated by guests
                    </strong>
                    <span>{hotel.reviewCount} reviews in the local catalog</span>
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

            <img
              className={styles.modalImage}
              src={hotel.gallery[activeImageIndex]}
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
