import React, { useState, ReactNode, useEffect } from 'react';

interface ProviderProps{
  children: ReactNode;
}

interface ContextData{
  reset: () => void;
}

export const CountdownContext = React.createContext({} as ContextData)

export function CountdownContextProvider({ children, ...props }: ProviderProps) {

  function reset(){

  }
  
  return (
    <CountdownContext.Provider
      value={{
        reset
      }}>
      {children}
    </CountdownContext.Provider>
  );
}