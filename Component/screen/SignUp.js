import React, {useState} from 'react';
import {View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('male');

  const handleSignUp = () => {
    // Implement your SignUp logic here
    console.log('Sign Up Pressed');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Phone Number:', phoneNo);
    console.log('Gender:', gender);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/Logo.png')}
        style={[styles.image]}
      />

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 600, color: 'black'}}>
          Welcome!
        </Text>
        <Text style={{fontSize: 20, fontWeight: 600, color: 'black'}}>
          Create Your Account
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={{ flexDirection: 'row' }}>
    <View style={{ flex: 8 }}>
        <TextInput
        left={<TextInput.Icon icon="email" size={25} color="grey" />}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        mode="outlined"
        style={styles.input}
      />
        </View>
</View>

        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon={() => <Icon name="lock" size={25} color="grey" />} />}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
        />

        <TextInput
          label="Phone Number"
          value={phoneNo}
          left={<TextInput.Icon icon={() => <Icon name="phone" size={25} color="grey" />} />}
          onChangeText={text => setPhoneNo(text)}
          keyboardType="phone-pad"
          mode="outlined"
          style={styles.input}
        />

        <View style={styles.radioContainer}>
          <Text>Gender:</Text>
          <RadioButton.Group
            onValueChange={value => setGender(value)}
            value={gender}>
            <View style={styles.radioButton}>
              <Text>Male</Text>
              <RadioButton value="male" />
            </View>
            <View style={styles.radioButton}>
              <Text>Female</Text>
              <RadioButton value="female" />
            </View>
          </RadioButton.Group>
        </View>

        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
          Sign Up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default SignUp;
