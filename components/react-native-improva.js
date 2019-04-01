"use strict";

import React from 'react';
import {ExpoConfigView } from '@expo/samples';
import {View,Text,TouchableOpacity,Image, FlatList, SectionList, 
        StyleSheet, Dimensions, ActivityIndicator, Alert} from 'react-native';
import {ListItem} from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
var CryptoJS = require("crypto-js");


export function CryptoEncrypt(passphrase, plain_text){
  var salt = CryptoJS.lib.WordArray.random(256);
  var iv = CryptoJS.lib.WordArray.random(16);
  var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999 });
  var encrypted = CryptoJS.AES.encrypt(plain_text, key, {iv: iv});
  var data = {
      ciphertext : CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
      salt : CryptoJS.enc.Hex.stringify(salt),
      iv : CryptoJS.enc.Hex.stringify(iv)
  }
  return JSON.stringify(data);
}

export function CryptoDecrypt(passphrase,encrypted_json_string){
  var obj_json = JSON.parse(encrypted_json_string);
  var encrypted = obj_json.ciphertext;
  var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
  var iv = CryptoJS.enc.Hex.parse(obj_json.iv);
  var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999});
  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv});
  var result = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(result)
}

//===========================================================
export const queryTableCrypto = (query, onSuccess, onFail) => {
  if(query.indexOf('undefined')!=-1){return}
  let data1 = JSON.stringify({
    token : 'SELECT',
    query : query
  })
  let data = CryptoEncrypt("bV65gfr$",data1);
  return fetch('http://www.easyliving.id:81/easyliving/mobile/queryrequest', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: data
  }).then((response) => {
    let vStr = JSON.stringify(response);
    console.log('response crypto: '+vStr);
    if(vStr.indexOf('No Results Found')==-1){
      return response.json();
    } else {
      if(onFail!=null){
        onFail();
      } 
    } 
  })
  .then((responseJson) => { 
    if(responseJson!=undefined){
      let decData = CryptoDecrypt("bV65gfr$",JSON.stringify(responseJson));
      if(onSuccess!=null){
        onSuccess(decData);
      } 
      return decData;
    }
  }).catch((error)=> {
    if(onFail!=null){onFail()}
  })
}


//===========================================================
export const updateTableCrypto = (query, onSuccess, onFail) => {
  let data1 = JSON.stringify({
    token : 'UPDATE',
    query : query
  })
  let data = CryptoEncrypt("bV65gfr$",data1);
  return fetch('http://www.easyliving.id:81/easyliving/mobile/queryrequest', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: data
  }).then((response) => {
    let vStr = JSON.stringify(response);
    console.log(response);
    if(vStr.indexOf('Record Successfully Updated')!=-1){
      if(onSuccess!=null){onSuccess()}
    } else {
      if(onFail!=null){onFail()}
    } 
  }).catch((error)=> {
    if(onFail!=null){onFail()}
  });
}

//===========================================================
export const uploadImage = (uri,fileName,onSuccess,onFail) => {
  let formData = new FormData();
  uri = uri.replace('file:/','');
  console.log(uri);
  formData.append('photo', {
    uri : uri,
    name: fileName,
    type : 'image/jpg',
  });
  return fetch('http://www.easyliving.id:81/app/index.php/datalogin/uploadImage', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    body: formData
  }).then((response) => {
     let vStr = JSON.stringify(response);
     if(vStr.indexOf('Data berhasil di simpan')!=-1){
        if(onSuccess!=null){onSuccess()}
      } else {
        if(onFail!=null){onFail()}
      } 
  }).catch((error) => {
    if(onFail!=null){onFail()}
  });
}  


//===========================================================
export const queryTable = (query, onSuccess, onFail) => {
  if(query.indexOf('undefined')!=-1){return}
//  console.log('query# '+query)
  return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
      method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token : 'SELECT',
      query : query
    })
  }).then((response) => {
    let vStr = JSON.stringify(response);
    console.log('response non crypto: '+vStr);
    if(vStr.indexOf('No Results Found')==-1){
      return response.json();
    } else {
      if(onFail!=null){
        onFail();
      } 
    } 
  })
  .then((responseJson) => { 
    if(responseJson!=undefined){
      if(onSuccess!=null){
        onSuccess(responseJson);
      } 
      return responseJson;
    }
  }).catch((error)=> {
    if(onFail!=null){onFail()}
  })
}


