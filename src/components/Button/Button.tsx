import styles from './Button.module.scss';

type ButtonProps = {
  buttonText: string;
  onClick: () => void;
}

export function Button({ buttonText, onClick }: ButtonProps & { onClick: () => void }) {
  return <button className={styles.button} onClick={onClick}>{buttonText}</button>;
}