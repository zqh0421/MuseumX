import { View, Text,Image,StyleSheet, Pressable, Dimensions } from 'react-native'
import React , { useState, useEffect } from 'react'
import { IconButton, MD3Colors } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collect } from '../api/Collect'

const HomeListItem = (props) => {
  const { item } = props
  const [collectNum, setCollectNum] = useState(item.collectNum)
  const [color, setColor] = useState(new Set(props.collectSet).has(item.id) ? '#E7A960' : '#ccc')
  console.log('collectset', props.collectSet)

  const onPressCollect = async () => {
    // 判断是否登录
    const jsonValue = await AsyncStorage.getItem('userData')
    if (jsonValue) {
      // 向后端发送请求，修改
      collect(JSON.parse(jsonValue).data, item.id).then(res => {
        console.log(res)
        if (res.message === 'ok') {
          // 收藏按钮样式变化
          if (color === '#E7A960') {
            setColor('#ccc')
            setCollectNum(collectNum - 1)
          }
          else if (color === '#ccc') {
            setColor('#E7A960')
            setCollectNum(collectNum + 1)
          }
        }
      }).catch(err => {
        alert(err)
      })
    } else {
      props.navigation.navigate('Login')
    }
  }

  const onPressItem = () => {
    props.navigation.navigate('HeritageDetails', { id: item.id })
  }
  return (
    <Pressable onPress={onPressItem}>
      <View style={styles.surface}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width * 0.88, height: 170, backgroundColor: 'black', opacity: 0.4, borderRadius: 15 }}></View>
        {item && item.imageUrl && <Image style={styles.image} source={{ uri: item.imageUrl }}/>}
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
            <Text style={{ fontSize: 20, color: '#fff' }}>{collectNum}</Text>
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