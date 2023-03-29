import { Text } from 'react-native'
import AddSpicyItemForm from '../components/SpicyItems/AddSpicyItemForm'

const AddSpicyItemScreen = () => {

  const createHandler = () => {
    // 1. send insert query to sqlite
    // 2. navigate back to the listing page
  }

  return (
    <AddSpicyItemForm onCreateHandler={createHandler}/>
  )
}

export default AddSpicyItemScreen