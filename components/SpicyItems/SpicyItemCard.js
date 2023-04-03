import { useNavigation } from '@react-navigation/native'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { Colors } from '../../constants/colors'

const SpicyItemCard = ({item}) => {
  const navigation = useNavigation()

  const clickCardHandler = () => {
    navigation.navigate('SpicyItemDetails', { item })
  }

  return (
    <Pressable style={styles.itemCard} onPress={clickCardHandler}>
      <Image source={{uri: item.image_uri}} style={styles.image}/>
      <View style={styles.info}>
        <Text style={styles.title}>{item.spicy_item_name}</Text>
        <Text style={styles.categoryText}>{item.category_name}</Text>
        <View style={styles.ratingBox}>
          <Text style={styles.rate}>Spicy: {item.spicy_rate.toFixed(1)}</Text>
          <Text style={styles.rate}>Tasty: {item.delicious_rate.toFixed(1)}</Text>
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
    marginVertical: 8,
    marginHorizontal: 4,
    minHeight: 125,
    backgroundColor: Colors.backgroundColor,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height:1},
    shadowRadius: 2
  },
  image: {
    flex: 1.5,
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
    color: Colors.textColor,
    fontWeight: 'bold',
    fontSize: 18
  },
  categoryText: {
    color: Colors.textColor
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  rate: {
    backgroundColor: Colors.primaryColor,
    color: Colors.backgroundColor,
    marginTop: 4,
    marginRight: 8,
    padding: 3
  }
})

export default SpicyItemCard