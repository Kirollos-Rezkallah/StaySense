import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import styles from './AppPage.module.css';

function AIAssistantPage() {
  return (
    <div className={`container ${styles.page}`}>
      <Card className={styles.heroCard} elevated>
        <Badge tone="accent">AI planning assistant</Badge>
        <h1 className={styles.heroTitle}>Turn travel preferences into a sharper shortlist.</h1>
        <p className={styles.heroText}>
          Ask for calmer neighborhoods, stronger wellness options, quieter rooms, or better
          premium value and keep the planning flow moving.
        </p>
      </Card>

      <div className={styles.gridSidebar}>
        <Card className={styles.assistantCard}>
          <h3>Recent guidance</h3>
          <div className={styles.conversation}>
            <div className={styles.conversationItem}>
              <div className={styles.conversationMeta}>Traveler</div>
              <p className={styles.conversationText}>
                I want a Lisbon stay with a rooftop feel, strong breakfast, and quiet rooms.
              </p>
            </div>
            <div className={styles.conversationItem}>
              <div className={styles.conversationMeta}>StaySense AI</div>
              <p className={styles.conversationText}>
                Atelier Verde stands out. It balances design, neighborhood energy, and a calmer
                sleep profile better than denser central alternatives.
              </p>
            </div>
            <div className={styles.conversationItem}>
              <div className={styles.conversationMeta}>StaySense AI</div>
              <p className={styles.conversationText}>
                If you want a more understated atmosphere, Oakline House is a strong secondary
                benchmark for comfort-first travel planning.
              </p>
            </div>
          </div>
        </Card>

        <Card className={styles.assistantCard}>
          <h3>Ask a new question</h3>
          <form className={styles.form}>
            <InputField
              as="textarea"
              id="assistant-prompt"
              label="Prompt"
              description="Example: Recommend a hotel for a 4-night trip with quiet rooms, premium breakfast, and walkable dining."
              placeholder="Describe the trip style, city, budget range, and what matters most."
            />
            <Button type="button">Start assistant session</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default AIAssistantPage;
