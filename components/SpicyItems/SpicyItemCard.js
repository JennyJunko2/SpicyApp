import { useNavigation } from '@react-navigation/native'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'

const SpicyItemCard = ({item}) => {
  console.log('item:', item)

  const navigation = useNavigation()

  const clickCardHandler = () => {
    navigation.navigate('SpicyItemDetails', { item })
  }

  return (
    <Pressable style={styles.itemCard} onPress={clickCardHandler}>
      <Image source={{uri: item.image_uri}} style={styles.image}/>
      <View style={styles.info}>
        <Text style={styles.title}>{item.spicy_item_name}</Text>
        <Text>{item.category_name}</Text>
        <View style={styles.ratingBox}>
          <Text style={styles.rate}>Spicy: {item.spicy_rate}</Text>
          <Text style={styles.rate}>Taste: {item.delicious_rate}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 1, height:1},
    shadowRadius: 2
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    width: '100%',
    height: '100%'
  },
  info: {
    flex: 2,
    padding: 12
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  rate: {
    backgroundColor: 'red',
    color: '#ffffff',
    marginTop: 4,
    marginRight: 8,
    padding: 3
  }
})

export default SpicyItemCard