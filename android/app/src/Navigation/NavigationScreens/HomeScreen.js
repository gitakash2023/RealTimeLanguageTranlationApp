import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {translate} from '@vitalets/google-translate-api';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('hi');
  const [isFromModalVisible, setFromModalVisible] = useState(false);
  const [isToModalVisible, setToModalVisible] = useState(false);

  const availableLanguages = {
    auto: 'Automatic',
    af: 'Afrikaans',
    sq: 'Albanian',
    am: 'Amharic',
    ar: 'Arabic',
    hy: 'Armenian',
    az: 'Azerbaijani',
    eu: 'Basque',
    be: 'Belarusian',
    bn: 'Bengali',
    bs: 'Bosnian',
    bg: 'Bulgarian',
    ca: 'Catalan',
    ceb: 'Cebuano',
    ny: 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    co: 'Corsican',
    hr: 'Croatian',
    cs: 'Czech',
    da: 'Danish',
    nl: 'Dutch',
    en: 'English',
    eo: 'Esperanto',
    et: 'Estonian',
    tl: 'Filipino',
    fi: 'Finnish',
    fr: 'French',
    fy: 'Frisian',
    gl: 'Galician',
    ka: 'Georgian',
    de: 'German',
    el: 'Greek',
    gu: 'Gujarati',
    ht: 'Haitian Creole',
    ha: 'Hausa',
    haw: 'Hawaiian',
    iw: 'Hebrew',
    hi: 'Hindi',
    hmn: 'Hmong',
    hu: 'Hungarian',
    is: 'Icelandic',
    ig: 'Igbo',
    id: 'Indonesian',
    ga: 'Irish',
    it: 'Italian',
    ja: 'Japanese',
    jw: 'Javanese',
    kn: 'Kannada',
    kk: 'Kazakh',
    km: 'Khmer',
    ko: 'Korean',
    ku: 'Kurdish (Kurmanji)',
    ky: 'Kyrgyz',
    lo: 'Lao',
    la: 'Latin',
    lv: 'Latvian',
    lt: 'Lithuanian',
    lb: 'Luxembourgish',
    mk: 'Macedonian',
    mg: 'Malagasy',
    ms: 'Malay',
    ml: 'Malayalam',
    mt: 'Maltese',
    mi: 'Maori',
    mr: 'Marathi',
    mn: 'Mongolian',
    my: 'Myanmar (Burmese)',
    ne: 'Nepali',
    no: 'Norwegian',
    ps: 'Pashto',
    fa: 'Persian',
    pl: 'Polish',
    pt: 'Portuguese',
    ma: 'Punjabi',
    ro: 'Romanian',
    ru: 'Russian',
    sm: 'Samoan',
    gd: 'Scots Gaelic',
    sr: 'Serbian',
    st: 'Sesotho',
    sn: 'Shona',
    sd: 'Sindhi',
    si: 'Sinhala',
    sk: 'Slovak',
    sl: 'Slovenian',
    so: 'Somali',
    es: 'Spanish',
    su: 'Sundanese',
    sw: 'Swahili',
    sv: 'Swedish',
    tg: 'Tajik',
    ta: 'Tamil',
    te: 'Telugu',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    ur: 'Urdu',
    uz: 'Uzbek',
    vi: 'Vietnamese',
    cy: 'Welsh',
    xh: 'Xhosa',
    yi: 'Yiddish',
    yo: 'Yoruba',
    zu: 'Zulu',
  };

  //  function for set user

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
  const handleTranslate = async () => {
    const result = await translate(text, {from: 'en', to: 'hi'});
    setTranslatedText(result.text);

    firestore()
      .collection('translations')
      .add({
        to: toLanguage, // You can specify the target language here
        from: fromLanguage, // You can specify the source language here
        inputText: text,
        translatedText: result.text,
        createdAt: new Date(),
        userId: auth().currentUser.email,
      })
      .then(() => {
        console.log('Translation added to Firestore!');
      })
      .catch(error => {
        console.error('Error adding translation to Firestore:', error);
      });

    setText(''); // Clear the input field after translation
  };

  //  function for open from language
  const openFromLanguageModal = () => {
    setFromModalVisible(true);
  };
  //  function for open to language
  const openToLanguageModal = () => {
    setToModalVisible(true);
  };

  //  function for  FromLanguageSelect
  const handleFromLanguageSelect = language => {
    setFromLanguage(language);
    setFromModalVisible(false);
  };
  // function for  toLanguageSelect
  const handleToLanguageSelect = language => {
    setToLanguage(language);
    setToModalVisible(false);
  };
  //  function for interchangeLanguages
  const interchangeLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };
  //
  const handleForHistory = () => {
    navigation.navigate('HistoryScreen');
  };
  //  handleLogout
  const handleLogout = () => {
    auth()
      .signOut()
      .then(res => {
        navigation.navigate('LoginScreen');
        console.log('logout', res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  //  handleCancel
  const handleCancel = () => {
    setText('');
  };

  return (
    <>
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={handleForHistory}>
          <Image
            source={require('../../Image/historyIcon.png')}
            style={styles.historyIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={require('../../Image/logOut.png')}
            style={styles.logoutButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Language Translator</Text>
        <View style={{flexDirection: 'row'}}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter text "
              placeholderTextColor="black"
              onChangeText={text => setText(text)}
              value={text}
            />
          </View>
          <View>
            <TouchableOpacity onPress={handleCancel}>
              <Image
                source={require('../../Image/cancelIcon.png')}
                style={styles.cancelIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
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
          onPress={interchangeLanguages}
          style={styles.changeIcon}>
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
        visible={isFromModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView>
            {Object.keys(availableLanguages).map(language => (
              <TouchableOpacity
                key={language}
                style={styles.languageModalButton}
                onPress={() => handleFromLanguageSelect(language)}>
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
        visible={isToModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView>
            {Object.keys(availableLanguages).map(language => (
              <TouchableOpacity
                key={language}
                style={styles.languageModalButton}
                onPress={() => handleToLanguageSelect(language)}>
                <Text>{language}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  historyIcon: {
    height: 30,
    width: 30,
    marginLeft: 300,
    marginTop: 20,
  },
  topIcons: {
    flexDirection: 'row',
  },
  logoutButton: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginLeft: 30,
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
    // borderColor: 'gray',
    // borderWidth: 1,
    // padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  cancelIcon: {
    width: 40,
    height: 40,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    color: 'black',
  },
  languageSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  languageButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  interchangeIcon: {
    width: 20,
    height: 20,
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
