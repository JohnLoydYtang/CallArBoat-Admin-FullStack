import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Image, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './back-end/rootNavigation';
import { AuthProvider } from './back-end/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Scanner from './screens/Scanner';
import GetStarted from './screens/getStarted';
import SignIn from './screens/sign-in';
import SignUp from './screens/sign-up';

const LogoImage = require('./assets/images/LOGO.png');

import styles from './assets/css/AppStyle';

const FlashScreen = ({ navigation }) => {
  const delay = 4000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('GetStarted');
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source={LogoImage} style={styles.image} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const accessToken = AsyncStorage.getItem('accessToken');
    console.log('Access token:', AsyncStorage.getItem('accessToken'));
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AuthProvider>
        <Stack.Navigator>     
            <Stack.Screen name="FlashScreen" component={FlashScreen} options={{headerShown:false }} />     
                <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }} />   
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
