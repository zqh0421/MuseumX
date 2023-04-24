import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { TabActions } from '@react-navigation/native'

const Profile = (props) => {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    // 打开应用后首次进入该页面时，执行如下操作
    // 添加这一段是因为后面包含unsubscribe的代码在第一次点击进入页面时，仅绑定事件，不生效
    if (!isLogin) {
      // 没有登录 ...
      // alert('请先登录')
      props.navigation.navigate('Login') // 跳转登录页面
    }
  }, [])
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('tabPress', (e) => {
      // 试图通过点击下方导航栏进入本页面时，执行下面的语句
      e.preventDefault() // 阻止默认行为，在下方重新定义
      if (!isLogin) {
        // 没有登录
        // alert('请先登录')
        props.navigation.navigate('Login') // 跳转登录页面
      } else {
        // 已登录，正常进入该页面
        const jumpToAction = TabActions.jumpTo('Profile')
        props.navigation.dispatch(jumpToAction)
      }
    })
    return unsubscribe
  }, [props.navigation])
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile
