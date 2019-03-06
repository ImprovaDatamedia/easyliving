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
import {HomeIconButton, DBFlatList, DBViewList,TextOfMySQLDate, HideableView} from '../components/react-native-improva.js';
import Icon from 'react-native-vector-icons/Entypo';


stripNews = false;

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header : null
  };

  constructor(props) {
    super(props);
//    this.handler = this.handler.bind(this);
    this.state={
      hideExtraPage:true,
    }
  };

  goto=(screenName, params)=>{
    if(screenName!=''){this.props.navigation.navigate(screenName, params)}
    else{Alert.alert('eLiving',"Sorry to dissapoint you, the page is not ready yet, we are working hard to make it ready for you soon")}
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
                  <HomeIconButton onPress={()=>{this.goto("EasyGo")}} imageSource={require('../assets/icons/iconEasyGo.png')} label='Transport' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyMart")}} imageSource={require('../assets/icons/iconEasyMart.png')} label='Mart' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyService")}} imageSource={require('../assets/icons/iconEasyService.png')} label='Service' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyBuild")}} imageSource={require('../assets/icons/iconEasyBuild.png')} label='Build' labelStyle='eLiving' style={{width:80, height:60}}/>
                </View>
                <View style={{flex:1, justifyContent: 'space-around', flexDirection:"row", height:100, alignItems:'center',  backgroundColor:'white'}}>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconEasyFood.png')} label='Food' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyRent")}} imageSource={require('../assets/icons/iconEasyRent.png')} label='Rental' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconEasyTrade.png')} label='Trade' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconEasySport.png')} label='Sport' labelStyle='eLiving' style={{width:80, height:60}}/>
                </View>
                <View style={{alignItems:'center', marginTop:3, marginBottom:3, marginLeft:7, marginRight:7, paddingTop:20, paddingBottom:20, backgroundColor:'white'}}>
                    <Image style={{borderRadius:5, width:lebar-10, height: lebar*(1/2.5), resizeMode: 'stretch'}} source={require('../assets/images/HomeScreen/adFirst.png')}/>
                </View> 
                <View style={{flex:1, justifyContent: 'space-around', flexDirection:"row", height:100, alignItems:'center',  backgroundColor:'white'}}>
                  <HomeIconButton onPress={()=>{this.goto("EasyAdminLoc")}} imageSource={require('../assets/icons/iconRTRW.png')} label='RTRW' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconPOI.png')} label='Places' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyPhoneKategori")}} imageSource={require('../assets/icons/iconPhoneNumbers.png')} label='Contact' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/iconAboutSentulCity.png')} label='Sentul' labelStyle='eLiving' style={{width:80, height:60}}/>
                </View>
                <View style={{alignItems:'center', marginTop:3, marginBottom:3, paddingTop:20, paddingBottom:20, marginLeft:7, marginRight:7, backgroundColor:'white'}}>
                    <Image style={{borderRadius:5, width:lebar-10, height: lebar*(1/2.5), resizeMode: 'stretch'}} source={require('../assets/images/HomeScreen/adThird.jpg')}/>
                </View> 
                <View style={{justifyContent:'flex-end', alignItems:'flex-end', paddingRight:5, marginBottom:0, backgroundColor:'white'}}>
                  <Icon.Button style={{height:40, paddingLeft:20}}
                    name={this.state.hideExtraPage?"arrow-down":"arrow-up"}
                    color="gray"
                    backgroundColor="white"//"cornsilk"//</View>#3b5998"
                    borderColor="lightgray"
                    borderWidth={0}
                    onPress={()=> this.setState({hideExtraPage: !this.state.hideExtraPage})}
                    />
                </View>
                <HideableView hide={this.state.hideExtraPage} style={{flex:1, marginBottom:4, justifyContent: 'space-around', flexDirection:"row", height:100, alignItems:'center',  backgroundColor:'white'}}>
                  <HomeIconButton onPress={()=>{this.goto("EasyAdminLoc")}} imageSource={require('../assets/icons/laundry.png')} label='Laundy' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/photo.png')} label='Photo Print' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("EasyPhoneKategori")}} imageSource={require('../assets/icons/farmacy.png')} label='Farmacy' labelStyle='eLiving' style={{width:80, height:60}}/>
                  <HomeIconButton onPress={()=>{this.goto("")}} imageSource={require('../assets/icons/fruits.png')} label='Buah Lokal' labelStyle='eLiving' style={{width:80, height:60}}/>
                </HideableView>
                <View style={{marginTop:0, marginBottom:0, paddingTop:0, paddingBottom:0, marginLeft:0, marginRight:0, backgroundColor:'#f8f8f8'}}>

                  <DBViewList
                    query = 'SELECT * FROM tbnews;'
                    onRenderItem={(item) => (
                      <View key={item.ID} style={{marginTop:0, marginBottom:2, paddingTop:20, paddingBottom:5, paddingLeft:10, marginLeft:0, paddingRight:10, marginRight:0, backgroundColor:'white'}}>
                      <TouchableOpacity  onPress={()=>{this.goto("EasyWebBrowser", {url:item.Link})}}>
                      <TextOfMySQLDate dateSQL={item.Tanggal} dateOnly={true} style={{color:'gray', textAlign:'right', fontSize:12, fontWeight:'normal', backgroundColor: 'transparent'}}>
                      </TextOfMySQLDate>
                      <Text  style={{color:'gray', textAlign:'left', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                        {item.Judul}
                      </Text>
                      <Text  style={{color:'gray', marginBottom:20, textAlign:'left', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        {item.Berita.length>185?item.Berita.substring(0,185)+'......':item.Berita}
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