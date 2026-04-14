import { getPriceLevelRank } from '../data/hotelSeedUtils';

const PRIORITY_CUES = [
  'care most about',
  'matters most',
  'most important',
  'priority is',
  'priorities are',
  'focus on',
  'focused on',
];

const RESET_CUES = ['start over', 'reset preferences', 'clear preferences', 'forget that'];

const NEGATIVE_CUES = [
  'no',
  'not',
  'without',
  'avoid',
  'skip',
  "don't want",
  'dont want',
  'rather not',
  'not looking for',
];

export const preferenceDefinitions = {
  pool: {
    label: 'Pool',
    aliases: ['pool', 'swimming pool'],
    matchesHotel: (hotel) => hotel.features.includes('Pool'),
  },
  spa: {
    label: 'Spa',
    aliases: ['spa', 'wellness'],
    matchesHotel: (hotel) => hotel.features.includes('Spa'),
  },
  gym: {
    label: 'Gym',
    aliases: ['gym', 'fitness'],
    matchesHotel: (hotel) => hotel.features.includes('Gym'),
  },
  breakfast: {
    label: 'Breakfast',
    aliases: ['breakfast', 'breakfast included', 'morning meal'],
    matchesHotel: (hotel) => hotel.features.includes('Breakfast'),
  },
  service: {
    label: 'Service',
    aliases: ['service', 'staff', 'hospitality', 'helpful team', 'attentive team'],
    matchesHotel: (hotel) =>
      /\b(service|staff|team|attentive|friendly|arrival)\b/.test(buildHotelSearchText(hotel)) ||
      hotel.reviewScore >= 9,
  },
  cleanliness: {
    label: 'Cleanliness',
    aliases: ['cleanliness', 'clean', 'spotless'],
    matchesHotel: (hotel) =>
      /\b(clean|polished|refined|immaculate|fresh)\b/.test(buildHotelSearchText(hotel)) ||
      hotel.reviewScore >= 8.9,
  },
  quiet: {
    label: 'Quiet rooms',
    aliases: ['quiet', 'quiet rooms', 'peaceful', 'calm', 'sleep well'],
    matchesHotel: (hotel) =>
      hotel.features.includes('Quiet rooms') ||
      /\b(quiet|calm|peaceful|stillness|serene)\b/.test(buildHotelSearchText(hotel)),
  },
  modernInterior: {
    label: 'Modern interior',
    aliases: ['modern', 'modern interior', 'contemporary', 'design-led', 'stylish'],
    matchesHotel: (hotel) =>
      hotel.features.includes('Modern interior') ||
      /\b(modern|design|contemporary|stylish)\b/.test(buildHotelSearchText(hotel)),
  },
  centralLocation: {
    label: 'Central location',
    aliases: [
      'central location',
      'city center',
      'city centre',
      'near the city center',
      'location',
      'walkable',
    ],
    matchesHotel: (hotel) =>
      hotel.features.includes('Central location') ||
      /\b(central|walkable|downtown|easy access|chiado)\b/.test(buildHotelSearchText(hotel)),
  },
  scenicView: {
    label: 'Scenic view',
    aliases: ['scenic view', 'view', 'views', 'rooftop', 'waterfront'],
    matchesHotel: (hotel) =>
      hotel.features.includes('Scenic view') ||
      /\b(view|waterfront|river|rooftop|hillside|lookout)\b/.test(buildHotelSearchText(hotel)),
  },
  budget: {
    label: 'Budget',
    aliases: [
      'budget',
      'budget friendly',
      'budget-friendly',
      'affordable',
      'good value',
      'value',
      'not too expensive',
    ],
    matchesHotel: (hotel) =>
      hotel.features.includes('Budget-friendly') ||
      getPriceLevelRank(hotel.priceLevel) <= 2 ||
      hotel.startingPrice <= 180,
  },
  luxury: {
    label: 'Luxury',
    aliases: ['luxury', 'luxurious', 'premium', 'upscale'],
    matchesHotel: (hotel) =>
      hotel.features.includes('Luxury') ||
      getPriceLevelRank(hotel.priceLevel) >= 4 ||
      (hotel.starRating >= 5 && hotel.startingPrice >= 280),
  },
  familyFriendly: {
    label: 'Family-friendly',
    aliases: ['family friendly', 'family-friendly', 'kids', 'family stay'],
    matchesHotel: (hotel) => hotel.features.includes('Family-friendly'),
  },
  businessFriendly: {
    label: 'Business-friendly',
    aliases: ['business', 'business friendly', 'business-friendly', 'work trip'],
    matchesHotel: (hotel) => hotel.features.includes('Business'),
  },
};