/*
//===========================================================
export const queryTable = (query) => {
  let Empty = '[{"ID":"0"}]';
  return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
      method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token : 'SELECT',
      query : query
    })
  })
}
*/

//===========================================================
export const updateTable = async(query, onResult) => {
  console.log('querynya: '+query)
  return await fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token : 'UPDATE',
      query : query
    })
  }).then((response) => {
    let vStr = JSON.stringify(response);
    console.log(vStr);
    if(vStr.indexOf('Record Successfully Updated')!=-1){
      if(onResult!=null){
        onResult('success');
      } 
      return true;
    } else {        
      if(onResult!=null){
        onResult('fail');
      } 
      console.log('update DB failed');
      return false;
    } 
  }).catch((error) => {
    console.error(error);
    alert('Error'); 
  }); 
}


//===========================================================
//it did't work!
export class DBScript extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      theScript : '',
    }
  }
  
  queryTable = (vSciptName) => {
    fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token : 'SELECT',
        query : 'SELECT * FROM easyliving.tbscript WHERE Nama="'+vScriptName+'"'
      })
    })
    .then((response) => {
      let vStr = JSON.stringify(response);
      if(vStr.indexOf('No Results Found')>-1){
        return([{"Script":""}])
      } else {
        return response.json()
      }
    })
    .then((responseJson) => {
      this.setState({theScript:responseJson[0]});
      if(this.props.onGetText!=undefined){
        this.props.onGetText(responseJson[0])
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){
    if (this.props.sciptName==undefined){}
    else
      {this.queryTable(this.props.sciptName)};
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.sciptName!=this.props.sciptName){
      this.queryTable(nextProps.sciptName);
    }
  }


  render() {
    const { children, style } = this.props;
    return (<Text ref={this.state.FLkey} style={style}>{this.state.theValue}{children}</Text>);
  }
}


//===========================================================
export class DBText extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      theValue : '',
    }
  }
/*
  queryTable = (vQuery) => {
    console.log('querynya: '+vQuery);
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
    .then((response) => {
      let vStr = JSON.stringify(response);
      console.log('vStr; '+vStr);
      if(vStr.indexOf('No Results Found')>-1){
        return([{"Value":""}])
      } else {
        return response.json()
      }
    })
    .then((responseJson) => {
      this.setState({theValue:responseJson[0].Value});
      if(this.props.onGetText!=undefined){
        this.props.onGetText(responseJson[0].Value)
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
*/

  queryTable = (vQuery)  => {
    queryTable(vQuery,
      (Data)=>{//console.log('Value: '+JSON.stringify(Data));
      this.setState({theValue:Data[0].Value});
      if(this.props.onGetText!=undefined){
        this.props.onGetText(Data[0].Value)
      }})
//      .then((responseJson) => {
//      this.setState({theValue:responseJson[0].Value});
//      if(this.props.onGetText!=undefined){
//        this.props.onGetText(responseJson[0].Value)
//      }
//    })
  }



  componentDidMount(){
    if (this.props.query==undefined){}
    else if (this.props.query=='')
      {this.setState({theValue:this.props.onEmptyText})}
    else
/*      {queryTable(this.props.query,
        (Data)=>{console.log('Value: '+JSON.stringify(Data));this.setState({theValue:Data[0].Value});
        if(this.props.onGetText!=undefined){
          this.props.onGetText(Data[0].Value)
        }})
      }
*/      {this.queryTable(this.props.query)};
    }

  componentWillReceiveProps(nextProps){
    if(nextProps.query!=this.props.query){
/*      {queryTable(this.props.query,
        (Data)=>{console.log('Value: '+JSON.stringify(Data));this.setState({theValue:Data[0].Value});
        if(this.props.onGetText!=undefined){
          this.props.onGetText(Data[0].Value)
        }})
      }
*/      this.queryTable(nextProps.query);
    }
  }

  render() {
    const { children, style } = this.props;
    return (<Text ref={this.state.FLkey} style={style}>{this.state.theValue}{children}</Text>);
  }
}

//===========================================================
export const DBString = async(vQuery) => {
  return await fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
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
      return responseJson[0].Value;
    })
    .catch((error) => {
      console.error(error);
    });
  }


//===========================================================
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

//===========================================================
export class HomeIconButton extends React.Component {

