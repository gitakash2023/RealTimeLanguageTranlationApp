import { View, Text} from 'react-native'
import React,{useEffect,useState } from 'react'
const translate = require('google-translate-api');

const SelectLanguageApi = () => {
    const [languages, setLanguages] = useState([]);
      
     // Fetch the list of supported languages
     async function fetchLanguages() {
        try {
          const result = await translate.getLanguages();
          setLanguages(result);
          console.log(result)
          
        } catch (error) {
          console.log(error);
         
        }
      }
    //  useEffect 
    useEffect(() => {
        fetchLanguages();
      }, []);
  return (
    <View>
   <Text>hii</Text>
    </View>
  )
}

export default SelectLanguageApi