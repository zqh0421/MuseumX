import { View, Text } from 'react-native'
import { post } from '../api/discover/post'

const Post = () => {

  const onSubmit = async () => {
    getData().then(userData => {
      if (userData) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('description', description)
        formData.append('title', title)
        formData.append('moodCategoryId', moodCategoryId)
        console.log(userData.data)
        post(userData.data, formData).then(res => {
          if (res.code === 0) { // 数据获取成功
            console.log(res.data.data)
          } else { // 获取失败
            setIsRefreshing(false)
          }
        }).catch(err => {
          setIsRefreshing(false)
          alert(err)
        })
      } else {
        // props.navigation.navigate('Login')
      }
    })
  }
  return (
    <View>
      <Text>post</Text>
    </View>
  )
}

export default Post