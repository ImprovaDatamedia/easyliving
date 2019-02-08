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
  };
  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
        <View style={{flex:1,  backgroundColor: 'white'}}>
            <View style={{alignItems: 'left',borderRadius:5, marginBottom:7, paddingLeft:10, paddingRight:10, paddingBottom: 10, backgroundColor: 'white'}}>
                <Text  style={{color:'gray', paddingTop: 25,textAlign:'left', fontSize:16, fontWeight:'normal', backgroundColor: 'white'}}>
                    Easy Living memudahkan anda untuk mendapatkan bantuan dari tenaga profesional untuk melakukan pekerjaan 
                    perbaikan maupun pemeliharaan rumah dan peralatan rumah.
                </Text>
            </View> 
            <ScrollView style={{paddingTop:7, backgroundColor:'#f8f8f8'}}>   
                <View style={{flex:1, flexDirection:"row", alignItems:'left', marginBottom:7, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                <Image source={require('../assets/images/HomeFix.png')} style={{marginTop:30, marginLeft:10, width:60, height:60, resizeMode: 'stretch'}}/>
                <View style={{flex:1, alignItems:'left', paddingTop:5, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                    <Text  style={{color:'black', textAlign:'left', textAlignVertical:'bottom', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
                        Perbaikan Rumah
                    </Text>
                    <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'top', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        Melakukan pekerjaan perbaikan kerusakan rumah, ledeng, kelistrikan, atap bocor, mengecat, dll.
                    </Text>
                    <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'top', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        Tarif: Rp 130.000 perhari atau Rp 25.000 perjam (minimal 2 jam).
                    </Text>
                </View>
                </View> 
                <View style={{flex:1, flexDirection:"row", alignItems:'left', marginBottom:7, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                <Image source={require('../assets/images/ACFix.png')} style={{marginTop:30, marginLeft:10, width:60, height:60, resizeMode: 'stretch'}}/>
                <View style={{flex:1, alignItems:'left', paddingTop:5, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                    <Text  style={{color:'black', textAlign:'left', textAlignVertical:'bottom', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
                        Service AC
                    </Text>
                    <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        Memperbaiki kerusakan AC, membersihkan dan melakukan perawatan berkala
                    </Text>
                    <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        Tarif: Rp 130.000 per kedatangan, Rp 50.000 isi freon.
                    </Text>
                </View>
                </View>
                <View style={{flex:1, flexDirection:"row", alignItems:'left', marginBottom:7, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                <Image source={require('../assets/images/WashingFix.png')} style={{marginTop:30, marginLeft:10, width:60, height:60, resizeMode: 'stretch'}}/>
                <View style={{flex:1, alignItems:'left', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
                    <Text  style={{color:'black', textAlign:'left', textAlignVertical:'bottom', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
                        Service Mesin Cuci
                    </Text>
                    <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        Memperbaiki kerusakan mesin cuci, membersihkan dan melakukan perawatan berkala
                    </Text>
                    <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                        Tarif: Rp 130.000 per kedatangan, Rp 50.000 isi freon.
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