import styles from './SearchInput.module.scss'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  label: string
  placeholder?: string
  id?: string
}

export const SearchInput = ({
  value,
  onChange,
  label,
  placeholder,
  id = 'search',
}: SearchInputProps) => (
  <div className={styles.wrapper}>
    {/* The magnifier is decorative, so the label stays available to screen readers only. */}
    <label htmlFor={id} className={styles.srOnly}>
      {label}
    </label>
    <span className={styles.icon} aria-hidden="true">
      🔍
    </span>
    <input
      id={id}
      type="search"
      className={styles.input}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
)
