import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import {queryTable, screenMask, queryTableCrypto, updateTable, DBText, ActionIconButton, ImageAlter} from '../components/react-native-improva.js';
import localStorage from 'react-native-sync-localstorage'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


let lebar =  Dimensions.get('window').width; 


export const storageSetItem=(key, value)=>{
  localStorage.setItem(key, value)
}

export const storageGetItem=(key)=>{
  data = localStorage.getItem(key)
  return data;
}


export default class Profile extends Component {

  Nama = '';
  Email = '';
  Pass = '';
  RePass = '';

  arrCluster = [];
  existEmail = false;

  static navigationOptions = {
      header : null
  };

  constructor(props){
    super(props)
    vState=0;
    vToken = storageGetItem('userToken');
    vData = storageGetItem('userData');
    if(vToken==undefined){vToken=''};
    if(vData==undefined){vData=[]};
    if(vToken!=''){vState=1}
    console.log(JSON.stringify('Data: '+JSON.stringify(vData)));
    console.log(JSON.stringify('Token: '+vToken));
    this.state = {
      loginState : vState,
      userData : vData,       //ada di storage juga state spy bisa rerender
      modalVisible : false,
      showScreenMask : false,
    }
  }

/*  componentDidMount(){
    this._sub = this.props.navigation.addListener('didFocus',this._componentFocused);
    this.createClusterArray();
  }
       
  componentWillUnmount() {
    this._sub.remove();
  }
        
  _componentFocused = () => {
  }    
*/  

  createClusterArray =() =>{
    queryTableCrypto('select * from easyliving.tbcluster order by Nama asc',
      (Data)=>this.arrCluster=Data
    )
  }

  queryUserData = () => {
    queryTableCrypto('select * from easyliving.tbuser where Email="'+this.Email+'"',
      (Data)=>{
        this.setState({userToken:'EL'+Data[0].ID});
        this.setState({userData:Data[0]});
        storageSetItem('userToken','EL'+Data[0].ID)
        storageSetItem('userData',this.state.userData);
        this.setState({loginState:1});
      },
      ()=>Alert.alert('Maaf','User tidak ditemukan')
    )};

  onDoSignIn=()=>{
    this.setState({showScreenMask:true});
    queryTableCrypto('select * from easyliving.tbuser where Email="'+this.Email+'" AND Password="'+this.Pass+'"',
    (Data)=>{
      this.setState({userToken:'EL'+Data[0].ID});
      this.setState({userData:Data[0]});
      storageSetItem('userToken','EL'+Data[0].ID)
      storageSetItem('userData',this.state.userData);
      this.setState({loginState:1});
      this.setState({showScreenMask:false});
    },
    ()=>{
      storageSetItem('userToken',''); 
      this.setState({showScreenMask:false});
      Alert.alert('Error','Incorrect email address or password')
    });
  }

  onDoSignOff=()=>{
    Alert.alert('Sign Off','Are you sure to sign off?',
      [
        {text: 'Cancel',style: 'cancel'},
        {text: 'Ok', onPress: ()=>{
          storageSetItem('userToken','');
          storageSetItem('userData',[]);
          this.setState({loginState:0});
          this.setState({userData:[]});
}}
      ],
      {cancelable: false},
    ); 
  }

  onDoSignUp=()=>{
    this.setState({loginState:-1});
    storageSetItem('userToken','');
  }

  saveSignUpData=()=>{
    var moment = require('moment');
    vTanggal = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    var query = "INSERT INTO easyliving.tbuser (Nama, Email, Password, ClusterID, Tanggal) VALUES ('"+this.refs.signUpNama._lastNativeText+"', '"+this.refs.signUpEmail._lastNativeText+"', '"+this.refs.signUpPass._lastNativeText+"', '"+this.refs.signUpCluster.value()+"', '"+vTanggal+"');"
    if(this.existEmail){Alert.alert('Error','sudah ada user dengan alamat email tsb. Harap ubah alamat email yang digunakan'); return}
    console.log(query)
    if(updateTable(query)){
      Alert.alert('Sucess','Pendaftaran user berhasil dilakukan');
      this.setState({loginState:0});
    }else{
      Alert.alert('Error','Pendaftaran gagal')
    }
  }

