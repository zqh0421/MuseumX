import { View, Text,Image,StyleSheet, Pressable, ScrollView} from 'react-native'
import React , {useEffect, useState} from 'react'
import { Surface,IconButton,MD3Colors} from 'react-native-paper'
import { Collect, getMore } from '../api/HomeInterface'
function ResultScreen(props){
  const [list, setList] = useState([]) // 列表数据初始状态
  useEffect(() => {
    // 获取后端数据
    // setList?
    setList(props)
  }, [])
  const ListItem = (props) => {
    const [color, setColor] = useState(props.isCollected ? MD3Colors.error60 : MD3Colors.error0)
    const onPressCollect = () => {
      // 1. 收藏按钮样式变化
      if (color === MD3Colors.error60) setColor(MD3Colors.error0)
      else if (color === MD3Colors.error0) setColor(MD3Colors.error60)
      // 2. 向后端发送请求，修改
      Collect(props.id) //id?
    }

    // const onPressItem = () => {
    //   props.navigation.navigate('Login')
    // }
    return (
      <Pressable onPress={getMore().then(async res=>{
        if(res.message==='ok'){
          try{ //跳转到详情页
            navigation.navigate('page', {
              //数据处理
            })
          }catch(error){console.log(error)}
        }
      })}>
        <Surface style={styles.surface} elevation={4}>
          <Image style={styles.image} source={{ uri: props.url}}/>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text_2}>{props.desc}</Text>
          <View style={styles.button}>
            <IconButton
              icon="star"
              iconColor={color}
              size={20}
              onPress={onPressCollect}
            />
          </View>
          <Text style={styles.num}>{props.num}</Text>
        </Surface>
      </Pressable>
    )
  }

  const Result = (props) => {
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
        <Text>查询结果：</Text>
        <ScrollView>
          {
            list.map(item => {
              return (
                // eslint-disable-next-line react/jsx-key
                <ListItem name={item.name} navigation={props.navigation} />
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

export default Result

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    height: 170,
    width: '90%',
    right: -20,
    top:20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: 25,
    marginBottom: 12,
  },
  image:{
    width:130,
    height:130,
    right:80,
    top:60,
    borderRadius: 25,
  },
  text:{
    right:-30,
    top:-80,
    fontWeight: 'bold',
    color: '#fff',
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
  },
  container: {
    backgroundColor: '#696969',
    // alignItems: 'center',
    flex: 1 // 布局
  },
  background:{
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    flex:1
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