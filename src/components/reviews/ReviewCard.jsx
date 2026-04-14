import { HiOutlineStar } from 'react-icons/hi2';
import { getHotelById } from '../../data/hotels';
import styles from './ReviewCard.module.css';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function ReviewCard({ review, showHotelName = false }) {
  const hotel = showHotelName ? getHotelById(review.hotelId) : null;

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <strong className={styles.userName}>{review.userName}</strong>
          {hotel ? <p className={styles.hotelName}>{hotel.name}</p> : null}
        </div>
        <div className={styles.ratingBox}>
          <span className={styles.rating}>
            <HiOutlineStar /> {review.rating.toFixed(1)}
          </span>
          <span className={styles.date}>{dateFormatter.format(new Date(review.createdAt))}</span>
        </div>
      </div>

      <p className={styles.copy}>{review.reviewText}</p>
    </article>
  );
}

export default ReviewCard;
