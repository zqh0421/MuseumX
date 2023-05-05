import { View, Text, StyleSheet, AppRegistry } from 'react-native'
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
         <LinearGradient  
           colors = {['#3A3A3A','#525161']}
          style={styles.background}>
          <Text style={styles.back} onPress={() => props.navigation.goBack()}>Cancel</Text>
          <Text style={styles.Name}> EditDescription</Text>
          <Text style={styles.save} onPress={onPressSave}>Save</Text> 
            
           <Text style={styles.lab}> You can only change your description once in seven days</Text>
           <View style={styles.input}>
           <TextInput
              value={title}
              multiline={true}
              textAlignVertical="top"
              onChangeText={handleonChangeTex}
              maxLength={100}
           />
           <Text style={styles.length}> {title.length}/100 </Text>
           </View>

         </LinearGradient>
          
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#696969',
      // alignItems: 'center',
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
     
      top: 70,
      width: '90%',
      marginTop: 60,
      color: '#fff',

    },
    length: {
      top: 10,
      position: 'absolute',
      right: 10

    }
})
export default EditDescription;