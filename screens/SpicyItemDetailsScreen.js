import { useLayoutEffect, useState } from "react"
import { View, Text, Image, ScrollView, StyleSheet } from "react-native"
import IconButton from "../components/UI/IconButton"
import { getAddress, getMapPreview } from "../utils/location"

const SpicyItemDetailsScreen = ({navigation, route}) => {
  const item = route.params.item
  const [location, setLocation] = useState()
  console.log('item.image_uri:', item)

  useLayoutEffect(() => {
    const fetchedAddress = async() => {
      if (item.location_lat) {
        address = await getAddress(item.location_lat, item.location_lng)
        setLocation(address)
      }
    }
    fetchedAddress()

    navigation.setOptions({
      title: item.spicy_item_name,
      headerRight: (({tintColor}) => (
        <IconButton
          icon='create-outline'
          size={24}
          color={tintColor}
          onPress={() => {navigation.navigate(
            'AddSpicyItem',
            { item }
          )}}
        />))
    })
  },[navigation])

  return (
    <ScrollView
      style={styles.rootContainer}
      contentContainerStyle={styles.rootContent}
      contentInset={{bottom: 80}}
    >
      <View style={[styles.imageContainer, item.image_uri && { borderColor: 'transparent'}]}>
        <Text style={styles.categoryTag}>{item.category_name}</Text>
        {item.image_uri
          ? <Image source={{uri: item.image_uri}} style={styles.image}/> 
          : <Text>No image</Text>}
      </View>
      <Text style={styles.title}>{item.spicy_item_name}</Text>
      <View style={styles.ratingBox}>
          <Text style={styles.rate}>Spicy: {item.spicy_rate.toFixed(1)}</Text>
          <Text style={styles.rate}>Tasty: {item.delicious_rate.toFixed(1)}</Text>
        </View>
      <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      <View style={styles.addressBox}>
        <Text style={styles.addressSubtitle}>Address Information</Text>
        <Text>{location}</Text>
        {location
          ? <View style={styles.mapContainer}>
            <Image
              source={{uri: getMapPreview(item.location_lat, item.location_lng)}}
              style={styles.image}
            />
          </View>
          : <Text>No address information available</Text>
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24
  },
  imageContainer: {
    width: '100%',
    height: 350,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    margin: 8,
    textAlign: 'center',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rate: {
    backgroundColor: 'red',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
    marginRight: 8,
    padding: 5,
    borderRadius: 4,
    overflow: 'hidden'
  },
  description: {
    marginTop: 12
  },
  addressBox: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addressSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5
  },
  mapContainer: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  categoryTag: {
    position: 'absolute',
    backgroundColor: 'red',
    padding: 5,
    color: '#ffffff',
    top: 5,
    right: 5,
    zIndex: 1,
    borderRadius: 4,
    overflow: 'hidden'
  }
})

export default SpicyItemDetailsScreen