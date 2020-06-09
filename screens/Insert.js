import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from "../Fire";
import firebaseConfig from '../firebase/firebase.js';
import Icon from "react-native-vector-icons/AntDesign";
import hinhad2 from '../images/hinhad2.png'
class Insert extends Component {
  constructor(props) {
    super(props);
    this.itemRef= firebaseConfig.database();
    this.state = {
      name:'',
      date:'',
      classs:'',
    };
    
  }

 

  nhap(){
    this.itemRef.ref().child('SinhVien').push({
      name: this.state.name,
      date:this.state.date,
      classs: this.state.classs
    });
    this.setState({
      name:'',
      date:'',
      classs:'',
    })
  }
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=> navigation.navigate('Meseage')}>
            <Icon
              name={"arrowleft"}
              size={30}
              color="gray"
              style={styles.backvector}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.nhap()}>
            <Text style={styles.textstyle}>Pots</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputcontainer}>
            <Image source={hinhad2} style={styles.avatar}/>

            <View>

           
            <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={2}
           
            onChangeText={(name)=>this.setState({name})}
            value={this.state.name}
            placeholder="Họ Tên"
            >

            </TextInput>
            <TextInput
            multiline={true}
            numberOfLines={2}
            onChangeText={(date)=>this.setState({date})}
            value={this.state.date}
            placeholder=" Ngày Sinh"
            >

            </TextInput>
            <TextInput
            multiline={true}
            numberOfLines={2}
            onChangeText={(classs)=>this.setState({classs})}
            value={this.state.classs}
            placeholder="Lớp"
            >
            </TextInput>
            </View>
        </View>
        

        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textstyle: {
    fontSize: 25,
    fontWeight: "500"
  },
  header: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB"
  },
  inputcontainer:{
     margin:20,
     flexDirection:'row' 
  },
  avatar:{
      width:120,
      height:120,
      borderRadius:60,
      marginRight:16
      
  },

});

export default Insert;
