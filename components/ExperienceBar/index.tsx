import styles from "styles/components/ExperienceBar.module.sass";


export default function ExperienceBar() {

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `33.3333%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `33.3333%` }}
        >
         200 xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  );
}