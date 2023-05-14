import { View, Text } from 'react-native'

const RefreshingContent = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}
    >
      <Text style={{ color: 'white' }}>加载中...</Text>
    </View>
  )
}

export default RefreshingContent