    render() {
      const {children, style} = this.props;
      let shadowSize=1;
      //#559932
      const labeleLiving = <Text style={{color:'#b0b0b0', fontSize:14, fontWeight:'bold'}}>e<Text style={{color:'#909090', fontSize:12, fontWeight:'normal'}}>{this.props.label}</Text></Text>
      const labelStandard = <Text style={{color:this.props.darkMode?'#f8f8f8':'#808080', fontSize:12, fontWeight:'normal'}}>{this.props.label}</Text>
      const labelSmall = <Text style={{color:this.props.darkMode?'#f8f8f8':'#808080', fontSize:11, fontWeight:'normal'}}>{this.props.label}</Text>
//      if(this.props.labelStyle=='small'){shadowSize=1}else{shadowSize=4}
      return (
        <View style={style}>
                  <TouchableOpacity onPress={this.props.onPress} style={{flexDirection:"column", justifyContent:'flex-start', alignItems:'center', }}> 
                    <View style={{paddingBottom:3, shadowColor: "#707070", shadowOffset: { height:shadowSize, width:shadowSize}, shadowRadius:shadowSize, shadowOpacity: 0.8}}> 
                      <Image source={this.props.imageSource}  style={{width:style.height-20, height:style.height-20}}/>
                    </View>
                    <View style={{shadowColor: "black", shadowOffset: { height:shadowSize, width:shadowSize}, shadowRadius:shadowSize, shadowOpacity: 0.3}}> 
                      {this.props.labelStyle=='eLiving'?labeleLiving:this.props.labelStyle=='small'?labelSmall:labelStandard}
                    </View>
                  </TouchableOpacity>
        </View>);
      }
  }  

//===========================================================
export class ActionIconButton extends React.Component {

    static defaultProps = {
      backgroundColor : 'transparent',
      fontColor: '#f0f0f0',
    }

    render() {
      const {children, style} = this.props;
      let shadowSize=1;
      if(this.props.name=='blank'){
        return(<View style={{height:45, width:60, backgroundColor:'transparent'}}/>)
      } else {
        return (
          <View style={{height:45, justifyContent:'flex-start', alignItems:'flex-start', paddingRight:0, marginBottom:0, backgroundColor:'transparent'}}>
            <TouchableOpacity onPress={this.props.onPress} style={{backgroundColor:'transparent', flexDirection:"column", justifyContent:'flex-start', alignItems:'center', }}> 
              <Icon.Button style={{height:28, paddingTop:0, paddingLeft:20}}
                name = {this.props.name}
                color = {this.props.color}
                backgroundColor = {this.props.backgroundColor}
                borderColor={this.props.borderColor}
                borderWidth={this.props.borderWidth}
                onPress={this.props.onPress}
              />
              <View style={{backgroundColor:'transparent',  shadowColor: "black", shadowOffset: { height:shadowSize, width:shadowSize}, shadowRadius:shadowSize, shadowOpacity: 0.3}}> 
                <Text style={{color:this.props.fontColor, paddingTop:-10, fontSize:12, fontWeight:'normal'}}>{this.props.label}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    }
  }  

//===========================================================
  export class DBViewList extends React.Component {

    _isMounted = false ;

    constructor(props) {
      super(props)
      this.state = {
        rowData:[],
      };
    }
        
    getTable = () => {
        var table=[];
        return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token : 'SELECT',
            query : this.props.query
          })
        }).then((response) => {
          let vStr = JSON.stringify(response);
          if(vStr.indexOf('No Results Found')==-1){return response.json()}
        }).then((responseJson) => {
          if(responseJson==undefined){table.push(this.props.onTableEmpty())} else {
          if (responseJson.length>0){
            for(let i=0;i<responseJson.length;i++){
              var val= this.props.onRenderItem(responseJson[i]);
              table.push(val);
            }
          }
        }
          if (this._isMounted) {
              this.setState({rowData:table})
            }
        }).catch((error) => {
          console.error(error);
        });
    }
       
    componentDidMount(){
        this.getTable();
        this._isMounted = true;
    }

    componentDidUpdate(prevProps, prevState){
        this._isMounted = true;
        if(this.props.query!=prevProps.query)
//        if(!equal(this.props.query, prevProps.query))
        {
          this.getTable();
        }         
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
      const {children, style} = this.props;
      return (
        <View style={style}>
            {this.state.rowData}
        </View>
      );
    }
  
  }

  //===========================================================
  export class DBFlatList extends React.Component {

    _isMounted = false ;
    hasScrolled= false;
    loading = false;
    offset = 0;
    thereIsMore = false;
    refresh = true;


    constructor(props) {
      super(props)
      this.state = {
        Data:[],
      };

    }

    static defaultProps = {
      limit : 0,
    }

    getTable(){
      var table=[];
      if(this.props.limit==0){
        var vquery = this.props.query;
      } else {
        var vquery = this.props.query+' LIMIT '+this.props.limit+' OFFSET '+this.offset;
      }
      try{
        return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
//          return fetch('https://www.easyliving.id/gpsloc/reactnative/API.php', {
            method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token : 'SELECT',
            query : vquery
          })
        }).then((response) => {
          let vStr = JSON.stringify(response);
          if(vStr.indexOf('No Results Found')==-1){return response.json()}
        }).then((responseJson) => 
          {
            if(responseJson==undefined && this.offset==0)
            {
              if(this.props.onTableEmpty!=undefined){this.props.onTableEmpty()}
            }
            else if(responseJson==undefined)
            {
              this.thereIsMore=false;
            }
            else 
            {
              if (responseJson.length>0){
                for(let i=0;i<responseJson.length;i++){
                table.push(responseJson[i]);
                if(this.props.limit>0 && responseJson.length==this.props.limit){
                  this.thereIsMore=true
                } else {
                  this.thereIsMore=false;
                }
              }
            }
          }
          if (this._isMounted) {
            if(this.offset==0)
            {this.setState({Data: table})}
            else {this.setState({Data: this.state.Data.concat(table)})};
            this.offset = this.offset+this.props.limit;
          }
        }).catch((error) => {
          console.error(error);
        });
      } catch (error) {
        console.log(error);
      }
    }
     
    
    componentDidMount(){
        this.getTable();
        this._isMounted = true;
    }

    componentDidUpdate(prevProps, prevState){
        this._isMounted = true;
//        if(!equal(this.props.query, prevProps.query))
        if(this.props.query!=prevProps.query)
        {
          this.getTable();
        }         
    }

