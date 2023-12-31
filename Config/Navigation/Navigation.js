import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../../Component/screen/Splash';
import SignUp from '../../Component/screen/SignUp';
import LogIn from '../../Component/screen/LogIn';
import Home from '../../Component/screen/Home';
import BottomTab from './BotomTab';
import VideoPost from '../../Component/screen/Video';
import Setting from '../../Component/screen/Setting';
import About from '../../Component/screen/About';
import TermsCondition from '../../Component/screen/Terms';
import PrivacyPolicy from '../../Component/screen/Privacy';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Video"
            component={VideoPost}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="Setting"
            component={Setting}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="About"
            component={About}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Term"
            component={TermsCondition}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Privacy"
            component={PrivacyPolicy}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;