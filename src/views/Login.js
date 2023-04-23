import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions
} from 'react-native'
import React, { useState } from 'react'

const Login = (props) => {
  const [username, setUername] = useState('')
  const [pwd, setPwd] = useState('')
  // const [isDisable, setIsDisable] = useState(true)

  const onLogin = () => {
    //点击登录按钮打印用户名和密码
    console.log(username)
    console.log(pwd)
  }
  //方法 提交
  // Submit = () => {
  //   const   { username, pwdFirst,pwdSecond} = this.state;
  //   if (!username || !username.trim()) {
  //     Alert.alert('请输入用户名');
  //     return;
  //   }

  //   if (!pwdFirst || !pwdFirst.trim()) {
  //     Alert.alert('请输入密码');
  //     return;
  //   }
  //   if (!pwdSecond || !pwdSecond.trim()) {
  //     Alert.alert('请输入密码');
  //     return;
  //   }
  //   if(!(pwdFirst==pwdSecond)){
  //     Alert.alert('请确认输入密码是否一致');
  //     return;
  //   }
  //   this.props.navigation.navigate('Details')
  // }

  return (
    <View style={styles.container}>
      <Text>
        <a onClick={() => props.navigation.goBack()}>
          <Text>关闭</Text>
        </a>
      </Text>
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
        <a onClick={() => props.navigation.navigate('Register')}>
          <Text>注册</Text>
        </a>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    alignItems: 'center',
    flex: 1 // 布局
  },
  Titlefont: {
    fontSize: 30,
    color: '#fffaf0',
    fontFamily: 'SIMYOU'
  },
  inputStyle: {
    color: '#f0f8ff',
    width: Dimensions.get('window').width - 1000,
    margin: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
    height: '10%'
  },
  buttonStyle: {
    borderRadius: 10,
    borderColor: '#dcdcdc'
  }
})

export default Login
