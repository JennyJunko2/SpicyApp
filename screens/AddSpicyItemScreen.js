import { useLayoutEffect } from 'react'
import AddSpicyItemForm from '../components/SpicyItems/AddSpicyItemForm'
import { addSpicyItem, getSpicyItemById, updateSpicyItem } from '../utils/database'

const AddSpicyItemScreen = ({navigation, route}) => {

  useLayoutEffect(()=> {
    if (route.params?.item) {
      navigation.setOptions({
        title: `Edit ${route.params.item.spicy_item_name}`
      })
    }
  }, [route])

  const submitHandler = async(data) => {
    if (data?.item_id) {
      await updateSpicyItem(data)
      const item = await getSpicyItemById(data.item_id)
      navigation.navigate('SpicyItemDetails', {item})
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