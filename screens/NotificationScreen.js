import React, { Component} from "react";

import { View, Text,TextInput,StyleSheet,TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import firebaseConfig from "../firebase/firebase.js";
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key:'',
      name: this.props.route.params.name,
      classs:'',
      date:'',
      uid:'',
    
    };
    this.itemRef = firebaseConfig.database();
  }
  setdate = date => {
    this.setState({ date: date });
  };
  setname = name => {
    this.setState({ name: name });
  };
  setkey = key => {
    this.setState({ key: key });
  };
  setclasss = classs => {
    this.setState({ classs: classs });
  };
  

 
  render() {
    const { navigation, route } = this.props;
    
    const { name, date, key,classs} = route.params;
    
  
    console.log(name);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
             
            >
              <TextInput
               
                placeholder="ten"
                style={{ marginTop: 20 }}
                value={this.state.name}
                onChangeText={(name)=>this.setState({name})}
             
              
                
              ></TextInput>
              <TextInput
                placeholder="date"
                style={{ marginTop: 20 }}
              ></TextInput>
              <TextInput
                placeholder="lop"
                style={{ marginTop: 20 }}
              ></TextInput>

              <TouchableOpacity
                style={styles.btnsave}
                
              >
                <Text>lưu</Text>
              </TouchableOpacity>
            </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  
  btnsave: {
    height: 55,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#2AE5DC",
    marginHorizontal: 32
  }
});
export default NotificationScreen;