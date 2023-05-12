import { View, Text,Image,StyleSheet, Pressable, Dimensions } from 'react-native'
import React , { useState } from 'react'
import { IconButton,MD3Colors, Surface} from 'react-native-paper'
import Pic from '../../assets/pic.png'

const HomeListItem = (props) => {
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
    props.navigation.navigate('HeritageDetails',{id:props.id})
    //props.navigation.navigate('Login')
  }
  return (
    <Pressable onPress={onPressItem}>
      <View style={styles.surface}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width * 0.94, height: 170, backgroundColor: 'black', opacity: 0.4, borderRadius: 15 }}></View>
        {/* <Image style={styles.image} source={{ uri: props.url }}/> */}
        <Image style={styles.image} source={Pic}/>
        <View style={{ margin: '3%', justifyContent: 'space-between', width: '55%'}}>
          <Text style={styles.title}>{props.name}</Text>
          {/* <Text style={styles.desc}>{props.desc}</Text> */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <IconButton
              icon="star"
              iconColor={color}
              size={24}
              onPress={onPressCollect}
              style={{height: 24, width: 24}}
            />
            <Text style={{ fontSize: 20, color: '#fff' }}>{props.num}</Text>
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
    marginLeft: '3%',
    padding: 10,
    height: 170,
    width: '94%',
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: '3%',
  },
  image:{
    width:'40%',
    height:'94%',
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