  onSubmitSignUpData=()=>{
    queryTableCrypto('select * from easyliving.tbuser where Email="'+this.refs.signUpEmail._lastNativeText+'"',
    (Data)=>this.existEmail=true,()=>this.existEmail=false);
    /*    .then((response) => {
      let vStr=JSON.stringify(response);
      this.existEmail=true;
      vN = vStr.indexOf('No Results Found.');
      if(vN>-1){this.existEmail=false}
    });
*/    if(this.refs.signUpNama._lastNativeText=='' || this.refs.signUpNama._lastNativeText==undefined){Alert.alert('Error','Harap isi nama'); return};
    if(this.refs.signUpEmail._lastNativeText=='' || this.refs.signUpEmail._lastNativeText==undefined){Alert.alert('Error','Harap isi alamat email'); return};
    if(this.refs.signUpPass._lastNativeText==''){Alert.alert('Error','Harap isi password'); return};
    if(this.refs.signUpPass._lastNativeText!=this.refs.signUpRePass._lastNativeText){Alert.alert('Error','Password dan Retype Password harus sama'); return};
    if(this.refs.signUpCluster.value()==0){Alert.alert('Error','Harap pilih nama cluster tempat anda tinggal'); return};
    Alert.alert('Sign Up','Anda akan melakukan pendaftaran user, lanjutkan?',
      [
        {text: 'Cancel',style: 'cancel'},
        {text: 'Ok', onPress: ()=>{
          var moment = require('moment');
          vTanggal = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
          var query = "INSERT INTO easyliving.tbuser (Nama, Email, Password, ClusterID, Tanggal) VALUES ('"+this.refs.signUpNama._lastNativeText+"', '"+this.refs.signUpEmail._lastNativeText+"', '"+this.refs.signUpPass._lastNativeText+"', '"+this.refs.signUpCluster.value()+"', '"+vTanggal+"');"
          if(this.existEmail){Alert.alert('Error','sudah ada user dengan alamat email tsb. Harap ubah alamat email yang digunakan'); return}
          console.log(query)
          if(updateTable(query)){
            Alert.alert('Sucess','Pendaftaran user berhasil dilakukan');
            this.setState({loginState:0});
          }else{
            Alert.alert('Error','Pendaftaran gagal')
          }
        }}
      ],
      {cancelable: false},
    ); 
  }

  showAccountProfile(){
    console.log('photo: '+this.state.userData.Photo)
    return (
      <View style={{flex:1, marginTop:20, marginLeft:20, marginRight:10}}>
        <View style={{justifyContent: 'space-around', flexDirection:"row", height:60, paddingTop:5, alignItems:'center',  backgroundColor:'white'}}>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton color='#606060' backgroundColor='white' fontColor='#404040' onPress={this.askEditContact} name="edit" label='Edit'/>
          <ActionIconButton color='#606060' backgroundColor='white' fontColor='#404040' onPress={this.onDoSignOff} name="sign-out" label='Sign Out'/>
        </View>
        <View style={{flexDirection:'row', marginTop:20}}>
          <View style={{flex:0.3, alignItems:'center'}}>
            <ImageAlter 
              source={{uri: 'http://www.easyliving.id:81/images/users/'+this.state.userData.Photo}} 
              alterSource={require('../assets/images/noPicture.jpg')}
              defaultSource={require('../assets/images/noPicture.jpg')}
              style={{marginTop:5, marginLeft:5, width:130, height:110, borderRadius:5}}/>
          </View>
          <View style={{flex:0.7, marginLeft:20, marginTop:10, flexDirection:'column'}}>
            <Text style={{color:'gray', fontSize:22}}>{this.state.userData.Nama}</Text>
            <View style={{height:20}}/>
            <Text style={{color:'gray', fontSize:18}}>{this.state.userData.Email}</Text>
            <Text style={{color:'gray', fontSize:18}}>{this.state.userData.Phone}</Text>
            <DBText style={{color:'gray',fontSize:18}}
              query={'SELECT tbcluster.Nama AS Value FROM easyliving.tbcluster INNER JOIN easyliving.tbuser ON tbuser.ClusterID=tbcluster.ID WHERE tbuser.ID='+this.state.userData.ID}/>
          </View>
        </View>
      </View>
    );
  }

