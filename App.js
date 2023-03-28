import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { AuthContext, AuthContextProvider } from './authentication/auth-context';
import SignupScreen from './screens/SignupScreen';
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen';
import PostScreen from './screens/AllSpicyItemsScreen';
import IconButton from './components/UI/IconButton';
import { logout } from './authentication/firebase';
import AllSpicyItemsScreen from './screens/AllSpicyItemsScreen';

const Stack = createNativeStackNavigator();

const PreAuthenticatedStack = () => {
  console.log('pre')
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'black'
      }}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
      />
      <Stack.Screen
        name='Signup'
        component={SignupScreen}
      />
    </Stack.Navigator>
  )
}

const PostAuthenticatedStack = () => {
  console.log('post')
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='AllSpicyItems'
        component={AllSpicyItemsScreen}
        options={({navigation}) => ({
          headerRight: ({tintColor}) => (
            [
              <IconButton
                color={tintColor}
                size={24}
                icon='add'
                onPress={() => {}}
                key='1'
              />,
              <IconButton
                color={tintColor}
                size={24}
                icon='log-out-outline'
                onPress={logout}
                key='2'
              />
            ]
          )
        })}
      />
    </Stack.Navigator>
  )
}

const Root = () => {
  const authContext = useContext(AuthContext)
  console.log('context::', authContext.user)
  return (
    <NavigationContainer>
      {
        authContext.user
        ? <PostAuthenticatedStack />
        : <PreAuthenticatedStack />
      }
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

