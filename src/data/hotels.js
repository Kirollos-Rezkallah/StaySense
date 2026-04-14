import { hotelCatalogA } from './hotelCatalogA';
import { hotelCatalogB } from './hotelCatalogB';
import { hotelCatalogC } from './hotelCatalogC';
import {
  buildHotel,
  compareHotelsBySort,
  featureOptions,
  getPriceLevelRank,
  priceFilters,
  sortOptions,
} from './hotelSeedUtils';

export { compareHotelsBySort, featureOptions, getPriceLevelRank, priceFilters, sortOptions };

export const hotels = [...hotelCatalogA, ...hotelCatalogB, ...hotelCatalogC].map(buildHotel);

export const featuredHotels = hotels.slice(0, 3);
export const cities = [...new Set(hotels.map((hotel) => hotel.city))].sort();

export function getHotelById(hotelId) {
  return hotels.find((hotel) => hotel.id === hotelId);
}
