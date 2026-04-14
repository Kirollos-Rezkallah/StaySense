import {
  HiArrowRight,
  HiOutlineChartBarSquare,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { LuMapPin } from "react-icons/lu";
import { featuredHotels } from "../data/hotels";
import useAuth from "../hooks/useAuth";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import styles from "./LandingPage.module.css";

function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.page}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <Badge tone="accent">Thoughtful hotel discovery</Badge>
          <h1>Choose a stay that feels right before you book.</h1>
          <p>
            StaySense brings together hotel details, neighborhood context, and
            trusted recommendations in a calm space designed for real trip
            planning.
          </p>

          <div className={styles.heroActions}>
            <Button to={isAuthenticated ? "/dashboard" : "/register"} size="lg">
              {isAuthenticated ? "Open your dashboard" : "Create your account"}
            </Button>
            <Button to="/explore" variant="secondary" size="lg">
              Browse hotels
            </Button>
          </div>

          <div className={styles.heroMetrics}>
            <Card className={styles.metricCard}>
              <strong>Shortlist faster</strong>
              <span>
                Compare comfort, location, and stay style without opening a
                dozen tabs.
              </span>
            </Card>
            <Card className={styles.metricCard}>
              <strong>Travel with confidence</strong>
              <span>
                Keep favorite stays, revisit details, and return to your plans
                anytime.
              </span>
            </Card>
          </div>
        </div>

        <Card className={styles.heroPanel} elevated>
          <div className={styles.heroPanelTop}>
            <span className={styles.signalPill}>Editor&apos;s pick</span>
            <span className={styles.signalValue}>Kyoto</span>
          </div>
          <h2>A quieter stay, with the city still close at hand.</h2>
          <p>
            Discover hotels with calm rooms, welcoming service, and
            neighborhoods that suit the pace of your trip.
          </p>
          <div className={styles.panelList}>
            <div>
              <HiOutlineChartBarSquare />
              <div>
                <strong>Clear comparisons</strong>
                <span>
                  See the details that matter most side by side, from price to
                  atmosphere.
                </span>
              </div>
            </div>
            <div>
              <LuMapPin />
              <div>
                <strong>Neighborhood context</strong>
                <span>
                  Understand how each area feels, not just where it sits on a
                  map.
                </span>
              </div>
            </div>
            <div>
              <HiOutlineShieldCheck />
              <div>
                <strong>More confident choices</strong>
                <span>
                  Save the stays that fit and return to them when plans start to
                  settle.
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <div className={`container ${styles.sections}`}>
        <Section
          eyebrow="Featured stays"
          title="A refined starting point for city breaks, quiet weekends, and polished work trips"
          description="Browse a curated collection of hotels with enough detail to compare them naturally, the way travelers actually do.">
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
                    {hotel.rating} rating - {hotel.reviewCount} reviews
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
          eyebrow="Designed for planning"
          title="A calmer way to explore, compare, and return to your favorite stays"
          description="The experience keeps things simple and polished, with enough structure to make browsing feel easy rather than overwhelming.">
          <div className={styles.valueGrid}>
            <Card className={styles.valueCard}>
              <h3>Easy to browse</h3>
              <p>
                Spacious layouts and clear cards help every stay feel
                understandable at a glance.
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <h3>Ready when you return</h3>
              <p>
                Sign in once and keep your travel space, preferences, and saved
                direction intact.
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <h3>Built around real stays</h3>
              <p>
                Hotel cards, detail pages, and planning tools all feel closer to
                a travel product than a dashboard.
              </p>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default LandingPage;
