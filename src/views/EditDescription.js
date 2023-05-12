import { View, Text, StyleSheet, AppRegistry,Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, List, MD3Colors,TextInput} from 'react-native-paper';

const EditDescription= (props) => {
  const [title, setTitle] = useState('');
  const onPressSave = () => {
      // 提交到后端
      alert(title)
    }
  const handleonChangeTex = (value) =>{
    if(value.length <=100){
      setTitle(value);
    }
  };
  return (
    <View style={styles.container}>
       
        <Text style={styles.back} onPress={() => props.navigation.goBack()}>Cancel</Text>
        <Text style={styles.Name}> Edit description </Text>
        <Text style={styles.save} onPress={onPressSave}>Save</Text> 
          
         <Text style={styles.lab}> You can only change your description once in seven days</Text>
         <TextInput
            style={styles.input}
            value={title}
            multiline={true}
            textAlignVertical="top"
            onChangeText={handleonChangeTex}
            maxLength={100}
         />
         <Text style={styles.length}> {title.length}/100 </Text>
        
    </View>
) }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent:'center',
    // alignContent:'center',
    alignItems:'center',
    flex:1
  }  ,
  background: {
      justifyContent:'center',
      // alignContent:'center',
      alignItems:'center',
      flex:1
    },
    back: {
      fontSize: 15,
      position: 'absolute',
      top: 20,
      left: 20
    }, 
    Name: {
      fontSize: 15,
      position: 'absolute',
      top: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    save: {
      
      fontSize: 15,
      position: 'absolute',
      top: 20,
      right: 20
    }, 
    lab: {
      fontSize: 10,
      position: 'absolute',
      top: 80,
      left: 10,
      color: '#696969'
    },
    input: {
      top: 60,
      width: Dimensions.get('window').width -20,
      margin: 10,
      borderColor: 'red',
      flex:1,
      paddingHorizontal: 5
    },
    length: {
      flex:1,
      top:50,
      left:150,
    }
})
export default EditDescription;