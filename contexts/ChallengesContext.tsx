import React, { useState, ReactNode, useEffect } from 'react';
import Cookie from "js-cookie"
import challenges from "fixtures/challenges.json"

interface ProviderProps{
  children: ReactNode;
  level: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  currentExperience: number;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ContextData{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;
  isModalOpen: boolean;
  setModalOpen: (boolean) => void;
}

export const ChallengesContext = React.createContext({} as ContextData)

export function ChallengesContextProvider({children, ...props}: ProviderProps) {
  const [level, setLevel] = useState(props.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(props.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(props.experienceToNextLevel ?? Math.pow((level + 1) * 4, 2))
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    Cookie.set("level", String(level));
    Cookie.set("experience", String(currentExperience));
    Cookie.set("challenges", String(challengesCompleted));
    Cookie.set("xptonextlvl", String(experienceToNextLevel))
  }, [currentExperience, level, challengesCompleted]);

  useEffect(() => {
    if (currentExperience >= experienceToNextLevel)
      levelUp();
  }, [currentExperience])
  
  useEffect(() => {
    Notification.requestPermission()
  }, [])
  
  function levelUp() {
    setCurrentExperience(currentExperience - experienceToNextLevel);
    setLevel(level + 1);
    setExperienceToNextLevel(Math.pow((level + 2) * 4, 2) - experienceToNextLevel)
    setModalOpen(true)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge)
    new Audio("/notification.mp3").play();
    if (Notification.permission === "granted") {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }
  
  function completeChallenge() {
    if (!activeChallenge) return;
    setCurrentExperience(currentExperience + activeChallenge.amount)
    setChallengesCompleted(challengesCompleted + 1)
    setActiveChallenge(null)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        isModalOpen,
        setModalOpen
      }}>
      {children}
    </ChallengesContext.Provider>
  );
}