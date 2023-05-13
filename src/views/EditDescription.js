import { View, Text, StyleSheet, AppRegistry,Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, List, MD3Colors,TextInput} from 'react-native-paper';
import { editdescription } from '../api/editdescription';
const EditDescription= (props) => {
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
    }
  const handleonChangeTex = (value) =>{
    if(value.length <=100){
      setTitle(value);
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors = {['#727480','#454653']}
        style={styles.backgroud}>
        <Text style={styles.back} onPress={() => props.navigation.goBack()}>Cancel</Text>
        <Text style={styles.Name}> Edit description </Text>
        <Text style={styles.save} onPress={onPressSave}>Save</Text> 
          
         <TextInput
            style={styles.input}
            value={title}
            multiline={true}
            textAlignVertical="top"
            onChangeText={handleonChangeTex}
            maxLength={100}
         />
         <Text style={styles.length}> {title.length}/100 </Text>
      </LinearGradient>
    </View>
) }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    // alignItems: 'center',
    justifyContent:'center',
    // alignContent:'center',
    alignItems:'center',
    flex:1
  }  ,
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
    left: 20
  }, 
  Name: {
    fontSize: 15,
    position: 'absolute',
    color: '#CCCCCC',
    top: 20,
    left: 118,
    justifyContent: 'center',
    alignItems: 'center'
  },
  save: {
    fontSize: 15,
    color: '#CCCCCC',
    position: 'absolute',
    top: 20,
    right: 20
  }, 
  input: {
    top: 60,
    width: Dimensions.get('window').width -20,
    margin: 10,
    borderColor: '#CCCCCC',
    flex:1,
    paddingHorizontal: 5
  },
  length: {
    flex:1,
    top:50,
    left:300,
    color: '#CCCCCC',
  }
})
export default EditDescription;