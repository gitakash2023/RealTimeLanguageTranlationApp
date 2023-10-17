import { View, Text } from 'react-native'
import React,{useEffect}from 'react'
import { useNavigation } from '@react-navigation/native';


const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        // Simulate a delay (3 seconds) before navigating to the login screen
        setTimeout(() => {
          navigation.navigate('LoginScreen');
        }, 3000);
      }, []);
  return (
    <View>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash