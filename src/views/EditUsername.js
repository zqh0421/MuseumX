import { View, Text, StyleSheet, AppRegistry, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, List, MD3Colors,TextInput} from 'react-native-paper';
<<<<<<< Updated upstream
import { editUsername } from '../api/editUsername';
const EditUsername = (props) => {
    const [title, setTitle] = useState('');
    const onPressSave = () => {
        // 提交到后端
        if (title) {
          editUsername(title)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            alert(err)
          })
        }

        alert(title)
=======
import { editnameInterface } from '../api/editnameInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditUsername = (props) => {
    const [oldname, setoldname] = useState('');
    const [newname, setnewname] = useState('');
    const [password, setpassword] = useState('');
    const onPressSave = async () => {
      // 提交到后端
      // console.log(newname)
      // console.log(oldname)
      // console.log(password)
      const userData = await AsyncStorage.getItem('userData')
      // console.log("userData", JSON.parse(userData)?.data)
      if (userData) {
        editnameInterface(JSON.parse(userData).data, newname, oldname, password).then(res => {
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
>>>>>>> Stashed changes
      }
    }
    return (
        <View style={styles.container}>
          <LinearGradient
            colors = {['#727480','#454653']}
            style={styles.backgroud}>
<<<<<<< Updated upstream
           
            <Text style={styles.back} onPress={() => props.navigation.goBack()}>Cancel</Text>
            <Text style={styles.Name}> Edit Name</Text>
            <Text style={styles.save} onPress={onPressSave}>Save</Text> 
              
             <Text style={styles.lab}> You can only change your name once in seven days</Text>
             <TextInput
                style={styles.input}
                value={title}
                onChangeText={handleonChangeTex}
                maxLength={14}
             />
             <Text style={styles.length}> {title.length}/14 </Text>
=======
            <Text style={styles.back} onPress={() => props.navigation.goBack()}>Cancel</Text>
            <Text style={styles.Name}> Edit Name</Text>
            <Text style={styles.save} onPress={onPressSave}>Save</Text> 
            <TextInput
                mode='outlined'
                style={styles.inputStyle}
                placeholder="新的用户名"
                placeholderTextColor={'#808080'}
                textColor='#CCCCCC'
                outlineStyle={{borderRadius:7}}
                contentStyle={{paddingLeft:15}}
                outlineColor={'#CCCCCC'}
                activeOutlineColor={'#CCCCCC'}
                value={newname}
                onChangeText={(value) => setnewname(value)}
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
            
>>>>>>> Stashed changes
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
      fontSize: 15,
      justifyContent: 'center',
      position: 'absolute',
      color: '#CCCCCC',
      top: 20,
      left: 150,
      alignItems: 'center'
    },
    save: {
      fontSize: 15,
      color: '#CCCCCC',
      position: 'absolute',
      top: 20,
      right: 20
    }, 
<<<<<<< Updated upstream
    lab: {
      fontSize: 10,
      position: 'absolute',
      top: 80,
      left: 10,
      color: '#CCCCCC'
    },
    input: {
=======
    inputStyle: {
>>>>>>> Stashed changes
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
export default EditUsername