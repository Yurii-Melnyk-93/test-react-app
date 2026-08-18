import styles from './AddProjectButton.module.scss';
// import type { ButtonProps } from '@/types/ButtonProps';

interface ButtonProps {
  buttonText: string;
  className?: string;
  onClick: () => void;
}

export function AddProjectButton({ className, buttonText, onClick }: ButtonProps) {
  return <button className={`${styles.button} ${className}`} onClick={onClick}>{buttonText}</button>;
}