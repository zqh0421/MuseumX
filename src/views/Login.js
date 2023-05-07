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

const Login = (props) => {
  const [username, setUername] = useState('')
  const [pwd, setPwd] = useState('')
  // const [isDisable, setIsDisable] = useState(true)

  const onLogin = () => {
    //点击登录按钮打印用户名和密码
    console.log(username)
    console.log(pwd)
    
    if (!username || !username.trim()) {
      Alert.alert('用户名不能为空')
      return
    }

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

      {/* <Text onPress={() => props.navigation.goBack()}>关闭</Text> */}
      <Text style={[styles.Titlefont]}>登  录</Text>

      {/* <KeyboardAvoidingView
        style={{flex:1}}
        behavior="padding"/> */}
        <TextInput
          mode='outlined'
          style={styles.inputStyle}
          placeholder="用户名"
          placeholderTextColor={'#808080'}
          textColor='#CCCCCC'
          outlineStyle={{borderRadius:7}}
          contentStyle={{paddingLeft:15}}
          outlineColor={'#CCCCCC'}
          activeOutlineColor={'#CCCCCC'}
          value={username}
          onChangeText={(val) => setUername(val)}
        />
      {/* </KeyboardAvoidingView> */}

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

      <Button
        // style = {styles.buttonStyle}
        mode='contained'
        buttonColor='#808080'
        style={styles.buttonStyle}
        onPress={() => onLogin()}>
        <Text style={styles.buttonTxt}>登    录</Text>
      </Button>

      {/* <TouchableOpacity style={styles.button}>
        <LinearGradient colors={['#727480','#d9d9d9']} style={styles.buttonbg}>
          <Text style={styles.buttontext}登录></Text>
        </LinearGradient>
      </TouchableOpacity> */}

      <Text style={{color:'#808080'}}>
        还没有账号？请先
        <Text style={styles.contentStyle} onPress={() => props.navigation.navigate('Register')}> 注 册</Text>
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