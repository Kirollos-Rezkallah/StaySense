import { hotelGallery, hotelImage } from './hotelSeedUtils';

export const hotelCatalogD = [
  {
    id: 'rive-gauche-pavilion-paris',
    name: 'Rive Gauche Pavilion',
    city: 'Paris',
    country: 'France',
    locationDescription:
      'A few streets from Saint-Germain-des-Pres, close to bookshops, classic cafes, and Left Bank walks that still feel distinctly local.',
    priceLevel: '$$$$',
    startingPrice: 395,
    starRating: 5,
    reviewScore: 9.4,
    reviewCount: 466,
    features: ['Breakfast', 'Spa', 'Quiet rooms', 'Luxury', 'Bar', 'Central location'],
    description:
      'Rive Gauche Pavilion pairs polished service with calm rooms and a classic Paris setting that feels refined without becoming formal.',
    tags: ['Left Bank', 'Boutique luxury', 'Romantic stay'],
    image: hotelImage('photo-1566073771259-6a8506099945'),
    gallery: hotelGallery(
      'photo-1505693416388-ac5ce068fe85',
      'photo-1522708323590-d24dbb6b0267',
      'photo-1496417263034-38ec4f0b665a'
    ),
    coordinates: { lat: 48.8547, lng: 2.3338 },
    reviewSummary:
      'Guests consistently mention the calm rooms, attentive concierge team, and how easy the neighborhood is to enjoy on foot.',
    reasonsToChoose: [
      'A refined Paris stay with strong sleep quality.',
      'Excellent placement for cafes, galleries, and walks.',
      'A polished fit for celebratory city trips.',
    ],
  },
  {
    id: 'atelier-montmartre-house-paris',
    name: 'Atelier Montmartre House',
    city: 'Paris',
    country: 'France',
    locationDescription:
      'On a quieter slope below Montmartre, near bakeries, neighborhood wine bars, and quick metro links into central Paris.',
    priceLevel: '$$',
    startingPrice: 188,
    starRating: 4,
    reviewScore: 8.8,
    reviewCount: 338,
    features: ['Breakfast', 'Quiet rooms', 'Modern interior', 'Budget-friendly', 'Family-friendly'],
    description:
      'Atelier Montmartre House offers well-planned rooms, a softer neighborhood pace, and value that feels especially strong for Paris.',
    tags: ['Neighborhood stay', 'Value pick', 'Residential feel'],
    image: hotelImage('photo-1444201983204-c43cbd584d93'),
    gallery: hotelGallery(
      'photo-1496417263034-38ec4f0b665a',
      'photo-1445019980597-93fa8acb246c',
      'photo-1505692952047-1a78307da8f2'
    ),
    coordinates: { lat: 48.8868, lng: 2.3387 },
    reviewSummary:
      'Travelers appreciate the practical rooms, friendly service, and the feeling of staying in a real neighborhood rather than a busy tourist corridor.',
    reasonsToChoose: [
      'A more approachable Paris stay with real local character.',
      'Quiet enough for longer city weekends.',
      'Strong overall value without sacrificing comfort.',
    ],
  },
  {
    id: 'piazza-luce-rome',
    name: 'Piazza Luce Hotel',
    city: 'Rome',
    country: 'Italy',
    locationDescription:
      'Between the Pantheon and Piazza Navona, with late dinners, stone lanes, and major landmarks all within an easy walk.',
    priceLevel: '$$$',
    startingPrice: 278,
    starRating: 5,
    reviewScore: 9.1,
    reviewCount: 421,
    features: ['Breakfast', 'Bar', 'Central location', 'Luxury', 'Scenic view', 'Quiet rooms'],
    description:
      'Piazza Luce Hotel delivers a polished central Rome experience with quiet rooms and a pace that still feels relaxed after dark.',
    tags: ['Historic center', 'Classic city stay', 'Walkable'],
    image: hotelImage('photo-1455849318743-b2233052fcff'),
    gallery: hotelGallery(
      'photo-1566073771259-6a8506099945',
      'photo-1522798514-97ceb8c4f1c8',
      'photo-1455587734955-081b22074882'
    ),
    coordinates: { lat: 41.8996, lng: 12.4731 },
    reviewSummary:
      'Guests highlight the rare mix of central access and quiet nights, along with a team that makes arrival and dining reservations feel seamless.',
    reasonsToChoose: [
      'A strong central Rome option that still feels restful.',
      'Excellent for travelers who want to walk almost everywhere.',
      'Balances classic atmosphere with comfortable rooms.',
    ],
  },
  {
    id: 'trastevere-court-rome',
    name: 'Trastevere Court',
    city: 'Rome',
    country: 'Italy',
    locationDescription:
      'On a side street in Trastevere, close to neighborhood restaurants, morning markets, and river crossings into the historic core.',
    priceLevel: '$$',
    startingPrice: 164,
    starRating: 4,
    reviewScore: 8.7,
    reviewCount: 357,
    features: ['Breakfast', 'Budget-friendly', 'Quiet rooms', 'Family-friendly', 'Bar'],
    description:
      'Trastevere Court is a grounded, comfortable stay that prioritizes atmosphere, walkability, and easy evenings over full-service extras.',
    tags: ['Local feel', 'Courtyard', 'Value city break'],
    image: hotelImage('photo-1486406146926-c627a92ad1ab'),
    gallery: hotelGallery(
      'photo-1542314831-068cd1dbfeeb',
      'photo-1445019980597-93fa8acb246c',
      'photo-1505693416388-ac5ce068fe85'
    ),
    coordinates: { lat: 41.8888, lng: 12.4695 },
    reviewSummary:
      'Reviews often mention the neighborhood energy, practical breakfast, and how well the hotel suits travelers who plan to spend most of the day outdoors.',
    reasonsToChoose: [
      'A good-value stay in one of Romes most atmospheric districts.',
      'Easy going, comfortable, and well placed for evening dining.',
      'A smart pick when character matters more than luxury extras.',
    ],
  },
  {
    id: 'canal-house-nine-amsterdam',
    name: 'Canal House Nine',
    city: 'Amsterdam',
    country: 'Netherlands',
    locationDescription:
      'Along the central canals near the Nine Streets, surrounded by design shops, cafes, and easy tram access across the city.',
    priceLevel: '$$$$',
    startingPrice: 342,
    starRating: 5,
    reviewScore: 9.3,
    reviewCount: 304,
    features: ['Breakfast', 'Spa', 'Quiet rooms', 'Luxury', 'Scenic view', 'Modern interior'],
    description:
      'Canal House Nine offers refined rooms, soft lighting, and a calm canal-side atmosphere that makes Amsterdam feel immediately settled.',
    tags: ['Canal stay', 'Design hotel', 'Quiet luxury'],
    image: hotelImage('photo-1500530855697-b586d89ba3ee'),
    gallery: hotelGallery(
      'photo-1468824357306-a439d58ccb1c',
      'photo-1522708323590-d24dbb6b0267',
      'photo-1505692952047-1a78307da8f2'
    ),
    coordinates: { lat: 52.3716, lng: 4.8839 },
    reviewSummary:
      'Guests praise the canal views, warm interiors, and the fact that the hotel feels tucked away while staying right in the city center.',
    reasonsToChoose: [
      'A polished canal-side stay with a calm tone.',
      'Strong design details and excellent room atmosphere.',
      'Well suited to premium city weekends.',
    ],
  },
  {
    id: 'jordaan-mercantile-amsterdam',
    name: 'Jordaan Mercantile',
    city: 'Amsterdam',
    country: 'Netherlands',
    locationDescription:
      'In the Jordaan, near local brunch spots, canal crossings, and smaller streets that feel residential even in busy seasons.',
    priceLevel: '$$',
    startingPrice: 196,
    starRating: 4,
    reviewScore: 8.9,
    reviewCount: 412,
    features: ['Breakfast', 'Quiet rooms', 'Central location', 'Family-friendly', 'Budget-friendly'],
    description:
      'Jordaan Mercantile keeps things warm and practical, giving travelers an easy-going base in one of the citys most pleasant districts.',
    tags: ['Jordaan', 'Neighborhood stay', 'Comfort-first'],
    image: hotelImage('photo-1505692952047-1a78307da8f2'),
    gallery: hotelGallery(
      'photo-1505692952047-1a78307da8f2',
      'photo-1496417263034-38ec4f0b665a',
      'photo-1445019980597-93fa8acb246c'
    ),
    coordinates: { lat: 52.3775, lng: 4.8797 },
    reviewSummary:
      'Travelers like the quieter setting, generous breakfast, and how naturally the hotel fits slower city trips.',
    reasonsToChoose: [
      'A comfortable neighborhood option with good value.',
      'Strong fit for couples and family city breaks.',
      'Quieter than many of the busiest canal-side stays.',
    ],
  },
  {
    id: 'mitte-circle-berlin',
    name: 'Mitte Circle Hotel',
    city: 'Berlin',
    country: 'Germany',
    locationDescription:
      'In Mitte close to Museum Island, transit hubs, and a mix of galleries, cafes, and business addresses.',
    priceLevel: '$$$',
    startingPrice: 224,
    starRating: 4,
    reviewScore: 8.9,
    reviewCount: 498,
    features: ['Breakfast', 'Gym', 'Business', 'Central location', 'Modern interior', 'Bar'],
    description:
      'Mitte Circle Hotel is a polished all-rounder for Berlin, with efficient rooms and a location that keeps work and leisure equally manageable.',
    tags: ['Business ready', 'Central Berlin', 'Modern stay'],
    image: hotelImage('photo-1451976426598-a7593bd6d0b2'),
    gallery: hotelGallery(
      'photo-1522708323590-d24dbb6b0267',
      'photo-1522798514-97ceb8c4f1c8',
      'photo-1455587734955-081b22074882'
    ),
    coordinates: { lat: 52.5208, lng: 13.4013 },
    reviewSummary:
      'Guests often point to the efficient service, comfortable beds, and the hotels usefulness for short city stays and work trips.',
    reasonsToChoose: [
      'A dependable central Berlin base with broad appeal.',
      'Useful for mixed work and leisure itineraries.',
      'Clean, modern rooms in a highly connected area.',
    ],
  },
  {
    id: 'tiergarten-loft-berlin',
    name: 'Tiergarten Loft Stay',
    city: 'Berlin',
    country: 'Germany',
    locationDescription:
      'Near Tiergarten and the western edge of Mitte, with green space nearby and straightforward S-Bahn connections.',
    priceLevel: '$',
    startingPrice: 122,
    starRating: 3,
    reviewScore: 8.3,
    reviewCount: 389,
    features: ['Budget-friendly', 'Quiet rooms', 'Modern interior', 'Breakfast'],
    description:
      'Tiergarten Loft Stay focuses on clean design, smart pricing, and a calmer setting for travelers who want to spend more on the city than the room.',
    tags: ['Budget city stay', 'Parkside', 'Simple modern'],
    image: hotelImage('photo-1445019980597-93fa8acb246c'),
    gallery: hotelGallery(
      'photo-1445019980597-93fa8acb246c',
      'photo-1496417263034-38ec4f0b665a',
      'photo-1505693416388-ac5ce068fe85'
    ),
    coordinates: { lat: 52.5143, lng: 13.3501 },
    reviewSummary:
      'Guests say the rooms feel newer than the price suggests, and they like the balance between access to the city and quieter nights.',
    reasonsToChoose: [
      'One of the stronger budget picks in Berlin.',
      'Simple, modern rooms with decent breakfast value.',
      'A smart option for practical city weekends.',
    ],
  },
];
