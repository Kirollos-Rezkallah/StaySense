import {
  HiArrowRight,
  HiMiniMapPin,
  HiOutlineChartBarSquare,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { featuredHotels } from '../data/hotels';
import useAuth from '../hooks/useAuth';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import styles from './LandingPage.module.css';

function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.page}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <Badge tone="accent">Hotel recommendations that feel investment-grade</Badge>
          <h1>Choose your next stay with more signal and less noise.</h1>
          <p>
            StaySense helps travelers compare comfort, context, and fit in one calm workspace,
            so every shortlist feels deliberate before booking.
          </p>

          <div className={styles.heroActions}>
            <Button to={isAuthenticated ? '/dashboard' : '/register'} size="lg">
              {isAuthenticated ? 'Open your dashboard' : 'Create your account'}
            </Button>
            <Button to="/explore" variant="secondary" size="lg">
              Browse hotels
            </Button>
          </div>

          <div className={styles.heroMetrics}>
            <Card className={styles.metricCard}>
              <strong>94%</strong>
              <span>of top picks align on comfort, location, and traveler intent</span>
            </Card>
            <Card className={styles.metricCard}>
              <strong>3 clicks</strong>
              <span>from first shortlist to a ready-to-book decision flow</span>
            </Card>
          </div>
        </div>

        <Card className={styles.heroPanel} elevated>
          <div className={styles.heroPanelTop}>
            <span className={styles.signalPill}>Travel fit score</span>
            <span className={styles.signalValue}>9.4 / 10</span>
          </div>
          <h2>Kyoto discovery session</h2>
          <p>
            Quiet luxury, restorative sleep, walkable dining, and a higher service consistency
            profile than nearby comparables.
          </p>
          <div className={styles.panelList}>
            <div>
              <HiOutlineChartBarSquare />
              <div>
                <strong>Signal layering</strong>
                <span>Price, room quality, area feel, and guest consistency scored together.</span>
              </div>
            </div>
            <div>
              <HiMiniMapPin />
              <div>
                <strong>Location context</strong>
                <span>See how well a stay matches your pace, not just the map marker.</span>
              </div>
            </div>
            <div>
              <HiOutlineShieldCheck />
              <div>
                <strong>Confident shortlist</strong>
                <span>Clear reasoning behind every recommendation you keep or dismiss.</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <div className={`container ${styles.sections}`}>
        <Section
          eyebrow="Featured stays"
          title="A refined starting point for city, wellness, and premium business travel"
          description="These listings give the product a credible baseline: premium, varied, and realistic enough to anchor exploration, details, and recommendation flows."
        >
          <div className={styles.featureGrid}>
            {featuredHotels.map((hotel) => (
              <Card key={hotel.id} className={styles.hotelCard}>
                <div className={styles.hotelMeta}>
                  <Badge>{hotel.city}</Badge>
                  <span>${hotel.price}/night</span>
                </div>
                <h3>{hotel.name}</h3>
                <p>{hotel.summary}</p>
                <div className={styles.hotelFooter}>
                  <span>
                    {hotel.rating} rating · {hotel.reviewCount} reviews
                  </span>
                  <Button to={`/hotels/${hotel.id}`} variant="ghost">
                    View stay <HiArrowRight />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Why it works"
          title="Built to feel like a real travel product from day one"
          description="The foundation is structured for growth: clear route boundaries, reusable UI, authenticated flows, and a visual system that already reads as premium."
        >
          <div className={styles.valueGrid}>
            <Card className={styles.valueCard}>
              <h3>Calm decision architecture</h3>
              <p>Cards, spacing, and hierarchy steer attention without making the product feel busy.</p>
            </Card>
            <Card className={styles.valueCard}>
              <h3>Ready for account-based flows</h3>
              <p>Auth state persists locally and gates the right product surfaces cleanly.</p>
            </Card>
            <Card className={styles.valueCard}>
              <h3>Credible exploration patterns</h3>
              <p>Guests can browse freely, while deeper planning experiences unlock once signed in.</p>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default LandingPage;
