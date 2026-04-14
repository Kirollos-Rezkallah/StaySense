import styles from './Section.module.css';

function Section({ children, className = '', description, eyebrow, title }) {
  return (
    <section className={`${styles.section} ${className}`}>
      {(eyebrow || title || description) && (
        <div className={styles.header}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}

export default Section;
