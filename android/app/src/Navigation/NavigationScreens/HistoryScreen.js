import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// If you've installed from GitHub, do:
const translate = require('google-translate');
const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const [deletionInProgress, setDeletionInProgress] = useState(false);
  const currentDocId = useRef('');
  // function for retreiveTranslations
  const retreiveTranslations = () => {
    firestore()
      .collection('translations')
      // Filter results
      .where('userId', '==', auth().currentUser.email)
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          const documentData = documentSnapshot.data();
          documentData.id = documentSnapshot.id;
          console.log({documentData});
          data.push(documentData);
        });
        console.log({data: data[0]});
        setHistoryData(data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    retreiveTranslations();
  }, []);
  // function for adding favorite
  const handleFavorite = async (itemId, isFavorite) => {
    const translationRef = firestore().collection('translations').doc(itemId);
    console.log({translationRef});
    try {
      await translationRef.update({
        isFavorite: !isFavorite,
      });
      retreiveTranslations();
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  //  function for  delete items
  const handleDelete = async itemId => {
    currentDocId.current = itemId;
    setDeletionInProgress(true); // Set the deletion in progress
    try {
      const translationRef = firestore().collection('translations').doc(itemId);
      await translationRef.delete();
      retreiveTranslations();
    } catch (error) {
      console.error('Error deleting document: ', error);
    } finally {
      setDeletionInProgress(false); // Clear the deletion in progress, whether it succeeded or failed
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={historyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.historyItem}>
            <Text style={styles.createdAt}>
              {item.createdAt.toDate().toString()}
            </Text>
            <Text style={styles.inputText}>{item.inputText}</Text>
            <Text style={styles.translatedText}>{item.translatedText}</Text>
            <View style={styles.buttonsContainer}>
              <View>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => handleFavorite(item.id, item.isFavorite)}>
                  {item.isFavorite ? (
                    <Image
                      source={require('../../Image/starFillIcon.png')}
                      style={styles.starIcon}
                    />
                  ) : (
                    <Image
                      source={require('../../Image/starIcon.png')}
                      style={styles.starIcon}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                {deletionInProgress && currentDocId.current == item.id ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}>
                    <Image
                      source={require('../../Image/deleteIcon.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
  },
  historyItem: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createdAt: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputText: {
    fontSize: 16,
    marginBottom: 8,
  },
  translatedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
  starIcon: {
    width: 24,
    height: 24,
  },
});
export default HistoryScreen;
