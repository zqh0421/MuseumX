import { View, Text,Image,StyleSheet, Pressable, ScrollView,Dimensions,} from 'react-native'
import React , {useEffect, useState} from 'react'
import { Surface,IconButton,MD3Colors} from 'react-native-paper'
import { Collect, Show, getMore } from '../api/HomeInterface'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'


const ListItem = (props) => {
  const [color, setColor] = useState(props.isCollected ? MD3Colors.error60 : MD3Colors.error0)
  const onPressCollect = () => {
    // 1. 收藏按钮样式变化
    if (color === MD3Colors.error60) setColor(MD3Colors.error0)
    else if (color === MD3Colors.error0) setColor(MD3Colors.error60)
    // 2. 向后端发送请求，修改
    try{
      Collect(props.id)
    }catch(error){
      console.log(error)
    }
  }

  const onPressItem = () => {
    //props.navigation.navigate('Heritage_Details',{props})
    props.navigation.navigate('Login')
  }
  return (
    <Pressable onPress={onPressItem}>
      <Surface style={styles.surface} elevation={4}>
        <Image style={styles.image} source={{ uri: props.url}}/>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text_2}>{props.desc}</Text>
        <View style={styles.button}>
          <IconButton
            icon="star"
            iconColor={color}
            size={20}
            onPress={onPressCollect}
          />
        </View>
        <Text style={styles.num}>{props.num}</Text>
      </Surface>
    </Pressable>
  )
}

const Home = (props) => {
  const [page,setpage]=useState(1)
  const [size,setsize]=useState(15)
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误
  const [list, setList] = useState([]) // 列表数据初始状态
  const[arr,setArr]=useState([])

  const RefreshingContent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          transform: [{ translateY: Dimensions.get('window').height / 2 }]
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
          transform: [{ translateY: Dimensions.get('window').height / 2 }]
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
          transform: [{ translateY: Dimensions.get('window').height / 2 }]
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
      <Text onPress={() => props.navigation.navigate('Login')}>
            点击弹出登录页面
      </Text>
      {!isError && !isRefreshing && list.length > 0 && (
        <ScrollView>
          {
            list.map(item => {
              return (
                // eslint-disable-next-line react/jsx-key
                <ListItem id={item.id} name={item.artifactName} navigation={props.navigation} desc={item.description} num={item.collectNum} url={item.imageUrl}/>
              )
            })
          }
        </ScrollView>)}
      {!isError && isRefreshing && <RefreshingContent />}
      {!isError && !isRefreshing && list.length <= 0 && <EmptyContent />}
      {isError && <ErrorContent />}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
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
  },
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
})