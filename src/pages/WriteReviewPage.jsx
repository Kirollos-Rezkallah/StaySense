import { useState } from 'react';
import { hotels } from '../data/hotels';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import styles from './AppPage.module.css';

function WriteReviewPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    hotelId: hotels[0].id,
    title: '',
    rating: '9',
    review: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`container ${styles.page}`}>
      <Card className={styles.heroCard}>
        <Badge tone="accent">Share your stay</Badge>
        <h1 className={styles.heroTitle}>Add a review that improves future recommendations.</h1>
        <p className={styles.heroText}>
          Highlight what stood out: room comfort, area feel, service consistency, and whether the
          stay matched expectations.
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
          <div className={styles.gridTwo}>
            <InputField
              id="review-title"
              label="Review title"
              name="title"
              onChange={handleChange}
              placeholder="Quiet, polished, and worth the upgrade"
              value={formState.title}
            />
            <InputField
              as="select"
              id="review-rating"
              label="Overall rating"
              name="rating"
              onChange={handleChange}
              value={formState.rating}
            >
              {['10', '9', '8', '7'].map((value) => (
                <option key={value} value={value}>
                  {value} / 10
                </option>
              ))}
            </InputField>
          </div>
          <InputField
            as="textarea"
            id="review-body"
            label="Your review"
            name="review"
            onChange={handleChange}
            placeholder="Focus on the stay quality, atmosphere, location experience, and whether the hotel delivered on its positioning."
            value={formState.review}
          />
          <div className={styles.buttonRow}>
            <Button type="submit">Save review</Button>
            {submitted ? <Badge tone="success">Review captured in your current session</Badge> : null}
          </div>
        </form>
      </Card>
    </div>
  );
}

export default WriteReviewPage;
