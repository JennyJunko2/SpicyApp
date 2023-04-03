import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text } from "react-native"
import { Colors } from "../../constants/colors"

const OutlinedButton = ({children, onPress, icon}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons
        name={icon}
        color={Colors.primaryColor}
        size={18}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 6
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 6
  },
  text: {
    color: Colors.primaryColor
  }
})

export default OutlinedButton