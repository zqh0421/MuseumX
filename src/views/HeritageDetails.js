import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    SafeAreaView,
    StatusBar,
    Platform
  } from 'react-native'
  import React, { useState, useRef, Component, useEffect } from 'react'
  import { LinearGradient } from 'expo-linear-gradient'
  import {
    List,
    MD3Colors,
    SegmentedButtons,
    TextInput,
    IconButton,
    Button,
  } from 'react-native-paper'
  import { render } from 'react-dom'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import { collect_number } from '../api/CollectNumber'
  import { collect } from '../api/Collect'
  import { artifact } from '../api/ArtifactInfo'
  import { artifactComment } from '../api/ArtifactComment'
  import { publishArtifactComment } from '../api/PublishArtifactComment'
  import { createBoxShadowValue } from 'react-native-web/dist/cjs/exports/StyleSheet/preprocess'
  
  const CommentItem = (props) =>{
    return(
      <View style={{marginTop:'5%'}}>
        <Text style={styles.textStyle}>userId:{props.userId}</Text>
        <Text >{props.content}</Text>
      </View>
    )
  }   
  
  const HeritageDetails = (props) => {
    const [value, setValue] = useState('')
    const [artifactID, setArtifactID] = useState(1)
    const [artifactName, setArtifactname] = useState('')
    const [author, setAuthor] = useState('')
    const [relicTime, setRelicTime] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [collectNum, setCollectNum] = useState(0)
    const [color, setColor] = useState(
      props.isCollected ? MD3Colors.error60 : MD3Colors.neutral100
    )
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    
    //接收Home页面参数
    const id = props.route.params.id

    //从数据库中取数据
    const getData = async () => {
        try{
          const jsonValue = await AsyncStorage.getItem('userData')
          return jsonValue !== null ? JSON.parse(jsonValue) : null
          console.log('userData')
        }catch(e){
    
        }
      }
    
    //加载数据
    const loadData = () => {
        // 获取当前文物信息，请求参数：id
        artifact(id).then( res => {
            if (res.message === 'ok') {
              setArtifactID(res.data.id)
              setArtifactname(res.data.artifactName)
              setAuthor(res.data.author)
              setRelicTime(res.data.relicTime)
              setDescription(res.data.description)
              setImageUrl(res.data.imageUrl)
              setCollectNum(res.data.collectNum)
            }
          })
          .catch((err) => {
            alert(err)
          })
    
        // 获取当前文物所有评论和发表评论的用户信息,加token
        artifactComment(id).then(async (res) => {
          if (res.message === 'ok') {
            setComments(res.data.data)
          }
        })
      }
    
    useEffect(() => {
        loadData()
    },[])


    //收藏文物
    const onPressCollect = () => {
        getData().then(userData => {
          if(userData){
            if (color === MD3Colors.error60) {
              setColor(MD3Colors.neutral100)
              setCollectNum(collectNum - 1)
            } else if (color === MD3Colors.neutral100) {
              setColor(MD3Colors.error60)
              setCollectNum(collectNum + 1)
            }
            collect(userData.data, artifactID).then(async (res) => {
              if (res.message === 'ok') {
                console.log('收藏成功')
              }
            })
          }else{
            console.log("无法收藏，先登录")
            props.navigation.navigate('Login')
          }
        }).catch((err) => {
            alert(err)
        })
    
    }


    //评论文物
    const publishComment = () => {
      // 向后端发送请求
      getData().then(userData => {
        if(userData){
          publishArtifactComment(userData.data, artifactID, comment).then(async (res) =>{
            if(res.message === "ok"){
              console.log('发送成功')
            }
          })
        }else{
          console.log("无法评论，先登录")
          props.navigation.navigate('Login')
        }
      }).catch((err) => {
        alert(err)
      })
    }
   
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <LinearGradient
                style={styles.backgroud}
                colors={['#727480', '#454653']}
            >
            {/* 文物图片 */}
            {imageUrl && <Image source={{uri:imageUrl}}style={styles.imageStyle}/>}
  
            {/* 跳转按钮 */}
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                style={styles.buttonsStyle}
                buttons={[
                {
                  value: '文物描述',
                  label: '简 介'
                },
                {
                  value: '文物详解',
                  label: '详 解'
                },
                {
                  value: '用户留言',
                  label: '留 言'
                }
              ]}
            />
  
            {/* 文字显示 */}
            <Text style={styles.Titlefont}>
              {artifactName}
              <Text style={styles.textStyle}>{'\r\n\n'}Author: {author}</Text>
              <Text style={styles.textStyle}>{'\r\n\n'}Age: {relicTime}</Text>
            </Text>
  
            <Text style={styles.Titlefont}>
              Description
              <Text style={styles.textStyle}>{'\r\n\n'}{description}</Text>
            </Text>
  
            <Text style={styles.Titlefont}>
              Comments
            </Text>
            <View style={{left:'14%'}}>
                {comments.map(item =>{
                  return(
                    <CommentItem userId={item.userId} content={item.content} key={item.id}/>
                  )
                })}
              </View>
              <View style={{height:200}}></View> 
          </LinearGradient>
          
          </ScrollView>
          
  
            {/* 评论输入框 */}
            <View style={styles.bottombar}>
                <TextInput
                    mode="outlined"
                    style={styles.inputStyle}
                    placeholder="发表评论..."
                    placeholderTextColor={'#ffffff'}
                    contentStyle={{ color: '#fffaf0' }}
                    outlineColor={'#CCCCCC'}
                    activeOutlineColor={'#CCCCCC'}
                    value={comment}
                    onChangeText={(val) => setComment(val)}
                />
  
                <Button
                    mode='contained'
                    buttonColor='#808080'
                    style={{top:-5,left:10}}
                    onPress={() => publishComment()}>
                    <Text style={styles.buttonTxt}>Send</Text>
                </Button>
  
                {/* 收藏 */}
                <IconButton
                    icon="star-outline"
                    iconColor={color}
                    size={30}
                    onPress={onPressCollect}
                    style={{ top: -8 , left: 5 }}
                />
                <Text style={{ color: '#EEEEEE', top: -8 }}>{collectNum}</Text>
                </View>
         
      </SafeAreaView>
    )
}
  
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroud: {
        width: Dimensions.get('window').width,
        flex:1
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
        marginLeft: '8%',
        marginRight: '8%'
    },
    Titlefont: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: '13%',
        marginRight: '13%',
        marginVertical: '5%',
    },
    textStyle: {
        fontSize: 12,
        color: '#d3d3d3',
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
  export default HeritageDetails