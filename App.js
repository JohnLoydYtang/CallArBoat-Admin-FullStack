import React, { useEffect ,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Image, ActivityIndicator } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { navigationRef } from './rootNavigation';
import { AuthProvider } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Scanner from './screens/Scanner';
import GetStarted from './screens/getStarted';
import SignIn from './screens/sign-in';
import SignUp from './screens/sign-up';

const LogoImage = require('./assets/images/LOGO.png');

const FlashScreen = ({ navigation }) => {
  const delay = 4000; 

  setTimeout(() => {
    navigation.navigate('GetStarted');
  }, delay);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source ={LogoImage} style={styles.image}/>  
      </View> 
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value !== null) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <AuthProvider>
      <Stack.Navigator>
        <Stack.Screen name="FlashScreen" component={FlashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }}/>
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whiet',
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
