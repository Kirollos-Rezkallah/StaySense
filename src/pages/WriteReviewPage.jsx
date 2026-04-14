import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getHotelById, hotels } from '../data/hotels';
import useAuth from '../hooks/useAuth';
import useReviews from '../hooks/useReviews';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import styles from './AppPage.module.css';

function WriteReviewPage() {
  const { currentUser } = useAuth();
  const { addReview } = useReviews();
  const [searchParams] = useSearchParams();
  const requestedHotelId = searchParams.get('hotelId');
  const returnTo = searchParams.get('returnTo');
  const initialHotelId = getHotelById(requestedHotelId)?.id || hotels[0].id;
  const [formState, setFormState] = useState({
    hotelId: initialHotelId,
    rating: '9',
    reviewText: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedReview, setSubmittedReview] = useState(null);

  const selectedHotel = useMemo(() => getHotelById(formState.hotelId), [formState.hotelId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const rating = Number(formState.rating);
    if (!formState.reviewText.trim()) {
      setErrorMessage('Please share a few details about your stay before submitting.');
      return;
    }

    if (!Number.isFinite(rating) || rating < 1 || rating > 10) {
      setErrorMessage('Please choose a rating between 1 and 10.');
      return;
    }

    try {
      const review = addReview({
        hotelId: formState.hotelId,
        userId: currentUser.id,
        userName: currentUser.name,
        rating,
        reviewText: formState.reviewText,
      });

      setSubmittedReview(review);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (submittedReview) {
    const reviewedHotel = getHotelById(submittedReview.hotelId);

    return (
      <div className={`container ${styles.page}`}>
        <Card className={styles.heroCard}>
          <Badge tone="success">Review saved</Badge>
          <h1 className={styles.heroTitle}>Thanks for sharing your stay.</h1>
          <p className={styles.heroText}>
            Your review for {reviewedHotel?.name || 'this hotel'} is now part of your StaySense
            planning history and will show up wherever that hotel appears.
          </p>
          <div className={styles.buttonRow}>
            <Button to={`/hotels/${submittedReview.hotelId}`}>Back to hotel details</Button>
            <Button to="/recommendations" variant="secondary">
              View recommendations
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <Card className={styles.heroCard}>
        <Badge tone="accent">Share your stay</Badge>
        <h1 className={styles.heroTitle}>Add a review that improves your next hotel decision.</h1>
        <p className={styles.heroText}>
          Focus on what mattered most: comfort, service, atmosphere, and whether the stay lived up
          to its positioning.
        </p>
      </Card>

      <Card className={styles.contentCard}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            as="select"
            id="review-hotel"
            label="Hotel"
            name="hotelId"
            onChange={handleChange}
            value={formState.hotelId}
          >
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </InputField>

          {selectedHotel ? (
            <Card className={styles.infoCard}>
              <strong>{selectedHotel.name}</strong>
              <p className={styles.muted}>
                {selectedHotel.city}, {selectedHotel.country} - {selectedHotel.locationDescription}
              </p>
            </Card>
          ) : null}

          <div className={styles.gridTwo}>
            <InputField
              as="select"
              id="review-rating"
              label="Overall rating"
              name="rating"
              onChange={handleChange}
              value={formState.rating}
            >
              {Array.from({ length: 10 }, (_, index) => String(index + 1))
                .reverse()
                .map((value) => (
                  <option key={value} value={value}>
                    {value} / 10
                  </option>
                ))}
            </InputField>

            <Card className={styles.infoCard}>
              <strong>Your review will appear on the hotel page and in your profile.</strong>
              <p className={styles.muted}>
                Signed in as {currentUser.name}. Your review is saved on this device and stays
                available after refresh.
              </p>
            </Card>
          </div>

          <InputField
            as="textarea"
            id="review-body"
            label="Your review"
            name="reviewText"
            onChange={handleChange}
            placeholder="Describe the room comfort, service, noise level, breakfast, location feel, and whether you would stay again."
            value={formState.reviewText}
          />

          {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}

          <div className={styles.buttonRow}>
            <Button type="submit">Save review</Button>
            <Button to={returnTo || `/hotels/${formState.hotelId}`} variant="ghost">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default WriteReviewPage;
