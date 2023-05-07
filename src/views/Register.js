import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert
} from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import { validate } from 'react-native-web/dist/cjs/exports/StyleSheet/validate';
import { TextInput,Button, } from 'react-native-paper'

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwdSecond, setPwdSecond] = useState('')
  // const [isDisable, setIsDisable] = useState(true)

  const onRegister = () => {
    //点击注册按钮打印用户名和密码
    console.log(username)
    console.log(pwd)
    console.log(pwdSecond)

    if (!username || !username.trim()) {
      Alert.alert('用户名不能为空')
      return
    }

    if (!pwd || !pwd.trim()) {
      Alert.alert('密码不能为空')
      return
    }

    if (!pwdSecond || !pwdSecond.trim()) {
      Alert.alert('请再次输入密码')
      return
    }    
  }

  return (
    <View style={styles.container}>
      
      <LinearGradient 
      colors = {['#3A3A3A','#525161']}
      style={styles.backgroud}>

      {/* <Text onPress={() => props.navigation.goBack()}>关闭</Text> */}
      <Text style={[styles.Titlefont]}>注 册</Text>
      
      <TextInput
        mode='outlined'
        // right={<TextInput.Affix text="/100" />}
        // right={<TextInput.Icon icon="eye" />}
        style={styles.inputStyle}
        placeholder="用户名"
        placeholderTextColor={'#808080'}
        textColor='#CCCCCC'
        outlineStyle={{borderRadius:7}}
        contentStyle={{paddingLeft:15}}
        outlineColor={'#CCCCCC'}
        activeOutlineColor={'#CCCCCC'}
        value={username}
        onChangeText={(val) => setUsername(val)}
      />
      <TextInput
        mode='outlined'
        // right={<TextInput.Affix text="/100" />}
        // right={<TextInput.Icon icon="eye" />}
        style={styles.inputStyle}
        placeholder="密码"
        placeholderTextColor={'#808080'}
        textColor='#CCCCCC'
        outlineStyle={{borderRadius:7}}
        contentStyle={{paddingLeft:15}}
        outlineColor={'#CCCCCC'}
        activeOutlineColor={'#CCCCCC'}
        value={pwd}
        secureTextEntry={true}   // 隐藏输入
        onChangeText={(val) => setPwd(val)}
      />
      <TextInput
        mode='outlined'
        // right={<TextInput.Affix text="/100" />}
        // right={<TextInput.Icon icon="eye" />}
        style={styles.inputStyle}
        placeholder="确认密码"
        placeholderTextColor={'#808080'}
        textColor='#CCCCCC'
        outlineStyle={{borderRadius:7}}
        contentStyle={{paddingLeft:15}}
        outlineColor={'#CCCCCC'}
        activeOutlineColor={'#CCCCCC'}
        value={pwdSecond}
        secureTextEntry={true}   // 隐藏输入
        onChangeText={(val) => setPwdSecond(val)}
      />

      <Button
        // style = {styles.buttonStyle}
        mode='contained'
        buttonColor='#808080'
        style={styles.buttonStyle}
        onPress={() => onRegister()}>
        <Text style={styles.buttonTxt}>注    册</Text>
      </Button>

      {/* <Text style={[styles.Contentfont]}>已有账号？登录</Text> */}
      <Text style={{color:'#808080'}}>
        已有账号？
        <Text style={styles.contentStyle} onPress={() => props.navigation.navigate('Login')}>登 录</Text>
      </Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1 // 布局
  },
  backgroud:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  Titlefont: {
    fontSize: 30,
    color: '#fffaf0',
    fontFamily:'SIMYOU',
    height:50
  },
  inputStyle: {
    backgroundColor:'#696969',
    width: 300,
    marginTop: 15,
    marginBottom:20,
  },
  buttonStyle: {
    height:50,
    width:200,
    justifyContent:'center',
    marginBottom:30,
    marginTop:20,
    borderRadius: 7,
    
  },
  buttonTxt:{
    textAlign: 'center',
    color:'#fffaf0',
		fontSize:18,
  },
  contentStyle:{
    textDecorationLine:'underline',
    color:'#fffaf0',
  },
})

export default Register
