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
import { List, MD3Colors, SegmentedButtons, TextInput, IconButton, Surface, Button}  from 'react-native-paper';
import { render } from 'react-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Tab, Box, TabPanel} from '@mui/material/Tab';
import { collect_number } from '../api/CollectNumber'
import { collect } from '../api/Collect'
import { artifact } from '../api/ArtifactInfo'
import { artifactComment } from '../api/ArtifactComment';
import { publishComment } from '../api/PublishArtifactComment';


const ListItem = (props) => {
    const [value, setValue] = useState('')
    const [artifactName, setArtifactname] = useState('')
    const [author, setAuthor] = useState('')
    const [relicTime, setRelicTime] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [collectNum, setCollectNum] = useState(50)
    const [color, setColor] = useState(props.isCollected ? MD3Colors.error60 : MD3Colors.neutral100)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')


    useEffect(() => {
        // 获取当前文物信息，请求参数：id
        artifact(artifactID).then(async res => { 
            if (res.message === 'ok') { // TODO: 判断登录成功的条件根据实际接口修改！
                setArtifactname(res.data.artifactName)
                setAuthor(res.data.author)
                setRelicTime(res.data.relicTime)
                setDescription(res.data.description)
                setImageUrl(res.data.imageUrl)
                setCollectNum(res.data.collectNum)
            } else {
                alert("wrong")
            }
          }).catch(err => {
            alert(err)
          })
        
        // 获取当前文物所有评论和发表评论的用户信息,请求参数：id,
        // 评论的呈现方式：userID和content
        artifactComment(artifactID).then(res => {
            // console.log(res.data.data)
            if(res.message === 'ok' && res.data.data){
                console.log(res)
                setComments(res.data.data)
            }
            console.log(comments[0])            
        })   
    }, [])

    // 收藏
    const onPressCollect = () => {
        console.log('PressedCollect')

        // 1. 收藏按钮样式变化
        if (color === MD3Colors.error60) {
            setColor(MD3Colors.neutral100)
            setCollectNum(collectNum-1)
        }
        else if (color === MD3Colors.neutral100) {
            setColor(MD3Colors.error60)
            setCollectNum(collectNum+1)
        }

        // 2. 向后端发送请求，修改
        // 请求参数：id
        collect(artifactID).then(async res => { 
            if (res.message === 'ok') { // TODO: 判断登录成功的条件根据实际接口修改！
                console.log("PressedCollect")
                //setComment
            }
          }).catch(err => {
            alert(err)
        })   
    }

    // 发表评论
    const onPublish = () => {
        // 向后端发送请求
        publishComment(artifactID, comment).then(async res => {
            if (res.message === 'ok') { // TODO: 判断登录成功的条件根据实际接口修改！
                console.log("PublishComment")
            }
          }).catch(err => {
            alert(err)
        })

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>  
                <LinearGradient 
                style={styles.backgroud}
                colors={['#727480','#454653']}> 
                
                {/* 文物图片 */}
                <Image source={{ uri: imageUrl }} style={styles.imageStyle}/>

                {/* 跳转按钮 */}
                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    style={styles.buttonsStyle}
                    buttons={[
                        {
                            value:'文物描述',
                            label:'简 介',
                        },
                        {
                            value:'文物详解',
                            label:'详 解',
                        },
                        {
                            value:'用户留言',
                            label:'留 言',
                        },
                    ]}
                /> 


                {/* <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="简 介" value="1" />
                            <Tab label="详 解" value="2" />
                            <Tab label="留 言" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">{artifactName}</TabPanel>
                    <TabPanel value="2">{description}</TabPanel>
                    <TabPanel value="3">Comments</TabPanel>
                </TabContext>  */}
                
                {/* 文字显示 */}
                <Text style={styles.Titlefont}> 
                    {artifactName}
                    <Tect style={styles.textStyle}>Author : {author}</Tect>    
                    <Tect style={styles.textStyle}>Dynasty : {author}</Tect> 
                </Text>

                <Text style={styles.Titlefont}>
                    Description
                    <Text style={styles.textStyle}>{'\r\n\n'}{description}</Text>
                </Text>

                <Text style={styles.Titlefont}>Comments</Text>
                
                {/* <Text style={styles.textStyle}>{comments[0].userId}</Text>
                <Text style={styles.textStyle}>{comments[0].content}</Text> */} 
                
                <View>{
                    comments.map(item => {
                        return(
                            <Text>123</Text>
                        )
                    })
                }              
                </View> 

                <View style={{ backgroundColor: '#3a3a3a', height: 80}}></View>
                </LinearGradient>
            </ScrollView>
            
            {/* 评论输入框 */}
            <View style={styles.bottombar}>
                <TextInput
                    mode="outlined"
                    style={styles.inputStyle}
                    placeholder="发表评论..."
                    placeholderTextColor={'#ffffff'}
                    contentStyle={{color:'#fffaf0'}}
                    outlineColor={'#CCCCCC'}
                    activeOutlineColor={'#CCCCCC'}
                    value = {comment}
                    onChangeText={(val) => setComment(val)}
                />

                <Button mode="contained" color={'#3a3a3a'} style={{marginLeft:10,top:-5}} onPress={()=>onPublish()}>Send</Button>

                {/* 收藏 */}
                <IconButton
                    icon="star-outline"
                    iconColor={color}
                    size={30}
                    // onPress={() => console.log('Pressed')}
                    onPress={onPressCollect}
                    style={{ top: -8 }}
                />
                
                {/* 显示收藏数量 */}
                <Text style={{color:'#EEEEEE', top: -8}}>{collectNum}</Text>  

            </View>            
        </SafeAreaView>
    )
}

const Heritage_Details = (props) => {
    const {artifactId} = props.navigation.navigate.id
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
            setArtifactname(artifactName)
            setAuthor(author)
            setRelicTime(relicTime)
            setDescription(description)
            setImageUrl(imageUrl)
            setCollectNum(collectNum)
            setComments(comment)
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
            <ListItem />
        </View>
    )
    
}
export default Heritage_Details

  
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
        marginLeft: '8%',
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
        // marginTop: 30,
    },
    bottombar:{
        position: 'absolute',
        bottom: 0,
        width:Dimensions.get('window').width,
        height:80,
        backgroundColor:'#3A3A3A',
        flexDirection:'row',      //子组件水平排列，默认水平居中
        // justifyContent:'center',  
        alignItems:'center'   
    },
    inputStyle: {  //这里指的是输入内容的样式
        width:200,
        backgroundColor:'#c0c0c0',
        textColor:'#696969',
        height:35,   //height设置过小导致文字显示不全，添加paddingVertical=0也无效,改小字体大小
        fontSize:12,
        borderRadius:5,
        top: -10,
        marginLeft:20,    
    },
    buttonStyle2: {
        height:30,
        width:30,
        justifyContent:'center',
        marginBottom:30,
        marginTop:20,
        marginLeft:30,
        borderRadius: 7,
    },
    buttonTxt:{
        textAlign: 'center',
        color:'#d3d3d3',
        fontSize:20,
    },
})
  
  

