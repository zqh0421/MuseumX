import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React , {useEffect, useState} from 'react'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Show, getMore } from '../api/HomeInterface'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar } from 'react-native-paper';
import SearchListItem from '../components/SearchListItem'
import ErrorContent from '../components/ErrorContent'
import RefreshingContent from '../components/RefreshingContent'
import EmptyContent from '../components/EmptyContent'
import { myCollect } from '../api/myCollect'

const Result = (props) => {
  const { list } = props.route.params
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(false) // 数据加载错误
  const [collectSet, setCollectSet] = useState([])
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      console.log("json", jsonValue)
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }

  const loadData = () => {
    setIsError(false)
    setIsRefreshing(true)
    getData().then(userData => {
      if (userData) {
        console.log(userData.data)
        myCollect(userData.data).then(res => {
          if (res.code === 0) { // 数据获取成功
            console.log(res.data.data)
            let temp = []
            res && res.data && res.data.data && res.data.data !== '收藏为空' && res.data.data.forEach(item => {
              console.log(item.id)
              temp = [...temp, item.id]
            })
            setCollectSet(temp)
            setIsRefreshing(false)
          } else { // 获取失败
            setIsRefreshing(false)
          }
        }).catch(err => {
          setIsRefreshing(false)
          alert(err)
        })
      }
    })
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Search Results" />
      </Appbar.Header>
      <LinearGradient
        style={styles.background}
        colors={['#727480', '#454653']}
      >
        {!isError && !isRefreshing && list && list.length > 0 && (
          <ScrollView style={[{ marginTop: 30 }]}>
            {
              list.map(item => {
                return (
                  <SearchListItem key={item.id} item={item} navigation={props.navigation} />
                )
              })
            }
          </ScrollView>
        )}
        {!isError && isRefreshing && <RefreshingContent />}
        {!isError && !isRefreshing && (!list || list.length <= 0) && <EmptyContent />}
        {isError && <ErrorContent onPressRefresh={loadData} />}
      </LinearGradient>
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    flex: 1
  },
  background: {
    flex: 1
  }
})
