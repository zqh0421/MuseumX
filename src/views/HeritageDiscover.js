import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Image
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {
  List,
  MD3Colors,
  SegmentedButtons,
  TextInput,
  IconButton,
  Button,
  Chip
} from 'react-native-paper'
import { render } from 'react-dom'
import { like } from '../api/Like'
import { postComment } from '../api/PostComment'
import { publishComment } from '../api/PublishPostComment'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CommentItem = (props) => {
  const [list, setList] = useState([])
  return (
    <View style={{ marginTop: '5%' }}>
      <Text style={styles.textStyle}>userId:{props.userId}</Text>
      <Text>{props.content}</Text>
    </View>
  )
}

const HeritageDiscover = (props) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [value, setValue] = useState('')
  const [height, setHeight] = useState(180)
  const [likeN, setLikeNum] = useState(0)
  const [color, setColor] = useState(
    props.isCollected ? MD3Colors.error60 : MD3Colors.neutral100
  )

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      return jsonValue !== null ? JSON.parse(jsonValue) : null
      // console.log('userData')
    } catch (e) {
      console.log(e)
    }
  }

  // 接收参数
  const { id, imgUrl, title, likeNum, content, moodCategory, moodCategoryId } =
    props.route.params.item

  // 获取帖子评论
  const loadData = () => {
    postComment(id)
      .then(async (res) => {
        if (res.message === 'ok') {
          console.log('comment-res:', res.data.data)
          setComments(res.data.data)
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }

  useEffect(() => {
    loadData()
    Image.getSize(
      imgUrl,
      (w, h) => {
        setHeight((h / w) * 0.93 * 0.45 * Dimensions.get('window').width)
      },
      (failure) => {
        console.log('failure', failure)
      }
    )
    setLikeNum(likeNum)
  }, [])

  // 评论帖子
  const Publish = () => {
    // 向后端发送请求,加token
    getData()
      .then((userData) => {
        if (userData) {
          publishComment(userData.data, comment, id).then(async (res) => {
            if (res.message === 'ok') {
              console.log('评论成功')
            }
          })
        } else {
          console.log('无法评论，先登录')
          props.navigation.navigate('Login')
        }
      })
      .catch((err) => {
        alert(err)
      })
  }

  // 点赞帖子
  const PressLike = () => {
    getData()
      .then((userData) => {
        if (userData) {
          if (color === MD3Colors.error60) {
            setColor(MD3Colors.neutral100)
            setLikeNum(likeN - 1)
          } else if (color === MD3Colors.neutral100) {
            setColor(MD3Colors.error60)
            setLikeNum(likeN + 1)
          }
          like(userData.data, id).then(async (res) => {
            if (res.message === 'ok') {
              console.log('点赞成功')
            }
          })
        } else {
          console.log('无法点赞，先登录')
          props.navigation.navigate('Login')
        }
      })
      .catch((err) => {
        alert(err)
      })
  }

  // 跳转到详情页
  const goDetails = () => {
    props.navigation.navigate('HeritageDetails', { id: moodCategoryId })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={['#727480', '#454653']}
          style={styles.backgroud}
        >
          {/* 文物图片 */}
          {imgUrl && (
            <Image source={{ uri: imgUrl }} style={styles.imageStyle} />
          )}

          {/* 跳转按钮*/}
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            style={styles.buttonsStyle}
            buttons={[
              {
                value: '文物描述',
                label: '发 现'
              },
              {
                value: '文物详解',
                label: '留 言'
              }
            ]}
            onSegmentBtnPress={(btn, index) => {}}
          />

          {/* 文字显示 */}
          <Text style={styles.Titlefont}>
            {title}
            <Text style={styles.textStyle}>
              {'\r\n\n'}
              {content}
            </Text>
          </Text>

          <Chip
            mode="contained"
            icon="book-open-page-variant-outline"
            style={{
              marginLeft: '12%',
              marginRight: '45%',
              marginBottom: '5%',
              backgroundColor: '#c0c0c0'
            }}
            onPress={() => goDetails()}
          >
            {moodCategory}
          </Chip>

          <Text style={styles.Titlefont}>留 言</Text>
          <View style={{ left: '14%' }}>
            {comments.map((item) => {
              return (
                <CommentItem
                  userId={item.userId}
                  content={item.content}
                  key={item.id}
                />
              )
            })}
          </View>
          <View style={{ height: 200 }}></View>
        </LinearGradient>
      </ScrollView>

      {/* 评论输入框 */}
      <View style={styles.bottombar}>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="发表评论..."
          placeholderTextColor={'#ffffff'}
          outlineColor={'#CCCCCC'}
          activeOutlineColor={'#CCCCCC'}
          contentStyle={{ color: '#fffaf0' }}
          value={comment}
          onChangeText={(val) => setComment(val)}
        />

        <Button
          mode="contained"
          buttonColor="#808080"
          style={{ top: -5, left: 10 }}
          onPress={() => Publish()}
        >
          <Text style={styles.buttonTxt}>Send</Text>
        </Button>

        <IconButton
          icon="heart-outline"
          iconColor={color}
          size={30}
          style={{ top: -8, left: 5 }}
          onPress={() => PressLike()}
        />
        <Text style={{ top: -8, color: '#EEEEEE' }}>{likeN}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroud: {
    width: Dimensions.get('window').width,
    flex: 1
  },
  imageStyle: {
    width: '80%',
    height: 300,
    alignContent: 'center',
    marginLeft: '10%', //页边距
    top: '2%', //和页面顶部的距离
    borderRadius: 10
  },
  buttonsStyle: {
    marginTop: '15%',
    marginLeft: '10%',
    marginRight: '10%'
  },
  Titlefont: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: '13%',
    marginRight: '13%',
    marginVertical: '5%'
  },
  textStyle: {
    fontSize: 12,
    color: '#d3d3d3'
    // whiteSpace: 'pre-wrap'
  },
  bottombar: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 70,
    backgroundColor: '#3A3A3A',
    flexDirection: 'row', //子组件水平排列，默认水平居中
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    //这里指的是输入内容的样式
    width: 200,
    backgroundColor: '#c0c0c0',
    textColor: '#696969',
    height: 35, //height设置过小导致文字显示不全，添加paddingVertical=0也无效,改小字体大小
    fontSize: 12,
    borderRadius: 5,
    top: -10
  }
})

export default HeritageDiscover
