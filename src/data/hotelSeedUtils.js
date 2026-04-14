export const featureOptions = [
  'Pool',
  'Spa',
  'Gym',
  'Breakfast',
  'Quiet rooms',
  'Central location',
  'Modern interior',
  'Bar',
  'Family-friendly',
  'Budget-friendly',
  'Luxury',
  'Business',
  'Scenic view',
];

export const priceFilters = [
  { value: 'all', label: 'Any price' },
  { value: '$', label: 'Budget-friendly' },
  { value: '$$', label: 'Mid-range' },
  { value: '$$$', label: 'Premium' },
  { value: '$$$$', label: 'Luxury' },
];

export const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'rating', label: 'Review score' },
  { value: 'reviews', label: 'Most reviewed' },
  { value: 'stars', label: 'Star rating' },
];

const priceLevelOrder = {
  $: 1,
  $$: 2,
  $$$: 3,
  $$$$: 4,
};

const priceLevelLabels = {
  $: 'Budget',
  $$: 'Moderate',
  $$$: 'Premium',
  $$$$: 'Luxury',
};

export function hotelImage(imageId) {
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=1200&q=80`;
}

export function hotelGallery(...imageIds) {
  return imageIds.map(hotelImage);
}

export function buildHotel(seed) {
  return {
    ...seed,
    price: seed.startingPrice,
    rating: seed.reviewScore,
    summary: seed.locationDescription,
    perks: seed.features.slice(0, 3),
    highlight: seed.reasonsToChoose[0],
    score: seed.reviewSummary,
  };
}

export function getPriceLevelRank(priceLevel) {
  return priceLevelOrder[priceLevel] || 0;
}

export function getPriceLevelLabel(priceLevel) {
  return priceLevelLabels[priceLevel] || 'Selected stay';
}

export function compareHotelsBySort(left, right, sortValue) {
  switch (sortValue) {
    case 'price-low':
      return left.startingPrice - right.startingPrice;
    case 'price-high':
      return right.startingPrice - left.startingPrice;
    case 'rating':
      return right.reviewScore - left.reviewScore || right.reviewCount - left.reviewCount;
    case 'reviews':
      return right.reviewCount - left.reviewCount || right.reviewScore - left.reviewScore;
    case 'stars':
      return right.starRating - left.starRating || right.reviewScore - left.reviewScore;
    case 'recommended':
    default:
      return (
        right.reviewScore - left.reviewScore ||
        right.reviewCount - left.reviewCount ||
        getPriceLevelRank(right.priceLevel) - getPriceLevelRank(left.priceLevel)
      );
  }
}
