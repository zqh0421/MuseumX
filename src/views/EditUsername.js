import { View, Text, StyleSheet, AppRegistry, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, List, MD3Colors,TextInput} from 'react-native-paper';
import { editUsername } from '../api/editUsername';
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
      }
    }
    return (
        <View style={styles.container}>
          <LinearGradient
            colors = {['#727480','#454653']}
            style={styles.backgroud}>
           
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
    lab: {
      fontSize: 10,
      position: 'absolute',
      top: 80,
      left: 10,
      color: '#CCCCCC'
    },
    input: {
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