export function getDefaultPreferences() {
  return {
    positive: [],
    negative: [],
    priorities: [],
    cities: [],
    destinationQuery: '',
    unsupportedDestination: '',
    lastMessage: '',
    summary: 'No travel preferences saved yet.',
    confidence: 'vague',
    updatedAt: null,
  };
}

export function getPreferenceLabel(key) {
  return preferenceDefinitions[key]?.label || key;
}

export function isPreferenceProfileActive(preferences) {
  if (!preferences) {
    return false;
  }

  return Boolean(
    preferences.positive?.length || preferences.negative?.length || preferences.cities?.length,
  );
}

export function extractPreferencesFromMessage(message, availableCities = []) {
  const normalizedMessage = normalizeText(message);
  const positive = [];
  const negative = [];
  const priorities = [];
  const destinationQuery = detectDestinationQuery(message, availableCities);

  if (RESET_CUES.some((cue) => normalizedMessage.includes(cue))) {
    return {
      ...getDefaultPreferences(),
      isReset: true,
      lastMessage: message.trim(),
      updatedAt: new Date().toISOString(),
    };
  }

  Object.entries(preferenceDefinitions).forEach(([key, definition]) => {
    const mention = detectPreferenceMention(normalizedMessage, definition.aliases);

    if (mention.negative) {
      negative.push(key);
      return;
    }

    if (mention.positive) {
      positive.push(key);

      if (PRIORITY_CUES.some((cue) => normalizedMessage.includes(cue))) {
        priorities.push(key);
      }
    }
  });

  const cities = availableCities.filter((city) => containsPhrase(normalizedMessage, city));
  const resolvedCities = destinationQuery
    ? availableCities.filter((city) => normalizeText(city) === normalizeText(destinationQuery))
    : cities;
  const uniquePositive = uniqueItems(positive.filter((key) => !negative.includes(key)));
  const uniqueNegative = uniqueItems(negative.filter((key) => !uniquePositive.includes(key)));
  const uniquePriorities = uniqueItems(priorities.filter((key) => uniquePositive.includes(key)));

  const extractedPreferences = {
    positive: uniquePositive,
    negative: uniqueNegative,
    priorities: uniquePriorities,
    cities: resolvedCities,
    destinationQuery,
    unsupportedDestination:
      destinationQuery && !resolvedCities.length ? formatDestinationLabel(destinationQuery) : '',
    lastMessage: message.trim(),
    updatedAt: new Date().toISOString(),
  };

  return {
    ...extractedPreferences,
    isReset: false,
    summary: buildPreferenceSummary(extractedPreferences),
    confidence: getPreferenceConfidence(extractedPreferences),
  };
}

export function mergePreferenceProfiles(currentPreferences, extractedPreferences) {
  if (extractedPreferences.isReset) {
    return {
      ...getDefaultPreferences(),
      lastMessage: extractedPreferences.lastMessage,
      updatedAt: extractedPreferences.updatedAt,
    };
  }

  const basePreferences = currentPreferences || getDefaultPreferences();
  const nextPositive = uniqueItems([
    ...basePreferences.positive.filter((key) => !extractedPreferences.negative.includes(key)),
    ...extractedPreferences.positive,
  ]);
  const nextNegative = uniqueItems([
    ...basePreferences.negative.filter((key) => !extractedPreferences.positive.includes(key)),
    ...extractedPreferences.negative,
  ]);
  const nextCities = extractedPreferences.cities.length
    ? uniqueItems(extractedPreferences.cities)
    : basePreferences.cities;
  const nextDestinationQuery = extractedPreferences.destinationQuery || basePreferences.destinationQuery;
  const nextUnsupportedDestination = extractedPreferences.destinationQuery
    ? extractedPreferences.unsupportedDestination
    : basePreferences.unsupportedDestination;

  const mergedPreferences = {
    positive: nextPositive.filter((key) => !nextNegative.includes(key)),
    negative: nextNegative.filter((key) => !nextPositive.includes(key)),
    priorities: uniqueItems([
      ...basePreferences.priorities,
      ...extractedPreferences.priorities,
    ]).filter((key) => nextPositive.includes(key)),
    cities: nextCities,
    destinationQuery: nextDestinationQuery,
    unsupportedDestination: nextUnsupportedDestination,
    lastMessage: extractedPreferences.lastMessage || basePreferences.lastMessage,
    updatedAt: extractedPreferences.updatedAt || basePreferences.updatedAt,
  };

  return {
    ...mergedPreferences,
    summary: buildPreferenceSummary(mergedPreferences),
    confidence: getPreferenceConfidence(mergedPreferences),
  };
}

