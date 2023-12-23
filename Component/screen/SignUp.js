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
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

  const SignUp = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('male');

  const [showpassword, setshowpassword] = useState(true);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarBackgroundColor, setSnackbarBackgroundColor] = useState('');

  const handleSignUp = async () => {
    if (email === '' || password === '' || phoneNo === '' || gender === '') {
      setSnackbarText('Please fill in all fields');
      setSnackbarVisible(true);
      setSnackbarBackgroundColor('red');
    } else if (password.length < 6) {
      setSnackbarText('Password must be at least 6 characters');
      setSnackbarVisible(true);
      setSnackbarBackgroundColor('red');
    } else {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        // console.log(userCredential.user.uid);
  
        setSnackbarText('Sign up successful!');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('green');
  
        setTimeout(() => {
          navigation.navigate('LogIn');
        }, 5000);
  
        setEmail('');
        setPassword('');
        setPhoneNo('');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
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

      setSnackbarText('SignIn successfully!');
      setSnackbarVisible(true);
      setSnackbarBackgroundColor('green');


      setTimeout(() => {
        navigation.navigate('Home');
      }, 5000);
      // await navigation.navigate('Home');
      // await navigation.navigate("MyDrawer")
      // await navigation.navigate('BottomNav');
      return userInfo;
    } catch (e) {
      console.log(e);
    }
  };

  // Facebook SignIn

  // const signInWithFaceBook = async ()=>{
  //   try{

  //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  //     // Check if the login was successful
  //     if (result.isCancelled) {
  //       console.log('Facebook login was cancelled');
  //     } else {
  //       // Get the access token
  //       const data = await AccessToken.getCurrentAccessToken();
  
  //       if (!data) {
  //         console.log('Something went wrong obtaining the Facebook access token');
  //       } else {
  //         // Use the access token to authenticate with your server or perform other actions
  //         console.log('Facebook access token:', data.accessToken);
  //         // You can use the token to make requests to the Facebook API or send it to your server
  //         // For example, send the token to your server for server-side authentication
  //         // YourServerAuthFunction(data.accessToken);
  //       }
  //     }

  //   }
  //   catch (error) {
  //   console.log('Error in Facebook login:', error);
  // }
  // }


  const handleLogIn = () =>{
    navigation.navigate('LogIn');
  }

  return (
<>
   

    <View style={styles.container}>


      <Image
        source={require('../assets/img/Logo.png')}
        style={[styles.image]}
      />

      <View style={{alignItems: 'center', marginTop: -20}}>
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
            <TouchableOpacity style={styles.icon} onPress={handleLogIn}>
              <AntDesign name="twitter" size={30} color="#1DA1F2" />
            </TouchableOpacity>
          </View>*/}
        </View> 


        <View style={styles.centerContainer}>
  <Text style={{ color: 'grey', fontWeight: '700' }}>
    Do you have an account?</Text>
    <TouchableOpacity onPress={handleLogIn}>
      <Text style={{ color: 'green', fontWeight: '700' }}> Sign in here</Text>
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
    </>
  );
}

const styles = StyleSheet.create({
   centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
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
    marginTop:-10
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

export default SignUp;
