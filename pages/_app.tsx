import "styles/global.sass"

import { ChallengesContextProvider } from "../contexts/ChallengesContext"
import { CountdownContextProvider } from "../contexts/CountdownContext"


function MyApp({ Component, pageProps }) {
  
  return (
    <CountdownContextProvider>
      <ChallengesContextProvider>
        <Component {...pageProps} />
      </ChallengesContextProvider>
    </CountdownContextProvider>
  )
}

export default MyApp
