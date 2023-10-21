import React, { useContext, useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { StatusBar, KeyboardAvoidingView, TextInput, View, Image, Text, TouchableOpacity} from "react-native";
import { signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AuthContext } from '../AuthContext'; // Import the AuthContext

//CSS
import styles from '../assets/css/screensStyle/sign-inStyle';

const getLogo = require('../assets/images/Logo1.png');

const SignIn = ({navigation}) => {
    const [value, onChangeText] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext); // Access the login function from AuthContext

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const handleSignIn = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, value, password);
          const user = userCredential.user;
      
          // User is signed in
          // Call the login function from AuthContext to update the authentication state
          login();
      
          // Check if the user is authenticated before navigating to the dashboard
          if (user) {
            navigation.navigate('Scanner');
          } else {
            setError('An error occurred');
          }
          console.log(userCredential.user);
        } catch (error) {
          // Handle login error
          if (error.code === 'auth/missing-password') {
            setError('Please enter a password');
          } else if (error.code === 'auth/invalid-login-credentials') {
            setError('Invalid email or password');
          } else if (error.code === 'auth/invalid-email') {
            setError('Invalid email address');
          } else {
            setError('An error occurred');
          }
          console.log(error);
        }
      };

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={getLogo}/>
            </View>

            <Text style={styles.errorText}>{error}</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder="Username"
            />

            <TextInput
                style={styles.inputPass}
                onChangeText={text => onChangePassword(text)}
                value={password}
                placeholder="Password"
                secureTextEntry
            />

            <CheckBox
                containerStyle={styles.checkboxContainer}
                title="REMEMBER ME"
                checked={rememberMe}
                onPress={handleRememberMe}
            />

            <TouchableOpacity style={styles.ButtonDesign} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.text1}>Forgot Your Password?</Text>
            </TouchableOpacity>

            <Text style={styles.commontext}>DON'T HAVE AN ACCOUNT?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.text2}>SIGN UP</Text>
            </TouchableOpacity>

            <StatusBar style="auto"/>
        </KeyboardAvoidingView>
    );
};

export default SignIn;
