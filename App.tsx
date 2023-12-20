import React from "react";
import Splash from "./Component/screen/Splash";
import SignUp from "./Component/screen/SignUp";
import { SafeAreaProvider } from 'react-native-safe-area-context';


function App(){
  return(
    <>
    <SafeAreaProvider>

    <SignUp/>
    </SafeAreaProvider>
    </>
  )
}

export default App;