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


export default class EasyServiceScreen extends React.Component {
  static navigationOptions = {
    title: 'Easy Build',
    headerStyle: {backgroundColor: '#e7e9df'},
  };

  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
        <View style={{flex:1,  backgroundColor: 'white'}}>
            <View style={{alignItems: 'left',borderRadius:5, marginBottom:7, paddingLeft:10, paddingRight:10, paddingBottom: 10, backgroundColor: 'white'}}>
                <Text  style={{color:'gray', paddingTop: 25,textAlign:'left', fontSize:16, fontWeight:'normal', backgroundColor: 'white'}}>
                    Easy Living memudahkan anda untuk mendapatkan bantuan dari tenaga profesional untuk melakukan 
                    berbagai pekerjaan.
                </Text>
            </View> 
            <ScrollView style={{paddingTop:7, backgroundColor:'#f8f8f8'}}>   
                <View style={{flex:1, flexDirection:"row", alignItems:'left', marginBottom:7, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                <Image source={require('../assets/images/HomeBuilding.jpeg')} style={{marginTop:30, marginLeft:10, width:60, height:60, resizeMode: 'stretch'}}/>
                <View style={{flex:1, alignItems:'left', paddingTop:5, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                    <Text  style={{color:'black', textAlign:'left', textAlignVertical:'bottom', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
                        Renovasi dan Pembangunan Rumah
                    </Text>
                    <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'top', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        Melakukan pekerjaan renovasi dan pembangunan rumah.
                    </Text>
                </View>
                </View> 
                <View style={{flex:1, flexDirection:"row", alignItems:'left', marginBottom:7, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                <Image source={require('../assets/images/kanopi.jpeg')} style={{marginTop:30, marginLeft:10, width:60, height:60, resizeMode: 'stretch'}}/>
                <View style={{flex:1, alignItems:'left', paddingTop:5, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                    <Text  style={{color:'black', textAlign:'left', textAlignVertical:'bottom', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
                        Pembuatan Kanopi dan teralis jendela
                    </Text>
                    <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        Design dan ukuran bisa disesuaikan dengan selera anda. Telah mengerjakan banyak kanopi dan teralis di perumahan sentul city
                    </Text>
                </View>
                </View>
                <View style={{flex:1, flexDirection:"row", alignItems:'left', marginBottom:7, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                <Image source={require('../assets/images/CCTV.jpeg')} style={{marginTop:30, marginLeft:10, width:60, height:60, resizeMode: 'stretch'}}/>
                <View style={{flex:1, alignItems:'left', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                    <Text  style={{color:'black', textAlign:'left', textAlignVertical:'bottom', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
                        Pemasangan CCTV
                    </Text>
                    <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        Dengan CCTV rumah anda akan lebih aman dan anda dapat memonitor kondisi rumah dan pekarangan secara live
                    </Text>
                </View>
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