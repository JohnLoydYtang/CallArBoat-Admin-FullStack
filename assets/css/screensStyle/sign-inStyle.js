import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      marginTop: 80,
    },
    input: {
      margin: 12,
      padding: 10,
      width: 240,
      marginTop: 35,
      marginBottom: 20,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: 'white',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 6,   
    },
    inputPass: {
        margin: 12,
        padding: 10,
        width: 240,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,   
      },
    ButtonDesign:{
      width: 180,
      height: 48,
      borderRadius: 10,  
      overflow: 'hidden',
      backgroundColor: '#4A79E5',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 6,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      top: 10,
      fontSize: 19,
    },
    text1: {
      fontSize: 13,
      marginTop: 30,
    },
    commontext:{
      right:30,
      marginTop: 40,
    },
    text2: {
      color: '#4A79E5',
      marginLeft: 180,
      bottom: 18,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      right:  30,
      width: 200,
      backgroundColor: 'white',
      borderWidth: 0,
    },
    errorText:{
      color: 'red',
      top: 20,
    }
  });