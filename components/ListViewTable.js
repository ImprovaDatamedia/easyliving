"use strict";

import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import equal from 'fast-deep-equal'

//ListViewTable
//props :
    //Query
    //onRenderRow
    //onTableEmpty

class ListViewTable extends React.Component {

    _isMounted = false ;

    constructor(props) {
      super(props)
      this.state = {
        rowData:[],
      };
    }
        
    getTable = () => {
        var table=[];
//        console.log('getTable ListViewTable: '+this.props.Query);
        return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token : 'SELECT',
            query : this.props.Query
          })
        }).then((response) => {
          let vStr = JSON.stringify(response);
          if(vStr.indexOf('No Results Found')==-1){return response.json()}
        }).then((responseJson) => {
          if(responseJson==undefined){table.push(this.props.onTableEmpty())} else {
          if (responseJson.length>0){
            for(let i=0;i<responseJson.length;i++){
              var val= this.props.onRenderRow(responseJson[i]);
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
        if(!equal(this.props.Query, prevProps.Query))
        {
            this.getTable();
        }         
//        console.log('ListViewTable DidUpdate '+this.props.Query);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
//        console.log('ListViewTable render: '+this.props.Query);
        return (
        <View style={{borderRadius:5}}>
          <View style={{height:3, backgroundColor:'#f2f2f2'}}>
          </View> 
          <ScrollView style={{paddingTop:2, paddingLeft:3, paddingRight:3, borderRadius:5, backgroundColor:'#f2f2f2'}}>   
            {this.state.rowData}
          </ScrollView>
        </View>
      );
    }
  
  }

  export default ListViewTable;