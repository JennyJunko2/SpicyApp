import { Text } from 'react-native'
import AddSpicyItemForm from '../components/SpicyItems/AddSpicyItemForm'
import { addSpicyItem } from '../utils/database'

const AddSpicyItemScreen = ({navigation}) => {

  const createHandler = async(data) => {
    await addSpicyItem(data)
    navigation.navigate('AllSpicyItems')
  }

  return (
    <AddSpicyItemForm onCreateHandler={createHandler}/>
  )
}

export default AddSpicyItemScreen