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

const manWidth = 14;
const manHeight = 29;
const busWidth = 14;
const busHeight = 29;

export default class ShuttleBusZoomScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    console.log(navigationOptions);
    return {
      title: 'Shuttle Bus: '+navigation.getParam('ScreenTitle', 'A Nested Details Screen'),
      headerStyle: {backgroundColor: navigation.getParam('ScreenColor', 'white'),},
      headerTintColor: 'black',//navigationOptions.headerStyle.backgroundColor,
    };
  };
  intervalBusLoc = 0;
  intervalMyLoc = 0;
  dir101 = '90deg';
  dir102 = '90deg';
  imgW = 1830;
  imgH = 1182;
  scale101 = 1;
  scale102 = 1;
  firstLook = true;
  focusID = this.props.navigation.getParam('ID','102');
  constructor(props) {
    super(props);
    if(this.focusID=='101'){this.scale101=1.5};
    if(this.focusID=='102'){this.scale102=1.5};
    this.state = {
      dotSize : 10,
      zoomScale : 1,
      error : null,
      isMounted : false,
      myLong : 0,
      myLat : 0,
    };
    this.moveAnimationMy = new Animated.ValueXY({ x: 0, y: 0 })
    this.moveAnimation101 = new Animated.ValueXY({ x: 0, y: 0 })
    this.moveAnimation102 = new Animated.ValueXY({ x: 0, y: 0 })
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
    }).then((response) => {
      return response.json()
    }).then((responseJson) => {
      if (responseJson.length>0) {
        this._moveLoc(vGPSID, responseJson[0].longitude, responseJson[0].latitude, responseJson[0].direction, responseJson[0].speed)}  
      }
    ).catch((error) => {
      console.error(error);
    });
  }


_moveLoc = (vGPSID, vLong, vLat, vDir, vSpeed) => {
    vLongA = 106.8391;
    vLongB = 106.8989;
    vLatA = -6.5557;
    vLatB = -6.5941;
    px = this.imgW*(vLong-vLongA)/(vLongB-vLongA);
    py = this.imgH*(vLat-vLatA)/(vLatB-vLatA);
    if (vGPSID=='101'){
        this.dir101= vDir+'deg';
        Animated.spring(this.moveAnimation101, {
            toValue: {x: px-busWidth*this.scale101/2, y: py-busHeight*this.scale101/2},
            }).start();
        if(this.firstLook && (this.focusID=='101')){
            if(px<0 | py<0 | px>this.imgW | py>this.imgH){alert('the bus is out of map')}
            if(px<0.5*Dimensions.get('window').width)
                {px=0.5*Dimensions.get('window').width};
            if(py<0.5*Dimensions.get('window').height)
                {py=0.5*Dimensions.get('window').height};
            this.refs._scrollView.scrollTo({x: px-0.5*Dimensions.get('window').width, 
                y: py-0.5*Dimensions.get('window').height, 
                animated: true});
            this.firstLook = false;
        };
        }
    else if (vGPSID=='102'){
        this.dir102= vDir+'deg';
        Animated.spring(this.moveAnimation102, {
            toValue: {x: px-busWidth*this.scale102/2, y: py-busHeight*this.scale102/2},
            }).start();
        if(this.firstLook && (this.focusID=='102')){
            if(px<0 | py<0 | px>this.imgW | py>this.imgH){alert('the bus is out of map')}
            if(px<0.5*Dimensions.get('window').width)
                {px=0.5*Dimensions.get('window').width};
            if(py<0.5*Dimensions.get('window').height)
                {py=0.5*Dimensions.get('window').height};
            this.refs._scrollView.scrollTo({x: px-0.5*Dimensions.get('window').width, 
                y: py-0.5*Dimensions.get('window').height, 
                animated: true})
            this.firstLook = false;
            };
        }
    else if (vGPSID=='MyLoc'){
//        px = 0;
//        py = 0;
        Animated.spring(this.moveAnimationMy, {
            toValue: {x: px-manWidth/2, y: (py-manHeight/2)-(manHeight/this.state.zoomScale/2)},
            }).start()
    }
}

