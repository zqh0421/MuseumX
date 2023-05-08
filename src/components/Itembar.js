import { View, Text,Image,Surface,Button} from 'react-native'
import React from 'react'

const Items=(props)=>{
  return(
    <View>
      <Surface style={styles.surface} elevation={4}>
        <Image style={styles.image} source={{ uri: 'https://picsum.photos/700' }}/>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text_2}>{props.describe}</Text>
        <View style={styles.button}>
          <Button icon="star" mode="contained" onPress={() => console.log('Pressed')}/>
        </View>
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 170,
    width: 350,
    right: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:140,
    height:140,
    right:100,
    top:40
  },
  text:{
    right:-20,
    top:-100,
  },
  text_2:{
    top:-100,
    right:-20
  },
  button:{
    right:-100,
    hight:-20,
    width:10,
    top:-40,
  }
})