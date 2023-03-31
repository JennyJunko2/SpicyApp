import { Text, TextInput, View, StyleSheet } from 'react-native'


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
      <Text>{label}</Text>
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
  },
  multiline: {
    minHeight: 60
  }
})

export default FormattedTextInput