import {
    StyleSheet,
    Text,
    View,
    Button,
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
import { List, MD3Colors, SegmentedButtons, TextInput, IconButton, Surface}  from 'react-native-paper';
import { render } from 'react-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collect_number } from '../api/CollectNumber'
import { collect } from '../api/Collect'
import { artifact } from '../api/ArtifactInfo'
import { artifactComment } from '../api/ArtifactComment';
import { publishComment } from '../api/PublishComment';


const ListItem = (props) => {
    const [value, setValue] = useState('')
    const [artifactID, setArtifactID] = useState(16)
    const [artifactName, setArtifactname] = useState('')
    const [author, setAuthor] = useState('')
    const [relicTime, setRelicTime] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [collectNum, setCollectNum] = useState(50)
    const [color, setColor] = useState(props.isCollected ? MD3Colors.error60 : MD3Colors.neutral100)
    
    const [comments, setComments] = useState([])

    useEffect(() => {
        // 获取当前文物信息，请求参数：id
        artifact(artifactID).then(async res => { 
            if (res.message === 'ok') { // TODO: 判断登录成功的条件根据实际接口修改！
                setArtifactID(res.data.id)
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
            if(res.message === 'ok'){
                setComments(res.data.data)
            }
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

    // // 发表评论
    // const publishComment = () => {
    //     console.log(comment)

    //     // 向后端发送请求
    //     publishComment(artifactID, comment).then(async res => {
    //         if (res.message === 'ok') { // TODO: 判断登录成功的条件根据实际接口修改！
    //             console.log("PressedCollect")
    //         }
    //       }).catch(err => {
    //         alert(err)
    //     })

    // }

    

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
                
                {/* 文字显示 */}
                <Text style={styles.Titlefont}> 
                    {artifactName}
                    <Text style={styles.textStyle}>
                        {'\r\n\n'}Author : {author}
                        {'\r\n\n'}Dynasty : {relicTime}
                    </Text>
                </Text>

                <Text style={styles.Titlefont}>
                    Description
                    <Text style={styles.textStyle}>
                        {'\r\n\n'}{description}
                    </Text>
                </Text>

                {/* <Text style={styles.Titlefont}>
                    Comments
                    <Text style={styles.textStyle}>{userID} </Text>
                    <Text style={styles.textStyle}>{comment}</Text>
                </Text> */}
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
                    value = {commentContent}
                    onChangeText={(comment) => publishComment(comment)}
                />
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
                {/* id = 16 */}
                <Text style={{color:'#EEEEEE', top: -8}}>
                    {collectNum}
                </Text>  
            </View>

            
            
        </SafeAreaView>
    )
}

const Heritage_Details = (props) => {

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
        position: 'absolute',
        bottom: 0,
        width:Dimensions.get('window').width,
        height:80,
        backgroundColor:'#3A3A3A',
        flexDirection:'row',      //子组件水平排列，默认水平居中
        justifyContent:'center',  
        alignItems:'center'   
    },
    inputStyle: {  //这里指的是输入内容的样式
        width:200,
        backgroundColor:'#c0c0c0',
        textColor:'#696969',
        height:35,   //height设置过小导致文字显示不全，添加paddingVertical=0也无效,改小字体大小
        fontSize:12,
        borderRadius:5,
        top: -10        
    },
    surface: {
        padding: 8,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
  
  

