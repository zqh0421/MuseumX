import { View, Text, Pressable } from 'react-native'
const ErrorContent = ({ onPressRefresh }) => {

  return (
    <View
      style={[{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }]}
    >
      <Pressable
        onPress={onPressRefresh}
        style={{
          width: 150,
          height: 50,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: '#ffdcb2',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={[{
            color: '#ffdcb2',
            fontSize: 18
          }]}
        >刷新重试</Text>
      </Pressable>
      <Text style={{ color: 'white', marginTop: 15 }}>
        加载失败，请刷新重试~
      </Text>
    </View>
  )
}

export default ErrorContent