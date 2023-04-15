import {Platform, StyleSheet, Text, View, TextInput, Button, Alert, Fetch, Dimensions} from 'react-native';
import React,{useState} from 'react';

const register=(props)=>{
  const [username,setUsername]=useState('')
  const [pwd,setPwd]=useState('')
  const [pwdSecond,setPwdSecond]=useState('')
  const [isDisable,setIsDisable]=useState(true)

const onregister=()=>{ //点击注册按钮打印用户名和密码
  console.log(username);
  console.log(pwd);
}
  
  //方法 提交
  const submit = () => {
    if (!username || !username.trim()) {
      Alert.alert('请输入用户名');
      return;
    }

    if (!pwd || !pwd.trim()) {
      Alert.alert('请输入密码');
      return;
    } 
    if (!pwdSecond || !pwdSecond.trim()) {
      Alert.alert('请输入密码');
      return;
    }
    if(!(pwd==pwdSecond)){
      Alert.alert('请确认输入密码是否一致');
      return; 
    } 
    props.navigation.navigate('Details')

  }


    return (
      <View style={styles.container}>
        
        <Text style={[styles.Titlefont]}>注 册</Text>
        <TextInput 
          style = {styles.inputStyle}
          placeholder='用户名'
          value = {username}
          onChangeText = {(val) => setUsername(val)}
        />

        <TextInput 
          style = {styles.inputStyle}
          placeholder='密码'
          value = {pwd}
          // 隐藏输入
          secureTextEntry = {true}
          // 调用数字键盘
          //keyboardAppearance='number-pad'
          onChangeText = {(val) => setPwd(val)}
          // 允许多行文本输入
          // multiline = {true}
          // numberOfLines={10}
          //控制占位符在上方,Android和ios显示保持一致
          //textAlignVertical='top'
        />

        <TextInput 
          style = {styles.inputStyle}
          placeholder='请再次输入密码'
          value = {pwdSecond}
          secureTextEntry = {true}
          onChangeText = {(val) => setPwdSecond(val)}
        />
      
        <Button 
          // style = {styles.buttonStyle}
          title='注 册'
          color='#dcdcdc'
          onPress={() => onregister()}
        />

        <Text style={[styles.Contentfont]}>已有账号？登录</Text>
      </View>
    );
  
    }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    alignItems : 'center'
  },
  Titlefont: {
    fontSize: 60,
    color: '#fffaf0',
  },
  inputStyle:{
    color:'#f0f8ff',
    width: Dimensions.get('window').width-1000,
    margin : 10,
    borderWidth:1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
    height: '10%'
 },
 buttonStyle: {
  borderRadius: 10,
  borderColor: '#dcdcdc',
}
})

export default register
