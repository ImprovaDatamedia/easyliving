import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Alert, Animated, Dimensions, Platform } from 'react-native';
import { Constants, MapView, Location, Permissions, Polyline, ProviderPropType, Marker, AnimatedRegion } from 'expo';
import {DBFlatList, HideableView, updateTable, queryTable, queryTableCrypto} from '../components/react-native-improva.js'

//import console = require('console');


const inits = [{latitude: -6.58, longitude: 106.854, deltalat:0.025, deltalong:0.025},
               {latitude: -6.58, longitude: 106.865, deltalat:0.050, deltalong:0.050},
               {latitude: -6.58, longitude: 106.865, deltalat:0.058, deltalong:0.058}]

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = -6.561384;
const LONGITUDE = 106.857165;


export default class EasyTransportBusTrackScreen extends Component {

  _isMounted = false;
  busID = 1;
  kawasanID = 1;
  intervalBusLoc = 0;


  constructor(props){
    super(props)
    this.state = {
      long : 0,
      lat : 0,
       direction : '0deg',
       busColor : '',
       streetColor : '',
       speed : 0,
       polyPoints : [],
       coordinate: new MapView.AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
      }),
    };
    if (this.props.navigation.state.params.busID === '101') {this.busID=1; this.kawasanID=1}
    if (this.props.navigation.state.params.busID === '102') {this.busID=2; this.kawasanID=1}
    if (this.props.navigation.state.params.busID === '103') {this.busID=3; this.kawasanID=1}
/*    let Empty = [];
    queryTable('select latitude, longitude from easyliving.tbbusroutepoly where RouteID='+this.busID+' order by ID asc')
      .then((response) => {
        vStr = JSON.stringify(response);
        if(vStr.indexOf('No Results Found')!=-1){return Empty.json()} else {return response.json()}})
      .then((responseJson) => { 
      console.log(JSON.stringify(responseJson));
      this.setState({polyPoints:responseJson});
    }).catch((error)=> console.error(error));
*/
  }

/*
  let vStr = JSON.stringify(response);
  console.log(vStr);
  if(vStr.indexOf('No Results Found')!=-1){
    return response.json();
  } else {        
    return;
  } 
*/


  componentDidMount() {
    this._isMounted=true;
    this.updateBusLoc();
    this.intervalBusLoc = setInterval(this.updateBusLoc, 10000);
    queryTableCrypto('select latitude, longitude from easyliving.tbbusroutepoly where RouteID='+this.busID+' order by No asc',
     (data)=>{this.setState({polyPoints:data})}, ()=>alert('Polygon data is not available')
    )
  }

  componentWillUnmount() {
    this._isMounted=false;
    clearInterval(this.intervalBusLoc);
  }

  getBusLoc = (vGPSID) => {
    return fetch('http://www.easyliving.id:81/app/index.php/mobileController/doSelectAllWhere', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         tableName : 'gpsloc',
         columnName : 'gpsid',
         where : vGPSID
       })
      }).then((response) => {
       return response.json()
      }).then((responseJson) => {
        if (responseJson.length>0) {
          const { coordinate } = this.state;
          const newCoordinate = {
            latitude: parseFloat(responseJson[0].latitude),
            longitude: parseFloat(responseJson[0].longitude),
          };
          if(this._isMounted){
            coordinate.timing(newCoordinate).start();
            this.setState({
              direction: responseJson[0].direction.toString()+'deg',
              speed: responseJson[0].speed,
            })
          }
        }
      }).catch((error) => {
        console.log('fetch error: '+error)
//       Alert.alert(error)
     });
   }

  updateBusLoc = () => {
    this.getBusLoc('10'+this.busID);
  }


  render() {
    let color;
    let street;
    let speedColor='red';
    if (this.busID == 1) {
      color = require('../assets/images/YellowBus.png');
      street ="goldenrod"
    } else if (this.busID == 2) {
      color = require('../assets/images/RedBus.png');
      street = "red"
    } else if (this.busID == 3) {
      color = require('../assets/images/YellowBus.png');
      street = "mediumseagreen"
    }
  if(this.state.speed==0){speedColor='red'} else {speedColor='mediumseagreen'};
    return (
      <View style={styles.container}>
      <MapView
        provider="google"
        style={{ alignSelf: 'stretch', height: screen.height-110 }}
        initialRegion={{
          latitude: inits[this.busID-1].latitude, longitude: inits[this.busID-1].longitude, latitudeDelta: inits[this.busID-1].deltalat, longitudeDelta: inits[this.busID-1].deltalong
        }}
        showsUserLocation= {true}
//        minZoomLevel={13}
//        maxZoomLevel={15}
      >
      <MapView.Polyline
        coordinates= {this.state.polyPoints}
        strokeWidth={6}
        strokeColor={street}
        lineCap="round"
      />
      <MapView.Marker.Animated
         ref={marker => { this.marker = marker; }}
         coordinate={this.state.coordinate}
         title={"Sentul Shuttle Bus"}
         description={"Melayani warga sentul city"}
         anchor = {{x:0.6,y:0.6}}
       >
       <Animated.View style={[styles.Bus, {width:50, height:80, backgroundColor:'transparent', } ]}>
       <Image source={color} style={[styles.imgBus, {transform:[{scale: 0.4},{rotate: this.state.direction}]}]}/>
       </Animated.View>
       <View style={{height:15, width:25, borderRadius:4, backgroundColor:speedColor}}>
        <Text style={{color:'white', marginRight:2, textAlign:'right'}}>{this.state.speed}</Text>
       </View>
       </MapView.Marker.Animated>
      </MapView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'grey',
    alignItems: 'center',
    justifyContent: 'center',
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});