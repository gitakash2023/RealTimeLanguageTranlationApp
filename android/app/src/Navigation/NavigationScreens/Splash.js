import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    // Simulate a delay (3 seconds) before navigating to the login screen
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3000);
  }, []);

  return (
    <View>
      <View style={styles.splashImageContainer}>
        <Image
          source={require('../../Image/splashIcon.jpg')}
          style={styles.splashIcon}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  splashIcon: {
    width: '100%', // Set the image width
    height: ' 100%', // Set the image height
    resizeMode: 'contain', // Adjust the resizeMode as needed
  },
  splashImageContainer: {
    marginTop: 50,
    alignItems: 'center', // Center horizontally
  },
});

export default Splash;
