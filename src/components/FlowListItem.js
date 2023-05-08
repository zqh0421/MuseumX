import { View, Text, StyleSheet,Image } from 'react-native'
import { Surface,IconButton,MD3Colors} from 'react-native-paper'
import { useEffect, useState } from 'react'
import Pic from '../../assets/pic.png'


const FlowListItem = (props) => {
  const [color, setColor] = useState(props.isLoved ? MD3Colors.error60 : '#ccc')
  useEffect(() => {
    // 获取后端数据
    // setList
  }, [])
  const onPressLove = () => {
    // 1. 点赞按钮样式变化
    if (color === MD3Colors.error60) setColor('#ccc')
    else if (color === '#ccc') setColor(MD3Colors.error60)
    // 2. 向后端发送请求，修改
  }
  return (
    <View style={styles.itemContainer}>
      <View style={styles.bg} ></View>
      <View style={styles.itemPic}>
        <Image source={Pic} style={styles.image}/>
      </View>
      <Text style={styles.itemTitle} >{props.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: -12,
          justifyContent: 'space-between'
        }}>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.HeadSculpture}></Text>
          <Text style={styles.itemUsername}>{props.username}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon="heart"
            iconColor={color}
            size={17}
            onPress={onPressLove}
          />
          <Text style={styles.LoveNumber}>{props.likes}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '93%',
    borderRadius: 10,
    padding: '5%',
    marginBottom: '5%',
  },
  bg: {
    backgroundColor: '#000',
    opacity: 0.4,
    overflow: 'hidden',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  itemPic: {
    flex:1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    height:80,
    width:'100%',
    borderRadius: 5,
  },
  itemTitle: {
    top:5,
    fontSize: 13,
    margin:2,
    letterSpacing:1,
    lineHeight:18,
    fontWeight: 'bold',
    color: 'white'
  },
  itemUsername: {
    paddingLeft: 5,
    fontSize: 12,
    lineHeight: 24,
    color: '#ccc'
  },
  HeadSculpture: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#AAA'
  },
  LoveNumber: {
    fontSize: 12,
    color: '#ccc',
    left: -8,
    lineHeight: 24
  }
})

export default FlowListItem