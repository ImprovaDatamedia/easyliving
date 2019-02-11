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
} from 'react-native';
import EasyRentKategoriList from "./EasyLivingComp.js"

export default class EasyRentKategoriScreen extends React.Component {
  static navigationOptions = {
    title: 'Pilih Kategori',
  };

  state={
    rowData:[],
  } 


  selectKategori=(kategoriID)=>{
    this.props.navigation.navigate(this.props.navigation.getParam('callerScreen', ''), {kategoriID:kategoriID});

    //    selectKategori=(kategoriID)=>{
//      this.props.navigation.navigate("EasyRent", {kategoriID:kategoriID});
  
//    this.props.navigation.goBack(null);
//        const { state, goBack } = this.props.navigation;  
//    goBack(null);
  }   


  componentDidMount(){
  }

  render() {
    return (
      <View style={styles.container}>
        <EasyRentKategoriList hideHeader={true} onSelectOne={this.selectKategori}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});  