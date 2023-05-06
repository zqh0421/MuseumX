import { View, Text ,StyleSheet, Pressable, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { TabActions } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import FlowListItem from '../components/FlowListItem'
import WaterfallFlow from 'react-native-waterfall-flow'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Profile = (props) => {
  const [toggleSelected, setToggleSelected] = useState('0')
  const [toggleBar0Style, setToggleBar0Style] = useState(styles.toggleBar)
  const [toggleBar1Style, setToggleBar1Style] = useState([styles.toggleBar, { opacity: 0 }])
  const [toggleBar2Style, setToggleBar2Style] = useState([styles.toggleBar, { opacity: 0 }])
  const [listData, setListData] = useState([]) // 存储当前显示的数据列表
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误
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
    logOut()
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // error reading value
    }
  }

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('userData')
      props.navigation.navigate('Home')
    } catch(e) {
      // remove error
    }
  }

  const loadData = () => {
    // 已登录，加载数据
    setIsError(false)
    setIsRefreshing(true)
    setTimeout(() => {
      // 加载成功

      //  加载失败
      setIsError(true)
      setIsRefreshing(false)
      setListData([])
    }, 800)
  }

  useEffect(() => {
    // 打开应用后首次进入该页面时，执行如下操作
    // 添加这一段是因为后面包含unsubscribe的代码在第一次点击进入页面时，仅绑定事件，不生效
    getData().then(res => {
      console.log('res: ')
      console.log(res)
      if (res === undefined || res === null) {
        // 没有登录
        // alert('请先登录')
        props.navigation.navigate('Home')
        props.navigation.navigate('Login') // 跳转登录页面
      } else {
        // 已登录，加载数据
        loadData()
      }
    }).catch(err => {
      // error
    })
  }, [])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('tabPress', (e) => {
      // 试图通过点击下方导航栏进入本页面时，执行下面的语句
      e.preventDefault() // 阻止默认行为，在下方重新定义
      getData().then(res => {
        console.log('res: ')
        console.log(res)
        if (res === undefined || res === null) {
          // 没有登录
          // alert('请先登录')
          props.navigation.navigate('Login') // 跳转登录页面
        } else {
          // 已登录，正常进入该页面
          const jumpToAction = TabActions.jumpTo('Profile')
          props.navigation.dispatch(jumpToAction)
          // 已登录，加载数据
          loadData()
        }
      }).catch(err => {
        // error
      })
    })
    return unsubscribe
  }, [props.navigation])

  useEffect(() => {
    switch (toggleSelected) {
    case '0':
      setToggleBar0Style([styles.toggleBar])
      setToggleBar1Style([styles.toggleBar, { opacity: 0 }])
      setToggleBar2Style([styles.toggleBar, { opacity: 0 }])
      break
    case '1':
      setToggleBar0Style([styles.toggleBar, { opacity: 0 }])
      setToggleBar1Style([styles.toggleBar])
      setToggleBar2Style([styles.toggleBar, { opacity: 0 }])
      break
    case '2':
      setToggleBar0Style([styles.toggleBar, { opacity: 0 }])
      setToggleBar1Style([styles.toggleBar, { opacity: 0 }])
      setToggleBar2Style([styles.toggleBar])
      break
    default:
      break
    }
  }, [toggleSelected])

  const onPressLike = () => {
    setToggleSelected('0')
    loadData()
  }

  const onPressCollect = () => {
    setToggleSelected('1')
    loadData()
  }

  const onPressActivity = () => {
    setToggleSelected('2')
    loadData()
  }

  const onPressRefresh = () => {
    loadData()
  }

  const EmptyContent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          transform: [{ translateY: Dimensions.get('window').height / 2}]
        }}
      >
        <AntDesign name='frowno' color='white' size={50}/>
        <Text style={{ color: 'white', marginTop: 15 }}>暂无内容~</Text>
      </View>
    )
  }

  const RefreshingContent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          transform: [{ translateY: Dimensions.get('window').height / 2}]
        }}
      >
        <Text style={{ color: 'white' }}>加载中...</Text>
      </View>
    )
  }

  const ErrorContent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          transform: [{ translateY: Dimensions.get('window').height / 2}]
        }}
      >
        <Pressable
          onPress={onPressRefresh}
          style={{
            width: 150,
            height: 50,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: 'yellow',
              fontSize: 18,
            }}
          >刷新重试</Text>
        </Pressable>
        <Text style={{ color: 'white', marginTop: 15 }}>加载失败，请刷新重试~</Text>
      </View>
    )
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
          <MaterialCommunityIcons name="account-edit" color="white" size={20} />
        </Pressable>
        <View style={styles.toggle}>
          <Pressable onPress={onPressLike} style={styles.toggleItem}>
            <Text style={styles.toggleNumber}>3</Text>
            <Text style={styles.toggleTitle}>喜  欢</Text>
            <View style={toggleBar0Style}></View>
          </Pressable>
          <Pressable onPress={onPressCollect} style={styles.toggleItem}>
            <Text style={styles.toggleNumber}>123</Text>
            <Text style={styles.toggleTitle}>收  藏</Text>
            <View style={toggleBar1Style}></View>
          </Pressable>
          <Pressable onPress={onPressActivity} style={styles.toggleItem}>
            <Text style={styles.toggleNumber}>123</Text>
            <Text style={styles.toggleTitle}>动  态</Text>
            <View style={toggleBar2Style}></View>
          </Pressable>
        </View>
        {
          !isError && !isRefreshing && listData.length > 0 &&
          <WaterfallFlow
            style={{
              transform: [{ translateY: 250 }],
              maxHeight: Dimensions.get('window').height - 350,
            }}
            contentContainerStyle={{
              justifyContent: 'space-evenly',
              paddingLeft: '2%',
              paddingRight: '2%'
            }}
            data={listData}
            numColumns={2}
            renderItem={({ item, index, columnIndex }) =>
              <FlowListItem
                title={item.title}
                time={item.time}
                username={item.username}
                likes={item.likes}
              />
            }
          />
        }
        { !isError && isRefreshing && <RefreshingContent/> }
        { !isError && !isRefreshing && listData.length <= 0 && <EmptyContent/> }
        { isError && <ErrorContent/> }
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
    right: '8%',
    borderWidth: 1,
    borderColor: 'white',

  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#454653',
    position: 'absolute',
    top: 170,
    width: '100%',
    height: 65,
    paddingTop: 5,
    paddingLeft: '20%',
    paddingRight: '20%',
    justifyContent: 'space-between',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  toggleItem: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:'center',
  },
  toggleTitle:{
    width: '100%',
    fontSize: 10,
    color: '#fff',
    textAlign: 'center'
  },
  toggleNumber:{
    width: '100%',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  list: {
    // position: 'absolute',
    // top: 250,
    // left: 0,
    // width: '48%',
    // flexWrap: 'wrap',
  },
  list2: {
    position: 'absolute',
    top: 250,
    right: 0,
    width: '48%',
    flexWrap: 'wrap',
  },
  toggleBar: {
    width: 35,
    height: 5,
    marginTop: 2,
    backgroundColor: '#CC6666',
    borderRadius: 5,
    // position: 'absolute',
    // top: 225,
    // left: '20%',
  },
  // toggleBar1: {
  //   left: '47%',
  // },
  // toggleBar2: {
  //   left: '73%'
  // }
})

export default Profile
