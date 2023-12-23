import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const Home = ({navigation}) => {
    const initialText = 'Description: ssfsdfsdfsdfasdasdadasdasdadasdasdasdasd';
    const charLimit = 100;
    const [showFullText, setShowFullText] = useState(false);
  
    const toggleTextVisibility = () => {
      setShowFullText(!showFullText);
    };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg',
              }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.username}>John Doe</Text>
              <Text style={[styles.location, {color: 'grey'}]}>
                Hyderabad, Sindh
              </Text>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg',
              }}
              style={{width: 280, height: 70 + '%', borderRadius: 8}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <AntDesign
                name="hearto"
                size={25}
                color="black"
                style={{marginTop: 10}}
              />
              <Entypo
                name="star-outlined"
                size={25}
                color="black"
                style={{marginTop: 10}}
              />
            </View>

            <View style={{marginTop: 5}}>
              <Text style={{color: 'black', fontWeight: '700'}}>
                61,752 likes
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
      <Text style={{ color: 'black' }}>
        {showFullText ? initialText : initialText.slice(0, charLimit)}
        {!showFullText && initialText.length > charLimit && (
          <Text style={{ color: 'blue' }} onPress={toggleTextVisibility}>
            {' See More'}
          </Text>
        )}
      </Text>
    </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 350,
    padding: 10,
    paddingTop: 60,
    height: 70 + '%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 10,
    marginRight: 50 + '%',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  location: {
    fontSize: 12,
  },
});
