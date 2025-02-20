import styles from "./page.module.css";
import HomeComponent from "@/components/HomeComponent/HomeComponent";

export default function Home() {
    return (
      <div className={styles.page}>

        <main className={styles.main}>
          <HomeComponent/>
        </main>
      </div>
  );
}
