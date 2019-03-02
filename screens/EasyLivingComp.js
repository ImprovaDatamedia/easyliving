"use strict";

import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import ListViewTable from "../components/ListViewTable.js"
import {HideableView} from "../components/HideableView.js"



class EasyRentKategoriList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rowData:[],
      kategoriID:0,
    };
  }


  pressKategori=(kategoriID, kategoriNama)=>{
    this.setState({kategoriID:kategoriID});
      if (typeof this.props.onSelectOne === 'function') {
      this.props.onSelectOne(kategoriID, kategoriNama)
    }    
  }   

  drawRow = (dataJson) => {
    return(
      <TouchableOpacity key={dataJson.ID} onPress={()=> this.pressKategori(dataJson.ID, dataJson.Nama)}>
      <View  style={{flex:1, flexDirection:"row", alignItems:'flex-start', marginBottom:2, marginLeft:3, marginRight:3, borderRadius:5, backgroundColor:'white'}}>
        <Image source={{uri: 'https://img.icons8.com/color/2x/'+dataJson.Gambar}} style={{marginTop:5, marginLeft:10, paddingBottom:5, paddingRight:5, width:50, height:50, resizeMode: 'stretch', shadowColor: "black", shadowOffset: { height:2, width:1}, shadowOpacity: 0.3,}}/>
        <View style={{flex:1, alignItems:'flex-start', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'bottom', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {dataJson.Nama}
          </Text>
          <Text  style={{color:'#b0b0b0', marginTop:5, marginBottom:5, textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {dataJson.Deskripsi}
          </Text>
        </View>
      </View>
      </TouchableOpacity>         
    )
  }


  render() {
    return (
      <View style={{borderRadius:5}}>
        <HideableView hide={this.props.hideHeader} style={{height:40, alignItems:'center', justifyContent:'center', borderRadius:3, backgroundColor:'#cd695a'}}>
          <Text  style={{color:'#e8e8e8', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
          Pilih Kategori Barang </Text>
        </HideableView>
        <View style={{height:3, backgroundColor:'#f2f2f2'}}>
        </View> 
        <ScrollView style={{paddingTop:2, paddingLeft:3, paddingRight:3, borderRadius:5, backgroundColor:'#f2f2f2'}}>   
        <ListViewTable
          Query = 'SELECT * from tbeasyrentkategori'
          onRenderRow = {this.drawRow}
        />
        </ScrollView>
      </View>
    );
  }
}

export default EasyRentKategoriList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});  