import React, {useState} from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {CurvedBottomBarExpo} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/AntDesign';
import Home from '../../Component/screen/Home';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Snackbar, Icon} from 'react-native-paper';
import {db} from '../Config/firebase';
import {ref, push, set} from 'firebase/database';
import Cancel from 'react-native-vector-icons/FontAwesome';
import Videos from '../../Component/screen/Video';
import Setting from '../../Component/screen/Setting';

const Screen1 = () => {
  return <Home />;
};

const Screen2 = () => {
  return <Videos />;
};

const Screen3 = () => {
  return <Setting />;
};

export default function BottomTab() {
  const [isModalVisible, setModalVisible] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarBackgroundColor, setSnackbarBackgroundColor] = useState('');

  const currentDate = new Date(); // Get the current date and time
  const formattedDate = currentDate.toLocaleDateString(); // Get only the date portion
  const currentTime = currentDate.toLocaleTimeString();

  const handleButtonPress = () => {
    setText('');
    setDescription('');
    setselectedDonation('');
    setSnackbarVisible(false);
    setSelectedOption('');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = value => {
    setSelectedOption(value);
  };

  const [selectedDonation, setselectedDonation] = useState('');

  const handleDonation = value => {
    setselectedDonation(value);
  };

  const [text, setText] = useState('');
  const [Description, setDescription] = useState('');

  const handleSave = async () => {
    try {
      if (text !== '' && selectedDonation !== '' && Description !== '') {
        const PostingRef = ref(db, 'Donation'); // Replace 'your-collection' with the desired path

        const newPosting = {
          name: text || '', // Ensure 'name' is not undefined or null
          description: Description || '', // Ensure 'description' is not undefined or null
          donationType: selectedDonation,
          RequestType: false,
          createdDate: formattedDate,
          uploadTime: currentTime,
        };

        // Push the new data to the database
        await push(PostingRef, newPosting);

        setSnackbarText('Data inserted successfully');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('green');

        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        setSnackbarText('All Fields is Required');
        setSnackbarVisible(true);
        setSnackbarBackgroundColor('red');
      }

      // Additional actions after data insertion, if needed
    } catch (error) {
      console.error('Error inserting data:', error.message);
      setSnackbarText(`Error: ${error.message}`);
      setSnackbarVisible(true);
      setSnackbarBackgroundColor('red');
    }
  };





const handleSaveRequest = async() =>{
  try {
    if (text !== '' && Description !== '') {
      const PostingRef = ref(db, 'Request'); // Replace 'your-collection' with the desired path

      const newPosting = {
        name: text || '', // Ensure 'name' is not undefined or null
        description: Description || '', // Ensure 'description' is not undefined or null
        RequestType: '',
        createdDate: formattedDate,
        uploadTime: currentTime,
      };

      // Push the new data to the database
      await push(PostingRef, newPosting);

      setSnackbarText('Data inserted successfully');
      setSnackbarVisible(true);
      setSnackbarBackgroundColor('green');

      setTimeout(() => {
        closeModal();
      }, 3000);
    } else {
      setSnackbarText('All Fields is Required');
      setSnackbarVisible(true);
      setSnackbarBackgroundColor('red');
    }

    // Additional actions after data insertion, if needed
  } catch (error) {
    console.error('Error inserting data:', error.message);
    setSnackbarText(`Error: ${error.message}`);
    setSnackbarVisible(true);
    setSnackbarBackgroundColor('red');
  }
}


  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'home';
        break;
      case 'Setting':
        icon = 'setting';
        break;
      case 'Video':
        icon = 'videocamera';
        break;
      case 'Profile':
        icon = 'profile';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? 'green' : 'black'}
      />
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({selectedTab, navigate}) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress()}>
              <Ionicons name={'pluscircle'} color="gray" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBarExpo.Screen
          name="Home"
          position="LEFT"
          component={() => <Screen1 />}
          options={{headerShown: false, showLabel: false}}
        />
        <CurvedBottomBarExpo.Screen
          name="Video"
          position="LEFT"
          component={() => <Screen2 />}
          options={{headerShown: false}}
        />
        <CurvedBottomBarExpo.Screen
          name="Setting"
          component={() => <Screen3 />}
          options={{headerShown: false}}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="Profile"
          component={() => <Screen2 />}
          options={{headerShown: false}}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeModal}>
            <View style={{alignSelf: 'flex-end'}}>
              <Cancel name="times" size={30} color="red" />
            </View>
          </TouchableOpacity>

          {selectedOption !== 'form' && selectedOption !== 'request' && (
            <View>
              <Text
                style={{
                  fontWeight: '600',
                  color: 'black',
                  fontSize: 30,
                  marginBottom: 15,
                }}>
                Choose Type:
              </Text>

              <Picker
                selectedValue={selectedOption}
                onValueChange={value => handleOptionChange(value)}
                style={styles.picker}
                iconStyle={{color: 'black'}}>
                <Picker.Item label="Select Option" value="" />
                <Picker.Item label="Form" value="form" />
                <Picker.Item label="Request" value="request" />
              </Picker>
            </View>
          )}

          {selectedOption === 'form' && (
            <View>
              <Text style={{fontWeight: '600', color: 'black', fontSize: 30}}>
                Donation Foam
              </Text>

              <Text
                style={{
                  color: 'black',
                  marginTop: 20,
                  marginBottom: -10,
                  fontWeight: '700',
                }}>
                Donation: <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <Picker
                selectedValue={selectedDonation}
                onValueChange={value => handleDonation(value)}
                style={[styles.picker, {marginTop: 20}]}
                iconStyle={{color: 'black'}}>
                <Picker.Item label="Select Donation" value="" />
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Money" value="Money" />
                <Picker.Item label="Bike" value="Bike" />
                <Picker.Item label="AutoRikshaw" value="AutoRikshaw" />
                <Picker.Item label="Car" value="Car" />
                <Picker.Item label="House" value="House" />
                <Picker.Item label="ElectronicItem" value="ElectronicItem" />
              </Picker>

              <Text
                style={{
                  color: 'black',
                  marginTop: 20,
                  marginBottom: -10,
                  fontWeight: '700',
                }}>
                Name: <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TextInput
                label="Your Name"
                value={text}
                style={[styles.text, {marginTop: 20}]}
                onChangeText={text => setText(text)}
              />

              <Text
                style={{
                  color: 'black',
                  marginTop: 20,
                  marginBottom: -10,
                  fontWeight: '700',
                }}>
                Description: <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TextInput
                label="Description"
                value={Description}
                multiline
                numberOfLines={4}
                style={styles.description}
                onChangeText={text => setDescription(text)}
              />

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                }}>
                <TouchableOpacity style={styles.buttons} onPress={handleSave}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Cancel} onPress={closeModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {selectedOption === 'request' && (
            <View>
              <Text style={{color: 'black', fontWeight: '600', fontSize: 30}}>
                My Request
              </Text>

              <Text
                style={{
                  color: 'black',
                  marginTop: 20,
                  marginBottom: -10,
                  fontWeight: '700',
                }}>
                Name: <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TextInput
                label="Your Name"
                value={text}
                style={[styles.text, {marginTop: 20}]}
                onChangeText={text => setText(text)}
              />

              <Text
                style={{
                  color: 'black',
                  marginTop: 20,
                  marginBottom: -10,
                  fontWeight: '700',
                }}>
                Description: <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TextInput
                label="Description"
                value={Description}
                multiline
                numberOfLines={4}
                style={styles.description}
                onChangeText={text => setDescription(text)}
              />

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                }}>
                <TouchableOpacity style={styles.buttons} onPress={handleSaveRequest}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Cancel} onPress={closeModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

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
            style={[
              styles.snackbar,
              {backgroundColor: snackbarBackgroundColor},
            ]}>
            {snackbarText}
          </Snackbar>
        </View>
        {/* Add more content as needed */}
      </Modal>
    </>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
  modalContent: {
    backgroundColor: 'white', // Set the background color to white
    padding: 50,
    borderRadius: 10,
    width: '100%', // Adjust the width as needed
    alignSelf: 'center', // Center the modal
    color: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
    // Add any additional styles for the column if needed
  },
  picker: {
    height: 40,
    backgroundColor: 'lightgrey',
    borderColor: 'green',
    borderWidth: 2,
    color: 'black',
  },

  description: {
    marginTop: 20,
    height: 100, // Adjust the height as needed
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },

  text: {
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  pickerContainer: {
    height: 40,
    marginTop: 20,
  },
  pickers: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
  },
  pickerItem: {
    justifyContent: 'flex-start',
  },
  dropDown: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
  },

  buttons: {
    backgroundColor: 'green', // Set the background color
    padding: 10,
    borderRadius: 5,
  },
  Cancel: {
    backgroundColor: 'red', // Set the background color
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white', // Set the text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  requiredAsterisk: {
    color: 'red',
  },
});
