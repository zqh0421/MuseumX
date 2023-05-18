import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput, Checkbox } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { publishInterface }  from '../api/publishInterface'
import { getCategory } from '../api/getCategory'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Publish = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const [categories, setCategories] = useState([])
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    getCategory(1, 224).then(res => {
      console.log(res.data.data.records)
      if(res.message==='ok') {
        setCategories(res.data.data.records)
      }
    })
  }, [])
  useEffect(() => {
    getCategory(1, 224).then(res => {
      console.log(res.data.data.records)
      if(res.message==='ok') {
        setCategories(res.data.data.records)
      }
    })
  }, [props.navigation])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }

  const onPressSubmit = () => {
    // 提交到后端
    getData().then(userData => {
      console.log(userData.data, 'userData')
      console.log(selectedItem, title, description, file)
      if (userData && title && description && file && selectedItem) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('description', description)
        formData.append('title', title)
        formData.append('moodCategoryId', selectedItem.id)
        formData.append('moodCategory', selectedItem.title)
        publishInterface(userData.data, formData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          alert(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const takeImageHandler = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    setFile({
      uri: image.assets[0].uri,
      name: image.assets[0].uri.toString().split('/ImagePicker/')[1].split('.')[0],
      type: 'image/jpeg'
    })
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors = {['#3A3A3A','#525161']}
        style={styles.background}>
        <Text style={styles.back} onPress={() => props.navigation.goBack()}>返回</Text>
        <Text style={styles.submit} onPress={onPressSubmit}>提交</Text>
        <View>
          <Pressable style={styles.uploadPic} onPress={takeImageHandler}>
            {!file ? <Text>+</Text> : <Image style={{ width: '100%', height: '100%'}} source={{ uri: file.uri }}/> }
          </Pressable>
        </View>
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
          style={[styles.input, {marginBottom: 30}]}
        />
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          // initialValue={{ id: '2' }} // or just '2'
          onSelectItem={setSelectedItem}
          dataSet={categories.map(item => ({
            id: item.artifactId,
            title: item.categoryName
          })
          )}
          direction='up'
          textInputProps={{
            placeholder: 'Select relevant artifact',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              backgroundColor: '#383b42',
              color: '#fff',
              paddingLeft: 18,
            },
          }}
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