import type { ReactNode } from "react"
import styles from "./Card.module.css"

const CardRoot = ({ children }: { children: ReactNode }) => {
  return <div className={styles.card}>{children}</div>
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

export const Card = Object.assign(CardRoot, { Image, Label, Action })
