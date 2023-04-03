import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import { useField, useFormikContext } from 'formik'
import { getAllCategories } from '../../utils/database';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

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
      <Text style={styles.label}>{label}</Text>
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
    zIndex: 3
  },
  dropDownPicker: {
    borderColor: Colors.backgroundColor,
    marginVertical: 8,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height:1},
    shadowRadius: 2
  },
  dropDownPickerContainer: {
    borderColor: Colors.backgroundColor
  },
  errorText: {
    color: Colors.primaryColor,
    marginTop: -8,
    marginBottom: 8
  },
  label: {
    color: Colors.textColor
  }
})

export default DropDownPickerInForm