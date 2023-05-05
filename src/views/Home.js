import { View, Text } from 'react-native'
import React from 'react'

const Home = (props) => {
  return (
    <View>
      <Text onPress={() => props.navigation.navigate('Login')}>
        点击弹出登录页面
      </Text>
    </View>
  )
}

export default Home
