import { View, Text, Image, Surface, IconButton, Pressable } from 'react-native'
import React from 'react'

const ItemBar = (props) => {
  const [color, setColor] = useState(
    props.isCollected ? MD3Colors.error60 : MD3Colors.error0
  )
  const [list, setList] = useState([]) // 列表数据初始状态
  useEffect(() => {
    // 获取后端数据
    //setList(Show(page,size))
    Show(page, size).then(async (res) => {
      if (res.message === 'ok') {
        try {
          // setList?
          setList(res.data)
        } catch (error) {
          console.log(error)
        }
      }
    })
  }, [])
  const onPressCollect = () => {
    // 1. 收藏按钮样式变化
    if (color === MD3Colors.error60) setColor(MD3Colors.error0)
    else if (color === MD3Colors.error0) setColor(MD3Colors.error60)
    // 2. 向后端发送请求，修改
    //Collect(id) //id?
  }

  // const onPressItem = () => {
  //   props.navigation.navigate('Login')
  // }
  //跳转到详情页？
  return (
    <Pressable
      onPress={getMore().then(async (res) => {
        if (res.message === 'ok') {
          try {
            navigation.navigate('xiangqing', {})
          } catch (error) {
            console.log(error)
          }
        }
      })}
    >
      <Surface style={styles.surface} elevation={4}>
        <Image style={styles.image} source={{ uri: props.url }} />
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

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    height: 170,
    width: '90%',
    right: -20,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: 25,
    marginBottom: 12
  },
  image: {
    width: 130,
    height: 130,
    right: 80,
    top: 60,
    borderRadius: 25
  },
  text: {
    right: -30,
    top: -80,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20
  },
  text_2: {
    top: -80,
    right: -20
  },
  button: {
    right: -100,
    hight: 20,
    width: 5,
    top: -25
  },
  num: {
    top: -60,
    right: -180,
    width: 100
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
    alignItems: 'center'
  }
})
