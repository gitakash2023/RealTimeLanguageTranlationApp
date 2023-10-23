import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HistoryScreen = () => {
    const [historyData, setHistoryData] = useState([]);
//  
useEffect(() => {
    // Query Firestore to get the data
    firestore()
    .collection('translations')
    // Filter results
    .where('userId', '==', auth().currentUser.email)
    // .orderBy('createdAt', 'desc') 
    .get()
    .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data.push(documentSnapshot.data());
        });
        
        setHistoryData(data);
       
      })
    .catch((error) => {
      console.log( error);
    });
  }, []); 
  console.log(historyData)
  

  return (
    <View style={styles.container}>
     
      <FlatList
        data={historyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.label}>From: {item.from}</Text>
            <Text style={styles.label}>Input Text: {item.inputText}</Text>
            <Text style={styles.label}>To: {item.to}</Text>
            <Text style={styles.label}>Translated Text: {item.translatedText}</Text>
            <Text style={styles.label}>User ID: {item.userId}</Text>
            <Text style={styles.label}>
              Created At: {item.createdAt.toDate().toString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: 'white',
    borderWidth:1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    
  
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default HistoryScreen