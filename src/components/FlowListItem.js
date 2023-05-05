import { View, Text, StyleSheet,Image } from "react-native"
import Pic from "../../assets/pic.png"
const FlowListItem = (props) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemPic}>
                <Image source={Pic} style={styles.image}/>
            </View>
            <Text style={styles.itemTitle}>{props.title}</Text>
            <Text>{props.username}</Text>
            <Text>{props.time}</Text>
            <Text>{props.likes}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        backgroundColor: '#CCCCCC',
        borderRadius: 10,
        padding: '5%',
        marginBottom: '5%',
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
        borderRadius: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default FlowListItem