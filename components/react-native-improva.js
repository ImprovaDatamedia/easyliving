"use strict";

import React from 'react';
import {ExpoConfigView } from '@expo/samples';
import {View,Text,TouchableOpacity,Image, FlatList, SectionList, StyleSheet} from 'react-native';
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
      const {children, style} = this.props;
      let shadowSize=0;
      //#559932
      const labeleLiving = <Text style={{color:'#606060', fontSize:14, fontWeight:'bold'}}>e<Text style={{color:'#808080', fontSize:12, fontWeight:'normal'}}>{this.props.label}</Text></Text>
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
      const {children, style} = this.props;
      return (
        <View style={style}>
            {this.state.rowData}
        </View>
      );
    }
  
  }

  export class DBFlatList extends React.Component {

    _isMounted = false ;
    limit=10;
    startID=0;
    lastItem = [];
    hasScrolled= false;
    loading = false;

    constructor(props) {
      super(props)
      this.state = {
        Data:[],
      };
    }
        
    getTable(){
//        console.log('gettable');
      var table=[];
        let vquery = this.props.query;//+' WHERE ID>'+this.startID+' LIMIT '+this.limit;
        console.log('query: '+vquery);
        return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
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
//            console.log('json: '+JSON.stringify(responseJson));
            if(responseJson==undefined)
            {
              if(this.props.onTableEmpty!=undefined){this.props.onTableEmpty()}
            }
            else 
            {
            if (responseJson.length>0){
              for(let i=0;i<responseJson.length;i++){
                table.push(responseJson[i]);
                this.startID = responseJson[i].ID;
                this.lastItem = responseJson[i];
              }
            }
          }
          if (this._isMounted) {
            this.setState({Data: table});// this.state.Data.concat(table)})
          }
        }).catch((error) => {
          console.error(error);
        });
    }
     
    
    componentDidMount(){
        this.getTable();
        this._isMounted = true;
//        console.log(JSON.stringify(this.state.Data));
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

    onScroll = () => {
      this.hasScrolled= true;
//      console.log('onscroll')
     }

    loadMore(){
      if(!this.loading){
        this.loading = true;
//        console.log('load more: ');
        this.loading = false;  
      }
//        if(!this.hasScrolled){ return null; }
        //       this.getTable();
 //    this.setState({Data: this.state.Data.concat(this.lastItem)})
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
            onScroll={this.onScroll}
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

  export const ThousandFormat=(value)=>{
    return (value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  }

  export const RupiahFormat=(value)=>{
    return ('Rp. '+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  }

  export const DisplayHarga=(props)=>{
    const {harga, hargaNormal, style} = props;
    if(hargaNormal==-1)
    {
      return (
        <View style={style}>
          <View style={{flex:1, flexDirection:'row'}}>
            <Text style={{color:'darkmagenta', textAlign:'left', alignItems:'center', marginBottom:0, fontSize:18, fontWeight:'bold'}}>{RupiahFormat(harga)}</Text>
            <Text style={{color:'green', textAlign:'left', alignItems:'center', marginBottom:0, fontSize:18, fontWeight:'bold'}}>{'   '}Harga Promosi!</Text>
          </View>
        </View>
      );
    }
    else if(hargaNormal>harga)
    {  
      return (
        <View style={style}>
          <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
            <Text style={{textDecorationLine: 'line-through', color:'lightgray', textAlign:'left', alignItems:'center', marginBottom:0, fontSize:18, fontWeight:'normal'}}>{RupiahFormat(hargaNormal)}</Text>
            <Text style={{color:'darkmagenta', textAlign:'left', alignItems:'center', marginBottom:0, fontSize:18, fontWeight:'bold'}}>{'   '}{RupiahFormat(harga)}</Text>
          </View>
        </View>
      );
    }
    else
    {
      return (
        <View style={style}>
          <View style={{flex:1}}>
            <Text style={{flex:1, color:'darkmagenta', textAlign:'left', alignItems:'center', marginBottom:0, fontSize:18, fontWeight:'bold'}}>{RupiahFormat(harga)}</Text>
          </View>
        </View>
      );
    }
  }

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
