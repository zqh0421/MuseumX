import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native'
import { Surface,IconButton,MD3Colors} from 'react-native-paper'
import { useEffect, useState } from 'react'
import Pic from '../../assets/pic.png'
import { like } from '../api/discover/likeInterface'
import AsyncStorage from '@react-native-async-storage/async-storage'
const FlowListItem = (props) => {
  const { item } = props
  const [likeNum, setLikeNum] = useState(item.likeNum)
  const [color, setColor] = useState(new Set(props.likeSet).has(item.id) ? MD3Colors.error60 : '#ccc') // TODO: 收藏状态
  const [height, setHeight] = useState(80)
  console.log('likeset', props.likeSet)

  // useEffect(() => {
  //   Image.getSize(item.imgUrl, (w, h) => {
  //     setHeight(h / w * 0.93 * 0.45 * Dimensions.get('window').width)
  //   },
  //   (failure) => { console.log('failure', failure) }
  //   );
  // }, [])

  useEffect(() => {
    console.log('likeset', props.likeSet)
    setColor(new Set(props.likeSet).has(item.id) ? MD3Colors.error60 : '#ccc')
  }, [props.likeSet])
  const onPressFlowListItem = () => {
    props.navigation.navigate('HeritageDiscover', {item: item})
  }

  const onPressLove = async () => {
    // 判断是否登录
    const jsonValue = await AsyncStorage.getItem('userData')
    if (jsonValue) {
      // 向后端发送请求，修改
      like(JSON.parse(jsonValue).data, item.id).then(res => {
        if (res.message === 'ok') {
          // 点赞按钮样式变化
          if (color === MD3Colors.error60) {
            setColor('#ccc')
            setLikeNum(likeNum-1)
          }
          else if (color === '#ccc') {
            setColor(MD3Colors.error60)
            setLikeNum(likeNum+1)
          }
        }
      }).catch(err => {
        alert(err)
      })
    } else {
      props.navigation.navigate('Login')
    }
  }

  return (
    <Pressable style={styles.itemContainer} onPress={onPressFlowListItem}>
      <View style={styles.bg}></View>
      <View style={styles.itemPic}>
        {item && item.imgUrl && <Image
          source={{uri: item.imgUrl}}
          style={[styles.image, { width: Dimensions.get('screen').width * 0.93 * 0.45, height: height}]}
        />}
      </View>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: -12,
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.HeadSculpture}></Text>
          <Text style={styles.itemUsername}>{item.userId}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            icon="heart"
            iconColor={color}
            size={17}
            onPress={onPressLove}
          />
          <Text style={styles.LoveNumber}>{likeNum}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '93%',
    borderRadius: 10,
    padding: '5%',
    marginBottom: '5%'
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
    right: 0
  },
  itemPic: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10
  },
  image: {
    borderRadius: 5,
  },
  itemTitle: {
    top: 5,
    fontSize: 13,
    margin: 2,
    letterSpacing: 1,
    lineHeight: 18,
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
