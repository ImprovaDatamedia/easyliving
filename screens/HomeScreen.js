import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header : null
  };

  showSelectServiceScreen=()=>{
    this.props.navigation.navigate("SelectService");
  }

  showShuttleBusZoomScreen=()=>{
    this.props.navigation.navigate("ShuttleBusZoom", {ScreenTitle:'Yellow Line', ScreenColor:'yellow'});
  }
  showEasyMartScreen=()=>{
    this.props.navigation.navigate("EasyMart");
  }
  showTestDBScreen=()=>{
    this.props.navigation.navigate("TestDB");
  }
  showBlankScreen=()=>{
    this.props.navigation.navigate("Blank");
  }
  showTestScreen=()=>{
    this.props.navigation.navigate("Test");
  }  
  showRTRWScreen=()=>{
    this.props.navigation.navigate("RTRW");
  }  
  showEasyGoScreen=()=>{
    this.props.navigation.navigate("EasyGo");
  }  
  showComingSoonScreen=()=>{
    this.props.navigation.navigate("ComingSoon");
  }  
  showEasyBuildScreen=()=>{
    this.props.navigation.navigate("EasyBuild");
  }  
    
  showEasyServiceScreen=()=>{
    this.props.navigation.navigate("EasyService");
  }  

  showEasyRentScreen=()=>{
    this.props.navigation.navigate("EasyRent", {kategoriID:0});
  }  

  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
        <View style={{flex:1,  backgroundColor: 'white'}}>
            <View style={{width:lebar, height:lebar/5, alignItems: 'center', marginTop:35, marginBottom:10, backgroundColor: 'white'}}>
                <Image style={{flex:1, resizeMode: 'contain'}} source={require('../assets/images/HomeScreen/EasyLivingSentulCity.png')}/>
            </View> 
            <ScrollView style={{paddingTop:10, backgroundColor:'#f8f8f8'}}>   
                <View style={{flex:1, justifyContent: 'space-around', flexDirection:"row", height:100, alignItems:'center',  backgroundColor:'white'}}>
                  <TouchableOpacity onPress={this.showEasyGoScreen}>
                    <Image source={require('../assets/images/HomeScreen/iconEasyGo.png')} style={{width:60, height:60}}/>
                  </TouchableOpacity>
                    <Image source={require('../assets/images/HomeScreen/iconEasyMart.png')} style={{width:60, height:60}}/>
                  <TouchableOpacity onPress={this.showEasyServiceScreen}>
                    <Image source={require('../assets/images/HomeScreen/iconEasyService.png')} style={{width:60, height:60}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.showEasyBuildScreen}>
                    <Image source={require('../assets/images/HomeScreen/iconEasyBuild.png')} style={{width:60, height:60}}/>
                  </TouchableOpacity>

                </View>
                <View style={{flex:1, justifyContent: 'space-around', flexDirection:"row", height:100, alignItems:'center',  backgroundColor:'white'}}>
                  <Image source={require('../assets/images/HomeScreen/iconEasyFood.png')} style={{width:60, height:60}}/>
                  <TouchableOpacity onPress={this.showEasyRentScreen}>
                    <Image source={require('../assets/images/HomeScreen/iconEasyRent.png')} style={{width:60, height:60}}/>
                  </TouchableOpacity>
                  <Image source={require('../assets/images/HomeScreen/iconEasyTrade.png')} style={{width:60, height:60}}/>
                  <Image source={require('../assets/images/HomeScreen/iconEasySport.png')} style={{width:60, height:60}}/>
                </View>
                <View style={{alignItems:'center', marginTop:3, marginBottom:3, marginLeft:7, marginRight:7, paddingTop:20, paddingBottom:20, backgroundColor:'white'}}>
                    <Image style={{borderRadius:5, width:lebar-10, height: lebar*(1/2.5), resizeMode: 'stretch'}} source={require('../assets/images/HomeScreen/adFirst.png')}/>
                </View> 
                <View style={{flex:1, height:80,  backgroundColor:'white'}}>
                    <Image source={require('../assets/images/HomeScreen/iconRTRW.png')} style={{transform: [{scale: 0.5}], position: 'absolute', top:-20, left:-10}}/>
                    <Image source={require('../assets/images/HomeScreen/iconPOI.png')} style={{transform: [{scale: 0.5}], position: 'absolute', top:-18, left:2*(lebar/8), }}/>
                    <Image source={require('../assets/images/HomeScreen/iconPhoneNumbers.png')} style={{flex:1, transform: [{scale: 0.5}], position: 'absolute', top:-18, left:3*(lebar/8), }}/>
                    <Image source={require('../assets/images/HomeScreen/iconAboutSentulCity.png')} style={{flex:1, transform: [{scale: 0.5}], position: 'absolute', top:-13, left:5.6*(lebar/8), }}/>
                </View>
                <View style={{alignItems:'center', marginTop:3, marginBottom:3, paddingTop:20, paddingBottom:20, marginLeft:7, marginRight:7, backgroundColor:'white'}}>
                    <Image style={{borderRadius:5, width:lebar-10, height: lebar*(1/2.5), resizeMode: 'stretch'}} source={require('../assets/images/HomeScreen/adThird.jpg')}/>
                </View> 
                <View style={{marginTop:3, marginBottom:3, paddingTop:20, paddingBottom:20, marginLeft:7, marginRight:7, backgroundColor:'white'}}>
                  <Text  style={{color:'gray', textAlign:'right', fontSize:12, fontWeight:'normal', backgroundColor: 'transparent'}}>
                    18 Januari 2019
                  </Text>
                  <Text  style={{color:'gray', textAlign:'left', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                    Jasa Unlock Modem Bolt
                  </Text>
                  <Text  style={{color:'gray', marginBottom:20, textAlign:'left', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
                    Test 123 selalu bersama kita bisa bekerja disana dan disini selalu apa adanya, 
                    bila itu dilakukan setiap saat kita bisa menang
                  </Text>
                  <Text  style={{color:'gray', textAlign:'right', fontSize:12, fontWeight:'normal', backgroundColor: 'transparent'}}>
                    16 Januari 2019
                  </Text>
                  <Text  style={{color:'gray', textAlign:'left', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                    Cucian bersin hanya dengan Goceng per kg
                  </Text>
                  <Text  style={{color:'gray', textAlign:'left', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
                    Laundry hebat, goceng only selalu bersama kita bisa bekerja disana dan disini selalu apa adanya, 
                    bila itu dilakukan setiap saat kita bisa menang
                  </Text>
                </View> 

            </ScrollView>
        </View>   
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft:0,    
  },
  
});  