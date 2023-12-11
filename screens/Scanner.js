import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../back-end/AuthContext';
import { Timestamp } from 'firebase/firestore';

import styles from '../assets/css/screensStyle/ScannerStyle';

function Scanner() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState([]);
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

      if (scannedData.includes(data)) {
        Alert.alert('QR Code Already Scanned', 'This QR code has already been scanned.');
        setScanned(false);
      } else {
        setScannedData((prevScannedData) => [...prevScannedData, data]);

        if (data) {
          const parts = data.split(/Timestamp/);
          const passengerName = parts[0];

          const match = data.match(/seconds=(\d+), nanoseconds=(\d+)/);
          if (match) {
            const seconds = parseInt(match[1], 10);
            let nanoseconds = parseInt(match[2], 10);

            while (nanoseconds > 999999999) {
              seconds++;
              nanoseconds -= 1000000000;
            }

            const timestamp = new Timestamp(seconds, nanoseconds);
            const date = timestamp.toDate();
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

            console.log(formattedDate);

            if (passengerName) {
              Alert.alert(
                'QR Code Scanned',
                `${passengerName}${formattedDate} has been confirmed!`,
              );  
            }
          } else {
            Alert.alert('Invalid QR Code', 'The scanned QR code is not valid.');
          }
        } else {
          Alert.alert('Invalid QR Code', 'The scanned QR code is null.');
        }

        setTimeout(() => {
          setScanned(false);
        }, 5000);
      }
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
