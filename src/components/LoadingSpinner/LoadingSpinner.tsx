import React from "react";
import styles from './LoadingSpinner.module.scss'
type Props = {
  fullPage?: boolean;
  label?: string;
};

export default function LoadingSpinner({ fullPage, label }: Props) {
  return (
    <div
      className={fullPage ? styles.spinnerOverlay : styles.spinnerInline}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinner} aria-hidden="true" />
      {label ? <span className={styles.visuallyHidden}>{label}…</span> : null}
    </div>
  );
}