updateBusLoc = () => {
  this.getLoc('101');
  this.getLoc('102')  
}

setwatchPosition = () => {
    this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
            myLat: position.coords.latitude,
            myLong: position.coords.longitude,
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5 },
      );
}

/*
updateMyLoc = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            this.myLong= position.coords.longitude;
            this.myLat= position.coords.latitude;
            if(this.state.isMounted){
                this.setState({
                    error: null,
                });
            }
        },
        (error) => {if(this.state.isMounted){this.setState({ error: error.message })}},
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );

      
//        alert(this.state.myLong);
//  this._moveLoc('MyLoc',this.state.myLong,this.state.myLat,0,0);
}
*/

componentDidMount() {
    this.setState({
        isMounted : true,
    })
  this.updateBusLoc();
  this.setwatchPosition();
//  this.updateMyLoc();
  this.intervalBusLoc = setInterval(this.updateBusLoc, 15000);
//#  this.intervalMyLoc = setInterval(this.updateMyLoc, 10000);
}

componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    this.setState({
        isMounted : false,
    })
    clearInterval(this.intervalBusLoc);
    clearInterval(this.intervalMyLoc);
}

changeScrollScale=(event)=>{
    if(this.state.isMounted){
        this.setState({
            dotSize : 10/event.nativeEvent.zoomScale,
            zoomScale : event.nativeEvent.zoomScale,
        })
    }
}

render() {
    let lebar = 1.0*Dimensions.get('window').width;  
    let tinggi = lebar * this.imgH/this.imgW;//1182/1830;
    this._moveLoc('MyLoc',this.state.myLong,this.state.myLat,0,0);
    return (
        <ScrollView
            ref='_scrollView'
            maximumZoomScale={1}
            minimumZoomScale={lebar/this.imgW}
            style={{ width: lebar, backgroundColor: 'darkslategray'}}
            contentContainerStyle={{ width: this.imgW, height:this.imgH}}
            onScroll={this.changeScrollScale.bind(this)}
            scrollEventThrottle={0}> 
            <ImageBackground
                resizeMode={'cover'} // or cover
                style={{width:this.imgW, height:this.imgH, resizeMode: 'contain'}} // must be passed from the parent, the number may vary depending upon your screen size
                source={require('../assets/images/SentulShuttleRoute.png')}>   
            <Text>{this.props.navigation.state.params.user}</Text>  
                <Animated.View style={[styles.standingMan, {transform: [{scale: 1/(this.state.zoomScale)}], width: manWidth, height: manHeight}, this.moveAnimationMy.getLayout()]}>
                <Image source={require('../assets/images/ManStanding.png')} style={styles.imgMan}/>
                </Animated.View>
                <Animated.View style={[styles.Bus, {transform: [{scale: 1/(this.state.zoomScale)}, {rotate: this.dir101}], width: busWidth*this.scale101, height: busHeight*this.scale101}, this.moveAnimation101.getLayout()]}>
                <Image source={require('../assets/images/YellowBus.png')} style={styles.imgBus}/>
                </Animated.View>
                <Animated.View style={[styles.Bus, {transform: [{scale: 1/(this.state.zoomScale)}, {rotate: this.dir102}], width: busWidth*this.scale102, height: busHeight*this.scale102}, this.moveAnimation102.getLayout()]}>
                <Image source={require('../assets/images/RedBus.png')} style={styles.imgBus}/>
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
  standingMan: {
    flex:1,  
    position: 'absolute',
  },
  imgMan: {
    flex: 1,
    height: undefined,
    width: undefined,
    alignSelf: 'stretch',
  },
  imgBus: {
    flex: 1,
    height: undefined,
    width: undefined,
    alignSelf: 'stretch',
  },
  Bus: {
    position: 'absolute',
  },
  tennisBallMy: {
    position: 'absolute',
    backgroundColor: 'dodgerblue',
  },
  tennisBallRed: {
    position: 'absolute',
    backgroundColor: 'red',
  },
  tennisBallBlue: {
    position: 'absolute',
    backgroundColor: 'blue',
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  triangle101: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ff9300'
  },  
  triangle102: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red'
  }  

});  