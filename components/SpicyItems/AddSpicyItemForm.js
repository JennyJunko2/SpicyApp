import { ScrollView, Text, StyleSheet, View, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import DropDownPickerInForm from '../UI/DropDownPickerInForm'
import SpicyPhotoPicker from './SpicyPhotoPicker'
import SpicyLocationPicker from './SpicyLocationPicker'
import BasicButton from '../UI/BasicButton'
import AddSpicyItemValidationSchema from '../../utils/validation'
import FormattedTextInput from '../UI/FormattedTextInput'

const AddSpicyItemForm = ({onCreateHandler}) => {

  const submitFormHandler = (data) => {
    console.log('data:',data)
    onCreateHandler({ ...data, createdAt: Date.now() })
  }

  return (
    <ScrollView
      style={styles.form}
      contentInset={{bottom: 80}}
      nestedScrollEnabled={true}
    >
      <Formik
        initialValues={{
          title: '',
          description: '',
          deliciousRate: undefined,
          spicyRate: undefined,
          category: undefined,
          imageUri: null,
          location: null
        }}
        onSubmit={submitFormHandler}
        validationSchema={AddSpicyItemValidationSchema}
      >
        {
          ({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <FormattedTextInput
                label='Title'
                placeholder='title'
                value={values.title}
                onChangeText={handleChange('title')}
                error={errors.title}
                touched={touched.title}
              />
              <DropDownPickerInForm label={'Category'}/>
              <FormattedTextInput
                label='Description'
                placeholder='description'
                value={values.description}
                onChangeText={handleChange('description')}
                error={errors.description}
                touched={touched.description}
                multiline={true}
              />
              <View style={styles.ratesContainer}>
                <FormattedTextInput
                  label='Delicious Rate'
                  placeholder='0.0 - 5.0'
                  value={values.deliciousRate}
                  onChangeText={handleChange('deliciousRate')}
                  error={errors.deliciousRate}
                  touched={touched.deliciousRate}
                  customStyle={[styles.rate, {marginRight: 10}]}
                />
                <FormattedTextInput
                  label='Spicy Rate'
                  placeholder='0.0 - 5.0'
                  value={values.spicyRate}
                  onChangeText={handleChange('spicyRate')}
                  error={errors.spicyRate}
                  touched={touched.spicyRate}
                  customStyle={styles.rate}
                />
              </View>
              <SpicyPhotoPicker />
              <SpicyLocationPicker />
              <BasicButton
                title='Submit'
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
  },
  ratesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  rate: {
    flex: 1
  },
  textInput: {
    backgroundColor: '#ffffff',
    padding: 12,
    paddingTop: 12,
    marginVertical: 8,
    borderRadius: 6
  },
  errorText: {
    color: 'red',
    marginTop: -8,
    marginBottom: 8
  }
})

export default AddSpicyItemForm