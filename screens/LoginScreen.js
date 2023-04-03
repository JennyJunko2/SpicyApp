import { useState } from 'react'
import {Text, Button, View, TextInput, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { login } from '../authentication/firebase'
import BasicButton from '../components/UI/BasicButton'
import { Colors } from '../constants/colors'

const LoginScreen = ({navigation}) => {
  const [enteredEmail, setEnteredEmail] = useState()
  const [enteredPassword, setEnteredPassword] = useState()

  const submitHandler = async() => {
    login(enteredEmail, enteredPassword)
  }

  const createNewUserButtonClickHandler = () => {
    navigation.navigate('Signup')
  }

  return (
    <KeyboardAvoidingView behavior='position' style={styles.authForm}>
      <View>
        <View>
          <Image source={require('../assets/main_logo.png')} style={styles.image}/>
        </View>
        <TextInput
          placeholder='Email'
          value={enteredEmail}
          onChangeText={(email) => setEnteredEmail(email)}
          style={styles.textInput}
        />
        <View>
          <TextInput
            placeholder='Password'
            value={enteredPassword}
            onChangeText={(pwd) => setEnteredPassword(pwd)}
            style={styles.textInput}
            />
        </View>
      </View>
      <BasicButton
        title={'Login'}
        onPress={submitHandler}
        />
      <View style={styles.rootText}>
        <Text>Or</Text>
      </View>
      <Button title='Create New User' onPress={createNewUserButtonClickHandler} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  authForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: Colors.backgroundColor,
    fontSize: 16,
    padding: 12,
    paddingTop: 12,
    marginVertical: 8,
    borderRadius: 6,
    minWidth: 300,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height:1},
    shadowRadius: 2
  },
  image: {
    width: '100%',
    height: 300
  },
  rootText: {
    alignItems: 'center'
  }
})

export default LoginScreen