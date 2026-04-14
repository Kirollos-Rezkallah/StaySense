import styles from './InputField.module.css';

function InputField({
  as = 'input',
  children,
  className = '',
  description,
  error,
  id,
  inputClassName = '',
  label,
  rightElement,
  ...props
}) {
  const Field = as;
  const inputClasses = [styles.input, rightElement ? styles.withAdornment : '', error ? styles.inputError : '', inputClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={`${styles.field} ${className}`} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      {description ? <span className={styles.description}>{description}</span> : null}
      <span className={styles.control}>
        <Field className={inputClasses} id={id} aria-invalid={Boolean(error)} {...props}>
          {children}
        </Field>
        {rightElement ? <span className={styles.adornment}>{rightElement}</span> : null}
      </span>
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}

export default InputField;
