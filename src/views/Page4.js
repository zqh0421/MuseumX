import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { TabActions } from '@react-navigation/native'

const Page4 = (props) => {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('tabPress', (e) => {
      // 试图通过点击下方导航栏进入本页面时，执行下面的语句
      e.preventDefault() // 阻止默认的行为（这里对应跳转进入该页面

      // if (!isLogin) {
      //   // 没有登录 ...
      //   // alert('请先登录')
      //   props.navigation.navigate('Login') // 跳转登录页面
      // } else {
      //   // 已登录，正常进入该页面
      //   const jumpToAction = TabActions.jumpTo('Page4')
      //   navigation.dispatch(jumpToAction)
      // }
    })
    return unsubscribe
  }, [props.navigation])
  return (
    <View>
      <Text>Page4</Text>
    </View>
  )
}

export default Page4
