import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
  Image
} from 'react-native'
import { useEffect, useState } from 'react'
import { TabActions } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Surface, IconButton, MD3Colors } from 'react-native-paper'
import WaterfallFlow from 'react-native-waterfall-flow'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorContent from '../components/ErrorContent'
import EmptyContent from '../components/EmptyContent'
import RefreshingContent from '../components/RefreshingContent'
import HomeListItem from '../components/HomeListItem'
import FlowListItem from '../components/FlowListItem'
import { mylike } from '../api/mylike'
import { myCollect } from '../api/myCollect'
import { myrelease } from '../api/myreleaseInterface'
import { allNew } from '../api/discover/newInterface'
import { current } from '../api/currentUserInterface'

const Profile = (props) => {
  const [id, setId] = useState('')
  const [username, setUsername] = useState('momo')
  const [avatarUrl, setAvatarUrl] = useState()
  const [num0, setNum0] = useState(0)
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [toggleSelected, setToggleSelected] = useState('0')
  const [toggleBar0Style, setToggleBar0Style] = useState(styles.toggleBar)
  const [likeSet, setLikeSet] = useState([])
  const [collectSet, setCollectSet] = useState([])
  const [toggleBar1Style, setToggleBar1Style] = useState([
    styles.toggleBar,
    { opacity: 0 }
  ])
  const [toggleBar2Style, setToggleBar2Style] = useState([
    styles.toggleBar,
    { opacity: 0 }
  ])
  const [listData, setListData] = useState([]) // 存储当前显示的数据列表
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误

  const onPressEdit = () => {
    props.navigation.navigate('Person')
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }

  const loadDataMylike = async () => {
    setIsError(false)
    setIsRefreshing(true)
    try {
      const userData = await AsyncStorage.getItem('userData')
      if (userData) {
        mylike(JSON.parse(userData).data)
          .then((res) => {
            if (res.code === 0) {
              // 数据获取成功
              console.log('profile-res:')
              console.log(res.data.data)
              let temp = []
              res &&
                res.data &&
                res.data.data &&
                res.data.data.forEach((item) => {
                  console.log(item.id)
                  temp = [...temp, item.id]
                })
              setLikeSet(temp)
              setListData(res.data.data)
              setNum0(res.data.data?.length || 0)
              setIsRefreshing(false)
            } else {
              // 获取失败
              setIsError(true)
              setIsRefreshing(false)
              setListData([])
            }
          })
          .catch((err) => {
            setIsError(true)
            setIsRefreshing(false)
            setListData([])
            alert(err)
          })
      } else {
        props.navigation.navigate('Login')
      }
    } catch {
      alert('err')
    }
  }

  const loadDataMyCollect = async () => {
    setIsError(false)
    setIsRefreshing(true)
    try {
      const userData = await AsyncStorage.getItem('userData')
      if (userData) {
        myCollect(JSON.parse(userData).data)
          .then((res) => {
            console.log(res)
            if (res.code === 0) {
              // 数据获取成功
              console.log('profile-res:')
              console.log(res.data.data)
              if (res.data.data === '收藏为空') {
                setCollectSet([])
                setListData([])
              } else {
                let temp = []
                res &&
                  res.data &&
                  res.data.data &&
                  res.data.data !== '收藏为空' &&
                  res.data.data.forEach((item) => {
                    console.log(item.id)
                    temp = [...temp, item.id]
                  })
                setCollectSet(temp)
                setListData(res.data.data)
              }
              setIsRefreshing(false)
            } else {
              // 获取失败
              setIsError(true)
              setIsRefreshing(false)
              setListData([])
            }
          })
          .catch((err) => {
            setIsError(true)
            setIsRefreshing(false)
            setListData([])
            alert(err)
          })
      } else {
        props.navigation.navigate('Login')
      }
    } catch {
      alert('err')
    }
  }

  const loadDataMyrelease = async () => {
    setIsError(false)
    setIsRefreshing(true)
    try {
      const userData = await AsyncStorage.getItem('userData')
      if (userData) {
        myrelease(JSON.parse(userData).data)
          .then((res) => {
            if (res.code === 0) {
              // 数据获取成功
              console.log('profile-res:')
              console.log(res.data.data)
              setListData(res.data.data)
              setNum2(res.data.data?.length || 0)
              setIsRefreshing(false)
            } else {
              // 获取失败
              setIsError(true)
              setIsRefreshing(false)
              setListData([])
            }
          })
          .catch((err) => {
            setIsError(true)
            setIsRefreshing(false)
            setListData([])
            alert(err)
          })
      } else {
        props.navigation.navigate('Login')
      }
    } catch {
      alert('err')
    }
  }

  useEffect(() => {
    // 打开应用后首次进入该页面时，执行如下操作
    // 添加这一段是因为后面包含unsubscribe的代码在第一次点击进入页面时，仅绑定事件，不生效
    getData()
      .then((res) => {
        console.log('res: ')
        console.log(res)
        if (res === undefined || res === null) {
          // 没有登录
          // alert('请先登录')
          props.navigation.navigate('Home')
          props.navigation.navigate('Login') // 跳转登录页面
        } else {
          // 已登录，加载数据
          console.log('currentUser')
          console.log(res)
          current(res.data).then((resp) => {
            console.log('current-res:')
            console.log(resp.data)
            setId(resp.data.userAccount)
            setUsername(resp.data.username || 'momo')
            setAvatarUrl(resp.data.avatarUrl)
          })
          loadDataMylike()
        }
      })
      .catch((err) => {
        // error
      })
  }, [])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('tabPress', (e) => {
      // 试图通过点击下方导航栏进入本页面时，执行下面的语句
      e.preventDefault() // 阻止默认行为，在下方重新定义
      getData()
        .then((res) => {
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
            console.log('currentUser')
            current(res.data).then((resp) => {
              console.log('current-res:')
              console.log(resp.data)
              setId(resp.data.userAccount)
              setUsername(resp.data.username || 'momo')
              setAvatarUrl(resp.data.avatarUrl)
            })
            // 已登录，加载数据
            setToggleSelected('0')
            loadDataMylike()
          }
        })
        .catch((err) => {
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

  useEffect(() => {
    switch (toggleSelected) {
    case '0':
      setNum0(listData?.length || 0)
      break
    case '1':
      setNum1(listData?.length || 0)
      break
    case '2':
      setNum2(listData?.length || 0)
    }
  }, [listData])

  const onPressLike = () => {
    setToggleSelected('0')
    loadDataMylike()
  }

  const onPressCollect = () => {
    setToggleSelected('1')
    loadDataMyCollect()
  }

  const onPressActivity = () => {
    setToggleSelected('2')
    loadDataMyrelease()
  }

  const onPressRefresh = () => {
    if (toggleSelected === '0') {
      loadDataMylike()
    } else if (toggleSelected === '1') {
      loadDataMyCollect()
    } else {
      loadDataMyrelease()
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#727480', '#454653']} style={styles.background}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
            marginLeft: '8%',
            marginRight: '8%',
            marginBottom: 30,
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            {avatarUrl && (
              <Image style={styles.image} source={{ uri: avatarUrl }} />
            )}
            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
              <Text style={styles.nickname}>{username}</Text>
              <Text style={styles.userid}>ID: {id}</Text>
            </View>
          </View>
          <Pressable
            style={[styles.edit, { alignSelf: 'center' }]}
            onPress={onPressEdit}
          >
            <MaterialCommunityIcons
              name="account-edit"
              color="white"
              size={20}
            />
          </Pressable>
        </View>
        <View style={styles.toggle}>
          <Pressable onPress={onPressLike} style={styles.toggleItem}>
            <Text style={styles.toggleNumber}>{num0}</Text>
            <Text style={styles.toggleTitle}>喜 欢</Text>
            <View style={toggleBar0Style}></View>
          </Pressable>
          <Pressable onPress={onPressCollect} style={styles.toggleItem}>
            <Text style={styles.toggleNumber}>{num1}</Text>
            <Text style={styles.toggleTitle}>收 藏</Text>
            <View style={toggleBar1Style}></View>
          </Pressable>
          <Pressable onPress={onPressActivity} style={styles.toggleItem}>
            <Text style={styles.toggleNumber}>{num2}</Text>
            <Text style={styles.toggleTitle}>动 态</Text>
            <View style={toggleBar2Style}></View>
          </Pressable>
        </View>
        {!isError &&
          !isRefreshing &&
          listData &&
          listData?.length > 0 &&
          (toggleSelected === '0' || toggleSelected === '2') && (
          <WaterfallFlow
            style={{ paddingTop: 10 }}
            contentContainerStyle={{
              paddingLeft: '2%',
              paddingRight: '2%'
            }}
            data={listData}
            numColumns={2}
            renderItem={({ item, index, columnIndex }) => (
              <FlowListItem
                ket={item.id}
                item={item}
                likeSet={likeSet}
                navigation={props.navigation}
              />
            )}
          />
        )}
        {!isError &&
          !isRefreshing &&
          listData &&
          listData?.length > 0 &&
          toggleSelected === '1' && (
          <ScrollView
            style={{
              height: Dimensions.get('window').height - 305,
              paddingLeft: '2%',
              paddingRight: '2%',
              paddingTop: 10
            }}
          >
            {listData.map((item) => {
              return (
              // eslint-disable-next-line react/jsx-key
                <HomeListItem
                  key={item.id}
                  item={item}
                  navigation={props.navigation}
                  collectSet={collectSet}
                />
              )
            })}
          </ScrollView>
        )}
        {!isError && isRefreshing && <RefreshingContent />}
        {!isError && !isRefreshing && (!listData || listData?.length <= 0) && (
          <EmptyContent />
        )}
        {isError && <ErrorContent onPressRefresh={() => onPressRefresh()} />}
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC'
    // position: 'absolute',
    // top: 70,
    // left: 35,
  },
  nickname: {
    fontSize: 23,
    color: '#fff'
    // position: 'absolute',
    // top: 85,
    // left: 135,
  },
  userid: {
    fontSize: 16,
    color: '#fff'
    // position: 'absolute',
    // top: 120,
    // left: 135,
  },
  edit: {
    width: 40,
    height: 25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#454653',
    // position: 'absolute',
    // top: 85,
    // right: '8%',
    borderWidth: 1,
    borderColor: 'white'
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#454653',
    width: '100%',
    height: 65,
    paddingTop: 5,
    paddingLeft: '20%',
    paddingRight: '20%',
    justifyContent: 'space-between',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  toggleItem: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  toggleTitle: {
    width: '100%',
    fontSize: 10,
    color: '#fff',
    textAlign: 'center'
  },
  toggleNumber: {
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
  toggleBar: {
    width: 35,
    height: 5,
    marginTop: 2,
    backgroundColor: '#CC6666',
    borderRadius: 5
    // position: 'absolute',
    // top: 225,
    // left: '20%',
  },
  surface: {
    padding: 10,
    height: 170,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image1: {
    width: 140,
    height: 140,
    right: 100,
    top: 60
  },
  text: {
    right: -30,
    top: -80,
    fontWeight: 'black',
    fontSize: 20
  },
  text_2: {
    top: -80,
    right: -20
  },
  button: {
    right: -100,
    hight: 20,
    width: 5,
    top: -25
  },
  num: {
    top: -60,
    right: -180,
    width: 100
  }
  // toggleBar1: {
  //   left: '47%',
  // },
  // toggleBar2: {
  //   left: '73%'
  // }
})

export default Profile
