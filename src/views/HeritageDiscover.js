import {
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    Image,
  } from 'react-native'
import React, { useState, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { List, MD3Colors, SegmentedButtons,TextInput,IconButton, } from 'react-native-paper';
import { render } from 'react-dom';
import { like } from '../api/Like';
import { postComment } from '../api/PostComment';
import { publishComment } from '../api/PublishPostComment';

const CommentItem = (props) =>{
    const[list, setList] = useState([])
    return(
      <View style={{marginTop:15, }}>
        <Text style={styles.textStyle}>userId:{props.userId}</Text>
        <Text >{props.content}</Text>
      </View>
    )
}

const HeritageDiscover = (props) => {

    const [comments, setComments] = useState([])
    const [list, setList] = useState([])
    const [comment, setComment] = useState('')

    const getData = async () => {
        try{
          const jsonValue = await AsyncStorage.getItem('userData')
          return jsonValue !== null ? JSON.parse(jsonValue) : null
          console.log('userData')
        }catch(e){
    
        }
    }

    // 接收参数
    const { mid, imageUrl, title, likeNum, content } = props.route.params.item 
    
    // 获取帖子评论
    const loadData = () => {
        postComment(mid)
          .then(async (res) => {
            if (res.message === 'ok') {
              setComments(res.data.data)
            }
          })
          .catch((err) => {
            alert(err)
          })
    }

    useEffect(() => {
        getData().then(res => {
          console.log('res:')
          console.log(res)
          if(res === undefined || res === null){
            props.navigation.navigate('Login')
          }else{
            loadData()
          }
        }).catch((err) => {
        })
    },[])
    
    // 发表评论
    const publishComment = () => {
        // 向后端发送请求
        publishComment(comment, mid)
            .then(async (res) => {
            if (res.message === 'ok') {
                console.log('Send')
            }
        })
        .catch((err) => {
            alert(err)
        })
    }
    
    // 点赞帖子
    const PressLike = () => {
        console.log("Like")  
        
        // 1. 点赞按钮样式变化
        if(color === MD3Colors.error60) {
            setColor(MD3Colors.neutral100)
            setCollectNum(likeNum - 1)
        } else if (color === MD3Colors.neutral100) {
            setColor(MD3Colors.error60)
            setCollectNum(likeNum + 1)
        }

        // 2. 向后端发送请求，修改
        like(mid)
            getData().then(async (res) => {
                if (res.message === 'ok') {
                    console.log('Like')
        }
        })
        .catch((err) => {
            alert(err)
        }) 
    }

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef}>  
                <LinearGradient 
                colors={['#727480','#454653']} 
                style={styles.backgroud}>

                {/* 文物图片 */}
                <Image source={require('../../assets/2.jpg')} style={styles.imageStyle}/>
                {/* <Image source={{uri:imageUrl}} style={styles.imageStyle}/> */}
                 
                {/* 跳转按钮*/}
                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    style={styles.buttonsStyle}
                    buttons={[
                        {
                            value:'文物描述',
                            label:'发 现',
                        },
                        {
                            value:'文物详解',
                            label:'留 言',
                        }
                    ]}
                    onSegmentBtnPress={(btn,index)=>{}}
                /> 

                {/* 文字显示 */}
                <Text style={styles.Titlefont}>
                    Title
                    {/* {title} */}
                    <Text style={styles.textStyle}>
                        {/* {pcontent}  */}
                        {'\r\n\n'}北宋(公元960—1127年)
                        汝窑窑址在今河南宝丰清凉寺，以烧造青釉瓷器著称，是继定窑之后又一为宫廷烧造贡瓷的窑场。
                        其产品胎体细洁如香灰色，多为“裹足支烧”。釉色主要为天青色，釉层薄而莹润，釉泡大而稀疏，
                        有“寥若晨星”之称。釉面有细小的开片纹，称为“冰裂纹”。
                    </Text>
                </Text>
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
                    contentStyle={{color:'#fffaf0'}}
                    value={commment}
                    onChangeText={(val) => setComment(val)}
                />

                <Button
                    mode='contained'
                    buttonColor='#808080'
                    style={{top:-5,left:10}}
                    onPress={() => publishComment()}>
                    <Text style={styles.buttonTxt}>Send</Text>
                </Button>

                <IconButton
                    icon='heart-outline'
                    iconColor='#EEEEEE'
                    size={30}
                    style={styles.iconStyle}
                    onPress={() => PressLike()}
                />
                <Text style={{top:-22,color:'#EEEEEE'}}>{props.likeNum}</Text>
                
            </View>
        </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent:'center',
    },
    backgroud:{
        width:Dimensions.get('window').width,
        // height:Dimensions.get('window').heigth-50,
        flex:1,
    },
    imageStyle:{
        width:300,
        height:300,
        alignContent: 'center',
        marginLeft:50,   //页边距
        marginRight:50,
        top: 50,         //和页面顶部的距离
        borderRadius: 10,
    },
    buttonsStyle: {
        marginTop:80,
        marginLeft:65,
        marginRight:65,
    },
    Titlefont: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft:65,
        marginRight:65,
        marginTop:20,  
        marginVertical:20,
    },
    textStyle: {
        fontSize:12,
        color:'#d3d3d3',
    },
    bottombar:{
        width:Dimensions.get('window').width,
        height:110,
        backgroundColor:'#3A3A3A',
        flexDirection:'row',   //子组件水平排列，默认水平居中
        justifyContent:'center',  //子组件之间有间隔 
        alignItems:'center'   
    },
    inputStyle: {  //这里指的是输入内容的样式
        top:-22,
        width:200,
        backgroundColor:'#c0c0c0',
        textColor:'#696969',
        height:35,   //height设置过小导致文字显示不全，添加paddingVertical=0也无效,改小字体大小
        fontSize:12,
        borderRadius:5,
        boderColor:'#c0c0c0'
    },
    iconStyle:{
        top:-22,
    }
  })

  export default HeritageDiscover

