import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// If you've installed from GitHub, do:
const translate = require('google-translate');

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  //
  useEffect(() => {
    // Query Firestore to get the data
    firestore()
      .collection('translations')
      // Filter results
      .where('userId', '==', auth().currentUser.email)
      // .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push(documentSnapshot.data());
        });

        setHistoryData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  // function for adding favorite
  const handleFavorite = itemId => {
    // Find the item that was clicked by its ID
    const itemToFavorite = historyData.find(item => item.id === itemId);

    // Check if the item is not already in the favorites
    if (!favorites.some(favItem => favItem.id === itemId)) {
      // Add the item to the favorites array
      setFavorites(prevFavorites => [...prevFavorites, itemToFavorite]);
    }
    // Show an alert
    Alert.alert(
      'Item Added to Favorites',
      'This translation has been added to your favorites.',
    );
    // Log the updated favorites array
  };
  // handle delete
  const handleDelete = () => {};

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
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleFavorite(item.id)}>
                <Text style={styles.buttonText}>Favorite</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
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
  favoriteButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default HistoryScreen;
