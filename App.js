import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect } from 'react';
import { AuthContext, AuthContextProvider } from './authentication/auth-context';
import SignupScreen from './screens/SignupScreen';
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen';
import IconButton from './components/UI/IconButton';
import { logout } from './authentication/firebase';
import AllSpicyItemsScreen from './screens/AllSpicyItemsScreen';
import AddSpicyItemScreen from './screens/AddSpicyItemScreen';
import { dropTables, initializeTables } from './utils/database';
import MapScreen from './screens/MapScreen';
import SpicyItemDetailsScreen from './screens/SpicyItemDetailsScreen';
import { Colors } from './constants/colors';

const Stack = createNativeStackNavigator();

const PreAuthenticatedStack = () => {
  console.log('pre')
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.backgroundColor,
        contentStyle: {
          backgroundColor: Colors.backgroundColor
        },
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          shadowColor: 'transparent'
        },
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
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors.backgroundColor,
        },
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          shadowColor: 'transparent'
        },
        headerTitleStyle: {
          color: Colors.backgroundColor
        },
        headerTintColor: Colors.backgroundColor
      }}
    >
      <Stack.Screen
        name='AllSpicyItems'
        component={AllSpicyItemsScreen}
        options={({navigation}) => ({
          title: 'Spicy Logger',
          headerRight: ({tintColor}) => (
            [
              <IconButton
                color={tintColor}
                size={24}
                icon='add'
                onPress={() => navigation.navigate('AddSpicyItem')}
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
      <Stack.Screen
        name='AddSpicyItem'
        component={AddSpicyItemScreen}
        options={{
          title: 'Add Spicy Item'
        }}
      />
      <Stack.Screen
        name='Map'
        component={MapScreen}
      />
      <Stack.Screen
        name='SpicyItemDetails'
        component={SpicyItemDetailsScreen}
        options={{
          title: 'Loading Spicy Item...'
        }}
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

  useEffect(() => {
    const dbInit = async() => {
      // await dropTables()
      await initializeTables()
    }
    dbInit()
  }, [])

  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

