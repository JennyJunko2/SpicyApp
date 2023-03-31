import { useState } from 'react'
import { Button, TextInput, View, StyleSheet } from 'react-native'
import { signup, auth } from '../authentication/firebase'
import BasicButton from '../components/UI/BasicButton'

const SignupScreen = () => {
  const [enteredName, setEnteredName] = useState()
  const [enteredEmail, setEnteredEmail] = useState()
  const [enteredPassword, setEnteredPassword] = useState()

  const submitHandler = async() => {
    signup(enteredName, enteredEmail, enteredPassword)
  }

  return (
    <View style={styles.authForm}>
      <TextInput
        placeholder='Name'
        onChangeText={(name) => setEnteredName(name)}
        value={enteredName}
        style={styles.textInput}
      />
      <TextInput
        placeholder='Email'
        onChangeText={(email) => setEnteredEmail(email)}
        value={enteredEmail}
        style={styles.textInput}
      />
      <TextInput
        placeholder='Password'
        onChangeText={(pwd) => setEnteredPassword(pwd)}
        value={enteredPassword}
        style={styles.textInput}
      />
      <BasicButton
        title='Create User'
        onPress={submitHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  authForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: '#ffffff',
    fontSize: 16,
    padding: 12,
    paddingTop: 12,
    marginVertical: 8,
    borderRadius: 6,
    minWidth: 300
  }
})

export default SignupScreen