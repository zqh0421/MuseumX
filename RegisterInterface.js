import React,{Component}from'react';
import{View,TextInput,Button,Text}from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db=SQLite.openDatabase({name:'databace.db',createFromLocation:'~databace.db'});

export default class RegisterInterface extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            confirmPassword:'',
        };
    }
    handleRegister=()=>{
        //处理注册逻辑
        const{username,password,confirmPassword}=this.state;
        if(password!==confirmPassword){
            alert("两次密码不一致");
            return;
        }
        //验证用户名是否已经存在
        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM users WHERE username=?',[username],(tx,results)=>{
                if(results.row.length>0){
                    alert("用户名已存在");
                    return;
                }else{
                    tx.executeSql('INSERT INIO users (username,password) VALUES(?,?)',[username,password],(tx,results)=>{
                        alert("注册成功");
                    });
                }
            });
        });
    };
    render() {
        return (
          <View>
            <TextInput
              placeholder='请输入用户名'
              onChangeText={(text) => {
                this.setState({ username: text });
              }}
            />
            <TextInput
              placeholder='请输入密码'
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            <TextInput
              placeholder='请再次输入密码'
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ confirmPassword: text });
              }}
            />
            <Button title="注册" onPress={this.handleRegister}/>
          </View>
        );
      }
}