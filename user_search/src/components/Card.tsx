import type { ReactNode } from "react"
import styles from "./Card.module.css"

const CardRoot = ({
  children,
  selected,
}: {
  children: ReactNode
  selected: boolean
}) => {
  return (
    <div className={styles.card} role="option" aria-selected={selected}>
      {children}
    </div>
  )
}

const Image = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
)

const Label = ({ text }: { text: string | number }) => (
  <p className={styles.label}>{text}</p>
)

const Action = ({ href, label }: { href: string; label: string }) => (
  <a className={styles.action} href={href}>
    {label}
  </a>
)

const Checkbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    aria-label={label}
    className={styles.checkbox}
    onClick={onChange}
  >
    {checked && (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )}
  </button>
)

export const Card = Object.assign(CardRoot, { Image, Label, Action, Checkbox })
