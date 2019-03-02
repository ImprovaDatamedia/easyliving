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
  Alert,
  FlatList,
  SectionList
} from 'react-native';
import { ListItem } from 'react-native-elements'
import {HomeIconButton, DBFlatList, DBViewList,TextOfMySQLDate} from '../components/react-native-improva.js';
import { Col, Row, Grid } from "react-native-easy-grid";


stripNews = false;

export default class HomeScreen extends React.Component {

  MyData=[{ID:1, Judul:'Judul1', Berita:'Berita1'},
  {ID:2, Judul:'Judul2', Berita:'Berita2'}];

  static navigationOptions = {
    header : null
  };

  goto=(screenName, params)=>{
    if(screenName!=''){this.props.navigation.navigate(screenName, params)}
    else{Alert.alert('eLiving',"Sorry to dissapoint you, the page is not ready yet, we'll work hard to release it soon")}
  }

  render() {

    let lebar =  Dimensions.get('window').width; 
    return (
        <View style={{flex:1,  backgroundColor: 'white'}}>

            <View style={{flexDirection:'row', width:lebar, height:lebar/5, alignItems: 'center', justifyContent:'center', marginTop:35, marginBottom:10, backgroundColor: 'white', shadowColor: "black", shadowOffset: { height:4, width:4}, shadowRadius:4, shadowOpacity: 0.3}}>
                <View style={{shadowColor: "black", shadowOffset: { height:2, width:2}, shadowRadius:3, shadowOpacity: 0.3}}>
                  <Image style={{width:lebar*0.4, height:lebar*0.4*0.427, resizeMode: 'stretch'}} source={require('../assets/images/HomeScreen/EasyLivingLogoNewSmall.png')}/>
                </View>
                <Text style={{color:'#909090', paddingLeft:5, paddingTop:20, fontSize:20, fontWeight:'normal', shadowColor: "black", shadowOffset: { height:1, width:1}, shadowRadius:1, shadowOpacity: 0.3}}>@ Sentul City</Text>
            </View> 
            <ScrollView style={{paddingTop:10, backgroundColor:'#f8f8f8'}}>   
                <View style={{flex:1, justifyContent: 'space-around', flexDirection:"row", height:100, alignItems:'center',  backgroundColor:'white'}}>
                  <HomeIconButton onPress={()=>{this.goto("EasyGo")}} imageSource={require('../assets/icons/iconEasyGo.png')} label='Transport' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconEasyMart.png')} label='Mart' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyService")}} imageSource={require('../assets/icons/iconEasyService.png')} label='Service' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyBuild")}} imageSource={require('../assets/icons/iconEasyBuild.png')} label='Build' style={{width:80, height:60}}/>
                </View>
                <View style={{flex:1, justifyContent: 'space-around', flexDirection:"row", height:100, alignItems:'center',  backgroundColor:'white'}}>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconEasyFood.png')} label='Food' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyRent")}} imageSource={require('../assets/icons/iconEasyRent.png')} label='Rental' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconEasyTrade.png')} label='Trade' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconEasySport.png')} label='Sport' style={{width:80, height:60}}/>
                </View>
                <View style={{alignItems:'center', marginTop:3, marginBottom:3, marginLeft:7, marginRight:7, paddingTop:20, paddingBottom:20, backgroundColor:'white'}}>
                    <Image style={{borderRadius:5, width:lebar-10, height: lebar*(1/2.5), resizeMode: 'stretch'}} source={require('../assets/images/HomeScreen/adFirst.png')}/>
                </View> 
                <View style={{flex:1, justifyContent: 'space-around', flexDirection:"row", height:100, alignItems:'center',  backgroundColor:'white'}}>
                  <HomeIconButton onPress={()=>{this.goto("RTRW")}} imageSource={require('../assets/icons/iconRTRW.png')} label='RTRW' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconPOI.png')} label='Place' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyPhoneKategori")}} imageSource={require('../assets/icons/iconPhoneNumbers.png')} label='Contact' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconAboutSentulCity.png')} label='Sentul' style={{width:80, height:60}}/>
                </View>
                <View style={{alignItems:'center', marginTop:3, marginBottom:3, paddingTop:20, paddingBottom:20, marginLeft:7, marginRight:7, backgroundColor:'white'}}>
                    <Image style={{borderRadius:5, width:lebar-10, height: lebar*(1/2.5), resizeMode: 'stretch'}} source={require('../assets/images/HomeScreen/adThird.jpg')}/>
                </View> 
                <View>
 
                </View>
                <View style={{marginTop:0, marginBottom:0, paddingTop:0, paddingBottom:0, marginLeft:0, marginRight:0, backgroundColor:'#f8f8f8'}}>

                  <DBViewList
                    query = 'SELECT * FROM tbnews;'
                    onRenderItem={({item}) => (
                      <View style={{marginTop:0, marginBottom:2, paddingTop:20, paddingBottom:5, paddingLeft:10, marginLeft:0, paddingRight:10, marginRight:0, backgroundColor:'white'}}>
                      <TouchableOpacity  onPress={()=>{this.goto("EasyWebBrowser", {url:item.Link})}}>
                      <Text  style={{color:'gray', textAlign:'left', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                        {item.Judul}
                      </Text>
                      <Text  style={{color:'gray', marginBottom:20, textAlign:'left', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        {item.Berita}
                      </Text>   
                      </TouchableOpacity>   
                      </View>            
                    )}
                  />

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