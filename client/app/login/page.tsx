import styles from "./page.module.scss";
import LoginForm from "../components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
