import { View } from 'react-native'
import React from 'react'

const Page1 = (props) => {
  return (
    <View>
      <a onClick={() => props.navigation.navigate('Login')}>点击弹出登录页面</a>
    </View>
  )
}

export default Page1
