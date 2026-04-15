import { hotelCatalogA } from './hotelCatalogA';
import { hotelCatalogB } from './hotelCatalogB';
import { hotelCatalogC } from './hotelCatalogC';
import { hotelCatalogD } from './hotelCatalogD';
import { hotelCatalogE } from './hotelCatalogE';
import { hotelCatalogF } from './hotelCatalogF';
import {
  buildHotel,
  compareHotelsBySort,
  featureOptions,
  getPriceLevelRank,
  priceFilters,
  sortOptions,
} from './hotelSeedUtils';

export { compareHotelsBySort, featureOptions, getPriceLevelRank, priceFilters, sortOptions };

export const hotels = [
  ...hotelCatalogA,
  ...hotelCatalogB,
  ...hotelCatalogC,
  ...hotelCatalogD,
  ...hotelCatalogE,
  ...hotelCatalogF,
].map(buildHotel);

export const featuredHotels = hotels.slice(0, 3);
export const cities = [...new Set(hotels.map((hotel) => hotel.city))].sort();

export function getHotelById(hotelId) {
  return hotels.find((hotel) => hotel.id === hotelId);
}
