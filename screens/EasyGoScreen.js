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
import { Font } from 'expo'

export default class EasyTransportScreen extends React.Component {
  async componentDidMount(){
    await Font.loadAsync({
      'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      'Verdana': require('../assets/fonts/Verdana.ttf'),
      'SF-Pro-Display': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
      'Franklin Gothic Book': require('../assets/fonts/Franklin Gothic Book.ttf'),
    });
    this.setState({ fontLoaded : true})
  }

  constructor(props) {
    super(props)
    this.state = {
        fontLoaded : false
    };
  }

  static navigationOptions = {
    title: 'Easy Go',
  };
  lebar = 100;
  tinggi = 100;

  showShuttleRouteScreen=(vID,vScreenTitle,vScreenColor)=>{
    this.props.navigation.navigate("ShuttleRoute", {ID:vID, ScreenTitle:vScreenTitle, ScreenColor:vScreenColor});
  }

  showShuttleBusZoomScreen=(vID,vScreenTitle,vScreenColor)=>{
    this.props.navigation.navigate("ShuttleBusZoom", {ID:vID, ScreenTitle:vScreenTitle, ScreenColor:vScreenColor});
  }
 
  render() {
    this.lebar = Dimensions.get('window').width;  
    this.tinggi = Dimensions.get('window').height;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.ScrollView} contentContainerStyle={styles.contentContainer}>
          <View style={{alignItems: 'center', marginTop: 2, marginBottom: 20}}>
          {
            this.state.fontLoaded ? (
              <Text  style={{color:'cornflowerblue', fontFamily : 'Franklin Gothic Book',  paddingTop: 15, height:45, width:this.lebar, textAlign:'center', textAlignVertical:'center', fontSize:26,  backgroundColor: 'transparent'}}>
              Shuttle Sentul
              </Text>
            ):null
          }
              <Text  style={{color:'cornflowerblue', fontFamily : 'Verdana',  paddingTop: 15, height:45, width:this.lebar, textAlign:'center', textAlignVertical:'center', fontSize:26,  backgroundColor: 'transparent'}}>
              Shuttle Sentul
              </Text>
            <Image style={{width:this.lebar, height:20+this.lebar*540/1305, resizeMode: 'contain'}}
              source={require('../assets/images/RuteShuttleBus.png')}/>
            <Text  style={{color:'gray', marginTop: 5, width:this.lebar, height:25, textAlign:'left', marginLeft:25, fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              Jam Operational: 08:00 - 17:00
            </Text>
            <Text  style={{color:'gray', marginTop: 5, width:this.lebar, height:25, textAlign:'left',  marginLeft:25, fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              Tarif: Rp 5.000
            </Text>
            <View  style={{flex:1, flexDirection:'row'}}>
                <Image source={require('../assets/images/iconBusYellowThin.png')} style={styles.imgBus}/>
                <Text  style={{color:'gray', marginTop: 10, width:135, height:75, textAlign:'left', paddingTop:20, paddingLeft:5, fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                Yellow Line
                </Text>
                <TouchableOpacity onPress={()=>this.showShuttleRouteScreen('101','Yellow Line','#ffba00')}>
                    <Image source={require('../assets/images/ButtonRute.png')} style={{marginTop: 15, marginRight:10, width:50, height:75,  paddingTop:10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.showShuttleBusZoomScreen('101','Yellow Line','#ffba00')}>
                    <Image source={require('../assets/images/ButtonLacak.png')} style={{marginTop: 15, width:50, height:75,  paddingTop:10}}/>
                </TouchableOpacity>
            </View>
            <View  style={{flex:1, flexDirection:'row'}}>
                <Image source={require('../assets/images/iconBusRedThin.png')} style={styles.imgBus}/>
                <Text  style={{color:'gray', marginTop: 10, width:135, height:75, textAlign:'left', paddingTop:20, paddingLeft:5, fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                Red Line
                </Text>
                <TouchableOpacity onPress={()=>this.showShuttleRouteScreen('102','Red Line','tomato')}>
                    <Image source={require('../assets/images/ButtonRute.png')} style={{marginTop: 15, marginRight:10, width:50, height:75,  paddingTop:10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.showShuttleBusZoomScreen('102','Red Line','tomato')}>
                    <Image source={require('../assets/images/ButtonLacak.png')} style={{marginTop: 15, width:50, height:75,  paddingTop:10}}/>
                </TouchableOpacity>
            </View>
            <View  style={{flex:1, flexDirection:'row'}}>
                <Image source={require('../assets/images/iconBusGreenThin.png')} style={styles.imgBus}/>
                <Text  style={{color:'gray', marginTop: 10, width:135, height:75, textAlign:'left', paddingTop:20, paddingLeft:5, fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                Green Line
                </Text>
                <TouchableOpacity onPress={()=>this.showShuttleRouteScreen('103','Green Line','mediumseagreen')}>
                    <Image source={require('../assets/images/ButtonRute.png')} style={{marginTop: 15, marginRight:10, width:50, height:75,  paddingTop:10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.showShuttleBusZoomScreen('102','Green Line','mediumseagreen')}>
                    <Image source={require('../assets/images/ButtonLacak.png')} style={{marginTop: 15, width:50, height:75,  paddingTop:10}}/>
                </TouchableOpacity>
            </View>
          </View>    

          <View style={{height:5, width:this.lebar, backgroundColor: '#f8f8f8'}}>
          </View>

          <View style={{alignItems: 'center',marginTop: 45}}>
            <Text  style={{color:'dodgerblue', paddingTop: 0, height:35, width:this.lebar, textAlign:'center', textAlignVertical:'center', fontSize:26, fontWeight:'bold', backgroundColor: 'transparent'}}>
            Shuttle Bandara
            </Text>
            <Image style={{width:this.lebar, height:10+this.lebar*130/393, resizeMode: 'contain'}}
                source={require('../assets/images/JA_Connexion.png')}/>
            <Text  style={{color:'gray', marginTop: 5, width:this.lebar, height:25, textAlign:'left', marginLeft:25, fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
            Jam Operational: 05:00 - 17:00
            </Text>
            <Text  style={{color:'gray', marginTop: 5, width:this.lebar, height:25, textAlign:'left',  marginLeft:25, fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
            Tarif: Rp 25.000
            </Text>
            <View  style={{flex:1, flexDirection:'row'}}>
                <Image source={require('../assets/images/iconBusBandaraThin.png')} style={styles.imgBus}/>
                <Text  style={{marginTop: 10, width:135, height:75, textAlign:'left', paddingTop:20, paddingLeft:5, fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                Shuttle Bandara
                </Text>
                <TouchableOpacity onPress={()=>this.showShuttleRouteScreen('100','Shuttle Bandara','silver')}>
                    <Image source={require('../assets/images/ButtonRute.png')} style={{marginTop: 15, marginRight:10, width:50, height:75,  paddingTop:10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.showShuttleBusZoomScreen('100','Shuttle Bandara','silver')}>
                    <Image source={require('../assets/images/ButtonLacak.png')} style={{marginTop: 15, width:50, height:75,  paddingTop:10}}/>
                </TouchableOpacity>
            </View>
          </View>    
        </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  imgBus: {
      height:75,
      width: 75,
  },
  ScrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 55,
  },
  contentContainer: {
    paddingTop: 5,
  },
  welcomeImage: {
    width: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});  