  onLoginFormCancel=()=>{
    cancelScreen = this.props.navigation.getParam('cancelScreen','');
    this.props.navigation.setParams({'cancelScreen':''});
    this.props.navigation.setParams({'callerScreen':''});
    this.props.navigation.navigate(cancelScreen);
  }

  showLoginForm() {
    let lebar = Dimensions.get('window').width;
    this.Email = '';
    this.Pass = '';
    return (
      <View style={{flex:1}}>
      <View style={{flex: 1, marginLeft:40, marginRight:40, backgroundColor: 'white'}}>
        <View style={{height:130, marginTop:30, justifyContent: 'center', alignItems: 'center', shadowColor: "black", shadowOffset: { height:2, width:2}, shadowRadius:3, shadowOpacity: 0.3}}>
          <Image style={{width:lebar/2.3, resizeMode: 'contain'}} source={require('../assets/images/HomeScreen/EasyLivingLogoBolong.png')}/>
        </View>
        <TextField
          ref = "signInEmail"
          label = 'Email Address'
          value = ''
          keyboardType="email-address"
          onChangeText={value => this.Email=value} 
          autoCapitalize="none"
        />
        <TextField
          ref = "signInPass"
          label = 'Password'
          value = ''
          onChangeText={value => this.Pass=value}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <View style={{height:40}}/>

        <Button buttonStyle={{height:50, width:lebar-80, backgroundColor:'mediumseagreen'}}
          raised
          onPress={this.onDoSignIn}
          title=" Login"
          borderRadius={5}
          color="#841584"
          icon={
            <Icon
              name="user"
              size={15}
              color="white"
            />
          }
        />
        <View style={{alignItems:'center', justifyContent:'center', height:40}}>
          <Text style={{textAlign: 'center', color:'lightgray', fontSize:14,}}> - atau - </Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', width:lebar-80, height:50}}>
        <Button buttonStyle={{width:120, height:50, backgroundColor:'#62A6D2'}}
          raised
          onPress={this.onDoSignUp}
          title=" Daftar"
          borderRadius={5}
          color="#228FCF"
          icon={
            <Icon
              name="user-plus"
              size={18}
              color="white"
            />
          }
        />    
        {this.props.navigation.getParam('cancelScreen','')==''?<View></View>:
        <Button buttonStyle={{width:120, height:50, backgroundColor:'#E16E79'}}
          raised
          onPress={this.onLoginFormCancel}
          title="Cancel"
          borderRadius={5}
          color="#E16E79"
        />}    
        </View>
      </View>
      {screenMask(this.state.showScreenMask)}
      </View>
    );
  }

