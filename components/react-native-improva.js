"use strict";

import React from 'react';
import {ExpoConfigView } from '@expo/samples';
import {View,Text,TouchableOpacity,Image, FlatList, SectionList} from 'react-native';
import {ListItem} from 'react-native-elements'
import equal from 'fast-deep-equal'

export class DBText extends React.Component {

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
    if (this.props.query==undefined){}
    else if (this.props.query=='')
      {this.setState({theValue:this.props.onEmptyText})}
    else
      {this.queryTable(this.props.query)};
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


  export class HomeIconButton extends React.Component {

    render() {
      const { children, style } = this.props;
      return (
        <View style={style}>
                  <TouchableOpacity onPress={this.props.onPress} style={{flexDirection:"column", justifyContent:'flex-start', alignItems:'center', }}> 
                    <View style={{shadowColor: "#707070", shadowOffset: { height:4, width:4}, shadowRadius:4, shadowOpacity: 0.8}}> 
                      <Image source={this.props.imageSource}  style={{width:style.height-20, height:style.height-20, }}/>
                    </View>            
                    <Text style={{color:'#cd695a', fontSize:14, fontWeight:'bold'}}>e<Text style={{color:'#606060', fontSize:12, fontWeight:'normal'}}>{this.props.label}</Text></Text>
                  </TouchableOpacity>
        </View>);
      }
  }  


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
        if(!equal(this.props.query, prevProps.query))
        {
            this.getTable();
        }         
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        return (
        <View style={{borderRadius:5}}>
          <View style={{height:3, backgroundColor:'#f2f2f2'}}>
          </View> 
          <View style={{paddingTop:2, paddingLeft:3, paddingRight:3, borderRadius:5, backgroundColor:'#f2f2f2'}}>   
            {this.state.rowData}
          </View>
        </View>
      );
    }
  
  }

  export class DBFlatList extends React.Component {

    _isMounted = false ;

    constructor(props) {
      super(props)
      this.state = {
        Data:[]
      };
    }
        
    getTable = () => {
        var table=[];
        console.log('getTable FlatListTable: '+this.props.query);
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
            for(let i=0;i<responseJson.length;i++){
              table.push(responseJson[i]);
            }
          }
        }
        if (this._isMounted) {
            this.setState({Data:table})
        }
        }).catch((error) => {
          console.error(error);
        });
    }
       
    componentDidMount(){
        this.getTable();
        this._isMounted = true;
        console.log(JSON.stringify(this.state.Data));
    }

    componentDidUpdate(prevProps, prevState){
        this._isMounted = true;
        if(!equal(this.props.query, prevProps.query))
        {
            this.getTable();
        }         
//        console.log('FlatListTable DidUpdate '+this.props.query);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
//        console.log('FlatListTable render: '+this.props.query);
        return (
          <View>
            <FlatList
              data = {this.state.Data}
              renderItem = {this.props.onRenderItem}
              keyExtractor={item => item.ID}
            />  
            </View>
        );
    }
  
  }

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
        if(!equal(this.props.query, prevProps.query))
        {
            this.getTable();
        }         
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        return (
          <View>
            <SectionList
              sections = {this.state.Data}
              renderSectionHeader = {this.props.onRenderSectionHeader}
              renderItem={this.props.onRenderItem}
              keyExtractor={ (item, index) => index }
            />  
            </View>
        );
    }
  
  }

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

