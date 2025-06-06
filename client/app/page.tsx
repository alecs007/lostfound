import styles from "./page.module.scss";
import Hero from "./components/Hero/Hero";
import Categories from "./components/Categories/Categories";

export default function Home() {
  return (
    <div className={styles.home}>
      <Hero />
      <Categories />
    </div>
  );
}
