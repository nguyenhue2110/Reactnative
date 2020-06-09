import React, { Component } from 'react'

import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    TextInput,
    TouchableOpacity,
    Button,Modal,
    FlatList
  } from "react-native";


export default class MenuModal extends Component {

    constructor(props){
        super(props);
    }

    showModal=()=>{
        this.refs.myModal.open();
    }
    render() {
        return (
            <Modal  ref={"myModal"}
            >
           <View style={{backgroundColor:'white', borderRadius:10,height:100,width:100}}>
               <Button 
               title="delete" 
               ></Button>
                <Button 
               title="Update" 
               ></Button>
           </View>
            </Modal>
        )
    }
}
