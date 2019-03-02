"use strict";

import React from 'react';
import {View,Image, TouchableOpacity} from 'react-native';

const ImgStr =(props)=>{
  const {imageSource} = props;
  return(<Image style={{width:40, height:40}} source={{uri:{imageSource}}}/>)
};


const ImageLabelButton = (props) => {
    const {onPress, size, imageSource, label} = props;
    let imgOnline = false;
//    console.log(ImgStr);
    if(imageSource.indexOf('http')!=-1){imgOnline=true}
    return (
      <View>
          <TouchableOpacity onPress={onPress}>
            <ImgStr imageSource={imageSource}/>
          </TouchableOpacity>
      </View>
    );
  };

export default ImageLabelButton;