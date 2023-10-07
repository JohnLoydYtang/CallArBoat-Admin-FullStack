import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Scanner from './screens/Scanner';

const QrPlaceHolder = require('./assets/images/qrplaceholder.png');

function StartScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <View style={styles.LoginButton}>
       <TouchableOpacity style={styles.LoginContainer}>
          <Text style={styles.Text3}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.Text1}>Scanner QR Code</Text>
      <Image source={QrPlaceHolder} style={styles.Image} />

      <View style={styles.Button}>
       <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('Scanner') }>
          <Text style={styles.Text2}>Scan QR</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A79E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginContainer:{
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  LoginButton:{
    paddingBottom: 80,
    left: 120,
  },
  Text3:{
    fontWeight: 'bold',
    fontSize: 15,
  },
  ButtonContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    width: 190,
    alignItems: 'center',
  },
  Button:{
    paddingTop: 30,
    paddingBottom: 60,
  },
  Text1:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    paddingBottom: 25,
  },
  Text2:{
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default App;
