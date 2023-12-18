import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TextField from '@mui/material/TextField';


function SignUp() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/Logo.png')}
        style={[styles.image, { tintColor: 'white' }]}
      />

      <View>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20,
    backgroundColor: '#008000', // Set the background color to green
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SignUp;
