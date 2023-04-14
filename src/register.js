import {Platform, StyleSheet, Text, View, TextInput, Button, Alert, Fetch, Dimensions, } from 'react-native';
import React from 'react';

export default class HomeScreen extends React.Component{
  
  //构造函数
  constructor(props){
    super(props);
    //初始化数据
    this.state={
        username:'',
        pwdFirst:'',
        pwdSecond:'',
        isDisable:true,
  }
  }
  //方法 提交
  Submit = () => {
    const   { username, pwdFirst,pwdSecond} = this.state;
    if (!username || !username.trim()) {
      Alert.alert('请输入用户名');
      return;
    }

    if (!pwdFirst || !pwdFirst.trim()) {
      Alert.alert('请输入密码');
      return;
    } 
    if (!pwdSecond || !pwdSecond.trim()) {
      Alert.alert('请输入密码');
      return;
    }
    if(!(pwdFirst==pwdSecond)){
      Alert.alert('请确认输入密码是否一致');
      return; 
    } 
    this.props. navigation.navigate('Details')

  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={[styles.Titlefont]}>注 册</Text>
        <TextInput 
          style = {styles.inputStyle}
          placeholder='用户名'
          value = {this.state.username}
          onChangeText = {(val) => this.setState({username:val})}
        />

        <TextInput 
          style = {styles.inputStyle}
          placeholder='密码'
          value = {this.state.pwdFirst}
          // 隐藏输入
          secureTextEntry = {true}
          // 调用数字键盘
          //keyboardAppearance='number-pad'
          onChangeText = {(val) => this.setState({pwdFirst:val})}
          // 允许多行文本输入
          // multiline = {true}
          // numberOfLines={10}
          //控制占位符在上方,Android和ios显示保持一致
          //textAlignVertical='top'
        />

        <TextInput 
          style = {styles.inputStyle}
          placeholder='请再次输入密码'
          value = {this.state.pwdSecond}
          secureTextEntry = {true}
          onChangeText = {(val) => this.setState({pwdSecond:val})}
        />
      
        <Button 
          style = {styles.buttonStyle}
          title='注 册'
          color='#dcdcdc'
          onPress={() => Alert.alert('Simple Button pressed')}
        />

        <Text style={[styles.Contentfont]}>已有账号？登录</Text>
      </View>
    );
  }
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
