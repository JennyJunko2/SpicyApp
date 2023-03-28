import { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import { signup, auth } from '../authentication/firebase'

const SignupScreen = () => {
  const [enteredName, setEnteredName] = useState()
  const [enteredEmail, setEnteredEmail] = useState()
  const [enteredPassword, setEnteredPassword] = useState()
  console.log('signup screen')
  const submitHandler = async() => {
    signup(enteredName, enteredEmail, enteredPassword)
  }

  return (
    <View>
      <TextInput
        placeholder='name'
        onChangeText={(name) => setEnteredName(name)}
        value={enteredName}
      />
      <TextInput
        placeholder='email'
        onChangeText={(email) => setEnteredEmail(email)}
        value={enteredEmail}
      />
      <TextInput
        placeholder='password'
        onChangeText={(pwd) => setEnteredPassword(pwd)}
        value={enteredPassword}
      />
      <Button
        title='Create User'
        onPress={submitHandler}
      />
    </View>
  )
}

export default SignupScreen