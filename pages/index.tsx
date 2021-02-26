import ExperienceBar from "components/ExperienceBar"
import styles from 'styles/pages/Home.module.sass'

export default function Home() {
  return (<>
    <div className={styles.container}>
    <ExperienceBar />
      <section>
        <div></div>
        <div></div>
      </section>
   </div>
    </>
  );
}

