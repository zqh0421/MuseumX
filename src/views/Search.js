import { View, Text,StyleSheet } from 'react-native'
import * as React from 'react'
import { Searchbar,Button} from 'react-native-paper'

const Search = (props) => {
  const[SearchQuery,setSearchQuery]=React.useState('')
  const handleSearch=()=>{
  }
  return (
    <View style={{margin:16}}>
      <Searchbar
        placeholder='文物搜索'
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        value={SearchQuery}
      />
      <View style={styles.vbutton_1}>
        <Button icon="file" mode="contained" onPress={()=>props.navigation.navigate('Login')}>
          智能问答
        </Button>
      </View>
      <View style={styles.vbutton_2}>
        <Button icon="camera" mode="contained" onPress={()=>props.navigation.navigate('Login')}>
          以图搜图
        </Button>
      </View>
      <Text>
        热门榜
      </Text>
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
  }

})
export default Search