import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ref, onValue} from 'firebase/database';
import {db} from '../../Config/Config/firebase';
import Heart from 'react-native-vector-icons/AntDesign';
import Bookmark from 'react-native-vector-icons/Feather';
import moment from 'moment';

const Home = ({navigation}) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Reference to the 'Posting' node in Firebase Realtime Database
    const tasksRef = ref(db, 'Posting');

    // Attach an event listener for data changes
    const fetchData = () => {
      onValue(tasksRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          // Convert the object of tasks into an array
          const dataArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setTableData(dataArray);
        }
      });
    };

    fetchData();
  }, []);

  const [showFullText, setShowFullText] = useState(false);
  const charLimit = 100;

  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };

  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <ScrollView>
        {tableData.map((item, index) => (
          <View style={styles.card}>
            <View style={styles.top}>
              <View style={styles.userDetails}>
                <View style={styles.profileImgContainer}>
                  <Image
                    source={require('../assets/img/Logo.png')}
                    style={styles.cover}
                  />
                </View>
                <View>
                  <Text style={styles.userName}>SWIT</Text>
                  <Text style={styles.userRole}>organization </Text>
                </View>
              </View>
            </View>

            <View style={styles.imgBgContainer}>
              <Image source={{uri: item.img}} style={styles.imgBg} />
            </View>

            <View style={styles.btns}>
              <View style={styles.leftBtns}>
              <TouchableOpacity onPress={toggleLike}>
                <Heart
                  name={isLiked ? 'heart' : 'hearto'}
                  size={25}
                  color={isLiked ? 'red' : 'black'}
                />
                </TouchableOpacity>
              </View>
              <View>
                <Bookmark name="bookmark" size={25} color="black" />
                {/* <Image source={require('./bookmark.png')} style={styles.icon} /> */}
              </View>
            </View>

            <Text style={styles.likes}>5,489 likes</Text>

            <Text style={styles.message}>
              <Text style={styles.boldText}>SWIT: </Text>
              {/* {item.description} */}

              <Text style={styles.message}>
                {showFullText
                  ? item.description
                  : item.description.slice(0, charLimit)}
              </Text>

              {item.description.length > charLimit && (
                <TouchableOpacity onPress={toggleTextVisibility}>
                  <Text style={{color: 'green'}}>
                    {showFullText ? ' Show Less' : ' Show More'}
                  </Text>
                </TouchableOpacity>
              )}
              {/* <Text style={styles.hashTag}> #ironman</Text>
          <Text style={styles.hashTag}> #captainamerica</Text> */}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: 360,
    minHeight: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 15, height: 15},
    shadowOpacity: 0.6,
    shadowRadius: 60,
    margin: 16,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImgContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'green',
  },
  cover: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    cursor: 'pointer',
  },
  userName: {
    fontSize: 18,
    color: '#4d4d4f',
    fontWeight: '700',
    lineHeight: 18,
    cursor: 'pointer',
  },
  userRole: {
    fontSize: 0.75 * 18,
    color: 'grey',
  },
  dotContainer: {
    transform: [{scale: 0.6}],
    cursor: 'pointer',
  },
  dot: {
    width: 20,
    height: 20,
  },
  imgBgContainer: {
    position: 'relative',
    width: '100%',
    height: 320,
    marginVertical: 10,
  },
  imgBg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    maxWidth: 24,
    marginRight: 8,
  },
  likes: {
    marginTop: 5,
    fontSize: 16,
    color: '#4d4d4f',
  },
  message: {
    fontWeight: '400',
    marginTop: 5,
    color: '#777',
    lineHeight: 1.5 * 16,
  },
  boldText: {
    color: '#262626',
  },
  hashTag: {
    color: '#1d92ff',
    cursor: 'pointer',
  },
  comments: {
    marginTop: 10,
    alignItems: 'center',
    color: '#999',
  },
  addComments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userImgContainer: {
    position: 'relative',
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 8,
  },
  userImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontWeight: '400',
    fontSize: 18,
    color: '#262626',
  },
  postTime: {
    marginTop: 10,
    fontWeight: '500',
    color: '#777',
  },
});

export default Home;
