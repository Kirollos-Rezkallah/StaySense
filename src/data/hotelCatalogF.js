import { hotelGallery, hotelImage } from './hotelSeedUtils';

export const hotelCatalogF = [
  {
    id: 'galata-terrace-istanbul',
    name: 'Galata Terrace Hotel',
    city: 'Istanbul',
    country: 'Turkey',
    locationDescription:
      'Near the Galata Tower with steep lanes, rooftop dining, and easy crossings between Beyoglu and the historic peninsula.',
    priceLevel: '$$$',
    startingPrice: 208,
    starRating: 5,
    reviewScore: 9.0,
    reviewCount: 388,
    features: ['Breakfast', 'Scenic view', 'Central location', 'Modern interior', 'Bar', 'Quiet rooms'],
    description:
      'Galata Terrace Hotel pairs rooftop city views with calm, modern rooms in a part of Istanbul that feels rich in atmosphere day and night.',
    tags: ['Rooftop', 'Historic city break', 'View stay'],
    image: hotelImage('photo-1522798514-97ceb8c4f1c8'),
    gallery: hotelGallery(
      'photo-1522798514-97ceb8c4f1c8',
      'photo-1566073771259-6a8506099945',
      'photo-1455587734955-081b22074882'
    ),
    coordinates: { lat: 41.0258, lng: 28.9744 },
    reviewSummary:
      'Guests often mention the roof terrace, the quality of breakfast, and how easy it is to move between neighborhoods from here.',
    reasonsToChoose: [
      'A polished Istanbul base with memorable views.',
      'Great for travelers who want central access and calmer rooms.',
      'Balances atmosphere, comfort, and rooftop appeal.',
    ],
  },
  {
    id: 'bosphorus-passage-istanbul',
    name: 'Bosphorus Passage House',
    city: 'Istanbul',
    country: 'Turkey',
    locationDescription:
      'In Karakoy near ferry piers, waterside cafes, and easy movement between the Bosphorus and the old city.',
    priceLevel: '$$',
    startingPrice: 148,
    starRating: 4,
    reviewScore: 8.6,
    reviewCount: 452,
    features: ['Breakfast', 'Budget-friendly', 'Central location', 'Business', 'Scenic view'],
    description:
      'Bosphorus Passage House is a practical waterfront-edge stay with useful transport links and a polished but unfussy feel.',
    tags: ['Ferry access', 'City value', 'Harbor edge'],
    image: hotelImage('photo-1500530855697-b586d89ba3ee'),
    gallery: hotelGallery(
      'photo-1500530855697-b586d89ba3ee',
      'photo-1496417263034-38ec4f0b665a',
      'photo-1505692952047-1a78307da8f2'
    ),
    coordinates: { lat: 41.0223, lng: 28.9818 },
    reviewSummary:
      'Travelers like the ferry access, value for money, and the fact that the hotel makes a busy city feel easier to navigate.',
    reasonsToChoose: [
      'A dependable Istanbul option with strong transport links.',
      'Good value for travelers who plan to explore widely.',
      'Practical without feeling generic.',
    ],
  },
  {
    id: 'emerald-rice-terraces-bali',
    name: 'Emerald Rice Terraces',
    city: 'Bali',
    country: 'Indonesia',
    locationDescription:
      'Outside central Ubud near rice terraces, cafes, and slower roads that make the stay feel more secluded than central town hotels.',
    priceLevel: '$$$',
    startingPrice: 216,
    starRating: 5,
    reviewScore: 9.3,
    reviewCount: 291,
    features: ['Pool', 'Spa', 'Breakfast', 'Scenic view', 'Quiet rooms', 'Luxury'],
    description:
      'Emerald Rice Terraces centers the stay around greenery, quiet mornings, and generous room layouts that encourage a slower pace.',
    tags: ['Ubud edge', 'Wellness', 'Scenic retreat'],
    image: hotelImage('photo-1506744038136-46273834b3fb'),
    gallery: hotelGallery(
      'photo-1506744038136-46273834b3fb',
      'photo-1540541338287-41700207dee6',
      'photo-1566073771259-6a8506099945'
    ),
    coordinates: { lat: -8.4895, lng: 115.2632 },
    reviewSummary:
      'Guests describe the views, spa treatments, and room privacy as the standout parts of the experience.',
    reasonsToChoose: [
      'A strong scenic choice for slower Bali stays.',
      'Quiet rooms and wellness facilities feel especially well considered.',
      'Excellent for couples and longer leisure trips.',
    ],
  },
  {
    id: 'uluwatu-tide-bali',
    name: 'Uluwatu Tide Resort',
    city: 'Bali',
    country: 'Indonesia',
    locationDescription:
      'On the Bukit Peninsula near beach clubs, cliff views, and surf breaks, with broad sunset outlooks from the property.',
    priceLevel: '$$$$',
    startingPrice: 348,
    starRating: 5,
    reviewScore: 9.2,
    reviewCount: 315,
    features: ['Pool', 'Spa', 'Breakfast', 'Luxury', 'Scenic view', 'Bar', 'Family-friendly'],
    description:
      'Uluwatu Tide Resort combines a resort layout, ocean-facing terraces, and a polished service rhythm that suits longer beach stays.',
    tags: ['Resort', 'Clifftop', 'Beach getaway'],
    image: hotelImage('photo-1540541338287-41700207dee6'),
    gallery: hotelGallery(
      'photo-1540541338287-41700207dee6',
      'photo-1506744038136-46273834b3fb',
      'photo-1521783988139-89397d761dce'
    ),
    coordinates: { lat: -8.8298, lng: 115.0872 },
    reviewSummary:
      'Travelers rate the sunset views, expansive pool area, and resort service especially highly.',
    reasonsToChoose: [
      'A polished clifftop resort with strong leisure appeal.',
      'Excellent for ocean views and slower days on property.',
      'A strong luxury pick for Bali beach trips.',
    ],
  },
  {
    id: 'barri-gotic-house-barcelona',
    name: 'Barri Gotic House',
    city: 'Barcelona',
    country: 'Spain',
    locationDescription:
      'In the Gothic Quarter close to tucked-away courtyards, old streets, and short walks into El Born and the harbor.',
    priceLevel: '$$',
    startingPrice: 168,
    starRating: 4,
    reviewScore: 8.6,
    reviewCount: 364,
    features: ['Breakfast', 'Central location', 'Budget-friendly', 'Quiet rooms', 'Family-friendly'],
    description:
      'Barri Gotic House offers a more grounded city stay with practical rooms and a location that keeps Barcelonas historic core close.',
    tags: ['Historic district', 'Value city break', 'Walkable stay'],
    image: hotelImage('photo-1445019980597-93fa8acb246c'),
    gallery: hotelGallery(
      'photo-1445019980597-93fa8acb246c',
      'photo-1542314831-068cd1dbfeeb',
      'photo-1505693416388-ac5ce068fe85'
    ),
    coordinates: { lat: 41.3832, lng: 2.1761 },
    reviewSummary:
      'Guests appreciate the old-city location, quieter room layout, and the fact that they can walk nearly everywhere from the hotel.',
    reasonsToChoose: [
      'A stronger value pick in central Barcelona.',
      'Helpful for travelers who prioritize walkability.',
      'Historic surroundings without premium pricing.',
    ],
  },
  {
    id: 'desert-line-dubai',
    name: 'Desert Line Hotel',
    city: 'Dubai',
    country: 'United Arab Emirates',
    locationDescription:
      'Near the Metro between Downtown and the older city, with straightforward transfers, shopping access, and practical room rates.',
    priceLevel: '$$',
    startingPrice: 156,
    starRating: 4,
    reviewScore: 8.5,
    reviewCount: 486,
    features: ['Breakfast', 'Gym', 'Business', 'Central location', 'Budget-friendly', 'Modern interior'],
    description:
      'Desert Line Hotel is a dependable Dubai base that favors smart pricing, clean design, and useful transport connections.',
    tags: ['Transit-friendly', 'Value premium', 'Practical stay'],
    image: hotelImage('photo-1496417263034-38ec4f0b665a'),
    gallery: hotelGallery(
      'photo-1496417263034-38ec4f0b665a',
      'photo-1505692952047-1a78307da8f2',
      'photo-1522708323590-d24dbb6b0267'
    ),
    coordinates: { lat: 25.2455, lng: 55.3047 },
    reviewSummary:
      'Guests like the dependable rooms, easy Metro access, and the pricing relative to many of the citys more resort-led options.',
    reasonsToChoose: [
      'A strong practical Dubai pick with easy movement around the city.',
      'Good for business trips and short stopovers.',
      'Modern and reliable without luxury-level rates.',
    ],
  },
  {
    id: 'chelsea-yard-new-york',
    name: 'Chelsea Yard Hotel',
    city: 'New York',
    country: 'United States',
    locationDescription:
      'Near Chelsea Market and the High Line, with galleries, downtown dining, and neighborhood walks close by.',
    priceLevel: '$$$',
    startingPrice: 318,
    starRating: 4,
    reviewScore: 8.8,
    reviewCount: 437,
    features: ['Breakfast', 'Gym', 'Central location', 'Modern interior', 'Bar', 'Quiet rooms'],
    description:
      'Chelsea Yard Hotel combines a downtown creative feel with rooms that stay calm and comfortable after busy city days.',
    tags: ['Chelsea', 'Creative district', 'Modern city stay'],
    image: hotelImage('photo-1522798514-97ceb8c4f1c8'),
    gallery: hotelGallery(
      'photo-1522798514-97ceb8c4f1c8',
      'photo-1505693416388-ac5ce068fe85',
      'photo-1512918728675-ed5a9ecdebfd'
    ),
    coordinates: { lat: 40.7464, lng: -74.0057 },
    reviewSummary:
      'Guests often note the neighborhood energy, comfortable bedding, and how useful the hotel is for both meetings and weekend exploring.',
    reasonsToChoose: [
      'A polished downtown Manhattan base with broader neighborhood appeal.',
      'Good sleep quality in a lively part of the city.',
      'Works well for design-conscious city trips.',
    ],
  },
  {
    id: 'constantia-garden-cape-town',
    name: 'Constantia Garden Retreat',
    city: 'Cape Town',
    country: 'South Africa',
    locationDescription:
      'In Constantia close to vineyards, gardens, and a quieter side of Cape Town that suits longer, slower stays.',
    priceLevel: '$$$',
    startingPrice: 198,
    starRating: 5,
    reviewScore: 9.1,
    reviewCount: 233,
    features: ['Breakfast', 'Pool', 'Quiet rooms', 'Scenic view', 'Family-friendly', 'Spa'],
    description:
      'Constantia Garden Retreat offers broad rooms, lush grounds, and a quieter Cape Town base that still keeps key districts reachable.',
    tags: ['Garden stay', 'Scenic retreat', 'Longer stay'],
    image: hotelImage('photo-1506744038136-46273834b3fb'),
    gallery: hotelGallery(
      'photo-1506744038136-46273834b3fb',
      'photo-1540541338287-41700207dee6',
      'photo-1500530855697-b586d89ba3ee'
    ),
    coordinates: { lat: -34.0212, lng: 18.4289 },
    reviewSummary:
      'Travelers highlight the quieter setting, spacious rooms, and the sense that the property encourages a slower pace.',
    reasonsToChoose: [
      'A calmer Cape Town option with scenic appeal.',
      'Strong fit for families and longer leisure trips.',
      'Offers a boutique retreat feel without isolation.',
    ],
  },
];
