import { Text, TextInput, View, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'


const FormattedTextInput = ({
  label,
  placeholder = '',
  value,
  onChangeText,
  error,
  touched,
  multiline = false,
  customStyle
}) => {

  return (
    <View style={customStyle}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        style={[styles.textInput, multiline && styles.multiline]}
      />
      {error && touched ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null }
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.backgroundColor,
    padding: 12,
    paddingTop: 12,
    marginVertical: 8,
    borderRadius: 6,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height:1},
    shadowRadius: 2,
    color: Colors.textColor
  },
  errorText: {
    color: Colors.primaryColor,
    marginTop: -8,
    marginBottom: 8
  },
  multiline: {
    minHeight: 60
  },
  label: {
    color: Colors.textColor
  }
})

export default FormattedTextInput