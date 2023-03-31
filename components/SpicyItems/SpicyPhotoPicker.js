
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { Image, Text, Alert, View, StyleSheet } from "react-native"
import OutlinedButton from '../UI/OutlinedButton'
import { useField, useFormikContext } from 'formik'

const SpicyPhotoPicker = () => {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
  const [field] = useField('imageUri')
  const { setFieldValue } = useFormikContext()

  const verifyPermissions = async() => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      )
      return false
    }

    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    })
  
    setFieldValue(field.name, image.assets[0].uri)
  }

  let imagePreview = <Text>Add an image of this spicy food!</Text>
  if (field.value) {
    imagePreview = <Image style={styles.image} source={{uri: field.value}}/>
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
        <Image source={{uri: field.value}}/>
      </View>
      <OutlinedButton
        onPress={takeImageHandler}
        icon='camera'
      >
        Take Photo
      </OutlinedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  }
})

export default SpicyPhotoPicker