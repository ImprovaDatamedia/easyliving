import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import {queryTable} from "../components/react-native-improva.js"
import HTML from 'react-native-render-html';


export default class BlankScreen1 extends React.Component {


  static navigationOptions = {
    title: 'Ketentuan',
    headerStyle: {backgroundColor: '#e7e9df'},
  };

  constructor(props) {
    super(props);
    this.state={
      Deskripsi : 'Loading...',
      Nama : '',
    }  

  }

  componentDidMount(){
    let vTopik = this.props.navigation.getParam('Topik','');
    queryTable('SELECT * FROM easyliving.tbketentuan WHERE Topik="'+vTopik+'"')
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({Deskripsi:responseJson[0].Deskripsi});
        this.setState({Nama:responseJson[0].Nama});
    }).catch((error)=> console.error(error));    
  }

  render() {
    let lebar =  Dimensions.get('window').width; 
    let panjang =  Dimensions.get('window').height; 
//      <HTML uri="http://www.kompas.com" />
  vNama = '';
    return (
      <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
          <HTML html={this.state.Deskripsi} />

      </View>
    
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex:1,
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
    marginLeft:10,
    marginRight:10,
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