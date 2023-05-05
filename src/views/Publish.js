import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Pressable
} from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput } from 'react-native-paper';
const Publish = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const onPressSubmit = () => {
    // 提交到后端
    alert(title)
  }
  return (
      <View style={styles.container}>
        <LinearGradient 
          colors = {['#3A3A3A','#525161']}
          style={styles.background}>
          <Text style={styles.back} onPress={() => props.navigation.goBack()}>返回</Text>
          <Text style={styles.submit} onPress={onPressSubmit}>提交</Text>
          <Pressable style={styles.uploadPic}><Text>+</Text></Pressable>
          <TextInput
            label="Title"
            value={title}
            onChangeText={title => setTitle(title)}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            multiline={true}
            onChangeText={description => setDescription(description)}
            style={styles.input}
          />
        </LinearGradient>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    // alignItems: 'center',
    flex: 1 // 布局
  },
  background: {
    justifyContent:'center',
    // alignContent:'center',
    alignItems:'center',
    flex:1
  },
  back: {
    color: '#fff',
    fontSize: 20,
    position: 'absolute',
    top: 20,
    left: 20
  },
  submit: {
    color: '#fff',
    fontSize: 20,
    position: 'absolute',
    top: 20,
    right: 20
  },
  uploadPic: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '70%',
    marginTop: 30,
  }
})

export default Publish;