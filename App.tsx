import React from "react";
import Splash from "./Component/screen/Splash";
import SignUp from "./Component/screen/SignUp";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from "./Config/Navigation/Navigation";


function App(){
  return(
    <>
    <SafeAreaProvider>

    <Navigation/>
    </SafeAreaProvider>
    </>
  )
}

export default App;