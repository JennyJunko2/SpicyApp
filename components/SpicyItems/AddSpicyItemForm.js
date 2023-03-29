import { ScrollView, Text, StyleSheet, View, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import DropDownPickerInForm from '../UI/DropDownPickerInForm'
import SpicyPhotoPicker from './SpicyPhotoPicker'
// import Config from 'react-native-config'

const AddSpicyItemForm = () => {

  return (
    <ScrollView
      style={styles.form}
      nestedScrollEnabled={true}
    >
      <Formik
        initialValues={{
          title: '',
          description: '',
          deliciousRate: null,
          spicyRate: null,
          category: null
        }}
        onSubmit={(values) => console.log('values::', values)}
      >
        {
          ({ handleChange, handleSubmit, values }) => (
            <>
              <View>
                <Text>Title</Text>
                <TextInput
                  placeholder='title'
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
              </View>
              <View>
                <Text>Description</Text>
                <TextInput
                  placeholder='description'
                  value={values.description}
                  onChangeText={handleChange('description')}
                />
              </View>
              <DropDownPickerInForm label={'Category'}/>
              <View>
                <Text>Delicious Rate</Text>
                <TextInput
                  placeholder='Delicious rate'
                  value={values.deliciousRate}
                  onChangeText={handleChange('deliciousRate')}
                  keyboardType='numeric'
                />
              </View>
              <View>
                <Text>Spicy Rate</Text>
                <TextInput
                  placeholder='Spicy rate'
                  value={values.spicyRate}
                  onChangeText={handleChange('spicyRate')}
                  keyboardType='numeric'
                />
              </View>
              <SpicyPhotoPicker onImagePick={() => {}}/>
              {/* LocationPicker */}
              <Button
                title='submit'
                onPress={handleSubmit}
              />
            </>
          )
        }
        
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  }
})

export default AddSpicyItemForm