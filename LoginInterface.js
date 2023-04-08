import React,{Component}from'react';
import{View,TextInput,Button,Text}from 'react-native';
import SQLite from 'react-native-sqlite-storage';
//数据库名称需要修改
const db=SQLite.openDatabase({name:'databace.db',createFromLocation:'~databace.db'});

export default class LoginInterface extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            loginError:false,
        };
    }

    handleLogin=()=>{
        //处理登录逻辑
        const{username,password}=this.state;
        //验证用户名和密码是否正确,连接数据库
        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM users WHERE NAME=? AND password=?',[username,password],(tx,results)=>{
                if(results.rows.length>0){
                    //登录成功
                    alert("登录成功");
                    this.setState({ loginError: false }); // Reset loginError state variable
                }else{
                    //登录失败
                    alert("用户名或密码不正确");
                    this.setState({ loginError: true }); // Set loginError state variable to true
                }
            })
        })
    };
    render(){
        const{loginError}=this.state;
        return(
            <view>
                <TextInput
                    placeholder="请输入用户名"
                    onChangeText={(text)=>{
                        this.setState({username:text});
                    }}
                    />
                    <TextInput
                    placeholder="请输入密码"
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({password:text});
                    }}
                    />
                    <Button title="登录" onPress={this.handleLogin}/>
            </view>
        )
    };
}