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

const RuteImage = [
    require('../assets/images/not-available.jpg'),
    require('../assets/images/RuteYellowLine.png'),
    require('../assets/images/RuteRedLine.png'),
    require('../assets/images/RuteGreenLine.png')
];

const RuteColor = [
    'black',
    '#ffba00',
    'red',
    'mediumseagreen'
];

const RuteTitle = [
    'Under Construction',
    'Yellow Line',
    'Red Line',
    'Green Line',
]
export default class ShuttleRouteScreen extends React.Component {
  static navigationOptions = {
    title: 'Rute Shuttle Bus',
  };
  constructor(props) {
    super(props);
    this.state = {
        imgfileName: '',
    };
  }
  render() {
    let titleText = '';
    let lebar =  Dimensions.get('window').width; 
    let shuttleID = this.props.navigation.getParam('ID','101'); 
    return (
        <View style={{flex:1, alignItems: 'center',marginTop: 0, backgroundColor: 'white'}}>
        <Text  style={{color:'dodgerblue', paddingTop: 15, height:55, width:lebar, textAlign:'center', textAlignVertical:'center', fontSize:26, fontWeight:'bold', backgroundColor: 'white'}}>
        {RuteTitle[shuttleID[2]]}
        </Text>
        <Image style={{flex:1, resizeMode: 'contain'}}
            source={RuteImage[shuttleID[2]]}/>
          </View>    
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
  welcomeContainer: {
    alignItems: 'flex-start',
    justifyContent : 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeImage: {
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});  