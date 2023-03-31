import MapView, { Marker } from 'react-native-maps'
import { Alert, StyleSheet } from 'react-native'
import { useCallback, useLayoutEffect, useState } from 'react'
import IconButton from '../components/UI/IconButton'


const MapScreen = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState()

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude
    setSelectedLocation({ lat, lng })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked.',
        'Please select a location.'
      )
      return
    }

    navigation.navigate('AddSpicyItem', {
      pickedLocationLat: selectedLocation.lat,
      pickedLocationLng: selectedLocation.lng
    })

  },[navigation, selectedLocation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
          color={tintColor}
          icon='save'
          size={24}
          onPress={savePickedLocationHandler}
        />
      )
    })
  }, [navigation,savePickedLocationHandler])

  return (
    <MapView
      initialRegion={region}
      onPress={selectLocationHandler}
      style={styles.map}
    >
      { selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
          }}
        />
        )
      }
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex:1
  }
})

export default MapScreen