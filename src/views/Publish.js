import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  Pressable
} from 'react-native'
import React, {useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { post } from '../api/discover/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Publish = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pickedImage, setPickedImage] = useState();
  const [file, setFile] = useState();
  const [moodCategoryId, setMoodCategoryId] = useState(11);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      console.log('json', jsonValue)
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }

  const onPressSubmit = () => {
    // 提交到后端
    alert(title)
    console.log('test')
    getData().then(userData => {
      console.log(userData)
      if (userData) {
        const formData = new FormData()
        formData.append('file', pickedImage)
        formData.append('description', description)
        formData.append('title', title)
        formData.append('moodCategoryId', moodCategoryId)
        post(userData.data, formData).then(res => {
          if (res.code === 0) { // 数据获取成功
            console.log(res.data.data)
          } else { // 获取失败
          }
        }).catch(err => {
          alert(err)
        })
      } else {
        props.navigation.navigate('Login')
      }
    })
  }
  const takeImageHandler = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    setPickedImage({
      uri: image.assets[0].uri,
      name: image.assets[0].uri.toString().split('/ImagePicker/')[1].split('.')[0],
      type: 'image/jpeg'
    })
  }
  useEffect(() => {
    console.log(pickedImage)
    console.log(file)
  }, [file])

  return (
      <View style={styles.container}>
        <LinearGradient 
          colors = {['#3A3A3A','#525161']}
          style={styles.background}>
          <Text style={styles.back} onPress={() => props.navigation.goBack()}>返回</Text>
          <Text style={styles.submit} onPress={onPressSubmit}>提交</Text>
          <View style={styles.imagePreview}>
            {!pickedImage ? (
              <Text>No image picked yet.</Text>
            ) : (
              <Image style={styles.image} source={{ uri: pickedImage.uri }} />
            )}
        </View>
          <Pressable style={styles.uploadPic} onPress={takeImageHandler}><Text>+</Text></Pressable>
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
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
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