import { View, Text,StyleSheet,FlatList, Pressable, Dimensions, Linking, TouchableOpacity } from 'react-native'
import React , {useEffect, useState} from 'react'
import { Searchbar,Button, MD3Colors } from 'react-native-paper'
import { pickDocument,KeySearch } from '../api/SearchInterface'
import { Show } from '../api/HomeInterface'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import EmptyContent from '../components/EmptyContent'
import ErrorContent from '../components/ErrorContent'
import RefreshingContent from '../components/RefreshingContent'

const HotItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('HeritageDetails', { id: props.item.item.id })}
      style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderRadius: 20, height: 40, backgroundColor: 20, marginTop: 10 }}
    >
      <Text style={{ color: 'white' }}>{props.item.item.artifactName}</Text>
      <Text style={{ color: 'white' }}>{props.item.item.collectNum}</Text>
    </TouchableOpacity>
  )
}

const Search = (props) => {
  const[SearchQuery,setSearchQuery]=React.useState('')
  const[hotitem,setHotItem]=useState([]) //热门榜
  const[currPage,setcurrPage]=useState(1)
  const[pageSize,setpageSize]=useState(15)
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误
  useEffect(() => {
    loadData()
  }, [])
  useEffect(()=>{
    const unsubscribe = props.navigation.addListener('focus', () => {
      loadData()
    })
    return unsubscribe
  }, [props.navigation])
  const handleSearch=(props)=>{ // 关键词搜索
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
    Show(1, 5).then(async res=>{
      if(res.message==='ok') {
        setHotItem(res.data.data.records)
        setIsRefreshing(false)
      } else {
        setIsError(true)
        setIsRefreshing(false)
        setHotItem([])
      }
    }).catch(err => {
      console.log(err)
      setIsError(true)
      setIsRefreshing(false)
      setHotItem([])
    })
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={['#727480', '#454653']}
      >
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Searchbar
            placeholder='文物搜索'
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            value={SearchQuery}
            style={styles.searchBar}
          />
          <View style={{flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', width: '70%'}}>
            <Button icon="file" mode="contained" onPress={() => props.navigation.navigate('ccrp-gpt.live')}>
              智能问答
            </Button>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => {
                pickDocument().then(async res => {
                  if(res.message==='ok') {
                    navigation.navigate('Result', {res})
                  }
                })
              }
              }>以图搜图</Button>
          </View>
        </View>
        {!isError && !isRefreshing && hotitem.length > 0 && (
          <View style={{ marginTop: 30, width: '90%', alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name='fire' size={24} color={MD3Colors.error60} />
              <Text style={{ color: MD3Colors.error60, fontSize: 20 }}>热门榜</Text>
            </View>
            <FlatList
              data={hotitem}
              renderItem={item => <HotItem navigation={props.navigation} item={item}/>}
              keyExtractor={(item) => item.id.toString()} />
          </View>
        )}
        {!isError && isRefreshing && <RefreshingContent />}
        {!isError && !isRefreshing && hotitem.length <= 0 && <EmptyContent />}
        {isError && <ErrorContent onPressRefresh={loadData}/>}
      </LinearGradient>
    </View>
  )
}
const styles=StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    flex: 1 // 布局
  },
  background: {
    flex: 1
  },
  searchBar: {
    width: '85%',
  }
})

export default Search