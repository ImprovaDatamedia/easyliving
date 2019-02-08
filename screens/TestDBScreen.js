import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TextField } from 'react-native-material-textfield'
// import AwesomeButton from 'react-native-really-awesome-button/src/themes/rick'

export default class TestDBScreen extends Component {
  static navigationOptions = {
    title: 'Test DB',
  };
  constructor(props){
    super(props)
    this.state={
      text_method : '',
      text_query : '',
      array : [],
      locJSON : JSON,
    }
  }
  sendQuery = (method,query) => {
    return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token : method,
      query : query
    })

    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.length > 0) {
              Alert.alert(JSON.stringify(responseJson))
          }else {
            Alert.alert(responseJson)
          }


        }).catch((error) => {
          console.error(error);
        });
  }
  getGPS = (vGPSID) => {
    return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token : 'SELECT',
      query : 'SELECT * from gpsloc where gpsid ='+vGPSID
    })

    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.length > 0) {
              Alert.alert(JSON.stringify(responseJson))
          }else {
            Alert.alert(responseJson)
          }


        }).catch((error) => {
          console.error(error);
        });
  }

getLoc = (vGPSID) => {
    return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token : 'SELECT',
      query : 'SELECT * from gpsloc where gpsid ='+vGPSID
    })
    }).then((response) => {return response.json()
    }).then((responseJson) => {this.setState({locJSON: responseJson}); 
  }
  ).catch((error) => {
    console.error(error);
  });
}

execLoc = () => {
    this.getLoc('101');
    if(this.state.locJSON.length>0){
      Alert.alert(JSON.stringify(this.state.locJSON[0].longitude));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextField
            label='Method Here'
            onChangeText={TextInputValue => this.setState({text_method : TextInputValue})}
        />
        <TextField
            label='Query Here'
            onChangeText={TextInputValue => this.setState({text_query : TextInputValue})}
        />
        <View style={styles.div}>
        <TouchableOpacity onPress={this.sendQuery.bind(
                                  this, this.state.text_method,
                                        this.state.text_query)}>
          <Text>Send Data</Text>
          </TouchableOpacity>  

        </View>
        <View style={styles.div}>
        <Text> </Text>
        <TouchableOpacity onPress={()=>this.getGPS('101')}>
          <Text>Test Data</Text>
          </TouchableOpacity>  
          <Text> </Text>
        <TouchableOpacity onPress={()=>this.execLoc()}>
          <Text>Test getLoc</Text>
          </TouchableOpacity>  

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    bottom: 100,
  },
  div : {
    alignItems: 'center',
  },
  // font:{
  //   color: 'white'
  // },
  // button: {
  //   color: 'blue',
  //   borderRadius: 20
  // }
});