import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
const EmptyContent = (props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}
    >
      <AntDesign name="frowno" color="white" size={50} />
      <Text style={props.style ? { color: 'white', marginTop: 15 } : [{ color: 'white', marginTop: 15 }, props.style]}>暂无内容~</Text>
    </View>
  )
}

export default EmptyContent