import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  // for navigation
  const navigation = useNavigation();
// use input phone number
  const [phoneNumber, setPhoneNumber] = useState('');
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  //  function for handleCancelIcon
  const handleCancelIconPress = () => {
    setPhoneNumber('');
  };
  // function  for handleSendcode
  const handleSendcode = async () => {
    try {
      console.log('button clicked');
      const confirmation = await auth().signInWithPhoneNumber(
        `+91${phoneNumber}`,
      );
      setConfirm(confirmation);
      navigation.navigate('HomeScreen');

      setPhoneNumber('');
    } catch (error) {
      console.log(error);
      setPhoneNumber('');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.text}>Condidate</Text>
        <Text style={styles.text}> Sign-In/Sign-Up</Text>
      </View>
      <View>
        <Image
          source={require('../../Image/contactnew.png')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.regTextMain}>
        <Text style={styles.regText}>
          You will log in after verification if you are not registered
        </Text>
      </View>
      <View style={styles.inputFieldContainer}>
        <View>
          <Image
            source={require('../../Image/indiaIcon.jpg')}
            style={styles.indiaIcon}
          />
        </View>
        <View>
          <Text>+91</Text>
        </View>
        <View>
          <Text>|</Text>
        </View>
        <View>
          <TextInput
            placeholder="Phone Number"
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            style={styles.textInput}></TextInput>
        </View>
        <View>
          <TouchableOpacity onPress={handleCancelIconPress}>
            <Image
              source={require('../../Image/cancelIcon.png')}
              style={styles.cancelicon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sendcodeView}>
        <TouchableOpacity
          style={styles.sendcodeButton}
          onPress={handleSendcode}>
          <Text style={styles.sendcodeText}>Send code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  main: {
    marginTop: 50,
    marginLeft: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 15,
  },
  regTextMain: {
    marginLeft: 10,
    marginTop: 10,
  },
  indiaIcon: {
    width: 40,
    height: 40,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInput: {
    marginRight: 100,
  },
  cancelicon: {
    width: 40,
    height: 40,
  },
  sendcodeButton: {
    margin: 10,
    marginTop: 20,
    backgroundColor: '#5dd55d',
    borderRadius: 5,
  },
  sendcodeText: {
    padding: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'normal',
    fontFamily: 'Roboto',
  },
});

export default LoginScreen;