/*
    static getDerivedStateFromProps(nextProps, prevState){
      if(nextProps.someValue!==prevState.someValue){
        return { someState: nextProps.someValue};
     }
     else return null;
   }
*/

    componentWillReceiveProps(nextProps){
      if(nextProps.query!==this.props.query){
        this.offset = 0;
        this.thereIsMore = false;
      }
    }

    componentWillUnmount(){
      this._isMounted = false;
    }



    renderFooter = () => {
      if(!this.thereIsMore){
        return null
      } else {
        return(
          <View style={{height:90, flexDirection:"column", justifyContent:'center', alignItems:'center', marginBottom:2, marginLeft:4, marginRight:4, borderRadius:5, backgroundColor:'transparent'}}>
              <Icon.Button style={{height:50, paddingTop:0, paddingLeft:20}}
                name = 'arrow-circle-o-down'
                color = '#e47261'
                backgroundColor = '#f0f0f0'
                onPress={()=>this.getTable()}
                size={45}
              />
              <View style={{backgroundColor:'transparent',}}> 
                <Text style={{color:"gray", paddingTop:-10, fontSize:16, fontWeight:'normal'}}>Load More</Text>
              </View>
          </View>   
        )}
      }

    onScroll=(event)=> {
      this.hasScrolled= true;
     }

    loadMore(){
      if(!this.loading){
        this.loading = true;
        this.loading = false;  
      }
    }
    
    render() {
      const {children, style} = this.props;
      return (
        <View style={style}>
          <FlatList
            data = {this.state.Data}
            renderItem={({item}) => this.props.onRenderItem(item)}
            keyExtractor={(item,index) => item.ID}
            onEndReachedThreshold={0}
            onScroll={this.props.onScroll}
            ListFooterComponent={this.renderFooter}
            ListHeaderComponent={this.props.onRenderHeader}
            numColumns = {this.props.numColumns}
            horizontal = {this.props.horizontal}
            columnWrapperStyle = {this.props.columnWrapperStyle}
            scrollEventThrottle={0}
            animated = {true}
          />  
        </View>
      );
    }
  
  }

//===========================================================
export class DBSectionList extends React.Component {

    _isMounted = false ;

    constructor(props) {
      super(props)
      this.state = {
        Data:[]
      };
    }
        
