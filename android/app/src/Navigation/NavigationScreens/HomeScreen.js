import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('Hindi');
  const [isFromModalVisible, setFromModalVisible] = useState(false);
  const [isToModalVisible, setToModalVisible] = useState(false);
 
  const availableLanguages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Dutch',
    'Swedish',
    'Norwegian',
    'Danish',
    'Finnish',
    'Russian',
    'Arabic',
    'Chinese (Simplified)',
    'Chinese (Traditional)',
    'Japanese',
    'Korean',
    'Greek',
    'Turkish',
    'Hebrew',
    'Hindi',
    'Bengali',
    'Punjabi',
    'Urdu',
    'Tamil',
    'Telugu',
    'Marathi',
    'Kannada',
    'Malayalam',
    'Thai',
    'Vietnamese',
    'Indonesian',
    'Malay',
    'Filipino',
    'Burmese',
    'Lao',
    'Khmer',
    'Nepali',
    'Sinhala',
    'Bhutanese',
    'Tibetan',
    'Mongolian',
    'Uighur',
    'Tajik',
    'Kazakh',
    'Turkmen',
    'Uzbek',
    'Kyrgyz',
    'Tatar',
    'Bashkir',
    'Chuvash',
    'Armenian',
    'Georgian',
    'Azerbaijani',
    'Tamil',
    'Malayalam',
    'Sanskrit',
    'Kannada',
    'Marathi',
    'Gujarati',
    'Punjabi',
    'Bengali',
    'Oriya',
    'Assamese',
    'Maithili',
    'Nepali',
    'Kashmiri',
    'Sindhi',
    'Uighur',
    'Tibetan',
    'Mongolian',
    'Manchurian',
    'Tatar',
    'Bashkir',
    'Chuvash',
    'Yakut',
    'Komi',
    'Moksha',
    'Udmurt',
    'Mari',
    'Komi-Permyak',
    'Erzya',
    'Moksha',
    'Udmurt',
    'Karelian',
    'Finnish',
    'Estonian',
    'Latvian',
    'Lithuanian',
    'Polish',
    'Czech',
    'Slovak',
    'Slovenian',
    'Croatian',
    'Bosnian',
    'Serbian',
    'Montenegrin',
    'Macedonian',
    'Albanian',
  ];
  
  
  //  function for set user
  function setUserData() {
    // firestore()
    //   .collection('translations')
    //   .add({
    //     to:toLanguage ,
    //     from:fromLanguage ,
    //     inputText: text,
    //     translatedText: translatedText,
    //     createdAt: new Date(),
    //     userId: auth().currentUser.email,
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    firestore()
      .collection('translations')
      .add({
        to:"english" ,
        from:"Hindi" ,
        inputText: "bhai tum bahut harami ho",
        translatedText: "han mai harami hu ",
        createdAt: new Date(),
        userId: auth().currentUser.email,
      })
      .then(() => {
        console.log('User added!');
      })
      .catch(error => {
        console.log(error);
      });
  }
  // const fetchUserTranslations = () => {
  //   firestore()
  //     .collection('students')
  //     // Filter results
  //     .where('userId', '==', auth().currentUser.email)
  //     .get()
  //     .then(querySnapshot => {
  //       console.log(querySnapshot.docs);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   setUserData();
  // }, []);
  //  handleTranslate
  const handleTranslate = () => {};
 
  //  function for open from language
  const openFromLanguageModal = () => {
    setFromModalVisible(true);
  };
//  function for open to language
  const openToLanguageModal = () => {
    setToModalVisible(true);
  };

  //  function for  FromLanguageSelect
  const handleFromLanguageSelect = (language) => {
    setFromLanguage(language);
    setFromModalVisible(false);
  };
// function for  toLanguageSelect
  const handleToLanguageSelect = (language) => {
    setToLanguage(language);
    setToModalVisible(false);
  };
  //  function for interchangeLanguages
  const interchangeLanguages =()=>{
    setFromLanguage(toLanguage)
    setToLanguage(fromLanguage)
  }
  // 
  const handleForHistory=()=>{
    navigation.navigate('HistoryScreen');
  }

  

  return (
    <>
    <TouchableOpacity  onPress={handleForHistory} >
        <Image
            source={require('../../Image/historyIcon.jpg')}
            style={styles.historyIcon}
          />
        </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Language Translator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text "
          placeholderTextColor="blue"
          onChangeText={text => setText(text)}
          value={text}
        />
        <Button title="Translate" onPress={handleTranslate} />
        <Text style={styles.result}>Translated Text: {translatedText}</Text>
      </View>
      {/* buttons for languages */}
      <View style={styles.languageSelection}>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={openFromLanguageModal}>
          <Text>From: {fromLanguage}</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={interchangeLanguages} style={styles.changeIcon}>
        <Image
            source={require('../../Image/interchangeIcon.jpg')}
            style={styles.interchangeIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={openToLanguageModal}>
          <Text>To: {toLanguage}</Text>
        </TouchableOpacity>
        
      </View>
       {/* From Language Selection Modal */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={isFromModalVisible}
       >
        <View style={styles.modalContainer}>
        <ScrollView>
          {availableLanguages.map((language) => (
            <TouchableOpacity
              // key={language}
              style={styles.languageModalButton}
              onPress={() => handleFromLanguageSelect(language)}
            >
              <Text>{language}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
      </Modal>
       {/* To Language Selection Modal */}
         <Modal
        animationType="slide"
        transparent={true}
        visible={isToModalVisible}
        >
        <View style={styles.modalContainer}>
        <ScrollView>
          {availableLanguages.map((language) => (
            <TouchableOpacity
              // key={language}
              style={styles.languageModalButton}
              onPress={() => handleToLanguageSelect(language)}
            >
              <Text  style={styles.languagetext}>{language}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
      </Modal> 
    </>
  );
};

const styles = StyleSheet.create({
  historyIcon:{
    height:50,
    width:50,
    marginLeft:300,
    marginTop:20
  
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
   
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    color:"black",
  },
  languageSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom:20,
    
  },
  languageButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  interchangeIcon:{
    width:20,
    height:20,
   
  },
 
  modalContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  languageModalButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, 
  },
 
});

export default HomeScreen;
