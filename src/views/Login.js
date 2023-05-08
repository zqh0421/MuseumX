import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput,Button, } from 'react-native-paper'

import { login } from '../api/L_RInterface'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Login = (props) => {
  const [username, setUername] = useState('')
  const [pwd, setPwd] = useState('')
  // const [isDisable, setIsDisable] = useState(true)

  const onLogin = () => {
    //点击登录按钮打印用户名和密码
    console.log(username)
    console.log(pwd)
    login(username, pwd).then(async res => {
      if (res.message === 'ok') { // TODO: 判断登录成功的条件根据实际接口修改！
        try {
          const jsonValue = JSON.stringify(res)
          await AsyncStorage.setItem('userData', jsonValue)
          console.log('userData')
          console.log(await AsyncStorage.getItem('userData'))
          props.navigation.goBack()
        } catch (e) {
          // saving error
        }
      }
    }).catch(err => {
      alert(err)
    })
  }
  //方法 提交
  // Submit = () => {
  //   const   { username, pwdFirst,pwdSecond} = this.state;
  //   if (!username || !username.trim()) {
  //     Alert.alert('请输入用户名');
  //     return;
  //   }

    if (!pwd || !pwd.trim()) {
      Alert.alert('密码不能为空')
      return
    }
  }

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#3A3A3A','#525161']}
        style={styles.backgroud}>

        <Text onPress={() => props.navigation.goBack()}>关闭</Text>
        <Text style={[styles.Titlefont]}>登 录</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="用户名"
          value={username}
          onChangeText={(val) => setUername(val)}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="密码"
          value={pwd}
          // 隐藏输入
          secureTextEntry={true}
          // 调用数字键盘
          //keyboardAppearance='number-pad'

          onChangeText={(val) => setPwd(val)}
        // 允许多行文本输入
        // multiline = {true}
        // numberOfLines={10}
        //控制占位符在上方,Android和ios显示保持一致
        //textAlignVertical='top'
        />

        <Button
        // style = {styles.buttonStyle}
          title="登 录"
          color="#dcdcdc"
          onPress={() => onLogin()}
        />

        <Text style={[styles.Contentfont]}>
        还没有账号？请先
          <Text onPress={() => props.navigation.navigate('Register')}>注册</Text>
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

export default Login