import { View, Text,Image,StyleSheet, Pressable, Dimensions } from 'react-native'
import React , { useState, useEffect } from 'react'
import { IconButton, MD3Colors } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collect } from '../api/Collect'

const SearchListItem = (props) => {
  const { item } = props

  const onPressItem = () => {
    props.navigation.navigate('HeritageDetails', { id: item.id })
  }
  return (
    <Pressable onPress={onPressItem}>
      <View style={styles.surface}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width * 0.88, height: 170, backgroundColor: 'black', opacity: 0.4, borderRadius: 15 }}></View>
        {item && item.imageUrl && <Image style={styles.image} source={{ uri: item.imageUrl }}/>}
        <View style={{ margin: '3%', justifyContent: 'space-between', width: '60%'}}>
          <Text style={styles.title}>{item.artifactName}</Text>
          <Text style={{ color: 'white' }}>Relic Time: {item.relicTime}</Text>
          <Text style={{ color: 'white' }}>Author: {item.author}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    flex: 1
  },
  background: {
    flex: 1
  },
  surface: {
    marginLeft: '6%',
    padding: 10,
    height: 170,
    width: '88%',
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: '6%',
  },
  image:{
    width:'40%',
    height:'88%',
    alignSelf: 'center',
    borderRadius: 15,
  },
  title:{
    width: '100%',
    fontWeight: 'bold',
    color: '#fff',
    fontSize:20,
  },
  desc: {
    width:'100%',
    color: '#fff',
  }
})

export default SearchListItem