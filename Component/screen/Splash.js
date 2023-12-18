import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';

function Splash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/img/Logo.png')}
        style={[styles.image, { tintColor: 'white', opacity: fadeAnim }]}
      />
    </View>
  );
}

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
});

export default Splash;
