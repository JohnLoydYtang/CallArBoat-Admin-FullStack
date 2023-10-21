import { StatusBar } from 'expo-status-bar';
import { Image, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';

//CSS
import styles from '../assets/css/screensStyle/getStartedStyle';

const getImage = require('../assets/images/getstarted.png');

const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={getImage}/>
        <Text style={styles.textDesign}>   EASY BOOK AND {'\n'}RESERVE OF TICKETS</Text>
      </View>
      <TouchableOpacity style={styles.ButtonDesign} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default GetStarted;