export function buildPreferenceSummary(preferences) {
  const positiveLabels = preferences.positive?.map(getPreferenceLabel) || [];
  const negativeLabels = preferences.negative?.map(getPreferenceLabel) || [];
  const cityLabels = preferences.cities || [];

  if (
    !positiveLabels.length &&
    !negativeLabels.length &&
    !cityLabels.length &&
    !preferences.unsupportedDestination
  ) {
    return 'No travel preferences saved yet.';
  }

  const parts = [];

  if (positiveLabels.length) {
    parts.push(`Looking for ${listToSentence(positiveLabels)}.`);
  }

  if (negativeLabels.length) {
    parts.push(`Steering away from ${listToSentence(negativeLabels)}.`);
  }

  if (cityLabels.length) {
    parts.push(`Focused on ${listToSentence(cityLabels)}.`);
  }

  if (preferences.unsupportedDestination) {
    parts.push(
      `Requested destination: ${preferences.unsupportedDestination}, which is not in the current collection yet.`,
    );
  }

  return parts.join(' ');
}

export function rankHotelsByPreferences(hotels, preferences, limit = 4) {
  const hasSignals = isPreferenceProfileActive(preferences);
  const destinationScopedHotels = preferences.cities?.length
    ? hotels.filter((hotel) => preferences.cities.includes(hotel.city))
    : hotels;
  const rankingPool = destinationScopedHotels.length ? destinationScopedHotels : hotels;
  const rankedHotels = rankingPool
    .map((hotel) => {
      const matchedPreferences = [];
      const blockedPreferences = [];
      let score =
        hotel.reviewScore * 6 + hotel.starRating * 2 + Math.min(hotel.reviewCount / 120, 5);

      if (preferences.cities?.length && preferences.cities.includes(hotel.city)) {
        score += 40;
      }

      preferences.positive?.forEach((key) => {
        if (preferenceDefinitions[key]?.matchesHotel(hotel)) {
          matchedPreferences.push(key);
          score += preferences.priorities?.includes(key) ? 14 : 9;
        } else {
          score -= preferences.priorities?.includes(key) ? 4 : 1.5;
        }
      });

      preferences.negative?.forEach((key) => {
        if (preferenceDefinitions[key]?.matchesHotel(hotel)) {
          blockedPreferences.push(key);
          score -= 12;
        } else {
          score += 2;
        }
      });

      if (!hasSignals) {
        score += hotel.reviewScore * 2;
      }

      return {
        hotel,
        score,
        matchedPreferences,
        blockedPreferences,
        explanation: buildRecommendationExplanation(hotel, preferences, matchedPreferences),
      };
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        right.hotel.reviewScore - left.hotel.reviewScore ||
        right.hotel.reviewCount - left.hotel.reviewCount,
    );

  return rankedHotels.slice(0, limit);
}

export function buildAssistantReply(preferences, recommendations) {
  if (!isPreferenceProfileActive(preferences)) {
    if (preferences.unsupportedDestination) {
      return `I do not have hotels in ${preferences.unsupportedDestination} yet. Share what matters most for the stay, such as quiet rooms, breakfast, wellness, or budget, and I will surface the closest fit from the current collection.`;
    }

    return [
      'I can narrow this down much better once I have two or three signals to work with.',
      'Tell me what matters most, like quiet rooms, breakfast, budget, wellness, or a preferred city, and I will sharpen the shortlist right away.',
    ].join(' ');
  }

  const lines = [];
  const positiveLabels = preferences.positive.map(getPreferenceLabel);
  const negativeLabels = preferences.negative.map(getPreferenceLabel);

  if (positiveLabels.length) {
    lines.push(`I'm reading this as a preference for ${listToSentence(positiveLabels)}.`);
  }

  if (negativeLabels.length) {
    lines.push(
      `I'll keep away from stays that lean too heavily toward ${listToSentence(negativeLabels)}.`,
    );
  }

  if (preferences.cities.length) {
    lines.push(`I'll keep the focus on ${listToSentence(preferences.cities)}.`);
  }

  if (preferences.unsupportedDestination) {
    lines.push(
      `I do not have hotels in ${preferences.unsupportedDestination} yet, so I'm leaning on your stay preferences to find the closest fit from the current collection.`,
    );
  }

  if (recommendations.length) {
    lines.push(
      `${listToSentence(
        recommendations.slice(0, 3).map((recommendation) => recommendation.hotel.name),
      )} look like the strongest fits right now.`,
    );
  }

  if (preferences.confidence !== 'specific') {
    lines.push(
      'If you want an even tighter shortlist, add one more signal like breakfast, spa access, price comfort, or the kind of neighborhood you prefer.',
    );
  }

  return lines.join(' ');
}

function buildRecommendationExplanation(hotel, preferences, matchedPreferences) {
  const matchedLabels = matchedPreferences.slice(0, 3).map(getPreferenceLabel);

  if (matchedLabels.length) {
    return `Matches your focus on ${listToSentence(matchedLabels)}. ${hotel.reviewSummary}`;
  }

  if (preferences.cities?.includes(hotel.city)) {
    return `Keeps you in ${hotel.city} while giving you a strong overall stay profile. ${hotel.reviewSummary}`;
  }

  return `A reliable all-round option with strong guest sentiment. ${hotel.reviewSummary}`;
}

function buildHotelSearchText(hotel) {
  return normalizeText(
    [
      hotel.locationDescription,
      hotel.description,
      hotel.reviewSummary,
      ...(hotel.reasonsToChoose || []),
      ...(hotel.tags || []),
      ...(hotel.features || []),
    ].join(' '),
  );
}

function getPreferenceConfidence(preferences) {
  const signalCount =
    (preferences.positive?.length || 0) +
    (preferences.negative?.length || 0) +
    (preferences.cities?.length || 0);

  if (signalCount >= 3) {
    return 'specific';
  }

  if (signalCount >= 1) {
    return 'emerging';
  }

  return 'vague';
}

function detectPreferenceMention(message, aliases) {
  let positive = false;
  let negative = false;

  aliases.forEach((alias) => {
    if (negative) {
      return;
    }

    if (containsNegativePhrase(message, alias)) {
      negative = true;
      return;
    }

    if (containsPhrase(message, alias)) {
      positive = true;
    }
  });

  return { positive, negative };
}

function containsNegativePhrase(message, phrase) {
  const phrasePattern = patternize(phrase);
  return NEGATIVE_CUES.some((cue) =>
    new RegExp(`\\b${patternize(cue)}\\b\\s+(?:a\\s+|an\\s+|any\\s+)?${phrasePattern}\\b`).test(
      message,
    ),
  );
}

function containsPhrase(message, phrase) {
  return new RegExp(`\\b${patternize(phrase)}\\b`).test(message);
}

function patternize(value) {
  return escapeRegExp(normalizeText(value)).replace(/\s+/g, '\\s+');
}

function normalizeText(value) {
  return (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function uniqueItems(items) {
  return [...new Set(items)];
}

function listToSentence(items) {
  if (!items.length) {
    return '';
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
}

function detectDestinationQuery(message, availableCities) {
  const normalizedMessage = normalizeText(message);
  const matchedCity = availableCities.find((city) => containsPhrase(normalizedMessage, city));

  if (matchedCity) {
    return matchedCity;
  }

  const destinationPatterns = [
    /\b(?:in|near|around|for)\s+([a-z]+(?:\s+[a-z]+){0,2})/i,
    /\b(?:trip to|staying in|visit to)\s+([a-z]+(?:\s+[a-z]+){0,2})/i,
  ];

  for (const pattern of destinationPatterns) {
    const match = message.match(pattern);

    if (!match) {
      continue;
    }

    const candidate = normalizeText(match[1]);

    if (!candidate || isGenericDestinationPhrase(candidate)) {
      continue;
    }

    return candidate;
  }

  return '';
}

function isGenericDestinationPhrase(candidate) {
  const ignoredPhrases = new Set([
    'the city',
    'city center',
    'city centre',
    'the city center',
    'the city centre',
    'town',
    'the center',
    'the centre',
    'downtown',
    'a hotel',
    'the hotel',
    'my trip',
  ]);

  return ignoredPhrases.has(candidate);
}

function formatDestinationLabel(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
