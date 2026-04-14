import { createContext, useEffect, useMemo, useState } from 'react';

const REVIEWS_STORAGE_KEY = 'staysense.reviews';

export const ReviewsContext = createContext(null);

function getStoredReviews() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const savedReviews = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    const parsedReviews = savedReviews ? JSON.parse(savedReviews) : [];
    return Array.isArray(parsedReviews) ? parsedReviews : [];
  } catch {
    return [];
  }
}

function normalizeReview(input) {
  return {
    id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    hotelId: input.hotelId,
    userId: input.userId,
    userName: input.userName.trim(),
    rating: Number(input.rating),
    reviewText: input.reviewText.trim(),
    createdAt: input.createdAt || new Date().toISOString(),
  };
}

function validateReview(reviewInput) {
  if (!reviewInput.hotelId) {
    throw new Error('Please choose a hotel before submitting your review.');
  }

  if (!reviewInput.userId || !reviewInput.userName?.trim()) {
    throw new Error('Sign in to save your review.');
  }

  const rating = Number(reviewInput.rating);
  if (!Number.isFinite(rating) || rating < 1 || rating > 10) {
    throw new Error('Please select a rating between 1 and 10.');
  }

  if (!reviewInput.reviewText?.trim()) {
    throw new Error('Please share a few details about your stay before submitting.');
  }
}

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState(getStoredReviews);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (reviewInput) => {
    validateReview(reviewInput);

    const review = normalizeReview(reviewInput);
    setReviews((currentReviews) => [review, ...currentReviews]);

    return review;
  };

  const getReviewsForHotel = (hotelId) =>
    reviews
      .filter((review) => review.hotelId === hotelId)
      .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));

  const getReviewsForUser = (userId) =>
    reviews
      .filter((review) => review.userId === userId)
      .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));

  const getHotelReviewAggregate = (hotelId, baseReviewScore = 0, baseReviewCount = 0) => {
    const hotelReviews = getReviewsForHotel(hotelId);
    const localReviewCount = hotelReviews.length;
    const localReviewTotal = hotelReviews.reduce((total, review) => total + review.rating, 0);
    const combinedCount = baseReviewCount + localReviewCount;

    if (!combinedCount) {
      return {
        averageScore: 0,
        totalCount: 0,
        localReviewCount,
      };
    }

    const weightedBaseTotal = baseReviewScore * baseReviewCount;
    const averageScore = (weightedBaseTotal + localReviewTotal) / combinedCount;

    return {
      averageScore,
      totalCount: combinedCount,
      localReviewCount,
    };
  };

  const value = useMemo(
    () => ({
      reviews,
      addReview,
      getReviewsForHotel,
      getReviewsForUser,
      getHotelReviewAggregate,
    }),
    [reviews],
  );

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}
