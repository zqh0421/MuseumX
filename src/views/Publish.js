import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Pressable,
  Image,
  Picker
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput, Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { publishInterface }  from '../api/publishInterface';

const Publish = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    console.log(pickImage)
    // alert(pickedImage)
  }, [pickImage])

  const onPressSubmit = () => {
    // 提交到后端
    if (title && description && pickImage) {
      publishInterface(description)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        alert(err)
      })
    }
  }
  return (
      <View style={styles.container}>
        <LinearGradient 
          colors = {['#3A3A3A','#525161']}
          style={styles.background}>
          <Text style={styles.back} onPress={() => props.navigation.goBack()}>返回</Text>
          {/* <Button onPress={onPressSubmit} title={"submit"} /> */}
          <Text style={styles.submit} onPress={onPressSubmit}>提交</Text>
          <View style={styles.imagePreview}>
            {image && <Image source={{ uri: image }}/>}  
          </View>
          <View>
            <Pressable style={styles.uploadPic} onPress={pickImage}><Text>+</Text></Pressable>
          </View>
          {/* <Pressable style={styles.uploadPic} ><Text>+</Text></Pressable> */}
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
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  input: {
    width: '70%',
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }
})

export default Publish;