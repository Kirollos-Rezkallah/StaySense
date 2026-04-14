import { createContext, useEffect, useMemo, useState } from 'react';
import { cities, hotels } from '../data/hotels';
import {
  buildAssistantReply,
  extractPreferencesFromMessage,
  getDefaultPreferences,
  mergePreferenceProfiles,
  rankHotelsByPreferences,
} from '../utils/preferences';

const PREFERENCES_STORAGE_KEY = 'staysense.preferences';

export const PreferencesContext = createContext(null);

function createInitialAssistantMessage() {
  return {
    id: 'assistant-welcome',
    role: 'assistant',
    text: 'Tell me what matters for this stay and I will translate it into a tighter shortlist. You can mention things like quiet rooms, breakfast, wellness, budget, family travel, business needs, or a preferred city.',
    createdAt: new Date().toISOString(),
    recommendations: [],
  };
}

function getStoredAssistantState() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const savedState = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    const parsedState = savedState ? JSON.parse(savedState) : null;

    if (!parsedState || typeof parsedState !== 'object') {
      return null;
    }

    return {
      preferences: {
        ...getDefaultPreferences(),
        ...parsedState.preferences,
      },
      messages: Array.isArray(parsedState.messages)
        ? parsedState.messages
        : [createInitialAssistantMessage()],
      latestRecommendations: Array.isArray(parsedState.latestRecommendations)
        ? parsedState.latestRecommendations
        : [],
    };
  } catch {
    return null;
  }
}

function getInitialAssistantState() {
  return (
    getStoredAssistantState() || {
      preferences: getDefaultPreferences(),
      messages: [createInitialAssistantMessage()],
      latestRecommendations: [],
    }
  );
}

function createUserMessage(text) {
  return {
    id: `usr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: 'user',
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };
}

function createAssistantMessage(text, recommendations) {
  return {
    id: `ast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: 'assistant',
    text,
    createdAt: new Date().toISOString(),
    recommendations: recommendations.map((recommendation) => ({
      hotelId: recommendation.hotel.id,
      explanation: recommendation.explanation,
      matchedPreferences: recommendation.matchedPreferences,
      score: recommendation.score,
    })),
  };
}

export function PreferencesProvider({ children }) {
  const [assistantState, setAssistantState] = useState(getInitialAssistantState);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(assistantState));
  }, [assistantState]);

  const submitAssistantMessage = (message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      throw new Error('Share a little about what matters for this stay so I can help.');
    }

    const extractedPreferences = extractPreferencesFromMessage(trimmedMessage, cities);
    const mergedPreferences = mergePreferenceProfiles(
      assistantState.preferences,
      extractedPreferences,
    );
    const recommendations = rankHotelsByPreferences(hotels, mergedPreferences, 4);
    const assistantReply = buildAssistantReply(mergedPreferences, recommendations);

    const nextState = {
      preferences: mergedPreferences,
      messages: [
        ...assistantState.messages,
        createUserMessage(trimmedMessage),
        createAssistantMessage(assistantReply, recommendations),
      ],
      latestRecommendations: recommendations.map((recommendation) => ({
        hotelId: recommendation.hotel.id,
        explanation: recommendation.explanation,
        matchedPreferences: recommendation.matchedPreferences,
        score: recommendation.score,
      })),
    };

    setAssistantState(nextState);
    return nextState;
  };

  const clearAssistantSession = () => {
    setAssistantState({
      preferences: getDefaultPreferences(),
      messages: [createInitialAssistantMessage()],
      latestRecommendations: [],
    });
  };

  const value = useMemo(
    () => ({
      preferences: assistantState.preferences,
      messages: assistantState.messages,
      latestRecommendations: assistantState.latestRecommendations,
      submitAssistantMessage,
      clearAssistantSession,
    }),
    [assistantState],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
