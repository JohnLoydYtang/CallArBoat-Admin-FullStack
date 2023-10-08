import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

function Scanner() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasCameraPermission(status === 'granted');
        })();
      }, []);
    
      const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned) {
          setScanned(true);
          if (data === 'validCode') {
            Alert.alert(
              'Ticket Verified',
              `Bar code with type ${type} and data ${data} has been scanned!`,
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('StartScreen'),
                },
              ]
            );
          } else {
            Alert.alert(
                'Ticket Invalid',
                `Bar code has been scanned but it does not match`,
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('StartScreen'),
                  },
                ]
              );
          }
        }
      };
      
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.ButtonDesign} onPress={() => navigation.navigate('StartScreen') } >
            <Text style={styles.Text3}>⇦</Text>
        </TouchableOpacity>

      <Text style={styles.Text1}>Scanning QR Code</Text>
      <Text style={styles.Text2}>Please Wait</Text>
      
    {hasCameraPermission && (
        <BarCodeScanner
        style= {styles.qrCode}
        onBarCodeScanned={handleBarCodeScanned}
        />
    )}

      <Text style={styles.Text4}>Scanning the code for ticket {'\n'}               verification</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A79E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text1:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    paddingTop: 25,
  },
  Text2:{
    color: 'white',
    fontSize: 15,
    paddingBottom: 50,
  },
  Text3:{
    fontSize: 70,
    color: 'white',
    paddingBottom: '5%',
    paddingTop: 70,
  },
  Text4:{
    fontSize: 16,
    color: 'white',
    paddingTop: 30,
    paddingBottom: 150,
  },
  ButtonDesign:{
    right: 130,
  },
  qrCode:{
   padding: 180,
  },
});

export default Scanner;