    getTable = () => {
        var table=[];
        var item=[];
        var vS = '';
        return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token : 'SELECT',
            query : this.props.query
          })
        }).then((response) => {
          let vStr = JSON.stringify(response);
          if(vStr.indexOf('No Results Found')==-1){return response.json()}
        }).then((responseJson) => {
          if(responseJson==undefined){table.push(null)} else {
          if (responseJson.length>0){
            vS = '';
            item = [];
            for(let i=0;i<responseJson.length;i++)
            {
              if(vS!=responseJson[i][this.props.sectionField])
              {
                if(i!=0)
                {
                  table.push({section:vS, data:item});
                  item = [];
                }
                vS = responseJson[i][this.props.sectionField];
                item.push(responseJson[i]);  
              }
              else
              {
                item.push(responseJson[i]);  
              }
            }
            if(i!=0)
            {
              table.push({section:vS, data:item});
            }
          }
        }
        if (this._isMounted) {
            this.setState({Data:table});
        }
        }).catch((error) => {
          console.error(error);
        });
    }
       
    componentDidMount(){
        this.getTable();
        this._isMounted = true;
    }

    componentDidUpdate(prevProps, prevState){
        this._isMounted = true;
//        if(!equal(this.props.query, prevProps.query))
        if(this.props.query!=prevProps.query)
        {
            this.getTable();
        }         
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
      const {children, style} = this.props;
      return (
        <View style={style}>
          <SectionList
            sections = {this.state.Data}
            renderSectionHeader={({section}) => this.props.onRenderSectionHeader(section)}
            renderItem={({item}) => this.props.onRenderItem(item)}
            keyExtractor={ (item, index) => index }
          />  
        </View>
      );
    }
  
  }

//===========================================================
export class TextOfMySQLDate extends React.Component {

    render() {
      const { children, style } = this.props;
      var displayDate='';
      var moment = require('moment');
      if(this.props.dateOnly)
      {
        displayDate = moment(moment(this.props.dateSQL).format("YYYY-MM-DD HH:mm:ss")).format("DD MMM YYYY");
      }
      else
      {
        displayDate = moment(moment(this.props.dateSQL).format("YYYY-MM-DD HH:mm:ss")).format("DD MMM YYYY HH:mm:ss");
      }
      return (
          <Text style={style}>{displayDate}</Text>
      )
    }

  }    

//===========================================================
export class ImageAlter extends React.Component {

    constructor(props) {
        super(props);
          this.state = {
          failed: false
        };
      }

      _onError = () => {
        this.setState({ failed: true });
      }

      render() {
        const alterImage = <Image source={this.props.alterSource} style={this.props.style} />;
        if (this.state.failed) return alterImage;
        return (
          <Image
            {...this.props}
            onError={this._onError}
          />
        );
      }
  }

