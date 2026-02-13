import styles from './Button.module.css';

export function Button({ variant = 'primary', children, ...props }) {
  const className = `${styles.button} ${styles[variant] ?? ''}`.trim();
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
