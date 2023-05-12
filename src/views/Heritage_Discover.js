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

const Heritage_Discover = (props) => {

    // const myRef = useRef<HTMLDivElement>(null)

    // const next = () => {
    //     if (myRef.current) {
    //       window.scrollTo(0, myRef.current.offsetTop || 0)
    //     }
    //     setCurrent(current + 1)      //这步是其中的点击下一步跳转到下一步的页面，没有这个需要的不要写
    // }

    const[value, setValue] = React.useState('')

    const scrollViewRef = useRef('')
    const handleScrollTo = (y) => {
        scrollViewRef.current.scrollTo({ y: y, animated: true })
    }

    const PressLike = () => {
        console.log("Like")    
    }

    const PressBookmark = () => {
        console.log("Bookmark")
    }

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef}>  
                <LinearGradient 
                colors={['#727480','#454653']} 
                style={styles.backgroud}>

                {/* 文物图片 */}
                <Image source={require('../../assets/2.jpg')} style={styles.imageStyle}/>
                 
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
                    {/* 文物名称 */}
                    汝窑天青釉盘
                    <Text style={styles.textStyle}>
                        {/* 描述 */}
                        {'\r\n\n'}北宋(公元960—1127年)
                        汝窑窑址在今河南宝丰清凉寺，以烧造青釉瓷器著称，是继定窑之后又一为宫廷烧造贡瓷的窑场。
                        其产品胎体细洁如香灰色，多为“裹足支烧”。釉色主要为天青色，釉层薄而莹润，釉泡大而稀疏，
                        有“寥若晨星”之称。釉面有细小的开片纹，称为“冰裂纹”。
                    </Text>
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
                    onPress={() => PressLike()}
                />
                <Text style={{top:-22,color:'#EEEEEE'}}>1157</Text>
                <IconButton
                    icon="star-outline"
                    iconColor='#EEEEEE'
                    size={30}
                    style={styles.iconStyle}
                    onPress={() => PressBookmark()}
                />
                <Text style={{top:-22,color:'#EEEEEE'}}>394</Text>
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

  export default Heritage_Discover

