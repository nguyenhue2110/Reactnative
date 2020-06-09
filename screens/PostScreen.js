import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from "../Fire";
import firebaseConfig from '../firebase/firebase.js';
import Icon from "react-native-vector-icons/AntDesign";
import hinhad2 from '../images/hinhad2.png'
class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.itemRef= firebaseConfig.database();
    this.state = {
      text: '',
      image: null

    };
  }

  componentDidMount() {
    this.getPhotoPermission();
}

getPhotoPermission = async () => {
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status != "granted") {
            alert("We need permission to use your camera roll if you'd like to incude a photo.");
        }
    }
};

handlePost = () => {

  
    Fire.shared
        .addPost({ text: this.state.text.trim(), localUri: this.state.image })
        .then(ref => {
            this.setState({ text: "", image: null });
            this.props.navigation.navigate('Home')
            ToastAndroid.show('thêm thành công', ToastAndroid.SHORT);
        })
        .catch(error => {
            alert(error);
        });
};

pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
    });

    if (!result.cancelled) {
        this.setState({ image: result.uri });
    }
};

  nhapdulieu(){
    this.itemRef.ref('lt14304').child('monhoc').push({
      Android: this.state.text
    });
    this.setState({
      text:''
    })
  }
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
            <Icon
              name={"arrowleft"}
              size={30}
              color="gray"
              style={styles.backvector}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePost}>
            <Text style={styles.textstyle}>Pots</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputcontainer}>
            <Image source={hinhad2} style={styles.avatar}/>

            <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={2}
            style={{flex:1}}
            onChangeText={(text)=>this.setState({text})}
            value={this.state.text}
            placeholder=" Bạn đang nghĩ gì?"
            >

            </TextInput>
        </View>
        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
        <Icon
              name={"camera"}
              size={35}
              color="gray"
             
            />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 250 }}>
                    <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
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
      width:48,
      height:48,
      borderRadius:24,
      marginRight:16
      
  },

  photo:{
alignItems:"flex-end",
marginHorizontal:32
  }
});

export default PostScreen;
