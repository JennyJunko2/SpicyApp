import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import SpicyItemCard from '../components/SpicyItems/SpicyItemCard'
import { Colors } from '../constants/colors'
import { getAllSpicyItems } from '../utils/database'

const AllSpicyItemsScreen = () => {
  const [loadedSpicyItems, setLocatedSpicyItems] = useState([])
  const isFocused = useIsFocused()
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState('created_at')

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

  const sortedList = filteredList.sort((a,b) => {
    if (a[sortOrder] > b[sortOrder] ) {
      return -1
    }
    if (a[sortOrder]  < b[sortOrder] ) {
      return 1
    }
    return 0
  })

  const sortOrderHandler = (sort) => {
    console.log('hello??',sort)
    setSortOrder(sort)
  }

  const renderSearchBar = () => {
    return (
      <>
        <View>
          <View style={styles.searchBarContainer}>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder='Search'
              style={styles.searchTextInput}
            />
            {!searchText && <Ionicons name="search" size={16} color="#D3D3D3" />}
          </View>
          <View style={styles.sortByOuterContainer}>
            <Text style={styles.sortByLabel}>Sort by</Text>
            <View style={styles.sortByBox}>
              <Pressable
                style={[styles.sortBy, sortOrder === 'created_at' && styles.sortBySelected]}
                onPress={() => sortOrderHandler('created_at')}
                >
                <Text style={sortOrder === 'created_at' ? styles.sortBySelectedText : styles.sortByNotSelectedText}>Date</Text>
              </Pressable >
              <Pressable
                style={[styles.sortBy, sortOrder === 'spicy_rate' && styles.sortBySelected]}
                onPress={() => setSortOrder('spicy_rate')}
                >
                <Text style={sortOrder === 'spicy_rate' ? styles.sortBySelectedText : styles.sortByNotSelectedText}>Spicy Rate</Text>
              </Pressable>
              <Pressable
                style={[styles.sortBy, sortOrder === 'delicious_rate' && styles.sortBySelected]}
                onPress={() => setSortOrder('delicious_rate')}
                >
                <Text style={sortOrder === 'delicious_rate' ? styles.sortBySelectedText : styles.sortByNotSelectedText}>Tasty Rate</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </>
    )
  }

  return (
    <FlatList
      data={sortedList}
      renderItem={({item}) => <SpicyItemCard item={item} />}
      keyExtractor={(item) => item.item_id}
      ListHeaderComponent={renderSearchBar()}
      style={styles.flatList}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    margin: 20
  },
  searchTextInput: {
    marginRight: 4
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.backgroundColor,
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    marginHorizontal: 4,
    shadowColor: 'black',
    shadowOffset: {width: 1, height:1},
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  sortByOuterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    marginHorizontal: 4
  },
  sortByLabel: {
    flex: 1,
    paddingRight: 5,
    fontSize: 12,
    color: Colors.textColor
  },
  sortByBox: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: Colors.primaryColor,
    borderRadius: 6,
    overflow: 'hidden'
  },
  sortBy: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderColor: Colors.primaryColor,
    alignItems: 'center'
  },
  sortBySelected: {
    backgroundColor: Colors.primaryColor
  },
  sortByNotSelectedText: {
    color: Colors.textColor
  },
  sortBySelectedText: {
    color: Colors.backgroundColor
  }
})

export default AllSpicyItemsScreen