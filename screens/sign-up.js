import { db } from '../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TextInput, Text, TouchableOpacity, Modal, View} from "react-native";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

//CSS
import styles from '../assets/css/screensStyle/sign-upStyle';

const SignUp = ({ navigation }) => {
  const [name, onChangeText] = useState('');
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = async () => {
    setNameError('');
    setUsernameError('');
    setPasswordError('');
    setError('');

    if (name.trim() === '') {
      setNameError('Please input your name');
      return;
    }

   if (username.trim() === '') {
      setUsernameError('Please input your username');
      return;
    }
    
    if (!username.trim().includes('@') || !username.trim().includes('.com')) {
      setUsernameError('Please enter a valid email address');
      return;
    }
    
    if (password.trim() === '') {
      setPasswordError('Please input your password');
      return;
    }
    if (password.trim().length < 6) {
      setPasswordError('Password should be at least 6 characters');
      return;
    }

    try {
      const auth = getAuth(); // Initialize the auth object

      const userCredential = await createUserWithEmailAndPassword(auth, username, password);

      // Set the display name for the user
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      
      // Access the 'users' collection
      const usersCollection = collection(db, 'Scanners');
      
      // Add a new document with a generated ID
      await setDoc(doc(usersCollection), {
        scanner_id: userCredential.user.uid, // Store the user's ID in the document
        scanner_name: name,
        scanner_username: username,
        scanner_password: password,
      });
      

      // Navigate to the verification screen or any other screen
      navigation.navigate('SignIn');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('Email is already in use');
      } else {
        console.error('Error saving data:', error);
      }
    }
  };


    return (
          <KeyboardAvoidingView   keyboardVerticalOffset={100} style={styles.container}>
        <Text style={styles.Common}>Sign Up</Text>

        {nameError !== '' && <Text style={styles.error}>{nameError}</Text>}
       <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            value={name}
            placeholder="Name"
        />

        {usernameError !== '' && <Text style={styles.error}>{usernameError}</Text>}
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeUsername(text)}
            value={username}
            placeholder="Username"
        />
        

        {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <TextInput
            style={styles.inputPass}
            onChangeText={text => onChangePassword(text)}
            value={password}
            placeholder="Password"
            secureTextEntry
        />

    <TouchableOpacity style={styles.ButtonDesign} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

    <Text style={styles.commontext}>ALREADY HAVE AN ACCOUNT?</Text>
    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.text2}>SIGN IN</Text>
    </TouchableOpacity>

    <StatusBar style="auto"/>
      </KeyboardAvoidingView>
    );
  }
  
export default SignUp;