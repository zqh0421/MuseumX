import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { post } from '../api/discover/post'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import * as ImagePicker from 'expo-image-picker';

const Post = (props) => {
  const [file, setFile] = useState()
  const [desc, setDesc] = useState('desc test.')
  const [title, setTitle] = useState('blabla')
  const [moodCategoryId, setMoodCategoryId] = useState(11)

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      console.log('json', jsonValue)
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }

  const onSubmit = async () => {
    console.log('test')
    getData().then(userData => {
      console.log(userData)
      if (userData) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('description', desc)
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

  const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const takeImageHandler = async () => {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5
      });
      setPickedImage(image.assets[0]);
      setFile({
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
      <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
          {!pickedImage ? (
            <Text>No image picked yet.</Text>
          ) : (
            <Image style={styles.image} source={{ uri: pickedImage.uri }} />
          )}
        </View>
        <Button
          title="Take Image"
          onPress={takeImageHandler}
        />
      </View>
    );
  };

  return (
    <View>
      <Text>post</Text>
      <ImgPicker />
      <Pressable onPress={onSubmit} title={'submit'} style={{ width: 50, height: 50, backgroundColor: 'grey'}}></Pressable>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
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
  image: {
    width: '100%',
    height: '100%'
  }
});