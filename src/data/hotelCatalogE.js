import { hotelGallery, hotelImage } from './hotelSeedUtils';

export const hotelCatalogE = [
  {
    id: 'aster-tokyo-station',
    name: 'Aster Tokyo Station Hotel',
    city: 'Tokyo',
    country: 'Japan',
    locationDescription:
      'Near Tokyo Station and Marunouchi, with polished streets, easy rail access, and quick movement across the city.',
    priceLevel: '$$$',
    startingPrice: 286,
    starRating: 5,
    reviewScore: 9.2,
    reviewCount: 544,
    features: ['Breakfast', 'Gym', 'Business', 'Central location', 'Modern interior', 'Quiet rooms'],
    description:
      'Aster Tokyo Station Hotel is built for smooth arrivals, strong sleep, and efficient city access without losing a calm, premium feel.',
    tags: ['Station access', 'Business stay', 'High-comfort'],
    image: hotelImage('photo-1511818966892-d7d671e672a2'),
    gallery: hotelGallery(
      'photo-1455587734955-081b22074882',
      'photo-1522798514-97ceb8c4f1c8',
      'photo-1522708323590-d24dbb6b0267'
    ),
    coordinates: { lat: 35.6815, lng: 139.7671 },
    reviewSummary:
      'Travelers consistently mention the quiet rooms, breakfast efficiency, and how useful the location is for both business and sightseeing.',
    reasonsToChoose: [
      'An easy premium choice when movement around Tokyo matters.',
      'Strong quiet-room performance for a central stay.',
      'Ideal for short, efficient city trips.',
    ],
  },
  {
    id: 'sumida-garden-tokyo',
    name: 'Sumida Garden Hotel',
    city: 'Tokyo',
    country: 'Japan',
    locationDescription:
      'Near Asakusa and the Sumida River, with temple walks, river views, and a slightly slower pace than central business districts.',
    priceLevel: '$$',
    startingPrice: 182,
    starRating: 4,
    reviewScore: 8.8,
    reviewCount: 429,
    features: ['Breakfast', 'Scenic view', 'Quiet rooms', 'Family-friendly', 'Modern interior'],
    description:
      'Sumida Garden Hotel offers comfortable rooms and a calmer setting that still keeps classic Tokyo experiences close at hand.',
    tags: ['River view', 'Cultural base', 'Family trip'],
    image: hotelImage('photo-1529290130-4ca3753253ae'),
    gallery: hotelGallery(
      'photo-1551882547-ff40c63fe5fa',
      'photo-1445019980597-93fa8acb246c',
      'photo-1505692952047-1a78307da8f2'
    ),
    coordinates: { lat: 35.7101, lng: 139.7976 },
    reviewSummary:
      'Guests appreciate the river-side calm, practical family rooms, and how easy it is to start early sightseeing nearby.',
    reasonsToChoose: [
      'A calmer Tokyo base with strong sightseeing access.',
      'Good comfort for families and slower city trips.',
      'Solid value in a scenic part of the city.',
    ],
  },
  {
    id: 'chao-phraya-social-bangkok',
    name: 'Chao Phraya Social Club',
    city: 'Bangkok',
    country: 'Thailand',
    locationDescription:
      'Along the river near creative dining spots and boat transfers, with skyline views and a livelier evening atmosphere.',
    priceLevel: '$$$',
    startingPrice: 214,
    starRating: 5,
    reviewScore: 9.0,
    reviewCount: 401,
    features: ['Pool', 'Breakfast', 'Bar', 'Scenic view', 'Modern interior', 'Central location'],
    description:
      'Chao Phraya Social Club mixes a riverside energy with comfortable rooms and a polished common-space experience.',
    tags: ['Riverside', 'Lifestyle stay', 'Skyline views'],
    image: hotelImage('photo-1479839672679-a46483c0e7c8'),
    gallery: hotelGallery(
      'photo-1521783988139-89397d761dce',
      'photo-1506744038136-46273834b3fb',
      'photo-1522798514-97ceb8c4f1c8'
    ),
    coordinates: { lat: 13.7254, lng: 100.5147 },
    reviewSummary:
      'Guests call out the river outlook, social rooftop spaces, and the fact that the hotel feels lively without becoming chaotic.',
    reasonsToChoose: [
      'A polished riverside stay with real evening atmosphere.',
      'Strong fit for couples and leisure-focused city trips.',
      'Offers a premium feel without top-tier pricing.',
    ],
  },
  {
    id: 'sukhumvit-courtyard-bangkok',
    name: 'Sukhumvit Courtyard',
    city: 'Bangkok',
    country: 'Thailand',
    locationDescription:
      'Just off Sukhumvit Road near BTS stations, with quick city access and a more tucked-away arrival than the main avenue suggests.',
    priceLevel: '$',
    startingPrice: 96,
    starRating: 4,
    reviewScore: 8.4,
    reviewCount: 518,
    features: ['Breakfast', 'Gym', 'Budget-friendly', 'Central location', 'Business'],
    description:
      'Sukhumvit Courtyard is a practical, modern stay for travelers who want Bangkok access, reliable rooms, and straightforward value.',
    tags: ['Transit-friendly', 'Budget city stay', 'Practical choice'],
    image: hotelImage('photo-1502005229762-cf1b2da7c5d6'),
    gallery: hotelGallery(
      'photo-1496417263034-38ec4f0b665a',
      'photo-1505692952047-1a78307da8f2',
      'photo-1445019980597-93fa8acb246c'
    ),
    coordinates: { lat: 13.7369, lng: 100.5656 },
    reviewSummary:
      'Reviews often mention the strong transport links, dependable housekeeping, and overall value for shorter city stays.',
    reasonsToChoose: [
      'A useful Bangkok base when budget and location matter most.',
      'Good business-friendly essentials without resort pricing.',
      'Easy to use for first-time city visits.',
    ],
  },
  {
    id: 'pacific-atelier-los-angeles',
    name: 'Pacific Atelier',
    city: 'Los Angeles',
    country: 'United States',
    locationDescription:
      'In West Hollywood with easy access to design stores, restaurants, and short drives toward Beverly Hills and Hollywood.',
    priceLevel: '$$$$',
    startingPrice: 372,
    starRating: 5,
    reviewScore: 9.1,
    reviewCount: 362,
    features: ['Pool', 'Gym', 'Luxury', 'Modern interior', 'Bar', 'Business'],
    description:
      'Pacific Atelier brings together strong room design, a polished pool deck, and a city-stay energy that feels distinctly Los Angeles.',
    tags: ['Design hotel', 'West Hollywood', 'Premium city stay'],
    image: hotelImage('photo-1513694203232-719a280e022f'),
    gallery: hotelGallery(
      'photo-1512918728675-ed5a9ecdebfd',
      'photo-1522798514-97ceb8c4f1c8',
      'photo-1566073771259-6a8506099945'
    ),
    coordinates: { lat: 34.0907, lng: -118.3855 },
    reviewSummary:
      'Guests often mention the design-forward rooms, the social rooftop scene, and the polished feel of the entire arrival experience.',
    reasonsToChoose: [
      'A stylish Los Angeles choice with a strong sense of place.',
      'Works well for leisure trips and creative industry travel.',
      'One of the more memorable premium city stays in the area.',
    ],
  },
  {
    id: 'santa-monica-bluff-house-los-angeles',
    name: 'Santa Monica Bluff House',
    city: 'Los Angeles',
    country: 'United States',
    locationDescription:
      'Near Ocean Avenue and the bluff paths, with beach views, morning walks, and easy access to Santa Monica dining.',
    priceLevel: '$$$',
    startingPrice: 294,
    starRating: 4,
    reviewScore: 8.9,
    reviewCount: 447,
    features: ['Breakfast', 'Pool', 'Scenic view', 'Family-friendly', 'Quiet rooms'],
    description:
      'Santa Monica Bluff House favors light-filled rooms, ocean access, and a calmer coastal rhythm than many central LA stays.',
    tags: ['Coastal stay', 'Family trip', 'Ocean view'],
    image: hotelImage('photo-1564501049412-61c2a3083791'),
    gallery: hotelGallery(
      'photo-1506744038136-46273834b3fb',
      'photo-1540541338287-41700207dee6',
      'photo-1500530855697-b586d89ba3ee'
    ),
    coordinates: { lat: 34.0125, lng: -118.4962 },
    reviewSummary:
      'Travelers rate the location and room comfort highly, especially when they want beach access without sacrificing a quieter night.',
    reasonsToChoose: [
      'A strong coastal option with broad appeal.',
      'Well suited to family stays and slower weekends.',
      'Combines LA access with a more relaxed base.',
    ],
  },
  {
    id: 'bayfront-meridian-miami',
    name: 'Bayfront Meridian',
    city: 'Miami',
    country: 'United States',
    locationDescription:
      'In Brickell near waterfront paths, dining, and quick connections between Downtown, Wynwood, and the beach.',
    priceLevel: '$$$',
    startingPrice: 254,
    starRating: 5,
    reviewScore: 8.9,
    reviewCount: 476,
    features: ['Pool', 'Gym', 'Breakfast', 'Business', 'Modern interior', 'Bar'],
    description:
      'Bayfront Meridian offers a smooth Miami city stay with sleek rooms, dependable service, and enough amenities for both work and leisure.',
    tags: ['Brickell', 'City break', 'Business-leisure'],
    image: hotelImage('photo-1507149833265-60c372daea22'),
    gallery: hotelGallery(
      'photo-1500530855697-b586d89ba3ee',
      'photo-1521783988139-89397d761dce',
      'photo-1505692952047-1a78307da8f2'
    ),
    coordinates: { lat: 25.7646, lng: -80.1918 },
    reviewSummary:
      'Guests often highlight the polished rooms, city views, and the hotels usefulness for short Miami trips with mixed agendas.',
    reasonsToChoose: [
      'A dependable premium option in central Miami.',
      'Strong amenities for both meetings and downtime.',
      'Good fit if you want city access more than a resort atmosphere.',
    ],
  },
  {
    id: 'little-havana-house-miami',
    name: 'Little Havana House',
    city: 'Miami',
    country: 'United States',
    locationDescription:
      'On the edge of Little Havana, close to neighborhood dining, music venues, and easy rides toward Downtown and the beach.',
    priceLevel: '$$',
    startingPrice: 171,
    starRating: 4,
    reviewScore: 8.5,
    reviewCount: 323,
    features: ['Breakfast', 'Budget-friendly', 'Family-friendly', 'Modern interior', 'Bar'],
    description:
      'Little Havana House brings together a local-feeling neighborhood base with modern rooms and easier pricing than many Miami waterfront stays.',
    tags: ['Neighborhood hotel', 'Value stay', 'Culture-led trip'],
    image: hotelImage('photo-1502672023488-70e25813eb80'),
    gallery: hotelGallery(
      'photo-1542314831-068cd1dbfeeb',
      'photo-1496417263034-38ec4f0b665a',
      'photo-1445019980597-93fa8acb246c'
    ),
    coordinates: { lat: 25.7668, lng: -80.2196 },
    reviewSummary:
      'Guests appreciate the local setting, practical service, and the sense that the hotel gives them a more grounded Miami trip.',
    reasonsToChoose: [
      'A more affordable Miami option with local character.',
      'Good for travelers who want culture and value over resort extras.',
      'Useful for longer city stays and mixed itineraries.',
    ],
  },
];
