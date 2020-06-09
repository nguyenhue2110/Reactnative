import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ImageBackground,
  Image,
  AppRegistry,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,

} from "react-native";
import {Form, Label, Input, Item} from 'native-base'
import Icon from "react-native-vector-icons/AntDesign";
import firebaseConfig from '../firebase/firebase.js';
 class Register extends Component {
constructor(props){
  super(props);
  this.state={
    fullname:'',
    usernam:'',
    password:'',
    confirm: '',
    showPass:true,
    press:false,
    showPass1:true,
    press1:false,
    showProgress:false,

  }
}
openProgress = (kt) => {
  this.setState({ showProgress: kt });
}


showPass=()=>{
if (this.state.press == false) {
this.setState({showPass:false,press:true})
}else{
this.setState({showPass:true,press:false})
}
}
showPass1=()=>{
if (this.state.press1 == false) {
this.setState({showPass1:false,press1:true})
}else{
this.setState({showPass1:true,press1:false})
}
}
getData=(usernam,confirm)=>{
  if( usernam != '' && confirm != '' && this.state.password != ''){
    if(confirm == this.state.password){
      this.setState({
        fullname:'',
        usernam:'',
        password:'',
        confirm: ''
      })
      this.openProgress(true);
      this.onRegister();
    }else{
      ToastAndroid.show('Vui lòng nhập chính xác mật khẩu!', ToastAndroid.SHORT);
    }
  }else{
    ToastAndroid.show('Vui lòng nhập đầy đủ thông tin!', ToastAndroid.SHORT);
  }
}


onRegister = () => {
  const { usernam, password } = this.state;
  firebaseConfig.auth().createUserWithEmailAndPassword(this.state.usernam, this.state.password)
    .then(() => {
    
        ToastAndroid.show('Đăng kí thành công!', ToastAndroid.SHORT);
        this.openProgress(false),
        this.props.navigation.navigate('Login')
    })
    .catch((error) => {
      const { code, message } = error;
     
      this.openProgress(false);
     Alert.alert('Lỗi! ', 'Vui lòng thử lại',[],{ cancelable: true })

    });
  }
  render() {
    return (
      <View style={styles.container}>
      
          <View style={styles.hlogo}>
            <Text style={styles.textRegister}>Hello again</Text>
            <Text style={styles.textRegister}>Welcom back</Text>
          </View>
         

         <Form style={styles.formregis}>
           <Item floatinglabel>
            <Label>
              <Text style={styles.textstyle}
               
              >Fullname</Text>
            </Label>
            <Input style={styles.inputstyle} autoFocus={true}
               onChangeText={(fullname)=>this.setState({fullname})}
              value={this.state.fullname}

            />
           </Item>

           <Item floatinglabel>
            <Label>
              <Text style={styles.textstyle}>Username</Text>
            </Label>
            <Input style={styles.inputstyle} 
              onChangeText={(usernam)=>this.setState({usernam})}
              value={this.state.usernam}

            />
           </Item>
           <Item floatinglabel>
            <Label>
              <Text style={styles.inputstyle} 
                
               >Password</Text>
            </Label>
            <Input style={styles.inputstyle} secureTextEntry={true}
              onChangeText={(password)=>this.setState({password})}
              value={this.state.password}

            />
           </Item>
           <Item floatinglabel>
            <Label>
              <Text style={styles.inputstyle} 
              

               >Confirm Password</Text>
            </Label>
            <Input style={styles.inputstyle} secureTextEntry={true}
                onChangeText={(confirm)=>this.setState({confirm})}
              value={this.state.confirm}
            />
           </Item>

          
         </Form>
         <View style={styles.kdc}>

        
         <TouchableOpacity style={styles.btnlogin}>
            <Text style={styles.text}
         onPress={this.getData.bind(this,this.state.usernam,this.state.password)}
            >Register</Text>
          </TouchableOpacity>
          </View>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgroundcontainer: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1
  },
  hlogo: {
    marginTop: 50,
    fontSize:35,
    alignItems:'center',
    justifyContent:'center'
  },
  btnlogin: {
    height: 55,
    width: 290,
   alignItems:'center',
   justifyContent:'center',
    marginTop: 30,
  
    backgroundColor: "#59CBCE",
    borderRadius: 25
  },

  textRegister:{
    fontSize:25
  },
  text: {
   
    fontSize: 20,
   
  },
  formregis:{
      marginTop: 30,
     
     paddingLeft:10,
     paddingRight:30

  },
  kdc:{
    alignItems:'center'
  },

  inputstyle:{
    
    marginBottom:6,
    fontSize:15
  },
  textstyle:{
    fontSize:15,
  
  }
});

export default Register;