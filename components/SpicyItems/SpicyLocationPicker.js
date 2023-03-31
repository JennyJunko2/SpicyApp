import { Text, View, StyleSheet, Alert, Image } from "react-native"
import OutlinedButton from "../UI/OutlinedButton"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useEffect, useState } from "react"
import { getMapPreview } from "../../utils/location"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { useField, useFormikContext } from 'formik'


const SpicyLocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState()
  const [permissionInfo, requestPermission] = useForegroundPermissions()
  const [field] = useField('location')
  const { setFieldValue } = useFormikContext()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const route = useRoute()
  
  useEffect(() => {
    if (isFocused && route.params) {
      // setPickedLocation({
      //   lat: route.params.pickedLocationLat,
      //   lng: route.params.pickedLocationLng
      // })
      setFieldValue(field.name, {
        lat: route.params.pickedLocationLat,
        lng: route.params.pickedLocationLng
      })
    }
  }, [isFocused, route])

  const verifyPermissions = async() => {
    if (permissionInfo.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission()
      return response.granted
    }

    if (permissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions.',
        'You need to grant location permission.'
      )
      return false
    }

    return true
  }

  const getLocationHandler = async() => {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()

    // setPickedLocation({
    //   lat: location.coords.latitude,
    //   lng: location.coords.longitude
    // })
    setFieldValue(field.name,
      {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map')
  }

  let locationPreview = <Text>Add a Location you ate/found this spicy food.</Text>
  if (field.value) {
    locationPreview = (
      <Image
        source={{uri: getMapPreview(field.value.lat, field.value.lng)}}
        style={styles.mapImage}
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton
          icon='location'
          onPress={getLocationHandler}
        >
          Locate User
        </OutlinedButton>
        <OutlinedButton
          icon='map'
          onPress={pickOnMapHandler}
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  }
})

export default SpicyLocationPicker