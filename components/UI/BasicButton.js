import { Pressable, StyleSheet, Text } from "react-native"
import { Colors } from "../../constants/colors"

const BasicButton = ({onPress, title}) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    minWidth: 300,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 4,
    marginVertical: 8,
    backgroundColor: Colors.primaryColor,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width:1, height:5},
    shadowRadius:2,
    borderRadius: 6
  },
  pressed: {
    opacity: 0.7
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.backgroundColor
  }
})

export default BasicButton