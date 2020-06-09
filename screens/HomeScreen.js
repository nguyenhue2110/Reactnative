import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  LayoutAnimation,
  Button,
  FlatList,
  ToastAndroid
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import hinhad2 from "../images/hinhad2.png";
import Modal from "react-native-modal";
import firebaseConfig from "../firebase/firebase.js";
import avatar from "../images/hinhad2.png";
import moment from "moment";
import Icon from "react-native-vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      text: "",
      image: "",
      uid:'',
      key:'',
      timestamp:'',
      postContent: "",
      post1: []
    };
    this.itemRef = firebaseConfig.database();
  }
  setModalVisible = bool => {
    this.setState({ isModalVisible: bool });
  };
  showmd=()=>{
    this.isModalVisible=false;
  }
  setTextInput = text => {
    this.setState({ text: text });
  };
  setimage = loacuri => {
    this.setState({ image: loacuri });
  };
  setkey = key => {
    this.setState({ key:key });
  };
  setuid = uid => {
    this.setState({ uid:uid });
  };
  settime = timestamp => {
    this.setState({ timestamp:timestamp });
  };
  listendata(itemRef) {
    this.itemRef
      .ref()
      .child("Posts")
      .on("value", snap => {
        var items1 = [];
        snap.forEach(child => {
          let item = {
            key: child.key,
            text: child.val().text,
            image: child.val().image,
            timestamp: child.val().timestamp,
            uid: child.val().uid
          };
          items1.push(item);
        });

        this.setState({
          post1: items1
        });
        this.state.post1.map((item, idx) => {
          console.log(item.key);
        });
      });
  }
  componentDidMount() {
    this.listendata(this.itemRef);
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



handlePostedt = () => {
  Fire.shared
      .edit({ text: this.state.text.trim(), localUri: this.state.image ,key:this.state.key,uid: this.state.uid})
      .then(ref => {
          this.setState({ text: "", image: null });
          this.setModalVisible(false)
          ToastAndroid.show('update thành công', ToastAndroid.SHORT);
         
      })
      .catch(error => {
          alert(error);
      });
};
_edit(key) {
            
  firebaseConfig.database().ref().child('Posts').child(key).set({

      text:this.state.text,
      image:this.state.image,
      uid:this.state.uid,
      timestamp:this.state.timestamp
      
  })
}
_deletea(key) {
  firebaseConfig
    .database()
    .ref()
    .child("Posts")
    .child(key)
    .remove();
   
}


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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
        </View>
        <FlatList style={styles.home}
          data={this.state.post1}
          renderItem={({ item }) => (
            <View style={styles.flatitem}>
              <Image source={avatar} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.timestamp}>
                      {moment(item.timestamp).fromNow()}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(true);
                      this.setTextInput(item.text);
                      this.setimage(item.image);
                      this.setkey(item.key);
                      this.setuid(item.uid);
                      this.settime(item.timestamp)
                    }}
                  >
                    <Ionicons name="ios-more" size={24} color="#73788B" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.post}>{item.text}</Text>
                <Image
                  source={{ uri: item.image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name={"hearto"}
                    size={24}
                    color="#737888"
                    style={{ marginRight: 16 }}
                  />
                  <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
                </View>
              </View>
            </View>
          )}
        />
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{ backgroundColor: "white", height: 500, marginTop: 50 }}
          >
            <View style={styles.inputcontainer}>
              <View style={{marginBottom:30}}>
                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                  <Icon
                    name={"arrowleft"}
                    size={30}
                    color="gray"
                    style={styles.backvector}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginTop:30}}>
              <Image source={hinhad2} style={styles.avatar} />
              </View>
              <TextInput
                autoFocus={true}
                multiline={true}
                numberOfLines={2}
                style={{ flex: 1 }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                placeholder="Bạn đang nghĩ gì? "
              ></TextInput>
            </View>
            <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
              <Icon name={"camera"} size={35} color="gray" />
            </TouchableOpacity>

            <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
              <Image
                source={{ uri: this.state.image }}
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity style={styles.btnsave} onPress={this.handlePostedt}>
                <Text style={styles.text}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btndele} onPress={()=>{ this._deletea(this.state.key),this.setModalVisible(false)}}>
                <Text style={styles.text}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500"
  },
  flatitem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  home: {
    marginHorizontal: 16
},
  avatar: {
    width: 36,
    height: 36,
    marginTop: 50,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 200,
    borderRadius: 5,
    marginVertical: 16
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },

  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32
  },
  inputcontainer: {
    margin: 20,
    flexDirection: "row"
  },

  btnsave: {
    height: 55,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#2AE5DC",
    marginRight:20
  },

  btndele: {
    height: 55,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#2AE5DC",
    
  }
});

export default HomeScreen;
