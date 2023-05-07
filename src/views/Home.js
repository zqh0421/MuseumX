import { View, Text } from 'react-native'
import React from 'react'

const Home = (props) => {
  return (
    <View>
      <Text onPress={() => props.navigation.navigate('Login')}>
        点击弹出登录页面
      </Text>
      <Text onPress={() => props.navigation.navigate('Heritage_Details')}>
        文物详情页面
      </Text>
      <Text onPress={() => props.navigation.navigate('Heritage_Discover')}>
        发现动态详情页
      </Text>
    </View>
  )
}

export default Home
