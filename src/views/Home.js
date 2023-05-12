<<<<<<< HEAD
// import { View, Text } from 'react-native'
// import React from 'react'

// const Home = (props) => {
//   return (
//     <View>
//       <Text onPress={() => props.navigation.navigate('Login')} style={{marginBottom: 50}}>
//         点击弹出登录页面
//       </Text>
//       <Text onPress={() => props.navigation.navigate('Person')} style={{marginBottom: 50}}>
//         点击弹出资料页面
//       </Text>
//       <Text onPress={() => props.navigation.navigate('Publish') }>
//         点击弹出发表动态页面
//       </Text>
//     </View>

//   )
// }
// export default Home
import { View, Text,Image,StyleSheet, Pressable, ScrollView} from 'react-native'
import React , {useEffect, useState} from 'react'
import { Surface,IconButton,MD3Colors} from 'react-native-paper'
// import { ScrollView } from 'react-native-web'
// import * as React from 'react'

const ListItem = (props) => {
  const [color, setColor] = useState(props.isCollected ? MD3Colors.error60 : MD3Colors.error0)
  const [list, setList] = useState([]) // 列表数据初始状态
  useEffect(() => {
    // 获取后端数据
    // setList
  }, [])
  const onPressCollect = () => {
    // 1. 收藏按钮样式变化
    if (color === MD3Colors.error60) setColor(MD3Colors.error0)
    else if (color === MD3Colors.error0) setColor(MD3Colors.error60)
    // 2. 向后端发送请求，修改
  }

  const onPressItem = () => {
    props.navigation.navigate('Login')
  }
  return (
    <Pressable onPress={onPressItem}>
      <Surface style={styles.surface} elevation={4}>
        <Image style={styles.image} source={{ uri: 'https://picsum.photos/700' }}/>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text_2}>文物描述</Text>
        <View style={styles.button}>
          <IconButton
            icon="star"
            iconColor={color}
            size={20}
            onPress={onPressCollect}
          />
        </View>
        <Text style={styles.num}>num</Text>
      </Surface>
    </Pressable>
  )
}

const Home = (props) => {
  const arr = [
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
  ]
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
=======
import { View, Text,Image,StyleSheet, Pressable, ScrollView,Dimensions,} from 'react-native'
import React , {useEffect, useState} from 'react'
import { Surface,IconButton,MD3Colors} from 'react-native-paper'
import { Collect, Show, getMore } from '../api/HomeInterface'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import HomeListItem from '../components/HomeListItem'

const Home = (props) => {
  const [page, setpage]=useState(1)
  const [size, setsize]=useState(15)
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误
  const [list, setList] = useState([]) // 列表数据初始状态
  const[arr,setArr]=useState([])


  const RefreshingContent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <Text style={{ color: 'white' }}>加载中...</Text>
      </View>
    )
  }

  const EmptyContent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <AntDesign name="frowno" color="white" size={50} />
        <Text style={{ color: 'white', marginTop: 15 }}>暂无内容~</Text>
      </View>
    )
  }
  const loadData = () => {
    setIsError(false)
    setIsRefreshing(true)
    setTimeout(() => {
      // 加载成功
      setList(arr)
      setIsRefreshing(false)
      //  加载失败
      // setIsError(true)
      // setIsRefreshing(false)
      // setList([])
    }, 800)
  }

  const onPressRefresh = () => {
    loadData()
  }

  const ErrorContent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
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
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              color: '#ffdcb2',
              fontSize: 18
            }}
          >
            刷新重试
          </Text>
        </Pressable>
        <Text style={{ color: 'white', marginTop: 15 }}>
          加载失败，请刷新重试~
        </Text>
      </View>
    )
  }

  useEffect(() => {
    try{
      //show(1,15)
      Show(page,size).then(async res=>{
        if(res.message==='ok'){
          setArr(res.data.data.records)
        }
      })
    }catch(error){
      console.log(error)
    }
  }, [])
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={['#727480', '#454653']}
      >
        <Text style={styles.pageTitle}>发现</Text>
        {!isError && !isRefreshing && list.length > 0 && (
          <ScrollView style={{ marginTop: 30}}>
            {
              list.map(item => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <HomeListItem id={item.id} name={item.artifactName} navigation={props.navigation} desc={item.description} num={item.collectNum} url={item.imageUrl}/>
                )
              })
            }
          </ScrollView>)}
        {!isError && isRefreshing && <RefreshingContent />}
        {!isError && !isRefreshing && list.length <= 0 && <EmptyContent />}
        {isError && <ErrorContent />}
      </LinearGradient>
>>>>>>> 478a09490de1273b1fe79eed34c8380920bdc50a
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
<<<<<<< HEAD
  surface: {
    padding: 10,
    height: 170,
    width: 350,
    right: -5,
    top:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:140,
    height:140,
    right:100,
    top:60
  },
  text:{
    right:-30,
    top:-80,
    fontWeight: 'bold',
    fontSize:20,
  },
  text_2:{
    top:-80,
    right:-20
=======
  container: {
    backgroundColor: '#696969',
    flex: 1
  },
  background: {
    flex: 1
  },
  pageTitle: {
    fontSize: 28,
    color: '#fff',
    position: 'absolute',
    top: 20,
    left: 20
  },
  surface: {
    padding: 10,
    height: 170,
    width: '90%',
    right: '-5%',
    top:'10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: 25,
    marginBottom: 12,
  },
  image:{
    width:'45%',
    height:'85%',
    right:'25%',
    top:'70%',
    borderRadius: 25,
  },
  text:{
    right:'-30%',
    top:'-20%',
    width:'60%',
    fontWeight: 'bold',
    color: '#fff',
    fontSize:20,
    //flex:1
  },
  text_2:{
    top:'-20%',
    right:'-30%',
    width:'60%',
    color: '#fff',
>>>>>>> 478a09490de1273b1fe79eed34c8380920bdc50a
  },
  button:{
    right:-100,
    hight:20,
    width:5,
    top:-25,
  },
  num:{
    top:-60,
    right:-180,
    width:100,
  }
})
