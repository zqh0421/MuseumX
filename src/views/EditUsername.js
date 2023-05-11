import { View, Text, StyleSheet, AppRegistry, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, List, MD3Colors,TextInput} from 'react-native-paper';
const EditUsername = (props) => {
    const [title, setTitle] = useState('');
    const onPressSave = () => {
        // 提交到后端
        alert(title)
      }
    const handleonChangeTex = (value) =>{
      if(value.length <=14){
        setTitle(value);
      }
    };
    return (
        <View style={styles.container}>
           
            <Text style={styles.back} onPress={() => props.navigation.goBack()}>Cancel</Text>
            <Text style={styles.Name}> Edit Name</Text>
            <Text style={styles.save} onPress={onPressSave}>Save</Text> 
              
             <Text style={styles.lab}> You can only change your name once in seven days</Text>
             <TextInput
                style={styles.input}
                value={title}
                // onChangeText={title => setTitle(title)}
                onChangeText={handleonChangeTex}
                maxLength={14}
             />
             <Text style={styles.length}> {title.length}/14 </Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent:'center',
        // alignContent:'center',
        alignItems:'center',
        flex:1
    },
    back: {
      fontSize: 15,
      position: 'absolute',
      top: 20,
      left: 20,
      
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
        top: 100,
        width: Dimensions.get('window').width -20,
        margin: 10,
        borderColor: 'red',
        paddingHorizontal: 5

      },
      length: {
        top: 30,
        flex:1,
        left:150

      }
})
export default EditUsername