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

const SignupScreen = () => {
  // for navigation
  const navigation = useNavigation();
  // 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //  function for handleCancelIconEmail
  const handleCancelIconPressEmail = () => {
    setEmail('');
  };
  //  function for handleCancelIconPassword
  const handleCancelIconPressPassword = () => {
    setPassword('');
  };
  // handleLoginNow
  const navigateToLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };
  // function  for handleSignup
  const handleSignup = () => {
    console.log("clicked")
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('User account created & signed in!' );
        console.log(res)

        // // navigate to the Login screen after 2 seconds
        // setTimeout(() => {
        //   navigation.navigate('Login');
        // }, 2000); // 2seconds

        navigation.navigate('HomeScreen');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        setEmail('');
        setPassword('');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.text}>Condidate</Text>
        <Text style={styles.text}> Sign-up</Text>
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
          <TextInput
            placeholder="Enter Your email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textInput}></TextInput>
        </View>
        <View>
          <TouchableOpacity onPress={handleCancelIconPressEmail}>
            <Image
              source={require('../../Image/cancelIcon.png')}
              style={styles.cancelicon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.inputFieldContainer, {marginTop: 10}]}>
        <View>
          <TextInput
            placeholder="Enter Your password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textInput}></TextInput>
        </View>
        <View>
          <TouchableOpacity onPress={handleCancelIconPressPassword}>
            <Image
              source={require('../../Image/cancelIcon.png')}
              style={styles.cancelicon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.LoginView}>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={navigateToLoginScreen}>
          <Text style={styles.LoginText}>
            Already have an account ? Login here !
          </Text>
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
    width: 20,
    height: 20,
  },
  signupButton: {
    margin: 10,
    marginTop: 20,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  signupText: {
    padding: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'normal',
    fontFamily: 'Roboto',
  },
  LoginText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
