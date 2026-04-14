import { useState } from 'react';
import { HiOutlineArrowRight, HiOutlineSparkles } from 'react-icons/hi2';
import { LuCompass, LuMapPin, LuRotateCcw, LuSend } from 'react-icons/lu';
import { getHotelById } from '../data/hotels';
import usePreferences from '../hooks/usePreferences';
import {
  getPreferenceLabel,
  isPreferenceProfileActive,
} from '../utils/preferences';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import appStyles from './AppPage.module.css';
import styles from './AIAssistantPage.module.css';

const starterPrompts = [
  'I want a quiet hotel with a pool and gym',
  'Recommend a modern hotel near the city center',
  'I need a budget-friendly stay with breakfast included',
  'I care most about service, cleanliness, and location',
];

function AIAssistantPage() {
  const { clearAssistantSession, latestRecommendations, messages, preferences, submitAssistantMessage } =
    usePreferences();
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      submitAssistantMessage(draft);
      setDraft('');
      setError('');
    } catch (submissionError) {
      setError(submissionError.message);
    }
  };

  const handleStarterClick = (prompt) => {
    try {
      submitAssistantMessage(prompt);
      setDraft('');
      setError('');
    } catch (submissionError) {
      setError(submissionError.message);
    }
  };

  const hasPreferences = isPreferenceProfileActive(preferences);

  return (
    <div className={`container ${appStyles.page}`}>
      <Card className={appStyles.heroCard} elevated>
        <Badge tone="accent">AI travel assistant</Badge>
        <h1 className={appStyles.heroTitle}>Describe your ideal stay in your own words.</h1>
        <p className={appStyles.heroText}>
          Share what matters most, and StaySense will translate it into a clearer hotel shortlist
          with reasoning you can actually use.
        </p>
      </Card>

      <div className={styles.layout}>
        <Card className={styles.chatCard} elevated>
          <div className={styles.chatHeader}>
            <div>
              <h2>Travel conversation</h2>
              <p>
                Tell the assistant how you like to stay, what you want to avoid, or which city you
                already have in mind.
              </p>
            </div>
            <button type="button" className={styles.resetButton} onClick={clearAssistantSession}>
              <LuRotateCcw />
              Reset
            </button>
          </div>

          <div className={styles.suggestionWrap}>
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className={styles.suggestionChip}
                onClick={() => handleStarterClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className={styles.messageList}>
            {messages.map((message) => {
              const isAssistant = message.role === 'assistant';

              return (
                <div
                  key={message.id}
                  className={`${styles.messageRow} ${
                    isAssistant ? styles.assistantRow : styles.userRow
                  }`}
                >
                  <div className={styles.messageMeta}>
                    {isAssistant ? 'StaySense AI' : 'You'}
                  </div>
                  <div
                    className={`${styles.messageBubble} ${
                      isAssistant ? styles.assistantBubble : styles.userBubble
                    }`}
                  >
                    <p>{message.text}</p>

                    {isAssistant && message.recommendations?.length ? (
                      <div className={styles.resultList}>
                        {message.recommendations.map((recommendation) => {
                          const hotel = getHotelById(recommendation.hotelId);

                          if (!hotel) {
                            return null;
                          }

                          return (
                            <div key={recommendation.hotelId} className={styles.resultCard}>
                              <img
                                className={styles.resultImage}
                                src={hotel.image}
                                alt={hotel.name}
                              />
                              <div className={styles.resultContent}>
                                <div className={styles.resultTop}>
                                  <div>
                                    <strong>{hotel.name}</strong>
                                    <span>
                                      <LuMapPin /> {hotel.city}, {hotel.country}
                                    </span>
                                  </div>
                                  <span className={styles.resultScore}>
                                    {hotel.reviewScore.toFixed(1)}
                                  </span>
                                </div>
                                <p>{recommendation.explanation}</p>
                                <div className={styles.resultActions}>
                                  <Button to={`/hotels/${hotel.id}`} variant="ghost" size="sm">
                                    View hotel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <div className={styles.inlineAction}>
                          <Button to="/recommendations" size="sm">
                            Open recommendations
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <form className={styles.composer} onSubmit={handleSubmit}>
            <InputField
              as="textarea"
              id="assistant-prompt"
              label="Your stay preferences"
              description="You can mention preferred amenities, price comfort, location style, what to avoid, or a city."
              placeholder="Example: I want a calm, modern stay in Kyoto with breakfast and strong service."
              rows={5}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            {error ? <p className={appStyles.errorMessage}>{error}</p> : null}
            <div className={styles.composerActions}>
              <Button type="submit">
                <LuSend />
                Get recommendations
              </Button>
              {latestRecommendations.length ? (
                <Button to="/recommendations" variant="secondary">
                  <HiOutlineArrowRight />
                  Review full shortlist
                </Button>
              ) : null}
            </div>
          </form>
        </Card>

        <div className={styles.sidebar}>
          <Card className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <HiOutlineSparkles />
              <div>
                <h3>Interpreted preferences</h3>
                <p>{preferences.summary}</p>
              </div>
            </div>

            <PreferenceGroup
              title="Looking for"
              items={preferences.positive}
              emptyLabel="No strong preferences captured yet."
            />

            <PreferenceGroup
              title="Avoiding"
              items={preferences.negative}
              emptyLabel="You have not ruled anything out yet."
            />

            <PreferenceGroup
              title="Priority signals"
              items={preferences.priorities}
              emptyLabel="Nothing marked as especially important yet."
            />

            <PreferenceGroup
              title="Preferred cities"
              items={preferences.cities}
              emptyLabel="No city preference saved yet."
              isRaw
            />
          </Card>

          <Card className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <LuCompass />
              <div>
                <h3>Shortlist status</h3>
                <p>
                  {hasPreferences
                    ? 'Your latest assistant brief is ready to shape recommendations.'
                    : 'Add a few signals and StaySense will sharpen the shortlist.'}
                </p>
              </div>
            </div>

            {latestRecommendations.length ? (
              <div className={styles.panelList}>
                {latestRecommendations.slice(0, 3).map((recommendation) => {
                  const hotel = getHotelById(recommendation.hotelId);

                  if (!hotel) {
                    return null;
                  }

                  return (
                    <div key={hotel.id} className={styles.panelListItem}>
                      <strong>{hotel.name}</strong>
                      <span>{recommendation.explanation}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={styles.panelEmpty}>
                Start with something simple like quiet rooms, breakfast, budget, service, or a
                preferred city.
              </p>
            )}

            <Button to="/recommendations" variant="secondary" fullWidth={!latestRecommendations.length}>
              Open recommendations
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PreferenceGroup({ emptyLabel, isRaw = false, items, title }) {
  return (
    <div className={styles.preferenceGroup}>
      <span className={styles.preferenceTitle}>{title}</span>
      {items.length ? (
        <div className={styles.preferenceChips}>
          {items.map((item) => (
            <Badge key={item}>{isRaw ? item : getPreferenceLabel(item)}</Badge>
          ))}
        </div>
      ) : (
        <p className={styles.preferenceEmpty}>{emptyLabel}</p>
      )}
    </div>
  );
}

export default AIAssistantPage;
