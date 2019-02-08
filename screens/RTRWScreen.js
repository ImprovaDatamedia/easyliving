import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import PixelColor from 'react-native-pixel-color';
import { getPixelRGBA } from 'react-native-get-pixel';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export default class EasyAdminScreen extends React.Component {
  static navigationOptions = {
    title: 'Easy Admin',
  };

state = {
    myColor : 'transparent',
}  
checkPixelColor=(x,y)=>{
    vData = 'path:image/png;../assets/images/MapRTRW.png';
    vPath = '../assets/images/MapRTRW.png';
    getPixelRGBA(vPath, 10, 10)
    .then((color) => {Alert.alert(color)})

//    .then(function(color){alert('ok')})// => {this.setState({myColor:color}); alert(this.myColor)})
    .catch(error => {
        console.log(error);})
        //    PixelColor.getHex(base64ColorWheel, { x: 10, y: 10})
//    .then((color) => {alert(color)})
//    .catch((err) => {alert(err)
 
 
 //   PC.getHex(vpath, {x,y}).then((color) => {alert(color)
 //     }).catch((err) => {alert(err)
 //     });
} 




/*
checkPixel=(x,y)=>{
    vdata = 'path:image/png;../assets/images/MapRTRW.png';
    vpath = './assets/images/MapRTRW.png';
     getPixels(vpath, function{x,y}).then((color) => {alert(color)
      }).catch((err) => {alert(err)
      });
}  
*/

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>
            Easy Admin
            </Text>
            <TouchableOpacity onPress={()=>this.checkPixelColor(10,10)}>
            <Image
              source={
                  require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
            </TouchableOpacity>
          </View>    
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});  