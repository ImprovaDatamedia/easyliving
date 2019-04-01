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
  TextInput,
} from 'react-native';
import {
  HomeIconButton, 
  DBFlatList, 
  ImageAlter, 
  DisplayHarga, 
  HideableView, 
  ActionIconButton
} from '../components/react-native-improva.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';



export default class EasyMartScreen extends React.Component {


  static navigationOptions = {
    title: 'Easy Mart',
    headerStyle: {backgroundColor: '#e7e9df'},
  };

  constructor(props) {
    super(props);
//    this.handler = this.handler.bind(this);
    this.state={
      hideCari:true,
      hideBanner:false,
    }
  };
  
  showEasyMartBarangDetailScreen(item){
    this.props.navigation.navigate("EasyMartBarangDetail", {Data:item});
  }

  showEasyMartKeranjangScreen=()=>{
    console.log('kerangjang');
//    alert('Hi');
//    this.props.navigation.navigate("EasyMartBarangDetail", {Data:item});
//    this.props.navigation.navigate("EasyMartBarangDetail");//"EasyMartKeranjang");
  }



  renderHeader = () => {
    let lebar =  Dimensions.get('window').width; 
    return(
      <View style={{alignItems:'center', marginTop:0, marginBottom:0, marginLeft:0, marginRight:0, paddingTop:0, paddingBottom:0, backgroundColor:'white'}}>
      <Image style={{borderRadius:0, width:lebar, height: lebar*(1/2.5), resizeMode: 'stretch'}} 
        source={{uri:'http://www.easyliving.id:81/images/main/eMartHead.png'}}/>
    </View>
    )
  }


  listScroll=(event)=> {
    if (event.nativeEvent.contentOffset.y<=0) {
      if(this.state.hideBanner==true){this.setState({hideBanner:false})}
    } else {
      if(this.state.hideBanner==false){this.setState({hideBanner:true})}
    }
  }

  drawItem = (item) => {
    return(

      <View style={{flex:1, height:180, margin:6, borderRadius:5, backgroundColor:'white'}}>
      <TouchableOpacity style={{flex:1, flexDirection:'column'}} onPress={()=>this.showEasyMartBarangDetailScreen(item)}>
        <View style={{flex:0.6, alignItems:'center'}}>
         <ImageAlter 
              source={{uri: 'http://www.easyliving.id:81/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_thumb.jpg'}} 
              alterSource={{uri: 'http://www.easyliving.id:81/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_1.jpg'}} 
              defaultSource={require('../assets/images/NoImage.png')}
              style={{marginTop:5, marginLeft:5, width:100, height:100}}/>
        </View>
        <View style={{flex:0.4, marginLeft:5, marginRight:5}}>
          <Text numberOfLines={2} style={{color:'gray', height:40, textAlign:'left', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
                  {item.Nama}
          </Text>
          <DisplayHarga harga={item.Harga} hargaNormal={item.HargaNormal} style={{height:26, backgroundColor:'transparent'}}/>
        </View>
        </TouchableOpacity>

      </View>
    )
  }


/*  drawItem = (item) => {
    let imgSource = "uri: 'http://www.easyliving.id:81/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_thumb.jpg'"
    let imgDefault = 'http://www.easyliving.id:81/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_1.jpg'
    return(
        <TouchableOpacity onPress={()=>this.showEasyMartBarangDetailScreen(item)}>
          <View style={{flex:1, flexDirection:"row", alignItems:'flex-start', marginBottom:2, marginLeft:4, marginRight:4, borderRadius:5, backgroundColor:'white'}}>
            <ImageAlter 
              source={{uri: 'http://www.easyliving.id:81/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_thumb.jpg'}} 
              alterSource={{uri: 'http://www.easyliving.id:81/images/EasyMart/Products/'+item.ImagePath+'/'+item.ImagePath+'_1.jpg'}} 
              defaultSource={require('../assets/images/NoImage.png')}
              style={{marginTop:5, marginLeft:5, width:100, height:100}}/>
              <Text  style={{position: 'absolute', left:0, top:0, color:'#b0b0b0', marginTop:5, marginBottom:0, textAlign:'left', textAlignVertical:'top', fontSize:10, fontWeight:'normal', backgroundColor: 'transparent'}}>
                {item.ID}
              </Text>
            <View style={{flex:1, alignItems:'flex-start', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:5, borderRadius:5, backgroundColor:'transparent'}}>
              <Text  style={{flex:0.5, color:'gray', textAlign:'left', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
                  {item.Nama}
              </Text>
              <DisplayHarga harga={item.Harga} hargaNormal={item.HargaNormal} style={{height:26, backgroundColor:'transparent'}}/>
            </View>
          </View>   
        </TouchableOpacity>
      )
    }
 */   
    cariBarang=()=>{
//      this.cariText = this.refs.cariText._lastNativeText, 
      this.setState({hideCari: true});
      this.props.navigation.setParams({kategoriID: 0});
      this.props.navigation.setParams({cariBarang: this.refs.cariText._lastNativeText});
    } 


  showCariTextInput=()=>{
    this.setState({hideCari: !this.state.hideCari});
  }

  render() {
    let lebar =  Dimensions.get('window').width; 
    const {navigation} = this.props;
    vWhere = '';
    if(navigation.getParam('kategoriID', 0)!=0){
      vWhere='WHERE KategoriID='+navigation.getParam('kategoriID', 0)
    } else if(navigation.getParam('cariBarang', '')!=''){
      vWhere = 'WHERE Nama LIKE "%'+navigation.getParam('cariBarang', '')+'%"'
    }
    return (
      <View  style={{flex:1}}>
        <View style={{justifyContent: 'space-around', flexDirection:"row", paddingTop:0, height:60, alignItems:'center',  backgroundColor:'#f4f4f4'}}>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.showEasyRentKategoriScreen} name="list" label='Kategori'/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.showCariTextInput} name="search" label='Cari'/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.showKetentuan} name="list-alt" label='Ketentuan'/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.showEasyMartKeranjangScreen} name="shopping-basket" label='Keranjang'/>
        </View>
        <HideableView hide={this.state.hideCari} style={{flexDirection:"row", height:55, alignItems:'center',  backgroundColor:'#514e65'}}>
            <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#b2b2b2', borderWidth: 1, backgroundColor:'#FFFCF4'}}
              underlineColorAndroid = "transparent"
              ref = "cariText" 
              autoCapitalize = "none"
              onChangeText = {this.cariChangeText}
              onSubmitEditing = {this.cariBarang}
              autoFocus = {true}
            />
            <Icon.Button style={{height:40, paddingLeft:18, marginTop:0, paddingTop:7}}
              name="search"
              backgroundColor="#3a384f"//</View>#3b5998"
              onPress={this.cariBarang}
            ></Icon.Button>
        </HideableView>
        <View style={{width:lebar, height:0, backgroundColor:'lightgray'}}/>
        <DBFlatList style={{flex:1, paddingTop:0, paddingLeft:0, paddingRight:0, backgroundColor:'#f4f4f4'}}
          query = {'SELECT * FROM skawan.tbbarang ORDER By SalesRating DESC '+vWhere} 
          onRenderItem = {this.drawItem}
          onTableEmpty = {() => {Alert.alert('eLiving','No item available in this category')}}
          onRenderHeader = {this.renderHeader}
          onScroll = {this.listScroll}
          limit = {20}
          numColumns = {2}
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