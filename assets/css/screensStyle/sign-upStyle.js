import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
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
      marginTop: 20, 
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
      marginLeft: 200,
      bottom: 18,
    },
    Common: {
      marginBottom: 25,
      fontSize: 30,
      fontWeight: 'bold',
    },
    error:{
      color:'red',
    },
    successText:{
      color:'blue',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        top: 10,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
  });