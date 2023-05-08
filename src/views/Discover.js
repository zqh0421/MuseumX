import { View, Text, StyleSheet, Pressable, Dimensions, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import WaterfallFlow from 'react-native-waterfall-flow'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FlowListItem from '../components/FlowListItem'
const Discover = (props) => {
  const [ toggleNew, setToggleNew ] = useState(false)
  const [ toggleStyle, setToggleStyle ] = useState(styles.toggleSelected)
  const [ toggleHotColor, setToggleHotColor] = useState({ color: '#333'})
  const [ toggleNewColor, setToggleNewColor] = useState({ color: '#ccc'})
  const [listData, setListData] = useState([]) // 存储当前显示的数据列表
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误
  const arr = [
    {
      title: '（一）博物馆博物馆博物馆博物馆博物馆博物馆',
      username: 'user123456',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      likes: 255,
    },
    {
      title: 'title3',
      username: 'user3',
      likes: 255,
    },
    {
      title: 'title1',
      username: 'user1',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      likes: 255,
    },
    {
      title: 'title3',
      username: 'user3',
      likes: 255,
    },
    {
      title: 'title1',
      username: 'user1',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      likes: 2,
    },
    {
      title: 'title3',
      username: 'user3',
      likes: 255,
    },
    {
      title: 'title1',
      username: 'user1',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      likes: 2,
    },
    {
      title: 'title3',
      username: 'user3',
      likes: 255,
    },

  ]
  useEffect(() => { // 当toggleNew为false，显示“热门”内容；否则显示“最新”内容。
    // alert(toggleNew)
    if (toggleNew) {
      setToggleStyle([styles.toggleSelected, styles.toggleNew])
      setToggleNewColor({ color: '#333'})
      setToggleHotColor({ color: '#ccc'})
    } else {
      setToggleStyle(styles.toggleSelected)
      setToggleNewColor({ color: '#ccc'})
      setToggleHotColor({ color: '#333'})
    }
  }, [toggleNew])


  useEffect(() => {
    loadData()
  }, [])

  const onPressToggle = () => { // 点击 “热门/最新” 按钮触发事件。
    setToggleNew(!toggleNew)
    loadData()
  }

  const onPressPublish = () => {
    alert('发布！')
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // error reading value
    }
  }

  const loadData = () => {
    setIsError(false)
    setIsRefreshing(true)
    setTimeout(() => {
      // 加载成功
      setListData(arr)
      setIsRefreshing(false)
      //  加载失败
      // setIsError(true)
      // setIsRefreshing(false)
      // setListData([])
    }, 800)
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
            borderColor: '#ffdcb2',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: '#ffdcb2',
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
        style={styles.background}>
        <Text style={styles.title}>发现</Text>
        <Pressable style={styles.toggle} onPress={onPressToggle}>
          <View style={toggleStyle}></View>
          <Text style={toggleHotColor}>热门</Text>
          <Text style={toggleNewColor}>最新</Text>
        </Pressable>
        {
          !isError && !isRefreshing && listData.length > 0 &&
          <WaterfallFlow
            style={{
              transform: [{ translateY: 75 }],
              maxHeight: Dimensions.get('window').height - 175,
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
        <TouchableOpacity
          style={styles.publish}
          onPress={onPressPublish}
        >
          <Text style={{ fontSize: 24, color: '#3A3A3A'}}>+</Text>
        </TouchableOpacity>
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
  background:{
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    flex:1
  },
  title: {
    fontSize: 28,
    color: '#fff',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#3a3a3a',
    position: 'absolute',
    top: 35,
    right: 20,
    width: 100,
    height: 25,
    justifyContent: 'space-around',
    borderRadius: 25,
    alignItems: 'center',
  },
  toggleSelected: {
    width: 50,
    height: 23,
    backgroundColor: '#f1ecfb',
    position: 'absolute',
    top: 1,
    left: 1,
    borderRadius: 25,
  },
  toggleNew: {
    transform: [{translateX: 48}]
  },
  publish: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1ecfb',
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
})

export default Discover
