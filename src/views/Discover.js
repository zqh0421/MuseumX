import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { like } from '../api/discover/likeInterface'
import { allNew } from '../api/discover/newInterface'
import { mylike } from '../api/mylike'
import { allPopular } from '../api/discover/popularInterface'
import ErrorContent from '../components/ErrorContent'
import EmptyContent from '../components/EmptyContent'
import RefreshingContent from '../components/RefreshingContent'
import Waterfall from '../components/Waterfall'

const Discover = (props) => {
  const [togglePopular, setTogglePopular] = useState(false)
  const [toggleStyle, setToggleStyle] = useState([styles.toggleSelected])
  const [toggleHotColor, setToggleHotColor] = useState({ color: '#ccc' })
  const [toggleNewColor, setToggleNewColor] = useState({ color: '#333' })
  const [listData, setListData] = useState([]) // 存储当前显示的数据列表
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误
  const [myLike, setMyLike] = useState([])
  useEffect(() => {
    // 当toggleNew为false，显示“热门”内容；否则显示“最新”内容。
    setIsRefreshing(true)
    setIsError(false)
    getData()
      .then((userData) => {
        if (userData) {
          mylike(userData.data)
            .then((res) => {
              if (res.code === 0) {
                // 数据获取成功
                // console.log('profile-res:')
                // console.log(res.data.data)
                res &&
                  res.data &&
                  res.data.data &&
                  setMyLike(res.data.data)
                if (!togglePopular) {
                  loadDataNew()
                  setToggleStyle(styles.toggleSelected)
                  setToggleNewColor({ color: '#ccc' })
                  setToggleHotColor({ color: '#333' })
                } else {
                  loadDataPopular()
                  setToggleStyle([styles.toggleSelected, styles.togglePopular])
                  setToggleNewColor({ color: '#333' })
                  setToggleHotColor({ color: '#ccc' })
                }
                setIsRefreshing(false)
              } else {
                // 获取失败
                setIsRefreshing(false)
                setIsError(true)
              }
            })
            .catch((err) => {
              setIsRefreshing(false)
              setIsError(true)
              alert(err)
            })
        } else {
          if (!togglePopular) {
            setToggleStyle(styles.toggleSelected)
            setToggleNewColor({ color: '#ccc' })
            setToggleHotColor({ color: '#333' })
          } else {
            setToggleStyle([styles.toggleSelected, styles.togglePopular])
            setToggleNewColor({ color: '#333' })
            setToggleHotColor({ color: '#ccc' })
          }
        }
      })
      .catch((err) => {
        console.log(err)
        setIsError(true)
        setIsRefreshing(false)
      })
  }, [togglePopular])

  const loadDataNew = () => {
    allNew(1, 30)
      .then((res) => {
        if (res.code === 0) {
          // 数据获取成功
          // console.log('discover-res:')
          // console.log(res.data.data)
          setListData(res.data.data.records)
        } else {
          // 获取失败
          setIsError(true)
          setListData([])
        }
      })
      .catch((err) => {
        setIsError(true)
        setListData([])
        alert(err)
      })
  }

  useEffect(() => {
    setIsRefreshing(false)
  }, [listData])

  const loadDataPopular = () => {
    allPopular(1, 30)
      .then((res) => {
        if (res.code === 0) {
          // 数据获取成功
          // console.log('discover-res:')
          // console.log(res.data.data)
          setListData(res.data.data.records)
        } else {
          // 获取失败
          setIsError(true)
          setListData([])
        }
      })
      .catch((err) => {
        setIsError(true)
        setListData([])
        alert(err)
      })
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }

  const initialize = () => {
    setIsError(false)
    setIsRefreshing(true)
    getData()
      .then((userData) => {
        // console.log(userData.data, 'userData')
        if (userData) {
          mylike(userData.data)
            .then((res) => {
              if (res.code === 0) {
                // 数据获取成功
                // console.log('profile-res:')
                // console.log(res.data.data)
                res &&
                  res.data &&
                  res.data.data &&
                  setMyLike(res.data.data)
                loadDataNew() // TODO
              } else {
                // 获取失败
                setIsRefreshing(false)
                setIsError(true)
              }
            })
            .catch((err) => {
              setIsRefreshing(false)
              setIsError(true)
              alert(err)
            })
        } else {
          loadDataNew()
        }
      })
      .catch((err) => {
        console.log(err)
        setIsError(true)
        setIsRefreshing(false)
      })
  }

  useEffect(() => {
    // 页面初始化
    initialize()
  }, [])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      initialize()
    })
    return unsubscribe
  }, [props.navigation])

  const onPressPublish = () => {
    getData()
      .then((userData) => {
        // console.log(userData)
        if (userData) {
          props.navigation.navigate('Publish')
        } else {
          props.navigation.navigate('Login')
        }
      })
      .catch((err) => {
        props.navigation.navigate('Login')
      })
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#727480', '#454653']} style={styles.background}>
        <Text style={styles.title}>发现</Text>
        <Pressable
          style={styles.toggle}
          onPress={() => setTogglePopular(!togglePopular)}
        >
          <View style={toggleStyle}></View>
          <Text style={toggleHotColor}>最新</Text>
          <Text style={toggleNewColor}>热门</Text>
        </Pressable>
        {!isError && !isRefreshing && listData && listData.length > 0 && (
          <Waterfall
            style={{
              transform: [{ translateY: 75 }],
              maxHeight: Dimensions.get('window').height - 175
            }}
            data={listData}
            navigation={props.navigation}
            myLike={myLike}
          />
        )}
        {!isError && isRefreshing && (
          <RefreshingContent
            onPressRefresh={() =>
              !togglePopular ? loadDataNew() : loadDataPopular()
            }
          />
        )}
        {!isError && !isRefreshing && (!listData || listData.length <= 0) && (
          <EmptyContent />
        )}
        {isError && <ErrorContent />}
        <TouchableOpacity style={styles.publish} onPress={onPressPublish}>
          <Text style={{ fontSize: 24, color: '#3A3A3A' }}>+</Text>
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
  background: {
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    flex: 1
  },
  title: {
    fontSize: 28,
    color: '#fff',
    position: 'absolute',
    top: 20,
    left: 20
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
    alignItems: 'center'
  },
  toggleSelected: {
    width: 50,
    height: 23,
    backgroundColor: '#f1ecfb',
    position: 'absolute',
    top: 1,
    left: 1,
    borderRadius: 25
  },
  togglePopular: {
    transform: [{ translateX: 48 }]
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
    right: 20
  }
})

export default Discover
