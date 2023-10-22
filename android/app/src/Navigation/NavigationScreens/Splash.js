import { View, Text ,Image,StyleSheet} from 'react-native'
import React,{useEffect}from 'react'
import { useNavigation } from '@react-navigation/native';


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
    <View>
          <Image
            source={require('../../Image/indiaIcon.jpg')}
            style={styles.indiaIcon}
          />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  indiaIcon:{
    
  }

})

export default Splash