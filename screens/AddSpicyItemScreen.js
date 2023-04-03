import { Text } from 'react-native'
import AddSpicyItemForm from '../components/SpicyItems/AddSpicyItemForm'
import { addSpicyItem, updateSpicyItem } from '../utils/database'

const AddSpicyItemScreen = ({navigation, route}) => {

  const submitHandler = async(data) => {
    if (data?.item_id) {
      await updateSpicyItem(data)
      navigation.navigate('AllSpicyItems')
    } else {
      await addSpicyItem({ ...data, createdAt: Date.now() })
      navigation.navigate('AllSpicyItems')
    }
  }

  return (
    <AddSpicyItemForm
      onSubmitHandler={submitHandler}
      initialValues={route.params?.item}
    />
  )
}

export default AddSpicyItemScreen