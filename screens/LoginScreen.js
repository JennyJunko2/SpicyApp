import { useState } from 'react'
import {Text, Button, View, TextInput, StyleSheet} from 'react-native'
import { login } from '../authentication/firebase'
import BasicButton from '../components/UI/BasicButton'

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
    <View style={styles.authForm}>
      <View>
        <TextInput
          placeholder='Email'
          value={enteredEmail}
          onChangeText={(email) => setEnteredEmail(email)}
          style={styles.textInput}
        />
      </View>
      <View>
        <TextInput
          placeholder='Password'
          value={enteredPassword}
          onChangeText={(pwd) => setEnteredPassword(pwd)}
          style={styles.textInput}
        />
      </View>
      <BasicButton
        title={'Login'}
        onPress={submitHandler}
      />
      <Text>Or</Text>
      <Button title='Create New User' onPress={createNewUserButtonClickHandler} />
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

export default LoginScreen