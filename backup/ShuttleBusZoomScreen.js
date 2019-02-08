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
const timer = require('react-native-timer');

export default class ShuttleBusZoomScreen extends React.Component {
  static navigationOptions = {
    title: 'Shuttle Bus Zoom',
  };
  constructor(props) {
    super(props)
    state = {
        timer: null,
        gpsJson : '',
    };
    this.moveAnimation = new Animated.ValueXY({ x: 10, y: 450 })
  }

getLoc = (vGPSID) => {
    return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token : 'SELECT',
      query : 'SELECT * from gpsloc where gpsid ='+vGPSID
    })
    }).then((response) => {return response.json()
    }).then((responseJson) => {
        if (responseJson.length>0) {this._moveBall(responseJson[0].longitude, responseJson[0].latitude)}   //(this.setState({gpsJson: responseJson}); 
  }
  ).catch((error) => {
    console.error(error);
  });
}


_moveBall = (vLong, vLat) => {
  vLongA = 106.8391;
  vLongB = 106.8989;
  vLatA = -6.5557;
  vLatB = -6.5941;

  var RandomNumberX = Math.floor(Math.random() * 300) + 1 ;
  var RandomNumberY = Math.floor(Math.random() * 500) + 1 ;
  //var vLong = 106.8510;//vLongA+Math.random()*(vLongB-vLongA);//vLongA+RandomNumberX*(vLongB-vLongA);
  //var vLat = -6.5766;//vLatA+Math.random()*(vLatB-vLatA);//-6.5557+RandomNumberY*(-6.5941+6.5557);
  //this.getLoc('101');
  //if(this.state.gpsJson!='') 
  //{ 
  //  if(this.state.gpsJson.length>0)
  //{
 //   vLong = 0;//this.state.gpsJson[0].longitude;
 //   vLat = 0;//this.state.gpsJson[0].latitude;  
    Animated.spring(this.moveAnimation, {
      toValue: {x: -5+1830*(vLong-vLongA)/(vLongB-vLongA), y: -5+1182*(vLat-vLatA)/(vLatB-vLatA)},
    }).start()
//  }
//}
}

updateLoc = () => {
  this.getLoc('101');  
}

componentDidMount() {
  let timer = setInterval(this.updateLoc, 1000);
}


  render() {
    let lebar = 1.0*Dimensions.get('window').width;  
    let tinggi = lebar * 1182/1830;
    return (
        <ScrollView
        maximumZoomScale={1}
      minimumZoomScale={lebar/1830}
      style={{ width: lebar }}
      contentContainerStyle={{ width: 1830, height:1182}}>
        <ImageBackground
          resizeMode={'cover'} // or cover
          style={{width:1830, height:1182, resizeMode: 'contain'}} // must be passed from the parent, the number may vary depending upon your screen size
          source={require('../assets/images/SentulShuttleRoute.png')}   
        >   
        <Animated.View style={[styles.tennisBall, this.moveAnimation.getLayout()]}>
        </Animated.View>
        </ImageBackground>  
      </ScrollView>    
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
    backgroundColor: 'red',
    borderRadius: 10,
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