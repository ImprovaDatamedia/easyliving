import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Picker,
  TextInput,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import EasyRentKategoriList from "./EasyLivingComp.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import ListViewTable from "../components/ListViewTable.js";
import ImageLabelButton from "../components/ImageLabelButton.js";
import {DBString, DBText, screenMask, renderIf} from '../components/react-native-improva.js'



let lebar =  Dimensions.get('window').width; 
let strip = 0;
let Result = [];



class TabText extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      text2: "",
    }
  }

  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
      <View style={{flexDirection:'row',height:50, alignItems:'center', justifyContent:'flex-start'}}>
        <View style={{justifyContent:'center', alignItems:'flex-start',  borderWidth:1, borderColor:'#E8E8E8', height:50, width:120, backgroundColor: '#F0F0F0'}}>
          <Text style={{color:'#707070', marginLeft:10, textAlign:'left', fontSize:16,}}>
            {this.props.text1}
          </Text>
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-start',  borderWidth:1, borderColor:'#E8E8E8', height:50, backgroundColor: '#F8F8F8'}}>
          <TouchableOpacity onPress={()=>this.props.onPress==undefined?null:this.props.onPress(this.props.contactID)}>
            {this.props.dbtext2==undefined?
            <Text style={{color:this.props.contactID==undefined?'darkmagenta':'dodgerblue', fontSize:80, fontWeight:this.props.contactID==undefined?'bold':'normal', marginLeft:10, textAlign:'left', fontSize:18,}}>
              {this.props.text2}
            </Text>
            :
            <DBText style={{color:this.props.contactID==undefined?'darkmagenta':'dodgerblue', fontSize:80, fontWeight:this.props.contactID==undefined?'bold':'normal', marginLeft:10, textAlign:'left', fontSize:18,}}
              query={this.props.dbtext2}/>
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  };
}

class RTRWText extends React.Component {

  render() {
    return (
      <View style={{flexDirection:'row',height:50, alignItems:'center', justifyContent:'flex-start'}}>
        <View style={{justifyContent:'center', alignItems:'flex-start',  borderWidth:1, borderColor:'#E8E8E8', height:50, width:60, backgroundColor: '#F0F0F0'}}>
          <Text style={{color:'#707070', marginLeft:10, textAlign:'left', fontSize:16,}}>
            {this.props.text1}
          </Text>
        </View>
        <View style={{justifyContent:'center', alignItems:'flex-start',  borderWidth:1, borderColor:'#E8E8E8', height:50, width:60, backgroundColor: '#F8F8F8'}}>
          <Text style={{color:'darkmagenta', fontWeight:'bold', marginLeft:10, textAlign:'left', fontSize:18,}}>
            {this.props.text2}
          </Text>
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-start',  borderWidth:1, borderColor:'#E8E8E8', height:50, backgroundColor: '#F8F8F8'}}>
          <Text style={{color:'#707070', marginLeft:10, textAlign:'left', fontSize:14,}}>
            {this.props.text3}
          </Text>
          <TouchableOpacity onPress={()=>this.props.onPress==undefined?null:this.props.onPress(this.props.contactID)}>
            {this.props.dbtext4==undefined?
            <Text style={{color:'dodgerblue', fontWeight:'normal', marginLeft:10, textAlign:'left', fontSize:18,}}>
              {this.props.text4}
            </Text>:
            <DBText style={{color:'dodgerblue', fontWeight:'normal', marginLeft:10, textAlign:'left', fontSize:18,}}
              query={this.props.dbtext4}/>
          }
          </TouchableOpacity>
        </View>
      </View>
    )
  };
}

function LongToX(vLong){
  imgW = 1132;//1830;
  vLongA = 106.8391;
  vLongB = 106.8989;
  return imgW*(vLong-vLongA)/(vLongB-vLongA);
}

function LatToY(vLat){
  imgH = 730;//1182;
  vLatA = -6.5557;
  vLatB = -6.5941;
  return imgH*(vLat-vLatA)/(vLatB-vLatA);
}


export default class EasyAdminLocScreen extends React.Component {
  
  _isMounted = false;

  static navigationOptions = ({ navigation }) => {
    return{
      title: "Wilayah RT/RW"
    };
  };

  constructor(props) {
    super(props);
    this.state={
      param : [],
      wilDesa : '',
      wilKec : '',
      wilKab : '',
      wilProv : '',
      wilayah : [],
      showScreenMask : false,
    }     
  }

  componentDidMount(){
    this._isMounted=true;
  }
     
