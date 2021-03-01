
import { useContext } from "react";
import { ChallengesContext } from "contexts/ChallengesContext"

import styles from "styles/components/LevelUpModal.module.sass"

export default function LevelUpModal() {
  const {level, isModalOpen, setModalOpen} = useContext(ChallengesContext)
  return (
    <div style={ {display: isModalOpen ? "flex" : "none"}} className={styles.overlay}>
    <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level!</p>
        <button type="button" onClick={() => setModalOpen(false)}>
          <img src="/icons/close.svg" alt="Close"/>
        </button>
    </div>
    </div>
  );
}

