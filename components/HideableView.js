"use strict";

import React from 'react';
import {ExpoConfigView } from '@expo/samples';
import {View,Text} from 'react-native';
import { SketchPicker } from 'react-color';

export class DBText123 extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      theValue : '',
    }
  }

  queryTable = (vQuery) => {
    fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token : 'SELECT',
        query : vQuery
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({theValue:responseJson[0].Value});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){
    if (this.props.Query==undefined){}
    else if (this.props.Query=='')
      {this.setState({theValue:this.props.onEmptyText})}
    else
      {this.queryTable(this.props.Query)};
  }

  render() {
    const { children, style } = this.props;
    return (<Text style={style}>{this.state.theValue}{children}</Text>);
  }
}

export const HideableView = (props) => {
    const { children, hide, style } = props;
    if (hide) {
      return null;
    }
    return (
      <View style={style}>
        { children }
      </View>
    );
  };

  export class ColorPicker extends React.Component {

    render() {
      return (
      <View></View>)
    }
  }
    
  