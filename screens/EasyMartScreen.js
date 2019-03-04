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
  TextInput,
} from 'react-native';
import {HomeIconButton, DBFlatList, ImageAlter, DisplayHarga, DBViewList,TextOfMySQLDate, HideableView, RupiahFormat} from '../components/react-native-improva.js';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class EasyMartScreen extends React.Component {
  static navigationOptions = {
    title: 'Easy Mart',
  };

  constructor(props) {
    super(props);
//    this.handler = this.handler.bind(this);
    this.state={
      hideCari:true,
    }
  };

  
  showEasyMartBarangDetailScreen(item){
    this.props.navigation.navigate("EasyMartBarangDetail", {Data:item});
  }

  drawItem = (item) => {
    let imgSource = "uri: 'https://www.easyliving.id/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_thumb.jpg'"
    let imgDefault = 'https://www.easyliving.id/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_1.jpg'
    return(
        <TouchableOpacity onPress={()=>this.showEasyMartBarangDetailScreen(item)}>
          <View style={{flex:1, flexDirection:"row", alignItems:'flex-start', marginBottom:2, marginLeft:4, marginRight:4, borderRadius:5, backgroundColor:'white'}}>
            <ImageAlter 
              source={{uri: 'https://www.easyliving.id/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_thumb.jpg'}} 
              alterSource={{uri: 'https://www.easyliving.id/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_1.jpg'}} 
              defaultSource={require('../assets/images/NoImage.png')}
              style={{marginTop:5, marginLeft:5, width:100, height:100}}/>
              <Text  style={{position: 'absolute', left:0, top:0, color:'#b0b0b0', marginTop:5, marginBottom:0, textAlign:'left', textAlignVertical:'top', fontSize:10, fontWeight:'normal', backgroundColor: 'transparent'}}>
                {item.ID}
              </Text>
            <View style={{flex:1, alignItems:'flex-start', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:5, borderRadius:5, backgroundColor:'transparent'}}>
              <Text  style={{flex:0.5, color:'gray', textAlign:'left', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
                  {item.Nama}
              </Text>
              <DisplayHarga harga={item.Harga} hargaNormal={item.HargaNormal} style={{height:20, backgroundColor:'transparent'}}/>
            </View>
          </View>   
        </TouchableOpacity>
      )
    }
    

  render() {
    let lebar =  Dimensions.get('window').width; 
    const {navigation} = this.props;
    return (
      <View  style={{flex:1}}>
        <View style={{alignItems:'center', marginTop:1, marginBottom:0, marginLeft:0, marginRight:0, paddingTop:0, paddingBottom:0, backgroundColor:'white'}}>
          <Image style={{borderRadius:0, width:lebar, height: lebar*(1/2.5), resizeMode: 'stretch'}} 
            source={{uri:'https://www.easyliving.id/images/rent/bukalapak.jpg'}}/>
        </View>
        <View style={{justifyContent: 'space-around', flexDirection:"row", paddingTop:5, height:50, alignItems:'center',  backgroundColor:'#4a485f'}}>
          <HomeIconButton onPress={this.showEasyRentKategoriScreen} imageSource={require('../assets/icons/Kategori.png')} label='Kategori' labelStyle='small' darkMode={true} style={{width:60, height:45}}/>
          <HomeIconButton onPress={()=> this.setState({hideCari: !this.state.hideCari})} imageSource={require('../assets/icons/Search.png')} label='Cari' labelStyle='small' darkMode={true} style={{width:60, height:45}}/>
          <HomeIconButton onPress={this.showKetentuan} imageSource={require('../assets/icons/Ketentuan.png')} label='Ketentuan' labelStyle='small' darkMode={true} style={{width:60, height:45}}/>
          <HomeIconButton onPress={this.showEasyRentPasangScreen} imageSource={require('../assets/icons/Basket.png')} label='Keranjang' labelStyle='small' darkMode={true} style={{width:60, height:45}}/>
        </View>
        <HideableView hide={this.state.hideCari} style={{flexDirection:"row", height:55, alignItems:'center',  backgroundColor:'#4a485f'}}>
            <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#b2b2b2', borderWidth: 1, backgroundColor:'#FFFCF4'}}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {this.cariChangeText}
              onSubmitEditing = {this.cariBarang}
            />
            <Icon.Button style={{height:40, paddingLeft:18, marginTop:0, paddingTop:7}}
              name="search"
              backgroundColor="#0a3e74"//</View>#3b5998"
              onPress={this.cariBarang}
            ></Icon.Button>
        </HideableView>
        <DBFlatList style={{flex:1, paddingTop:2, paddingLeft:0, paddingRight:0, backgroundColor:'#f0f0f0'}}
          query = {'SELECT * FROM skawan.tbbarang'} 
          onRenderItem = {this.drawItem}
          onTableEmpty = {() => {Alert.alert('eLiving','No item available in this category')}}
        />

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
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});  