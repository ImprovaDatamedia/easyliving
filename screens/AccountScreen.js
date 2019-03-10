import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';


export default class Profile extends Component {
  static navigationOptions = {
      header : null
    };

    constructor(props){
      super(props)
      this._bootstrapAsync();
      this.state = {
        nama : '',
        photo : '',
        // photoBoolean : false,
        url : ''
      }

      this._getData();
    }

    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      this.props.navigation.navigate(userToken ? 'Account' : 'loginForm', {screenName:"profile"});
    };

    _getData = async () => {
      const data = await AsyncStorage.getItem("userData");
      const item = JSON.parse(data);
      if (!item =='') {
        this.setState({
          nama : item.username,
          photo : item.photo,
          photoBoolean : true
        })
      }

    };

    // _imageProfile = () => {
    //   const noImage =  ;
    //   const userImage = ;
    //   if (this.state.photoBoolean) {
    //     return userImage ;
    //   }else {
    //     return noImage ;
    //   }
    // }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('loginForm', {screenName:"profile"});
  };
  name = ()=> {
    var x = ''
    if (this.state.nama=='') {
       x = "No User"
    } else {
      x = this.state.nama
    }
    return x;
  }

  render() {
    let image ;
    if (this.state.photo=='') {
       image =   <Image style={styles.avatar} source={require('../assets/images/Profile/NoImage.png')}/>
    } else {

       image = <Image style={styles.avatar} source={{uri : 'http://192.168.43.184:8080/api/app/assets/image/' + this.state.photo}}/>
    }
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          {image}
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.name()}</Text>
              <Text style={styles.info}></Text>
              <Text style={styles.description}></Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Log In</Text>
              </TouchableOpacity>
              <Text>OR</Text>
              <TouchableOpacity onPress={this._signOutAsync} style={styles.buttonContainer}>
                <Text>Log Out</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
