import {
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    Pressable
  } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { List, MD3Colors, SegmentedButtons,TextInput,IconButton, } from 'react-native-paper'
import { render } from 'react-dom'
import { AntDesign } from '@expo/vector-icons'
import { postComment } from '../api/PostComment'
import { publishPostComment } from '../api/PublishPostComment'
import { postLike } from '../api/PostLike'
import { likeNum } from '../api/PostLikeNum'


const ListItem = (props) => {
    const [value, setValue] = useState('')
    const [mid, setMid] = useState(13) //帖子Id
    const [artifactName, setArtifactName] = useState('')
    const [author, setAuthor] = useState('')
    const [relicTime, setRelicTime] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [LikeNum, setLikeNum] = useState(50)
    const [color, setColor] = useState(props.isCollected ? MD3Colors.error60 : MD3Colors.neutral100)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    setMid(props.mid)
    setArtifactName(props.artifactName)
    setAuthor(props.author)
    setRelicTime(props.relicTime)
    setImageUrl(props.imageUrl)
    setDescription(props.description)

    useEffect(() => {
        // 上一个页面传递的参数:帖子id, 文物名称,作者,时间,描述,图片
        

        // 获取帖子点赞数
        likeNum(mid).then(res => {
            if(res.message === 'ok' && res.data.data){
                console.log(res)
                setLikeNum(res.data.data)
            }
            console.log(comments[0])  
        })
        
        // 获取帖子评论
        postComment(mid).then(res => {
            if(res.message === 'ok' && res.data.data){
                console.log(res)
                setComments(res.data.data)
            }
            console.log(comments[0])            
        })   
    }, [])


    // 帖子点赞
    const onPressLike= () => {
        console.log('PressedCollect')
        // 1. 点赞按钮样式变化
        if (color === MD3Colors.error60) {
            setColor(MD3Colors.neutral100)
            setLikeNum(LikeNum-1)
        }
        else if (color === MD3Colors.neutral100) {
            setColor(MD3Colors.error60)
            setLikeNum(LikeNum+1)
        }
        // 2. 向后端发送请求
        postLike(mid).then(async res => { 
            if (res.message === 'ok') { // TODO: 判断登录成功的条件根据实际接口修改！
                console.log("PressedLike")
            }
          }).catch(err => {
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
                <Image source={{ uri: imageUrl }} style={styles.imageStyle}/>
                 
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
                    {artifactName}
                    <Tect style={styles.textStyle}>Author : {author}</Tect>    
                    <Tect style={styles.textStyle}>Dynasty : {author}</Tect> 
                </Text>

                <Text style={styles.Titlefont}>
                    留言
                    <Text style={styles.textStyle}>
                        {'\r\n\n'}暂无留言
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
                    onChangeText={(text) => setText()}
                />
                <IconButton
                    icon='heart-outline'
                    iconColor='#EEEEEE'
                    size={30}
                    style={styles.iconStyle}
                    onPress={() => onPressLike()}
                />
                {/* 点赞数 */}
                <Text style={{color:'#EEEEEE', top: -8}}>{LikeNum}</Text>  
            </View>
        </View>
    )

}

const Heritage_Discover = (props) => {

    const [isRefreshing, setIsRefreshing] = useState(false)  //正在加载数据
    const [isError, setIsError] = useState(true)  //数据加载错误

    const RefreshingContent = () => {
        <View
            style={{
                alignItems:'center',
                justifyContent:'center',
                flex:1
            }}
        >
            <Text style={{color:"white"}}>加载中</Text>
        </View>
    }

    const EmptyContent = () => {
        <View
            style={{
                alignItems:'center',
                justifyContent:'center',
                flex:1
            }}
        >
            <AntDesign name="frowno" color="white" size={50}/>
            <Text style={{color:"white", marginTop:15}}>暂无内容</Text>
        </View>
    }

    const loadDate = () => {
        setIsError(false)
        setIsRefreshing(true)
        setTimeout(() => {
            //加载成功
            setIsRefreshing(false)
        }, 800)
    }

    const onPressRefresh = () => {
        loadDate()
    }

    const ErrorContent = () => {
        return(
            <View
                style={{
                    alignItems:'center',
                    justifyContent:'center',
                    flex:1
                }}
            >
                <Pressable
                    onPress={onPressRefresh}
                    style={{
                        width:150,
                        height:50,
                        borderRadius:25,
                        borderWidth:1,
                        boderColor:"#ffdcb2",
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Text
                        style={{
                            color:"#ffdcb2",
                            fontSize:18
                        }}
                    >
                        刷新重试
                    </Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View>
            <Text style={{position: 'absolute',top: 20,left: 20}}>文 物</Text>
            {isError === false && isRefreshing === false &&(
                <View>
                    <ListItem/>
                </View>
            )}
            {isError === false && isRefreshing === true && <RefreshingContent/>}
            {isError === true && <ErrorContent/>}
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
        flexDirection:'row',      //子组件水平排列，默认水平居中
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

  export default Heritage_Discover

