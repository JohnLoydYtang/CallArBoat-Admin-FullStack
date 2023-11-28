import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../back-end/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {db} from '../back-end/firebaseConfig';
import { Timestamp } from "firebase/firestore";

import styles from '../assets/css/screensStyle/ScannerStyle';

function Scanner() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
  
      // Check if data is not null
      if (data) {
        const parts = data.split(/Timestamp/);
        const passengerName = parts[0];
  
        // Check if match is not null before accessing its properties
        const match = data.match(/seconds=(\d+), nanoseconds=(\d+)/);
        if (match) {
          const seconds = parseInt(match[1], 10);
          let nanoseconds = parseInt(match[2], 10);
  
          // Adjust the nanoseconds value to be within the valid range
          while (nanoseconds > 999999999) {
            seconds++;
            nanoseconds -= 1000000000;
          }
  
          // Create a new Firestore Timestamp object
          const timestamp = new Timestamp(seconds, nanoseconds);
  
          // Convert the Firestore Timestamp to a JavaScript Date
          const date = timestamp.toDate();
  
          // Format the date in a user-friendly way (without seconds and nanoseconds)
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  
          console.log(formattedDate);
  
          // Handle the scanned data here
          if (passengerName) {
            Alert.alert(
              'QR Code Scanned',
              `${passengerName}${formattedDate} has been confirmed!`,
              // buttons go here
            );
          }
        } else {
          // Display a message for invalid QR code
          Alert.alert('Invalid QR Code', 'The scanned QR code is not valid.');
        }
      } else {
        // Display a message for null QR code
        Alert.alert('Invalid QR Code', 'The scanned QR code is null.');
      }
  
      // Reset the scanned state after 5 seconds
      setTimeout(() => {
        setScanned(false);
      }, 5000);
    }
  };
  
   



  const handleLogout = () => {
    logout();
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.Text1}>Scanning QR Code</Text>
      <Text style={styles.Text2}>Please Wait</Text>

      {hasCameraPermission && (
        <BarCodeScanner style={styles.qrCode} onBarCodeScanned={handleBarCodeScanned} />
      )}

      <Text style={styles.Text4}>Scanning the code for ticket {'\n'} verification</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default Scanner;
