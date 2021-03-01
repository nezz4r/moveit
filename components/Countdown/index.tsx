import { useEffect, useState, useContext } from "react";
import { ChallengesContext } from "contexts/ChallengesContext"
import styles from "styles/components/Countdown.module.sass"



export default function Countdown() {
  const {startNewChallenge, activeChallenge} = useContext(ChallengesContext)
  const startTime = 0.1 * 60;
  const [time, setTime] = useState(startTime)
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("")
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, "0").split("")

  let countdownTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (activeChallenge === null && isFinished) {
      setIsStarted(false);
      setIsFinished(false);
      setTime(startTime)
    }
  }, [activeChallenge])

  useEffect(() => {
    if (isStarted && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time-1)
      }, 1000)
    } 
    if (isStarted && time === 0) {
      setIsStarted(false);
      setIsFinished(true);
      startNewChallenge();
    }
  }, [isStarted, time])

  function toggleStarted() {
    setIsStarted(!isStarted)
    if (isStarted) {
      clearTimeout(countdownTimeout);
      setTime(startTime)
      
    }

  }

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>
      {isFinished ? ( <button disabled className={styles.countdownButton}>Ciclo encerrado</button>) : (<>{isStarted ? (
        <button type="button" onClick={() => toggleStarted()} className={`${styles.countdownButton} ${styles.countdownButtonStarted}`}>Abandonar o ciclo</button>
      ) : (
        <button type="button" onClick={() => toggleStarted()} className={styles.countdownButton}>Iniciar o ciclo</button>
      )
    }</>) }
      
      
      </div>
  );
}


  
