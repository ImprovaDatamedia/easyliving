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
  WebView,
  Dimensions,
  Alert,
} from 'react-native';
import {HomeIconButton, DBFlatList, Spinner, ImageAlter, DisplayHarga, DBViewList,TextOfMySQLDate} from '../components/react-native-improva.js';
import { Button } from 'react-native-elements';

export default class EasyMartBarangDetailScreen extends React.Component {

  Qty = 1;

  static navigationOptions = {
    title: 'Barang Detail',
  };


beliBarang=()=>{
  let item = this.props.navigation.getParam('Data', []); 
  Alert.alert('eMart',item.Nama+' sebanyak '+this.Qty+' buah ditambahkan ke keranjang anda')
}  

  render() {
    let lebar =  Dimensions.get('window').width; 
    let item = this.props.navigation.getParam('Data', []); 
    return (
        <ScrollView  style={{flex:1, backgroundColor:'#f8f8f8'}}>
          <View style={{margin:5, width:lebar-10, height:lebar-100, backgroundColor:'white'}}>
            <ImageAlter 
              source={{uri: 'https://www.easyliving.id/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_1.jpg'}} 
              alterSource={{uri: 'https://www.easyliving.id/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_thumb.jpg'}} 
              defaultSource={require('../assets/images/NoImage.png')}
              style={{flex:1, margin:0, resizeMode:'contain'}}/>
          </View>
          <View style={{height:180, paddingLeft:10, paddingTop:10, paddingBottom:10, paddingRight:10, borderRadius:0, backgroundColor:'#fcfcfc'}}>
            <Text style={{height:50, flexDirection:'column', color:'gray', textAlign:'left', fontSize:18, fontWeight:'normal', backgroundColor: 'transparent'}}>
                {item.Nama}
            </Text>
            <View style={{height:10}}/>
            <DisplayHarga style={{height:40, backgroundColor:'transparent', textAlignVertical:'center'}} harga={item.Harga} hargaNormal={item.HargaNormal}/>
            <Text style={{height:20, color:'gray', paddingLeft:40, textAlign:'left', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
              Jumlah:
            </Text>
            <View style={{height:40, flexDirection:'row', paddingRight:20, justifyContent:'flex-start', backgroundColor:'transparent'}} >
              <Spinner style={{marginTop:4, marginLeft:40}}
                min={1}
                fontSize={18}
                btnFontSize={18}
                max={99}
                default={1}
                width={120}
                height={35}
                onNumChange={(sum)=>this.Qty=sum}
              />
              <View style={{width:30}}/>
              <Button buttonStyle={{height:40, width:100, alignItems:'flex-end', backgroundColor:'mediumseagreen'}}
                raised
                onPress={()=> Alert.alert('eMart', item.Nama+' sebanyak '+this.Qty+' buah ditambahkan ke keranjang anda')}
                title="Beli"
                borderRadius={5}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />                
            </View>
          </View>

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