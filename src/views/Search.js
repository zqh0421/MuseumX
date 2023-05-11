import { View, Text,StyleSheet,FlatList } from 'react-native'
import * as React from 'react'
import { Searchbar,Button} from 'react-native-paper'
import pickDocument, { HotList } from '../api/SearchInterface'

const HotItem = ({ item }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
    <Text>{item.name}</Text>
    <Text>{item.popularity}</Text>
  </View>
)

const Search = (props) => {
  const[SearchQuery,setSearchQuery]=React.useState('')
  const[hotitem,sethotitem]=upState([]) //热门榜
  useEffect(()=>{
    HotList().then(async res=>{
      if(res.message==='ok'){
        //sethotitem
        sethotitem(res.data)
      }
    })
  })
  const handleSearch=()=>{ //关键词搜索
    KeySearch(SearchQuery).then(async res=>{
      if(res.message==='ok'){
        try{
          navigation.navigate('Result',{

          })
        }catch(error){
          console.log(error)
        }
      }
    })
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
        <Button icon="camera" mode="contained" onPress={pickDocument.then(async res=>{
          if(res.message==='ok'){
            try{
              navigation.navigate('Result', {
              })
            }catch(error){ console.log(error)}
          }
        })} >
          以图搜图
        </Button>
      </View>
      <Text>
        热门榜
      </Text>
      <FlatList
        data={hotitem}
        renderItem={HotItem}
        //keyExtractor={(item) => item.id.toString()}
      />
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

})
export default Search