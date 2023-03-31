import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {FlatList, StyleSheet} from 'react-native'
import SpicyItemCard from '../components/SpicyItems/SpicyItemCard'
import { getAllSpicyItems } from '../utils/database'

const AllSpicyItemsScreen = () => {
  const [loadedSpicyItems, setLocatedSpicyItems] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    const loadData = async() => {
      const items = await getAllSpicyItems()
      setLocatedSpicyItems(items)
    }

    loadData()
  }, [isFocused])

  return (
    <FlatList
      data={loadedSpicyItems}
      renderItem={({item}) => <SpicyItemCard item={item} onSelect={() => {}}/>}
      keyExtractor={(item) => item.item_id}
      style={styles.flatList}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    margin: 24
  }
})

export default AllSpicyItemsScreen