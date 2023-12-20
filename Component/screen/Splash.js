import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';

const Splash = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);


  React.useEffect(()=>{
    setTimeout(()=>{
        navigation.replace("SignUp")
    },2000)
},[])

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/img/Logo.png')}
        style={[styles.image, { tintColor: 'white', opacity: fadeAnim }]}
      />

      <Animated.Text
        style={[
          styles.text,
          { fontWeight: '600', fontSize: 40, color: 'white', opacity: fadeAnim },
        ]}
      >
        Donation App
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008000', // Set the background color to green
  },
  image: {
    width: 310, // Adjust the width as needed
    height: 350, // Adjust the height as needed
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
});

export default Splash;
