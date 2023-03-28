import { useState } from 'react'
import {Text, Button, View, TextInput} from 'react-native'
import { login } from '../authentication/firebase'

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
    <View style={{flex: 1}}>
      <Text>Login screen</Text>
      <TextInput
        placeholder='email'
        value={enteredEmail}
        onChangeText={(email) => setEnteredEmail(email)}
      />
      <TextInput
        placeholder='password'
        value={enteredPassword}
        onChangeText={(pwd) => setEnteredPassword(pwd)}
      />
      <Button title='login' onPress={submitHandler} />
      <Button title='Create New User' onPress={createNewUserButtonClickHandler} />
    </View>
  )
}

export default LoginScreen