import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';

function ProfileSet() {
  const [image, setImage] = useState(
    'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
  );

  const chooseImage = async () => {
    try {
      const response = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (response.path) {
        setImage(response.path);
        uploadImage(response.path);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const uploadImage = async path => {
    try {
      const response = await fetch(path);
      const blob = await response.blob();
      const filename = path.substring(path.lastIndexOf('/') + 1);
      const storageRef = storage().ref().child(`images/${filename}`);
      await storageRef.put(blob);
      console.log('Image uploaded to Firebase Storage');
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  const Navigation = useNavigation()

  const handleLogout = () => {
    // Your logout logic here
    Navigation.navigate('LogIn');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={chooseImage}>
            <View style={styles.circle}>
              {image ? (
                <Image source={{uri: image}} style={styles.image} />
              ) : (
                <Text style={styles.icon}>📷</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.customButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30 + '%',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  text: {
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 200, // Further increase the width
    height: 200, // Further increase the height
    borderRadius: 100,
    borderWidth: 3, // Further increase the border width
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 190, // Further increase the width
    height: 190, // Further increase the height
    borderRadius: 90,
  },
  icon: {
    fontSize: 24,
  },
  buttonContainer: {
    marginTop: 30,
  },
  customButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProfileSet;
