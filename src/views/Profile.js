import { View, Text ,StyleSheet, Pressable, ScrollView, VirtualizedList } from 'react-native'
import { useEffect, useState } from 'react'
import { TabActions } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import FlowListItem from '../components/FlowListItem'
import { classic } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler'
const Profile = (props) => {
  const [isLogin, setIsLogin] = useState(true)
  const [toggleSelected, setToggleSelected] = useState('0')
  const [toggleBarStyle, setToggleBarStyle] = useState(styles.toggleBar)
  const arr = [
    {
      title: 'title1',
      username: 'user11111111123123132111111',
      time: '2023-05-04',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      time: '2023-05-03',
      likes: 2,
    },
    {
      title: 'title3',
      username: 'user3',
      time: '2023-04-04',
      likes: 255,
    },
    {
      title: 'title1',
      username: 'user11111111123123132111111',
      time: '2023-05-04',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      time: '2023-05-03',
      likes: 2,
    },
    {
      title: 'title3',
      username: 'user3',
      time: '2023-04-04',
      likes: 255,
    },
    {
      title: 'title1',
      username: 'user11111111123123132111111',
      time: '2023-05-04',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      time: '2023-05-03',
      likes: 2,
    },
    {
      title: 'title3',
      username: 'user3',
      time: '2023-04-04',
      likes: 255,
    },
    {
      title: 'title1',
      username: 'user11111111123123132111111',
      time: '2023-05-04',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      time: '2023-05-03',
      likes: 2,
    },
    {
      title: 'title3',
      username: 'user3',
      time: '2023-04-04',
      likes: 255,
    },

  ]
  const onPressEdit = () => {
    alert('编辑资料！')
  }
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

  useEffect(() => {
    switch (toggleSelected) {
      case '0':
        setToggleBarStyle(styles.toggleBar)
        break
      case '1':
        setToggleBarStyle([styles.toggleBar, styles.toggleBar1])
        break
      case '2':
        setToggleBarStyle([styles.toggleBar, styles.toggleBar2])
        break
      default:
        break
    }
  }, [toggleSelected])

  const onPressLike = () => {
    setToggleSelected('0')
  }

  const onPressCollect = () => {
    setToggleSelected('1')
  }

  const onPressActivity = () => {
    setToggleSelected('2')
  }
  
  return (
    <View style={styles.container}>
      <LinearGradient 
        colors = {['#727480','#454653']}
        style={styles.backgroud}>
        <Text style={styles.image}></Text>
        <Text style={styles.nickname}>昵称</Text>
        <Text style={styles.userid}>ID: zheshiid</Text>
        <Pressable style={styles.edit} onPress={onPressEdit}>
          <Text></Text>
        </Pressable>
        <View style={styles.toggle}>
          <Pressable onPress={onPressLike}>
            <Text style={styles.toggleNumber}>123</Text>
            <Text style={styles.toggleTitle}>喜  欢</Text>
          </Pressable>
          <Pressable onPress={onPressCollect}>
            <Text style={styles.toggleNumber}>123</Text>
            <Text style={styles.toggleTitle}>收  藏</Text>
          </Pressable>
          <Pressable onPress={onPressActivity}>
            <Text style={styles.toggleNumber}>123</Text>
            <Text style={styles.toggleTitle}>动  态</Text>
          </Pressable>
        </View>
        <View style={toggleBarStyle}></View>
        <View>
          <View style={styles.list} >
            {
              arr.map((item, index) => {
                if(index % 2 === 0)
                  return (
                    <FlowListItem title={item.title} time={item.time} username={item.username} likes={item.likes} />
                  )
              })
            }
          </View>
          <View style={styles.list2}>
            {
              arr.map((item, index) => {
                if(index % 2 === 1)
                  return (
                    <FlowListItem title={item.title} time={item.time} username={item.username} likes={item.likes} />
                  )
              })
            }
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    // alignItems: 'center',
    flex: 1 // 布局
  },
  backgroud:{
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    flex:1
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth:2,
    borderColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
    position: 'absolute',
    top: 70,
    left: 35,
  },
  nickname:{
    fontSize: 23,
    color: '#fff',
    position: 'absolute',
    top: 85,
    left: 135,
  },
  userid: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    top: 120,
    left: 135,
  },
  edit: {
    width: 40,
    height: 25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
    position: 'absolute',
    top: 85,
    right: 30,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#454653',
    position: 'absolute',
    top: 170,
    width: 360,
    height: 65,
    paddingTop: 13,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'space-around',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  toggleTitle:{
    fontSize: 10,
    color: '#fff',
    textAlign: 'center'
  },
  toggleNumber:{
    fontSize: 17,
    color: '#fff',
    textAlign: 'center'
  },
  list: {
    position: 'absolute',
    
    top: 250,
    left: 0,
    width: '48%',
    flexWrap: 'wrap',
  },
  list2: {
    position: 'absolute',
    top: 250,
    right: 0,
    width: '48%',
    flexWrap: 'wrap',
  },
  toggleBar: {
    width: 30,
    height: 5,
    backgroundColor: '#CC6666',
    borderRadius: 5,
    position: 'absolute',
    top: 225,
    left: 72,
  },
  toggleBar1: {
    left: 166
  },
  toggleBar2: {
    left: 260
  }
})

export default Profile
