import { View, Text,Image,StyleSheet, Pressable, Dimensions } from 'react-native'
import React , { useState, useEffect } from 'react'
import { IconButton,MD3Colors, Surface} from 'react-native-paper'
import Pic from '../../assets/pic.png'

const HomeListItem = (props) => {
  const { item } = props
  const [color, setColor] = useState(props.isCollected ? MD3Colors.error60 : MD3Colors.error0)
  // TODO: 用户是否收藏
  // TODO：ScrollView

  const onPressCollect = () => {
    // 1. 收藏按钮样式变化
    if (color === MD3Colors.error60) setColor(MD3Colors.error0)
    else if (color === MD3Colors.error0) setColor(MD3Colors.error60)
    // 2. 向后端发送请求，修改
    try{
      Collect(item.id)
    }catch(error){
      console.log(error)
    }
  }

  const onPressItem = () => {
    props.navigation.navigate('HeritageDetails', { id: item.id })
  }
  return (
    <Pressable onPress={onPressItem}>
      <View style={styles.surface}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width * 0.88, height: 170, backgroundColor: 'black', opacity: 0.4, borderRadius: 15 }}></View>
        {/* <Image style={styles.image} source={{ uri: item.imageUrl }}/> TODO: 图片显示问题 */}
        <Image style={styles.image} source={Pic}/>
        <View style={{ margin: '3%', justifyContent: 'space-between', width: '55%'}}>
          <Text style={styles.title}>{item.artifactName}</Text>
          {/* <Text style={styles.desc}>{props.desc}</Text> */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <IconButton
              icon="star"
              iconColor={color}
              size={24}
              onPress={onPressCollect}
              style={{height: 24, width: 24}}
            />
            <Text style={{ fontSize: 20, color: '#fff' }}>{item.collectNum}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    flex: 1
  },
  background: {
    flex: 1
  },
  surface: {
    marginLeft: '6%',
    padding: 10,
    height: 170,
    width: '88%',
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: '6%',
  },
  image:{
    width:'40%',
    height:'88%',
    alignSelf: 'center',
    borderRadius: 15,
  },
  title:{
    width: '100%',
    fontWeight: 'bold',
    color: '#fff',
    fontSize:20,
  },
  desc: {
    width:'100%',
    color: '#fff',
  }
})

export default HomeListItem