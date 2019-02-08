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

export default class EasyRentKategoriScreen extends React.Component {
  static navigationOptions = {
    title: 'Pilih Kategori',
  };

  state={
    rowData:[],
  } 

  gettbKategori = () => {
    var table=[];
    return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token : 'SELECT',
        query : 'SELECT * from tbeasyrentkategori'
      })
    }).then((response) => {return response.json()
    }).then((responseJson) => {
        for(i=0;i<responseJson.length;i++){
          var val= this.drawRow(responseJson[i]);
          table.push(val);
        }
        this.setState({rowData:table})
      }
    ).catch((error) => {
      console.error(error);
    });
  }

  selectKategori=(kategoriID)=>{
    this.props.navigation.navigate(this.props.navigation.getParam('callerScreen', ''), {kategoriID:kategoriID});

    //    selectKategori=(kategoriID)=>{
//      this.props.navigation.navigate("EasyRent", {kategoriID:kategoriID});
  
//    this.props.navigation.goBack(null);
//        const { state, goBack } = this.props.navigation;  
//    goBack(null);
  }   

drawRow = (dataJson) => {
    return(
      <TouchableOpacity key={dataJson.ID} onPress={()=> this.selectKategori(dataJson.ID)}>
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

  componentDidMount(){
    this.gettbKategori();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{paddingTop:6, paddingLeft:3, paddingRight:3, backgroundColor:'#f2f2f2'}}>   
          {this.state.rowData}
        </ScrollView>
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
});  