import { View, Text, StyleSheet,Image } from 'react-native'
import Pic from '../../assets/pic.png'
const FlowListItem = (props) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.bg} ></View>
      <View style={styles.itemPic}>
        <Image source={Pic} style={styles.image}/>
      </View>
      <Text style={styles.itemTitle} >{props.title}</Text>
      <Text>{props.username}</Text>
      <Text>{props.time}</Text>
      <Text>{props.likes}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '92%',
    borderRadius: 10,
    padding: '5%',
    marginBottom: '5%',
  },
  bg: {
    backgroundColor: '#000',
    opacity: 0.5,
    overflow: 'hidden',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  itemPic: {
    flex:1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    height:80,
    width:'100%',
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default FlowListItem