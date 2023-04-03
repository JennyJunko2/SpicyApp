import { Text, View, StyleSheet, Alert, Image } from "react-native"
import OutlinedButton from "../UI/OutlinedButton"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useEffect } from "react"
import { getMapPreview } from "../../utils/location"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { useField, useFormikContext } from 'formik'
import { Colors } from "../../constants/colors"


const SpicyLocationPicker = () => {
  const [permissionInfo, requestPermission] = useForegroundPermissions()
  const [field] = useField('location')
  const { setFieldValue, initialValues } = useFormikContext()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const route = useRoute()
  
  useEffect(() => {
    if (isFocused && route.params?.pickedLocationLat) {
      setFieldValue(field.name, { lat: route.params.pickedLocationLat, lng: route.params.pickedLocationLng })
    } else if (isFocused && initialValues?.location_lat) {
      setFieldValue(field.name, { lat: initialValues?.location_lat, lng: initialValues?.location_lng})
    }
  }, [isFocused, route, initialValues])

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

    setFieldValue(field.name,
      {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map')
  }

  let locationPreview = <Text style={styles.text}>Add a Location you ate/found this spicy food.</Text>
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
    backgroundColor: Colors.backgroundColor,
    borderRadius: 8,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height:1},
    shadowRadius: 2
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
  },
  text: {
    color: Colors.textColor
  }
})

export default SpicyLocationPicker