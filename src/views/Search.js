import { View, Text,StyleSheet,FlatList, Image, Pressable, Dimensions, Linking, TouchableOpacity } from 'react-native'
import React , {useEffect, useState} from 'react'
import { Searchbar,Button, MD3Colors } from 'react-native-paper'
import { searchPhoto, KeySearch } from '../api/SearchInterface'
import { Show } from '../api/HomeInterface'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import EmptyContent from '../components/EmptyContent'
import ErrorContent from '../components/ErrorContent'
import RefreshingContent from '../components/RefreshingContent'
import * as ImagePicker from 'expo-image-picker'

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


  const handleSearch=()=>{ // 关键词搜索
    if (SearchQuery) {
      KeySearch(1, SearchQuery, 30).then(res => {
        if(res.message==='ok'){
          try{
            props.navigation.navigate('Result', {
              list: res.data.list
            })
          }catch(error){
            console.log(error)
          }
        }
      })
    }
  }

  const takeImageHandler = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    const file = {
      uri: image.assets[0].uri,
      name: image.assets[0].uri.toString().split('/ImagePicker/')[1].split('.')[0],
      type: 'image/jpeg'
    }
    const formData = new FormData()
    formData.append('file', file)
    searchPhoto(formData).then(res => {
      console.log(res)
      if (res.code === 0) { // 数据获取成功
        console.log(res.data) // TODO: 跳转结果页
        props.navigation.navigate('Result', {
          list: res.data
        })
      } else { // 获取失败
      }
    }).catch(err => {
      alert(err)
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
          <View style={{flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', width: '75%'}}>
            <Button
              icon="file"
              mode="contained"
              onPress={() => Linking.openURL('http://ccrp-gpt.live')}
              buttonColor='#E7A960'
            >
              智能问答
            </Button>
            <Button
              icon="camera"
              mode="contained"
              onPress={takeImageHandler}
              buttonColor='#E7A960'
            >
              以图搜图
            </Button>
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