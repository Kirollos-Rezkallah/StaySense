export const FALLBACK_HOTEL_IMAGE = '/hotel-placeholder.svg';

export function getHotelImageSources(hotel) {
  if (!hotel) {
    return [FALLBACK_HOTEL_IMAGE];
  }

  return [
    ...new Set([hotel.image, ...(hotel.gallery || []), FALLBACK_HOTEL_IMAGE].filter(Boolean)),
  ];
}
