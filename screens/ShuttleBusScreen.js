import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import AppNavigator from '../navigation/MainTabNavigator';
import { Font } from 'expo'

const timer = require('react-native-timer');

export default class ShuttleBusScreen extends React.Component {
  async componentDidMount(){
    await Font.loadAsync({
      'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf')
    });
    this.setState({ fontLoaded : true})
  }
  
  static navigationOptions = {
    title: 'Shuttle Bus',
  };
  constructor(props) {
    super(props)
    state = {
        timer: null,
        fontLoaded : false
    };
    this.moveAnimation = new Animated.ValueXY({ x: 10, y: 450 })
  }

_moveBall = () => {
  var RandomNumberX = Math.floor(Math.random() * 300) + 1 ;
  var RandomNumberY = Math.floor(Math.random() * 500) + 1 ;
  Animated.spring(this.moveAnimation, {
    toValue: {x: RandomNumberX, y: RandomNumberY},
  }).start()
}

componentDidMount() {
  let timer = setInterval(this._moveBall, 1000);
}

showShuttleBusZoomScreen=()=>{
  this.props.navigation.navigate("ShuttleBusZoom");
}

  render() {
    let lebar = Dimensions.get('window').width;  
    let tinggi = lebar * 1182/1830;
    return (
      <View style={{flex: 1,}}>
        <ImageBackground
          resizeMode={'stretch'} // or cover
          style={{width:1830, height:1182, resizeMode: 'contain'}} // must be passed from the parent, the number may vary depending upon your screen size
          source={require('../assets/images/SentulShuttleRoute.png')}   
        >   
            <TouchableOpacity onPress={()=>this.showShuttleBusZoomScreen()}><Text>Zoom</Text>
            </TouchableOpacity>
        <Animated.View style={[styles.tennisBall, this.moveAnimation.getLayout()]}>
        </Animated.View>
        </ImageBackground>  
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
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeImage: {
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  tennisBall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 100,
    width: 10,
    height: 10,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  }
});  