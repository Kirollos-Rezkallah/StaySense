import { useMemo, useState } from 'react';
import { LuFilter, LuSlidersHorizontal } from 'react-icons/lu';
import { cities, compareHotelsBySort, featureOptions, hotels, priceFilters, sortOptions } from '../data/hotels';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import HotelCard from '../components/hotels/HotelCard';
import InputField from '../components/ui/InputField';
import Section from '../components/ui/Section';
import appStyles from './AppPage.module.css';
import styles from './ExploreHotelsPage.module.css';

function ExploreHotelsPage() {
  const [filters, setFilters] = useState({
    query: '',
    city: 'all',
    feature: 'all',
    priceLevel: 'all',
    sortBy: 'recommended',
  });

  const filteredHotels = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return hotels
      .filter((hotel) => {
        const matchesQuery =
          !query ||
          [
            hotel.name,
            hotel.city,
            hotel.country,
            hotel.locationDescription,
            hotel.description,
            ...hotel.tags,
            ...hotel.features,
          ]
            .join(' ')
            .toLowerCase()
            .includes(query);

        const matchesCity = filters.city === 'all' || hotel.city === filters.city;
        const matchesFeature =
          filters.feature === 'all' || hotel.features.includes(filters.feature);
        const matchesPrice =
          filters.priceLevel === 'all' || hotel.priceLevel === filters.priceLevel;

        return matchesQuery && matchesCity && matchesFeature && matchesPrice;
      })
      .sort((left, right) => compareHotelsBySort(left, right, filters.sortBy));
  }, [filters]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      query: '',
      city: 'all',
      feature: 'all',
      priceLevel: 'all',
      sortBy: 'recommended',
    });
  };

  return (
    <div className={`container ${appStyles.page}`}>
      <Card className={appStyles.heroCard} elevated>
        <Badge tone="accent">Explore stays</Badge>
        <div>
          <h1 className={appStyles.heroTitle}>Browse hotels with the kind of detail that makes comparison easier.</h1>
          <p className={appStyles.heroText}>
            Search by city, narrow by stay style, and sort the collection in a way that suits how
            you actually plan trips.
          </p>
        </div>
        <div className={appStyles.badgeRow}>
          {cities.map((city) => (
            <Badge key={city}>{city}</Badge>
          ))}
        </div>
      </Card>

      <Card className={styles.toolbarCard}>
        <div className={styles.toolbarHeader}>
          <div>
            <h2>Refine your search</h2>
            <p>Filter the hotel collection by destination, feature, price band, and ranking.</p>
          </div>
          <Badge>
            <LuFilter /> Discovery filters
          </Badge>
        </div>

        <div className={styles.filterGrid}>
          <InputField
            id="hotel-query"
            label="Search"
            name="query"
            onChange={handleChange}
            placeholder="Search by hotel, city, feature, or travel style"
            type="text"
            value={filters.query}
          />
          <InputField as="select" id="hotel-city" label="City" name="city" onChange={handleChange} value={filters.city}>
            <option value="all">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </InputField>
          <InputField
            as="select"
            id="hotel-feature"
            label="Feature"
            name="feature"
            onChange={handleChange}
            value={filters.feature}
          >
            <option value="all">Any feature</option>
            {featureOptions.map((feature) => (
              <option key={feature} value={feature}>
                {feature}
              </option>
            ))}
          </InputField>
          <InputField
            as="select"
            id="hotel-price"
            label="Price"
            name="priceLevel"
            onChange={handleChange}
            value={filters.priceLevel}
          >
            {priceFilters.map((priceFilter) => (
              <option key={priceFilter.value} value={priceFilter.value}>
                {priceFilter.label}
              </option>
            ))}
          </InputField>
          <InputField as="select" id="hotel-sort" label="Sort by" name="sortBy" onChange={handleChange} value={filters.sortBy}>
            {sortOptions.map((sortOption) => (
              <option key={sortOption.value} value={sortOption.value}>
                {sortOption.label}
              </option>
            ))}
          </InputField>
        </div>
      </Card>

      <Section
        title="Current hotel collection"
        description="A varied selection of city hotels, quieter retreats, and polished work-trip stays from the local catalog."
      >
        <div className={styles.resultMeta}>
          <p>
            {filteredHotels.length} hotel{filteredHotels.length === 1 ? '' : 's'} available
          </p>
          <Badge>
            <LuSlidersHorizontal /> Sorted by {sortOptions.find((option) => option.value === filters.sortBy)?.label}
          </Badge>
        </div>

        {!hotels.length ? (
          <Card className={styles.emptyCard}>
            <h3>The hotel collection is not ready yet.</h3>
            <p>Add hotels to the local data layer to start exploring destinations and stay styles.</p>
          </Card>
        ) : filteredHotels.length ? (
          <div className={styles.resultsGrid}>
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <Card className={styles.emptyCard}>
            <h3>No hotels match that combination yet.</h3>
            <p>
              Try widening the city or feature filters, or reset everything to return to the full
              collection.
            </p>
            <Button onClick={resetFilters}>Reset filters</Button>
          </Card>
        )}
      </Section>
    </div>
  );
}

export default ExploreHotelsPage;
