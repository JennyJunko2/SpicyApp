import { Pressable, Text, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'
// import { Colors } from "../../constants/colors"

const OutlinedButton = ({children, onPress, icon}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons
        name={icon}
        color={'blue'}
        size={18}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue'
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 6
  },
  text: {
    color: 'blue'
  }
})

export default OutlinedButton