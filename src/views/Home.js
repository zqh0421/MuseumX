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
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
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
