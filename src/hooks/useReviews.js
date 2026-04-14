import { useContext } from 'react';
import { ReviewsContext } from '../context/ReviewsContext';

function useReviews() {
  const context = useContext(ReviewsContext);

  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider.');
  }

  return context;
}

export default useReviews;