  showSignUpForm() {
    let lebar =  Dimensions.get('window').width; 
    this.Nama = '';
    this.Email = '';
    this.Pass = '';
    this.RePass = '';
    return (
      <View style={{flex:1}}>
        <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
            extraHeight={Platform.select({ android: 200 })}
        >      
        <ScrollView style={styles.container}>   
          <View style={{flex:1,paddingLeft:0, paddingRight:0, backgroundColor:'white'}}>
          <View style={{height:40, justifyContent:'center'}}>
            <Text style={{fontSize:24}}>Pendaftaran user</Text>
          </View>
          <Text style={styles.inputlabel}> 
            Nama:</Text>
          <TextInput style={styles.textinputsingleline}
              ref="signUpNama"
              underlineColorAndroid="transparent"
              autoCapitalize="words"
              onChangeText={value => this.Nama=value} 
            />
          <Text style={styles.inputlabel}> 
            Email:</Text>
          <TextInput style={styles.textinputsingleline}
              ref="signUpEmail"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={value => this.Email=value} 
            />
                      <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.inputlabel}> 
              Password:</Text>
            <TextInput style={styles.textinputhalfline}
              ref='signUpPass'
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              secureTextEntry={true}
            />
            </View>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.inputlabel}> 
              Retype Password:</Text>
            <TextInput style={styles.textinputhalfline}
              ref="signUpRePass"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              secureTextEntry={true}
            />
            </View>
            </View>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.inputlabel}> 
              Cluster:</Text>
            <Dropdown 
              labelPadding={0}
              dropdownOffset={{left:15, top:1}}
              dropdownMargin={{left:15, right:10}}
              dropdownPosition = {3}
              rippleCentered={true}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              containerStyle={{backgroundColor:'#FFFCF4', borderWidth:1, borderColor:'lightgrey', borderRadius:5, width:lebar-50, marginLeft:10, marginRight:10, paddingLeft:5}}
              ref="signUpCluster" 
              pickerStyle={{backgroundColor: '#f7f9ef', marginRight:20}}
              itemCount={8}
              value=''
              valueExtractor={({ID}) => value=ID}
              labelExtractor={({Nama}) => label=Nama}
              data={this.arrCluster}
            />
            </View>

            <View style={{height:10}}></View>

            <View style={{height:60}}></View>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
              <Button buttonStyle={{width:120, height:50, backgroundColor:'indianred'}}
                raised
                onPress={()=>this.setState({loginState:0})}
                title="Cancel"
                borderRadius={5}
                color="#E16E79"
              />    
              <Button buttonStyle={{width:120, height:50, backgroundColor:'mediumseagreen'}}
                raised
                onPress={this.onSubmitSignUpData}
                title="Submit"
                borderRadius={5}
                color="mediumseagreen"
              />    
              
            </View>
            <View style={{height:80}}></View>
          </View>
        </ScrollView>
        </KeyboardAwareScrollView>
      </View>   
    );
  }

  render() {
    callerScreen = this.props.navigation.getParam('callerScreen','');
    if(this.state.loginState==0){
      return this.showLoginForm()                               //if not login => show LoginForm
    } else if(this.state.loginState==1) {                       //if already login....
      if(callerScreen==''){
         return this.showAccountProfile();                        //and called from TABbar => show AccountProfile
      } else {
        this.props.navigation.navigate(callerScreen);             //if not go to caller
        this.props.navigation.setParams({'callerScreen':''});
        this.props.navigation.setParams({'cancelScreen':''});
        return(null)
      }
    } else if(this.state.loginState==-1) {                      //if need sign up
      return this.showSignUpForm()
    }
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:40,
      marginLeft:20,
      marginRight:20,
      backgroundColor: 'white',
    },
    inputlabel: {
      color:'#606060', 
      fontSize:14, 
      height:45,
      paddingTop: 20,
      backgroundColor:'transparent'
    },
    textinputsingleline: {
      marginLeft: 10, 
      marginRight:10, 
      marginTop:0, 
      borderRadius:5, 
      height: 40,
      width:lebar-50,  
      paddingLeft:5, 
      fontSize:16, 
      borderColor: '#C8C8C8', 
      borderWidth: 1, 
      backgroundColor:'#FFFCF4'
    },
    textinputhalfline: {
      marginLeft: 10, 
      marginRight:10, 
      marginTop:0, 
      borderRadius:5, 
      height: 40,
      width: (lebar/2)-36,  
      paddingLeft:5, 
      fontSize:16, 
      borderColor: '#C8C8C8', 
      borderWidth: 1, 
      backgroundColor:'#FFFCF4'
    },
    textinputmultiline: {
      marginLeft: 10, 
      marginRight:10, 
      marginTop:0, 
      borderRadius:5, 
      height: 80,
      width:lebar-50,  
      paddingLeft:5, 
      fontSize:16, 
      borderColor: '#C8C8C8', 
      borderWidth: 1, 
      backgroundColor:'#FFFCF4'
    },  
});