  componentWillUnmount() {
    this._isMounted=false;
  }


  getMyLoc = () => {
    if(this._isMounted){
      this.setState({showScreenMask:true})
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let myLong= position.coords.longitude;
            let myLat= position.coords.latitude;
            if(this._isMounted){
              this.setState({showScreenMask:false})
              this.setState({error:null});
              this.getRTRW(myLong, myLat);
            }
        },
        (error) => {if(this._isMounted){this.setState({ error: error.message })}},
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
  }
  

  getRTRW = (vLong, vLat) => {
    x = LongToX(vLong);
    y = LatToY(vLat);
    fetch('http://mwn.improva.id:8084/gpsloc/reactnative/pixel.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        x : x,
        y : y
      })
    }).then((response) => {
      let vStr = JSON.stringify(response);
      if(vStr.indexOf('#ERROR#')>-1){
        return null
      } else {return response.json()}
    }).then((responseJson) => {
      if(responseJson!=null){
        this.setState({param:responseJson[0]});
        this.setState({wilKec:'Babakan Madang', wilKab:'Kab. Bogor',wilProv:'Jawa Barat'})
      } else {
        this.setState({param:[]});
        this.setState({wilKec:'', wilKab:'',wilProv:''});
        Alert.alert('Maaf','Anda tidak berada di wilayah pemukiman Sentul City')
      }
    }
    ).catch((error) => {
      console.error(error);
    });
  }

/*  
  if(master.length=8){index=3}
  if(master.length=6){index=2}
  if(master.length=4){index=1}
  if(master.length=2){index=0}
*/

  getWilayah = (kodeWilayah) => {
    master = kodeWilayah.slice(0,-2);
    if(master.length<6){master=master+'00'}
    if(master.length<6){master=master+'00'}
    if(master.length<6){master=master+'00'}
    fetch('http://jendela.data.kemdikbud.go.id/api/index.php/CWilayah/wilayahGET?mst_kode_wilayah='+master, {
      method: 'GET',
      headers: {
        'Accept': 'text/json',
        'Content-Type': 'text/json',
      },
    }).then((response) => {
      let vStr = JSON.stringify(response);
      console.log(vStr);
      if(vStr.indexOf('Request Not Found')>-1){
        return null
      } else {return response.json()}
    }).then((responseJson) => {
      this.setState({wilayah:responseJson[0]})
    }
    ).catch((error) => {
      console.error(error);
    });
  }

  showContact=(ID)=>{
    this.props.navigation.navigate("EasyPhoneDetail", {ID:ID});
  }

  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
      <ScrollView style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{marginLeft:10, marginRight:10}}>
          <View style={{height:30}}/>
          <View style={{height:50, marginLeft:10, marginRight:10}}>
            <Button buttonStyle={{height:50, backgroundColor:'mediumseagreen'}}
                raised
                onPress={this.getMyLoc}
                title="Cek lokasi saat ini"
                borderRadius={5}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />                
          </View>
          <View style={{height:20}}/>
          <Text style={{color:'#707070', height:50, textAlign:'center', textAlignVertical:'center', fontSize:24, backgroundColor: 'transparent'}}>
            Anda berada di lokasi:
          </Text>
          <RTRWText text1='RT' text2={this.state.param.RT} text3='ketua RT' onPress={this.showContact} contactID={this.state.param.ContactRT} dbtext4={'select Nama as Value from tbphone WHERE ID='+this.state.param.ContactRT}/>
          <RTRWText text1='RW' text2={this.state.param.RW} text3='ketua RW' onPress={this.showContact} contactID={this.state.param.ContactRW} dbtext4={'select Nama as Value from tbphone WHERE ID='+this.state.param.ContactRW}/>
          <TabText text1='Cluster' dbtext2={'select Nama as Value from tbcluster WHERE ID='+this.state.param.ClusterID}/>
          <TabText text1='Desa' text2={this.state.param.Desa}/>
          <TabText text1='Kecamatan' text2={this.state.wilKec}/>
          <TabText text1='Kota/Kab' text2={this.state.wilKab}/>
          <TabText text1='Provinsi' text2={this.state.wilProv}/>
          <TabText text1='Kode Pos' text2={this.state.param.KodePos}/>
          <TabText text1='Estate Officer' onPress={this.showContact} contactID={this.state.param.ContactEO} dbtext2={'select Nama as Value from tbphone WHERE ID='+this.state.param.ContactEO}/>
          <View style={{height:30}}/>
        </View>
        {screenMask(this.state.showScreenMask)}
      </ScrollView>  
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