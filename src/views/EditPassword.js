import { View, Text, StyleSheet, AppRegistry, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, List, MD3Colors,TextInput} from 'react-native-paper';
import { editpasswordInterface } from '../api/editpasswordInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditPassword = (props) => {
    const [newpassword, setnewpassword] = useState('');
    const [oldname, setoldname] = useState('');
    const [password, setpassword] = useState('');
    const onPressSave = async () => {
      // 提交到后端
      //alert(newname)
      console.log(newpassword)
      console.log(oldname)
      console.log(password)
      const userData = await AsyncStorage.getItem('userData')
      console.log("userData", JSON.parse(userData)?.data)
      if (userData) {
        editpasswordInterface(JSON.parse(userData).data, newpassword, oldname, password).then(res => {
          if (res.message === 'ok') {
            // TODO: 弹出修改成功提示，返回profile页
            console.log('修改成功')
            props.navigation.goBack()
          }
        }).catch(err => {
          alert(err)
        })
      } else {
        // 跳转登录
        props.navigation.navigate('Login')
      }
    }
    return (
        <View style={styles.container}>
          <LinearGradient
            colors = {['#727480','#454653']}
            style={styles.backgroud}>
            <Text style={styles.back} onPress={() => props.navigation.goBack()}>Cancel</Text>
            <Text style={styles.Name}> Edit Password</Text>
            <Text style={styles.save} onPress={onPressSave}>Save</Text> 
            <TextInput
                mode='outlined'
                style={styles.inputStyle}
                placeholder="新的密码"
                placeholderTextColor={'#808080'}
                textColor='#CCCCCC'
                outlineStyle={{borderRadius:7}}
                contentStyle={{paddingLeft:15}}
                outlineColor={'#CCCCCC'}
                activeOutlineColor={'#CCCCCC'}
                value={newpassword}
                onChangeText={(value) => setnewpassword(value)}
            />
            <TextInput
                mode='outlined'
                style={styles.inputStyle}
                placeholder="旧的用户名"
                placeholderTextColor={'#808080'}
                textColor='#CCCCCC'
                outlineStyle={{borderRadius:7}}
                contentStyle={{paddingLeft:15}}
                outlineColor={'#CCCCCC'}
                activeOutlineColor={'#CCCCCC'}
                value={oldname}
                onChangeText={(value) => setoldname(value)}
            />
            <TextInput
                mode='outlined'
                style={styles.inputStyle}
                placeholder="原始密码"
                placeholderTextColor={'#808080'}
                textColor='#CCCCCC'
                outlineStyle={{borderRadius:7}}
                contentStyle={{paddingLeft:15}}
                outlineColor={'#CCCCCC'}
                activeOutlineColor={'#CCCCCC'}
                value={password}
                onChangeText={(value) => setpassword(value)}
            />
            
          </LinearGradient>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#696969',
        // alignItems: 'center',
        justifyContent:'center',
        // alignContent:'center',
        alignItems:'center',
        flex:1
    },
    backgroud:{
      // justifyContent:'center',
      // alignContent:'center',
      // alignItems:'center',
      flex:1
    },
    back: {
      fontSize: 15,
      position: 'absolute',
      color: '#CCCCCC',
      top: 20,
      left: 20,
      
    }, 
    Name: {
      justifyContent: 'center',
      fontSize: 15,
      position: 'absolute',
      color: '#CCCCCC',
      top: 20,
      left: 130,
      alignItems: 'center'
    },
    save: {
      fontSize: 15,
      color: '#CCCCCC',
      position: 'absolute',
      top: 20,
      right: 20
    }, 
    inputStyle: {
      top: 100,
      width: Dimensions.get('window').width -20,
      margin: 10,
      color: '#CCCCCC',
      paddingHorizontal: 5

    },
    length: {
      top: 90,
      position: 'absolute',
      flex:1,
      left:300,
      color: '#CCCCCC'
    }
})
export default EditPassword;