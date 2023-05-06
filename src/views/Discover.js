import { View, Text, StyleSheet, Pressable} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import FlowListItem from '../components/FlowListItem'

const Discover = () => {
  const [ toggleNew, setToggleNew ] = useState(false)
  const [ toggleStyle, setToggleStyle ] = useState(styles.toggleSelected)

  const arr = [
    {
      title: 'title1',
      username: 'user11111111123123132111111',
      time: '2023-05-04',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      time: '2023-05-03',
      likes: 2,
    },
    {
      title: 'title3',
      username: 'user3',
      time: '2023-04-04',
      likes: 255,
    },
    {
      title: 'title1',
      username: 'user11111111123123132111111',
      time: '2023-05-04',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      time: '2023-05-03',
      likes: 2,
    },
    {
      title: 'title3',
      username: 'user3',
      time: '2023-04-04',
      likes: 255,
    },
    {
      title: 'title1',
      username: 'user11111111123123132111111',
      time: '2023-05-04',
      likes: 25,
    },
    {
      title: 'title2',
      username: 'user2',
      time: '2023-05-03',
      likes: 2,
    },
    {
      title: 'title3',
      username: 'user3',
      time: '2023-04-04',
      likes: 255,
    },

  ]
  useEffect(() => { // 当toggleNew为false，显示“热门”内容；否则显示“最新”内容。
    // alert(toggleNew)
    if (toggleNew) {
      setToggleStyle([styles.toggleSelected, styles.toggleNew])
    } else {
      setToggleStyle(styles.toggleSelected)
    }
  }, [toggleNew])

  const onPressToggle = () => { // 点击 “热门/最新” 按钮触发事件。
    setToggleNew(!toggleNew)
  }

  const onPressPublish = () => {
    alert('发布！')
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors = {['#727480','#454653']}
        style={styles.backgroud}>
        <Text style={styles.title}>发现</Text>
        <Pressable style={styles.toggle} onPress={onPressToggle}>
          <View style={toggleStyle}></View>
          <Text>热门</Text>
          <Text>最新</Text>
        </Pressable>
        <View>
          <View style={styles.list}>
            {
              arr.map((item, index) => {
                if(index % 2 === 0)
                  return (
                    <FlowListItem title={item.title} time={item.time} username={item.username} likes={item.likes} />
                  )
              })
            }
          </View>
          <View style={styles.list2}>
            {
              arr.map((item, index) => {
                if(index % 2 === 1)
                  return (
                    <FlowListItem title={item.title} time={item.time} username={item.username} likes={item.likes} />
                  )
              })
            }
          </View>
        </View>
        <Pressable style={styles.publish} onPress={onPressPublish}>
          <Text>+</Text>
        </Pressable>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    // alignItems: 'center',
    flex: 1 // 布局
  },
  backgroud:{
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    flex:1
  },
  title: {
    fontSize: 28,
    color: '#fff',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#CCCCCC',
    position: 'absolute',
    top: 35,
    right: 20,
    width: 100,
    height: 25,
    justifyContent: 'space-around',
    borderRadius: 25,
    alignItems: 'center',
  },
  toggleSelected: {
    width: 50,
    height: 23,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 1,
    left: 1,
    borderRadius: 25,
  },
  toggleNew: {
    transform: [{translateX: 48}]
  },
  publish: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  list: {
    position: 'absolute',
    top: 75,
    left: 0,
    width: '48%',
    flexWrap: 'wrap',
  },
  list2: {
    position: 'absolute',
    top: 75,
    right: 0,
    width: '48%',
    flexWrap: 'wrap',
  }
})

export default Discover
