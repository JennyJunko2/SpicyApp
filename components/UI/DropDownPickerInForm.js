import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import { useField, useFormikContext } from 'formik'
import { getAllCategories } from '../../utils/database';
import { Text, View } from 'react-native';


const DropDownPickerInForm = ({label}) => {
  const [open, setOpen] = useState(false);
  const [field] = useField('category')
  const { setFieldValue } = useFormikContext()
  const [items, setItems] = useState([]);
  
  getAllCategories()
    .then((list) => setItems(list))
    .catch(() => console.log('error'))

  return (
    <>
      <Text>{label}</Text>
      <DropDownPicker
        open={open}
        items={items}
        setOpen={setOpen}
        setItems={setItems}
        value={field.value}
        setValue={(val) => setFieldValue(field.name, val())}
        listMode='SCROLLVIEW'
      />
    </>
  )
}

export default DropDownPickerInForm