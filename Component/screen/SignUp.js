import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {TextInput, Button, RadioButton, Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import auth from '@react-native-firebase/auth';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('male');



  const [showpassword, setshowpassword] = useState(true);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarBackgroundColor, setSnackbarBackgroundColor] = useState('');


  const handleSignUp = async () => {
    // ... Your existing code ...

    if (email === "" || password === "" || phoneNo === "" || gender === "") {
      setSnackbarText('Please fill in all fields');
      setSnackbarVisible(true);
      setSnackbarBackgroundColor('red');
    }else {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        console.log(userCredential.user.uid);

        setSnackbarText('Sign up successful!');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('green');

        setEmail('');
        setPassword('');
        setPhoneNo('');
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setSnackbarText('Email Already Registered');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('red');
        }
      }
    }
  };


  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
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
        <TextInput
          left={<TextInput.Icon icon="email" size={25} color="grey" />}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          style={styles.input}
          left={
            <TextInput.Icon
              icon={() => <Icon name="lock" size={25} color="grey" />}
            />
          }
          secureTextEntry={showpassword}
          right={
            showpassword ? (
              <TextInput.Icon
                icon="eye"
                size={25}
                color="grey"
                onPress={() => setshowpassword(false)}
              />
            ) : (
              <TextInput.Icon
                icon="eye-off"
                size={25}
                color="grey"
                onPress={() => setshowpassword(true)}
              />
            )
          }
        />

        <TextInput
          label="Phone Number"
          value={phoneNo}
          left={
            <TextInput.Icon
              icon={() => <Icon name="phone" size={25} color="grey" />}
            />
          }
          onChangeText={text => setPhoneNo(text)}
          keyboardType="phone-pad"
          mode="outlined"
          style={styles.input}
        />

        <View style={styles.radioContainer}>
          <View style={styles.radioButtonContainer}>
            <View style={styles.radioButton}>
              <RadioButton
                value="male"
                status={gender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => setGender('male')}
              />
              <Text style={{color: 'black'}}>Male</Text>
            </View>

            <View>
              <Text style={{marginLeft: 20}}></Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton
                value="female"
                status={gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() => setGender('female')}
              />
              <Text style={{color: 'black'}}>Female</Text>
            </View>
          </View>
        </View>

        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
          <Text style={{fontWeight: '600', fontSize: 20}}>Sign Up</Text>
        </Button>

        <View style={{flexDirection: 'row', paddingTop: 30}}>
          <View style={styles.horizontalLine} />

          <View>
            <Text style={styles.text}>or sign in with</Text>
          </View>

          <View style={styles.horizontalLine} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="google" size={30} color="darkred" />
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon}>
              <EvilIcons name="sc-facebook" size={40} color="#3b5998" />
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="twitter" size={30} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
        </View>

        <Snackbar
  visible={snackbarVisible}
  onDismiss={onDismissSnackbar}
  action={{
    label: 'OK',
    onPress: () => {
      // Do something when OK is pressed
    },
    textColor: 'white', // Set the text color to white
  }}
  style={[styles.snackbar, { backgroundColor: snackbarBackgroundColor }]}
>
  {snackbarText}
</Snackbar>
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
    width: 180,
    height: 180,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
    borderRadius: 10,
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
    backgroundColor: 'green',
    fontWeight: '600',
    fontSize: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  horizontalLine: {
    flex: 0.5,
    height: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'grey',
  },
  text: {
    color: 'grey',
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 30,
    ...Platform.select({
      ios: {
        shadowColor: 'green',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
        shadowColor: 'green',
        shadowOffset: {width: 1, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 10,
      },
    }),
  },
  icon: {
    padding: 10,
  },
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50', // Green color or your preferred color
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
    // textColor property sets the text color of the Snackbar label
    textColor: 'white',
    fontWeight:600,
    marginBottom:-55
  },
});

export default SignUp;
