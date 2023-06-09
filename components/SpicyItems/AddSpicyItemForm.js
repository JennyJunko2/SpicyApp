import { Formik } from 'formik'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Colors } from '../../constants/colors'
import AddSpicyItemValidationSchema from '../../utils/validation'
import BasicButton from '../UI/BasicButton'
import DropDownPickerInForm from '../UI/DropDownPickerInForm'
import FormattedTextInput from '../UI/FormattedTextInput'
import SpicyLocationPicker from './SpicyLocationPicker'
import SpicyPhotoPicker from './SpicyPhotoPicker'

const AddSpicyItemForm = ({onSubmitHandler, initialValues}) => {
  const submitFormHandler = (data) => {
    onSubmitHandler({ ...data, item_id: initialValues?.item_id })
  }

  return (
    <ScrollView
      style={styles.form}
      contentInset={{bottom: 80}}
      nestedScrollEnabled={true}
    >
      <Formik
        initialValues={{
          title: initialValues?.spicy_item_name,
          description: initialValues?.description,
          deliciousRate: initialValues?.delicious_rate.toString(),
          spicyRate: initialValues?.spicy_rate.toString(),
          category: initialValues?.category_id,
          imageUri: initialValues?.image_uri,
          location: initialValues?.location_lat ? {
            lat: initialValues.location_lat,
            lng: initialValues.location_lng
          } : null
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
                  label='Tasty Rate'
                  placeholder='0.0 - 5.0'
                  value={values.deliciousRate}
                  onChangeText={handleChange('deliciousRate')}
                  error={errors.deliciousRate}
                  touched={touched.deliciousRate}
                  keyboardType='decimal-pad'
                  customStyle={[styles.rate, {marginRight: 10}]}
                />
                <FormattedTextInput
                  label='Spicy Rate'
                  placeholder='0.0 - 5.0'
                  value={values.spicyRate}
                  onChangeText={handleChange('spicyRate')}
                  error={errors.spicyRate}
                  touched={touched.spicyRate}
                  keyboardType='decimal-pad'
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
    backgroundColor: Colors.backgroundColor,
    padding: 12,
    paddingTop: 12,
    marginVertical: 8,
    borderRadius: 6
  },
  errorText: {
    color: Colors.primaryColor,
    marginTop: -8,
    marginBottom: 8
  }
})

export default AddSpicyItemForm