
import Head from "next/head"
import {GetServerSideProps} from "next"
import ExperienceBar from "components/ExperienceBar"
import styles from 'styles/pages/Home.module.sass'
import Profile from "components/Profile"
import CompletedChallenges from "components/CompletedChallenges"
import Countdown from "components/Countdown"
import ChallengeBox from "components/ChallengeBox"
import { ChallengesContextProvider } from "contexts/ChallengesContext"
import LevelUpModal from "components/LevelUpModal"


interface HomeProps {
  level: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  currentExperience: number;
}

export default function Home(props: HomeProps) {
  return (<>
    <Head>
      <title>Inicio | move.it</title>
    </Head>
    <ChallengesContextProvider {...props}>
    <div className={styles.container}>
    <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
      </div>
      <LevelUpModal />
      </ChallengesContextProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { level, challenges, experience, xptonextlvl } = ctx.req.cookies;
  return {
    props: {
      level: parseInt(level),
      challengesCompleted: parseInt(challenges),
      currentExperience: parseInt(experience),
      experienceToNextLevel: parseInt(xptonextlvl)
    }
  }
}

