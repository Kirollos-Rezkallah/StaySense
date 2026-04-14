import styles from './InputField.module.css';

function InputField({ as = 'input', children, className = '', description, id, label, ...props }) {
  const Field = as;

  return (
    <label className={`${styles.field} ${className}`} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      {description ? <span className={styles.description}>{description}</span> : null}
      <Field className={styles.input} id={id} {...props}>
        {children}
      </Field>
    </label>
  );
}

export default InputField;
