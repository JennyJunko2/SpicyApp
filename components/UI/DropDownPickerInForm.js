import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import { useField, useFormikContext } from 'formik'
import { getAllCategories } from '../../utils/database';
import { Text, View, StyleSheet } from 'react-native';

const DropDownPickerInForm = ({label}) => {
  const [open, setOpen] = useState(false);
  const [field, meta] = useField('category')
  const { setFieldValue } = useFormikContext()
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategories = async() => {
      const res = await getAllCategories()
      setItems(res) 
    }
    fetchCategories()
  }, [setItems])

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <DropDownPicker
        open={open}
        items={items}
        setOpen={setOpen}
        setItems={setItems}
        value={field.value}
        setValue={(val) => setFieldValue(field.name, val())}
        listMode='SCROLLVIEW'
        style={styles.dropDownPicker}
        dropDownContainerStyle={styles.dropDownPickerContainer}
      />
      {meta.error && meta.touched ? (
        <Text style={styles.errorText}>{meta.error}</Text>
      ) : null }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    borderColor: '#ffffff',
  },
  dropDownPicker: {
    borderColor: '#ffffff',
    marginVertical: 8
  },
  dropDownPickerContainer: {
    borderColor: '#ffffff',
    // shadowColor: 'black',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
    // elevation: 4
  },
  errorText: {
    color: 'red',
    marginTop: -8,
    marginBottom: 8
  }
})

export default DropDownPickerInForm