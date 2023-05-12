import { View, Text,StyleSheet,FlatList,Pressable,Dimensions, } from 'react-native'
import React , {useEffect, useState} from 'react'
import { Searchbar,Button} from 'react-native-paper'
import { pickDocument,KeySearch } from '../api/SearchInterface'
import {Show} from '../api/HomeInterface'
import { AntDesign } from '@expo/vector-icons'

const HotItem = ({ item }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
    <Text>{item.artifactName}</Text>
    <Text>{item.collectNum}</Text>
  </View>
)

const Search = (props) => {
  const[SearchQuery,setSearchQuery]=React.useState('')
  const[hotitem,sethotitem]=useState([]) //热门榜
  const[currPage,setcurrPage]=useState(1)
  const[pageSize,setpageSize]=useState(15)
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误
  useEffect(()=>{
    Show(1, 5).then(async res=>{
      if(res.message==='ok'){
        //sethotitem
        sethotitem(res.data.data.records)
      }
    })
  })
  const handleSearch=(props)=>{ //关键词搜索
    KeySearch(currPage,SearchQuery,pageSize).then(async res=>{
      if(res.message==='ok'){
        try{
          props.navigation.navigate('Result',{
            //ResultScreen(res)
          })
        }catch(error){
          console.log(error)
        }
      }
    })
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
      //setListData([])
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
          transform: [{ translateY: Dimensions.get('window').height / 2 }]
        }}
      >
        <AntDesign name="frowno" color="white" size={50} />
        <Text style={{ color: 'white', marginTop: 15 }}>暂无内容~</Text>
      </View>
    )
  }

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

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder='文物搜索'
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        value={SearchQuery}
      />
      <View style={styles.vbutton_1}>
        <Button icon="file" mode="contained" onPress={() => props.navigation.navigate('ccrp-gpt.live')}>
          智能问答
        </Button>
      </View>
      <View style={styles.vbutton_2}>
        <Button icon="camera" mode="contained" onPress={()=>pickDocument().then(async res=>{
          if(res.message==='ok'){
            try{
              navigation.navigate('Result', {res})
            }catch(error){
              console.log(error)
            }
          }
        })} >
          以图搜图
        </Button>
      </View>
      {!isError && !isRefreshing && hotitem.length > 0 && (
        <><Text>
          热门榜
        </Text><FlatList
          data={hotitem}
          renderItem={HotItem}
          keyExtractor={(item) => item.id.toString()} /></>
      )}
      {!isError && isRefreshing && <RefreshingContent />}
      {!isError && !isRefreshing && hotitem.length <= 0 && <EmptyContent />}
      {isError && <ErrorContent />}
    </View>
  )
}
const styles=StyleSheet.create({
  vbutton_1:{
    height:50,
    width:150,
    top:20
  },
  vbutton_2:{
    height:50,
    width:150,
    right:-170,
    top:-30
  },
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

})
export default Search