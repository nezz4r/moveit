import { useContext } from "react"
import { ChallengesContext } from "../../contexts/ChallengesContext"

import styles from "styles/components/Profile.module.sass"

export default function Profile() {
  const { level } = useContext(ChallengesContext)
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/nezz4r.png" alt="Raul Victor Queiroz" />
      <div>
        <strong>Raul Victor Queiroz</strong>
        <p><img src="icons/level.svg" alt="Level"/>Level {level}</p>
      </div>
    </div>
  );
}
