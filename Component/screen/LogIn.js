import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showpassword, setshowpassword] = useState(true);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarBackgroundColor, setSnackbarBackgroundColor] = useState('');

  const handleSignIn = async () => {
    try {
      if (email === '') {
        setSnackbarText('Please Enter Email Address');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('red');
      } else if (password === '') {
        setSnackbarText('Please Enter Password');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('red');
      } else {
        console.log(email, password);
        await auth().signInWithEmailAndPassword(email, password);
        console.log('User signed in successfully!');

        setSnackbarText('Login Successfully');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('green');

        // await navigation.navigate("Home")
        // await navigation.navigate("MyDrawer")
        // await navigation.navigate('BottomNav');
        // Navigate to the next screen after successful login
        // await navigation.navigate("NextScreen");
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('No user with this email exists.');
        setSnackbarText('No user with this email exists.');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('red');
      } else if (error.code === 'auth/wrong-password') {
        console.log('Incorrect password.');
        setSnackbarText('Incorrect password.');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('red');
      } else if (error.code === 'auth/invalid-email') {
        console.log('Invalid email address.');
        setSnackbarText('Invalid email address.');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('red');
      } else {
        console.error(error);
        setSnackbarText(error);
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('red');
      }
    }
  };

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  // Google SignIn

  async function signInWithGoogle() {
    googleSigninFunc().then(data => {
      console.log('user data=>', data);
    });
  }

  const googleSigninFunc = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin.configure({
        webClientId:
          '68252012065-op4h17rtg1r7p33u41afth73ojl3huhu.apps.googleusercontent.com',
        offlineAccess: true,
        hostedDomain: '',
        forceCodeForRefreshToken: true,
        accountName: '',
      });

      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.signIn();

      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredentials);

      setSnackbarText('Google SignIn successfully!');
      setSnackbarVisible(true);
      setSnackbarBackgroundColor('green');
      // await navigation.navigate('Home');
      // await navigation.navigate("MyDrawer")
      // await navigation.navigate('BottomNav');
      return userInfo;
    } catch (e) {
      console.log(e);
    }
  };



  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/Logo.png')}
        style={[styles.image]}
      />

      <View style={{alignItems: 'center', marginTop: -20}}>
        <Text style={{fontSize: 30, fontWeight: 600, color: 'black'}}>
          Welcome back!
        </Text>
        <Text style={{fontSize: 20, fontWeight: 600, color: 'black'}}>
          Login to your account
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

        <Button mode="contained" onPress={handleSignIn} style={styles.button}>
          <Text style={{fontWeight: '600', fontSize: 20}}>Sign In</Text>
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
            <TouchableOpacity
              style={styles.icon}
              onPress={() => signInWithGoogle()}>
              <AntDesign name="google" size={30} color="darkred" />
            </TouchableOpacity>
          </View>

          {/* <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => signInWithFaceBook()}>
            <EvilIcons name="sc-facebook" size={40} color="#3b5998" />
          </TouchableOpacity>
        </View> */}

          {/* <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <AntDesign name="twitter" size={30} color="#1DA1F2" />
          </TouchableOpacity>
        </View> */}
        </View>

        <View style={styles.centerContainer}>
          <Text style={{color: 'grey', fontWeight: '700'}}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={{color: 'green', fontWeight: '700'}}>
              {' '}
              Sign up here
            </Text>
          </TouchableOpacity>
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
          style={[styles.snackbar, {backgroundColor: snackbarBackgroundColor}]}>
          {snackbarText}
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
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
    marginTop: 50,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'green',
    fontWeight: '600',
    fontSize: 20,
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
    bottom: 50,
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
    fontWeight: 600,
    marginBottom: -55,
  },
});

export default LogIn;
