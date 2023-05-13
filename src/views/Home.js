import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React , {useEffect, useState} from 'react'
import { Show, getMore } from '../api/HomeInterface'
import { LinearGradient } from 'expo-linear-gradient'
import HomeListItem from '../components/HomeListItem'
import ErrorContent from '../components/ErrorContent'
import RefreshingContent from '../components/RefreshingContent'
import EmptyContent from '../components/EmptyContent'

const Home = (props) => {
  const [page, setpage]=useState(1)
  const [size, setsize]=useState(15)
  const [isRefreshing, setIsRefreshing] = useState(false) // 正在加载数据
  const [isError, setIsError] = useState(true) // 数据加载错误
  const [list, setList] = useState([]) // 列表数据初始状态

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setIsError(false)
    setIsRefreshing(true)
    Show(page, size).then(async res=>{
      if(res.message==='ok') {
        setList(res.data.data.records)
        setIsRefreshing(false)
      } else {
        setIsError(true)
        setIsRefreshing(false)
        setList([])
      }
    }).catch(err => {
      console.log(err)
      setIsError(true)
      setIsRefreshing(false)
      setList([])
    })
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={['#727480', '#454653']}
      >
        <Text style={styles.pageTitle}>首页</Text>
        {!isError && !isRefreshing && list.length > 0 && (
          <ScrollView style={[{ marginTop: 30 }, { position: 'absolute', top: 45, left: 0}]}>
            {
              list.map(item => {
                // console.log("item: ", item)
                return (
                  <HomeListItem key={item.id} item={item} navigation={props.navigation} />
                )
              })
            }
          </ScrollView>)}
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
  },
  pageTitle: {
    fontSize: 28,
    color: '#fff',
    position: 'absolute',
    top: 20,
    left: 20
  }
})