//===========================================================
export const ThousandFormat=(value)=>{
    return (value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  }

//===========================================================
export const RupiahFormat=(value)=>{
    return ('Rp. '+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  }

//===========================================================
export const DisplayHarga=(props)=>{
    const {harga, hargaNormal, style, children} = props;
    if(hargaNormal==-1)
    {
      return (
        <View style={style}>
          <View style={{flex:1, flexDirection:'row'}}>
            <Text style={{color:'darkmagenta', textAlign:'right', alignItems:'center', marginBottom:0, fontSize:16, fontWeight:'bold'}}>{RupiahFormat(harga)}</Text>
            <Text style={{color:'green', textAlign:'right', alignItems:'center', marginBottom:0, fontSize:14, fontWeight:'bold'}}>{'   '}Harga Promosi!</Text>
            {children}
          </View>
        </View>
      );
    }
    else if(hargaNormal>harga)
    {  
      return (
        <View style={style}>
          <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            <Text style={{textDecorationLine: 'line-through', color:'lightgray', textAlign:'right', alignItems:'center', marginBottom:0, fontSize:14, fontWeight:'normal'}}>{RupiahFormat(hargaNormal)}</Text>
            <Text style={{color:'darkmagenta', textAlign:'right', alignItems:'center', marginBottom:0, fontSize:16, fontWeight:'bold'}}>{'   '}{RupiahFormat(harga)}</Text>
            {children}
          </View>
        </View>
      );
    }
    else
    {
      return (
        <View style={style}>
          <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            <Text style={{color:'darkmagenta', textAlign:'right', alignItems:'center', marginBottom:0, fontSize:16, fontWeight:'bold'}}>{RupiahFormat(harga)}</Text>
            {children}
          </View>
        </View>
      );
    }
  }

//===========================================================
export class Spinner extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      min: this.props.min!=undefined?this.props.min:0,
      max: this.props.max!=undefined?this.props.max:99,
      num: this.props.default!=undefined?this.props.default:0,
      disabled: false,
    }
  }

  static defaultProps = {
    leftBtnColor:'#bfc19f',
    rightBtnColor:'#9ea07f',
    borderColor:'#c0c0c0',
    width:100,
    height:30,
    fontSize:16,
    btnFontSize:16,
    numColor:'gray',
    numBgColor:'white',
    showBorder:true,
    buttonTextColor:'white',
  }  

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled) {
      this.setState({
        disabled: nextProps.disabled
      });
    }
    if (nextProps.min) {
      this.setState({
        min: nextProps.min
      });
    }
    if (nextProps.max) {
      this.setState({
        max: nextProps.max
      });
    }
    if (nextProps.value !== false) {
      this.setState({
        num: nextProps.value
      });
    }
  }

  _onNumChange (num) {
    if (this.props.onNumChange) this.props.onNumChange(num);
};

  _increase () {
    if (this.state.disabled) return;

    if (this.state.max > this.state.num) {
      var num = this.state.num + 1;
      if (typeof this.state.value === 'undefined') {
        this.setState({
          num: num
      });
    };

      this._onNumChange(num);
    }
};

  _decrease () {
    if (this.state.disabled) return;

    if (this.state.min < this.state.num) {
      var num = this.state.num - 1;
      if (typeof this.state.value === 'undefined') {
        this.setState({
          num: num
      });
  };

      this._onNumChange(num);
  }
};

  render () {
    const {style}=this.props;
    return (
      <View style={[style,
        { borderColor: this.props.showBorder ? this.props.borderColor : 'transparent' },
        { width: this.props.width, height: this.props.height }, {borderWidth:0.5, borderRadius:4, flexDirection:'row', overflow: 'hidden'} ]}>
        <TouchableOpacity
          style={[styles.btn,
            { backgroundColor: this.props.leftBtnColor },
            { borderColor: this.state.showBorder ? this.props.borderColor : 'transparent' },
            { height: this.props.height } ]}
          onPress={() => this._decrease()}>
          <Text style={[styles.btnText,
              { color: this.props.buttonTextColor, fontWeight:'bold', fontSize: this.props.btnFontSize }]}>-</Text>
        </TouchableOpacity>
        <View style={[styles.num,
            { borderColor: this.props.showBorder ? this.props.borderColor : 'transparent', backgroundColor: this.props.numBgColor, height: this.props.height
            }]}>
          <Text style={[styles.numText, {color: this.props.numColor, fontSize: this.props.fontSize}]}>{this.state.num}</Text>
        </View>
        <TouchableOpacity
          style={[styles.btn,
            { backgroundColor: this.props.rightBtnColor },
            { borderColor: this.state.showBorder ? this.props.borderColor : 'transparent' },
            { height: this.props.height }]}
          onPress={() => this._increase()}>
          <Text style={[styles.btnText,
              { color: this.props.buttonTextColor, fontWeight:'bold', fontSize: this.state.btnFontSize
              }]}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
  }


//===========================================================
export const SetFocus = (props) => {
    const {focusref} = props;
    props.focusref.focus()
      return null;
  };

//===========================================================
export const screenMask=(show)=>{
    let lebar =  Dimensions.get('window').width; 
    let tinggi =  Dimensions.get('window').height; 
    if(show){
      return (
        <View style={{position:"absolute", width:lebar, height:tinggi, backgroundColor:'transparent'}}>
          <View style={{position:"absolute", opacity:0.3, width:lebar, height:tinggi, backgroundColor:'#808080'}}/>
          <View style={{position:"absolute",justifyContent:'center', alignItems:'center', borderRadius:5, borderWidth:1, borderColor:'#C0C0C0', left:(lebar-100)/2, top:(tinggi-100)/2, width:100, height:100, backgroundColor:'white'}}>
            <ActivityIndicator  size="large" color="#303030" /> 
          </View>
        </View>
      )
    } else {
      return null;
    }
  }

//===========================================================
export const renderIf=(condition, content)=>{
    if (condition) {
        return content;
    } else {
        return null;
    }
  }

//===========================================================
const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    width: 200
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  btnText: {
    color: 'white',
    textAlign: 'center'
  },

  num: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  numText: {
    textAlign: 'center'
  }
})

