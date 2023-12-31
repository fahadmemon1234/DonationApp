import React from 'react';
import {Text, View} from 'react-native';

function About({navigation}) {
  return (
    <>
      <View style={{textAlign: 'center', flex:1, justifyContent:'center'}}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: '600',
          }}>
          About
        </Text>

        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            paddingTop: 20,
            fontSize: 15,
          }}>
          Saylani Welfare Trust is a prominent non-profit organization based in
          Pakistan, committed to humanitarian service and social welfare.
          Founded in 1999 by Maulana Bashir Ahmed Farooqui, it aims to alleviate
          poverty and improve the lives of the underprivileged. The trust
          operates a wide range of initiatives, including free healthcare
          services, educational programs, and food distribution. With a focus on
          community development and empowerment, Saylani Welfare Trust has
          played a crucial role in providing essential services to those in
          need, contributing to the well-being and upliftment of society.
        </Text>
      </View>
    </>
  );
}

export default About;
