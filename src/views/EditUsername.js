import { View, Text, StyleSheet, AppRegistry, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, List, MD3Colors,TextInput} from 'react-native-paper';
import { editUsername } from '../api/editUsername';
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditUsername = (props) =>{
    const [newname, setnewname] = useState('');
    const [oldname, setoldname] = useState('');
    const [password, setpassword] = useState('');
    
    const getData = async () => {
      try{
        const jsonValue = await AsyncStorage.getItem('userData')
        return jsonValue !== null ? JSON.parse(jsonValue) : null
        console.log('userData')
      }catch(e){
  
      }
    }

    const onPressSave = () => {
      console.log("newAccount:",newname)
      console.log("userAccount:",oldname)
      console.log("password:",password)
      console.log()
      getData().then(userData => {
        // console.log(userData)
        if (userData) {
          editUsername(userData.data, newname, oldname, password).then(res => {
            if (res.code === 0) { // 数据获取成功
              console.log(res.data.data)
              console.log('修改用户名成功')
              props.navigation.goBack()
            }
          })
        }else{
          console.log("无法修改，先登录")
          props.navigation.navigate("Login")
        }
      }).catch(err=>{
        console.log(err)
      })
    }
    
    return (
        <View style={styles.container}>
          <LinearGradient
            colors = {['#727480','#454653']}
            style={styles.backgroud}>
            <Text style={styles.back} onPress={() => props.navigation.goBack()}>Cancel</Text>
            <Text style={styles.Name}> Edit Name</Text>
            <Text style={styles.save} onPress={onPressSave}>Save</Text> 
            <TextInput
              mode='outlined'
              // right={<TextInput.Affix text="/100" />}
              // right={<TextInput.Icon icon="eye" />}
              style={styles.inputStyle}
              placeholder="新的用户名"
              placeholderTextColor={'#808080'}
              textColor='#CCCCCC'
              outlineStyle={{borderRadius:7}}
              contentStyle={{paddingLeft:15}}
              outlineColor={'#CCCCCC'}
              activeOutlineColor={'#CCCCCC'}
              value={newname}
              onChangeText={(val) => setnewname(val)}
            />
            <TextInput
              mode='outlined'
              // right={<TextInput.Affix text="/100" />}
              // right={<TextInput.Icon icon="eye" />}
              style={styles.inputStyle}
              placeholder="旧的用户名"
              placeholderTextColor={'#808080'}
              textColor='#CCCCCC'
              outlineStyle={{borderRadius:7}}
              contentStyle={{paddingLeft:15}}
              outlineColor={'#CCCCCC'}
              activeOutlineColor={'#CCCCCC'}
              value={oldname}
              onChangeText={(val) => setoldname(val)}
            />
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
              value={password}
              onChangeText={(val) => setpassword(val)}
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
    
    inputStyle: {
      top: 100,
      width: Dimensions.get('window').width -20,
      margin: 10,
      color: '#CCCCCC',
      paddingHorizontal: 5

    }
})

export default EditUsername