import { View, Text,Image,StyleSheet, Pressable, ScrollView} from 'react-native'
import React , {useEffect, useState} from 'react'
import { Surface,IconButton,MD3Colors} from 'react-native-paper'
// import { ScrollView } from 'react-native-web'
// import * as React from 'react'

const ListItem = (props) => {
  const [color, setColor] = useState(props.isCollected ? MD3Colors.error60 : MD3Colors.error0)
  const [list, setList] = useState([]) // 列表数据初始状态
  useEffect(() => {
    // 获取后端数据
    // setList
  }, [])
  const onPressCollect = () => {
    // 1. 收藏按钮样式变化
    if (color === MD3Colors.error60) setColor(MD3Colors.error0)
    else if (color === MD3Colors.error0) setColor(MD3Colors.error60)
    // 2. 向后端发送请求，修改
  }

  const onPressItem = () => {
    props.navigation.navigate('Login')
  }
  return (
    <Pressable onPress={onPressItem}>
      <Surface style={styles.surface} elevation={4}>
        <Image style={styles.image} source={{ uri: 'https://picsum.photos/700' }}/>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text_2}>文物描述</Text>
        <View style={styles.button}>
          <IconButton
            icon="star"
            iconColor={color}
            size={20}
            onPress={onPressCollect}
          />
        </View>
        <Text style={styles.num}>num</Text>
      </Surface>
    </Pressable>
  )
}

const Home = (props) => {
  const arr = [
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
    {
      name: 'title',
      desc: 'description',
      url: 'https://picsum.photos/700',
      collect: 123
    },
  ]
  return (
    <View>
      <Text onPress={() => props.navigation.navigate('Login')} style={{marginBottom: 50}}>
        点击弹出登录页面
      </Text>
<<<<<<< HEAD
      <ScrollView>
        {
          arr.map(item => {
            return (
              // eslint-disable-next-line react/jsx-key
              <ListItem name={item.name} navigation={props.navigation} />
            )
          })
        }
      </ScrollView>
=======
      <Text onPress={() => props.navigation.navigate('Person')} style={{marginBottom: 50}}>
        点击弹出资料页面
      </Text>
      <Text onPress={() => props.navigation.navigate('Publish')}>
        点击弹出发表动态页面
      </Text>
>>>>>>> user
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    height: 170,
    width: 350,
    right: -5,
    top:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:140,
    height:140,
    right:100,
    top:60
  },
  text:{
    right:-30,
    top:-80,
    fontWeight: 'bold',
    fontSize:20,
  },
  text_2:{
    top:-80,
    right:-20
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
  }
})