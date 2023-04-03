import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {FlatList, StyleSheet, TextInput, View} from 'react-native'
import SpicyItemCard from '../components/SpicyItems/SpicyItemCard'
import { getAllSpicyItems } from '../utils/database'
import { Ionicons } from '@expo/vector-icons'

const AllSpicyItemsScreen = () => {
  const [loadedSpicyItems, setLocatedSpicyItems] = useState([])
  const isFocused = useIsFocused()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const loadData = async() => {
      const items = await getAllSpicyItems()
      setLocatedSpicyItems(items)
    }

    loadData()
  }, [isFocused])

  const filteredList = loadedSpicyItems.filter((item) => {
    return item.spicy_item_name.toLowerCase().includes(searchText.toLowerCase())
  })

  const renderSearchBar = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder='Search'
            style={styles.searchTextInput}
          />
          {!searchText && <Ionicons name="search" size={16} color="#D3D3D3" />}
        </View>
      </>
    )
  }

  return (
    <FlatList
      data={filteredList}
      renderItem={({item}) => <SpicyItemCard item={item} />}
      keyExtractor={(item) => item.item_id}
      ListHeaderComponent={renderSearchBar()}
      style={styles.flatList}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    margin: 24
  },
  searchTextInput: {
    marginRight: 4
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  }
})

export default AllSpicyItemsScreen