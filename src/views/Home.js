import { View, Text } from 'react-native'
import React from 'react'

const Home = (props) => {
  return (
    <View>
      <Text onPress={() => props.navigation.navigate('Login')} style={{marginBottom: 50}}>
        点击弹出登录页面
      </Text>
      <Text onPress={() => props.navigation.navigate('Person')} style={{marginBottom: 50}}>
        点击弹出资料页面
      </Text>
      <Text onPress={() => props.navigation.navigate('Publish') }>
        点击弹出发表动态页面
      </Text>
      <Text onPress={() => props.navigation.navigate('Heritage_Details')}>
        点击弹出文物详情页面
      </Text>
      <ScrollView>
        {
          arr.map(item => {
            return (
              // eslint-disable-next-line react/jsx-key
              <ListItem name={item.name} navigation={props.navigation} />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default Home
