import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('eng');
  const [toLanguage, setToLanguage] = useState('hindi');
  const [isFromModalVisible, setFromModalVisible] = useState(false);
  const [isToModalVisible, setToModalVisible] = useState(false);
  const availableLanguages = ['en', 'es', 'fr', 'de', 'it','hindi'];

  //  function for set user
  function setUserData() {
    firestore()
      .collection('translations')
      .add({
        to:toLanguage ,
        from:fromLanguage ,
        inputText: text,
        translatedText: translatedText,
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
 
  const openFromLanguageModal = () => {
    setFromModalVisible(true);
  };

  const openToLanguageModal = () => {
    setToModalVisible(true);
  };

  const handleFromLanguageSelect = (language) => {
    setFromLanguage(language);
    setFromModalVisible(false);
  };

  const handleToLanguageSelect = (language) => {
    setToLanguage(language);
    setToModalVisible(false);
  };
  

  return (
    <>
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
        <TouchableOpacity
          style={styles.languageButton}
          onPress={openToLanguageModal}>
          <Text>To: {toLanguage}</Text>
        </TouchableOpacity>
      </View>
       {/* From Language Selection Modal */}
       {/* <Modal isVisible={isFromModalVisible}>
        <View style={styles.modalContainer}>
          {availableLanguages.map((language) => (
            <TouchableOpacity
              key={language}
              style={styles.languageModalButton}
              onPress={() => handleFromLanguageSelect(language)}
            >
              <Text>{language}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
       {/* To Language Selection Modal */}
       {/* <Modal isVisible={isToModalVisible}>
        <View style={styles.modalContainer}>
          {availableLanguages.map((language) => (
            <TouchableOpacity
              key={language}
              style={styles.languageModalButton}
              onPress={() => handleToLanguageSelect(language)}
            >
              <Text>{language}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal> */} 
    </>
  );
};

const styles = StyleSheet.create({
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
    marginBottom:20
  },
  languageButton: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
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
