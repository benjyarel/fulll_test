import type { ReactNode } from "react"
import { Checkbox } from "./Checkbox"
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

const CardCheckbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) => (
  <div className={styles["checkbox-slot"]}>
    <Checkbox checked={checked} onChange={onChange} label={label} />
  </div>
)

export const Card = Object.assign(CardRoot, {
  Image,
  Label,
  Action,
  Checkbox: CardCheckbox,
})
