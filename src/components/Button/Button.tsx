import styles from './Button.module.scss';

type ButtonProps = {
  buttonText: string;
}

export const Button = ({ buttonText }: ButtonProps) => {
  return <button className={styles.button}>{buttonText}</button>;
}