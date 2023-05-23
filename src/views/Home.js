import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Show, getMore } from '../api/HomeInterface'
import { LinearGradient } from 'expo-linear-gradient'
import HomeListItem from '../components/HomeListItem'
import ErrorContent from '../components/ErrorContent'
import RefreshingContent from '../components/RefreshingContent'
import EmptyContent from '../components/EmptyContent'
import { myCollect } from '../api/myCollect'

const Home = (props) => {
  const [page, setpage] = useState(1)
  const [size, setsize] = useState(15)
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误
  const [list, setList] = useState([]) // 列表数据初始状态
  const [collectSet, setCollectSet] = useState([])
  const [loadMore, setLoadMore] = useState(false)
  useEffect(() => {
    setpage(1)
    loadData()
  }, [])
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setpage(1)
    })
    return unsubscribe
  }, [props.navigation])

  useEffect(() => {
    if (page === 1) loadData()
  }, [page])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      console.log('json', jsonValue)
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }

  const loadData = () => {
    console.log('load')
    setIsError(false)
    setIsRefreshing(true)
    getData()
      .then((userData) => {
        console.log('user')
        console.log(userData)
        if (userData) {
          console.log(userData.data)
          myCollect(userData.data)
            .then((res) => {
              if (res.code === 0) {
                // 数据获取成功
                console.log(res.data.data)
                let temp = []
                res &&
                  res.data &&
                  res.data.data &&
                  res.data.data !== '收藏为空' &&
                  res.data.data.forEach((item) => {
                    console.log(item.id)
                    temp = [...temp, item.id]
                  })
                setCollectSet(temp)
                Show(page, size)
                  .then(async (res) => {
                    if (res.message === 'ok') {
                      setList(res.data.data.records)
                      setpage(page + 1)
                      setIsRefreshing(false)
                    } else {
                      setIsError(true)
                      setIsRefreshing(false)
                      setList([])
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                    setIsError(true)
                    setIsRefreshing(false)
                    setList([])
                  })
              } else {
                // 获取失败
                setIsRefreshing(false)
              }
            })
            .catch((err) => {
              setIsRefreshing(false)
              alert(err)
            })
        } else {
          Show(page, size)
            .then(async (res) => {
              if (res.message === 'ok') {
                setList(res.data.data.records)
                setpage(1)
                setIsRefreshing(false)
              } else {
                setIsError(true)
                setIsRefreshing(false)
                setList([])
              }
            })
            .catch((err) => {
              console.log(err)
              setIsError(true)
              setIsRefreshing(false)
              setList([])
            })
        }
      })
      .catch((err) => {
        console.log(err)
        setIsError(true)
        setIsRefreshing(false)
      })
  }

  const prolongList = () => {
    setLoadMore(true)
    getData()
      .then((userData) => {
        if (userData) {
          myCollect(userData.data)
            .then((res) => {
              if (res.code === 0) {
                // 数据获取成功
                console.log(res.data.data)
                let temp = []
                res &&
                  res.data &&
                  res.data.data &&
                  res.data.data !== '收藏为空' &&
                  res.data.data.forEach((item) => {
                    console.log(item.id)
                    temp = [...temp, item.id]
                  })
                setCollectSet([...collectSet, ...temp])
                Show(page, size)
                  .then(async (res) => {
                    if (res.message === 'ok') {
                      setList([...list, ...res.data.data.records])
                      setpage(page + 1)
                      setLoadMore(false)
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                    setLoadMore(false)
                  })
              } else {
                // 获取失败
                setLoadMore(false)
              }
            })
            .catch((err) => {
              alert(err)
              setLoadMore(false)
            })
        } else {
          Show(page, size)
            .then(async (res) => {
              if (res.message === 'ok') {
                setList([...list, ...res.data.data.records])
                setpage(page + 1)
                setLoadMore(false)
              } else {
                setLoadMore(false)
              }
            })
            .catch((err) => {
              console.log(err)
              setLoadMore(false)
            })
        }
      })
      .catch((err) => {
        console.log(err)
        setLoadMore(false)
      })
  }

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.background} colors={['#727480', '#454653']}>
        <Text
          style={{ marginLeft: 20, marginTop: 20, fontSize: 28, color: '#fff' }}
        >
          首页
        </Text>
        {!isError && !isRefreshing && list.length > 0 && (
          <ScrollView style={[{ marginTop: 30 }]}>
            {list.map((item) => {
              // console.log("item: ", item)
              return (
                <HomeListItem
                  key={item.id}
                  item={item}
                  navigation={props.navigation}
                  collectSet={collectSet}
                />
              )
            })}
            {!loadMore ? (
              <Button onPress={prolongList} textColor={'white'}>
                点击加载更多
              </Button>
            ) : (
              <Button disabled textColor={'white'} style={{ color: 'white' }}>
                加载中...
              </Button>
            )}
          </ScrollView>
        )}
        {!isError && isRefreshing && <RefreshingContent />}
        {!isError && !isRefreshing && list.length <= 0 && <EmptyContent />}
        {isError && <ErrorContent onPressRefresh={loadData} />}
      </LinearGradient>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    flex: 1
  },
  background: {
    flex: 1
  }
})
