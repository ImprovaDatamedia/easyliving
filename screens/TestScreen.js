import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
//import {timer} from react-native-timer;
//import KeepAwake from "react-native-keep-awake";
import moment from "moment";
const timer = require('react-native-timer');


export default class TestScreen extends Component {
  constructor(props) {
    super(props)
    state = {
        time: moment().format("LTS"),
        date: moment().format("LL"),
        timer: null,
        counter: 0
    };

    this.moveAnimation = new Animated.ValueXY({ x: -50, y: -50 })
  }
 
  _moveBall = () => {
    var RandomNumberX = Math.floor(Math.random() * 300) + 1 ;
    var RandomNumberY = Math.floor(Math.random() * 500) + 1 ;
    Animated.spring(this.moveAnimation, {
      toValue: {x: RandomNumberX-50, y: RandomNumberY-50},
    }).start()
  }
  
  componentDidMount() {
    let timer = setInterval(this._moveBall, 300);
//    this.setState({timer});
  }

  componentWillUnmount() {
//    this.clearInterval(this.state.timer);
  }

  tick() {
      this._moveBall();
  }

/*  componentDidMount() {
    setTimeout(() => {
      this.setState({
        time: moment().format("LTS"),
        date: moment().format("LL"),
      })
     }, 1000);
  }
*/
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.tennisBall, this.moveAnimation.getLayout()]}>
          <TouchableWithoutFeedback style={styles.button} onPress={this._moveBall}>
            <Text style={styles.buttonText}>Press</Text>
          </TouchableWithoutFeedback>        
        </Animated.View>
        <Text>
		</Text>
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  tennisBall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'greenyellow',
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  }
});