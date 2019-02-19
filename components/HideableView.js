"use strict";

import React from 'react';
import {ExpoConfigView } from '@expo/samples';
import {View,} from 'react-native';

const HideableView = (props) => {
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

export default HideableView;
  