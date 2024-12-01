'use client';
import styles from "/Users/lucagattamelata/take-a-seat/app/ui/home.module.css"
// import LoginForm from "/Users/lucagattamelata/take-a-seat/app/ui/components/LoginForm.tsx";

export default function NewUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.shape}>
      {children}
    </div>
  );
}
