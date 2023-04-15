import { useState } from 'react';
import { Button,StyleSheet, Text, View, TextInput} from 'react-native';

const HomeScreen=({navigation})=>{
    const[userinfo,setuserinfo]=useState();
 
return(
    <View style={styles.container}>
       
       <Text style={[styles.Titlefont]}>
        这里是[页面名](eg.首页/社区/个人/...).欢迎
        </Text>
    </View>
)


}
