import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";

import hinhadd from "../images/add_64px.png";
import hinhad2 from "../images/student.png";
import edit from "../images/editx1.png";
import deltete from "../images/delete1.png";
import firebaseConfig from "../firebase/firebase.js";
import Modal from "react-native-modal";
class MesageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      name: "",
      classs: "",
      date: "",
      postContent: "",
      post: [],
      isModalVisible: false
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
  setModalVisible = bool => {
    this.setState({ isModalVisible: bool });
  };
  listen(itemRef) {
    this.itemRef
      .ref()
      .child("SinhVien")
      .on("value", snap => {
        var items = [];
        snap.forEach(child => {
          let item = {
            key: child.key,
            name: child.val().name,
            date: child.val().date,
            classs: child.val().classs
          };
          items.push(item);
        });

        this.setState({
          post: items
        });
        this.state.post.map((item, idx) => {
          console.log(item.key);
        });
      });
  }
  componentDidMount() {
    this.listen(this.itemsRef);
  }
  _delete1(key) {
    firebaseConfig
      .database()
      .ref()
      .child("SinhVien")
      .child(key)
      .remove();
  }
  _edit(key) {
            
    firebaseConfig.database().ref().child('SinhVien').child(key).set({
  
        name:this.state.name,
        date:this.state.date,
        classs:this.state.classs,
        
        
    })
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <FlatList
            data={this.state.post}
            renderItem={({ item }) => (
              <View style={styles.viewflat}>
                <Image source={hinhad2} style={styles.avatar} />

                <View>
                  <Text style={styles.textstyle}>{item.name}</Text>
                  <Text>{item.date}</Text>
                  <Text>{item.classs}</Text>
                </View>
                <View style={styles.btned}>
                  <View style={styles.btnedit}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(true),
                         this.setdate(item.date);
                        this.setkey(item.key);
                        this.setclasss(item.classs);
                        this.setname(item.name);
                       
                      }}
                    >
                      <Image source={edit} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.btnedit}
                    onPress={() =>
                      Alert.alert(
                        "Delete?",
                        "Cannot be undone",
                        [
                          { text: "Cancel" },
                          {
                            text: "Ok",
                            onPress: () => {
                              this._delete1(item.key);
                            }
                          }
                        ],
                        { cancelable: false }
                      )
                    }
                  >
                    <Image source={deltete} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Modal isVisible={this.state.isModalVisible}>
            <View
              style={{ backgroundColor: "white", height: 500, marginTop: 50 }}
            >
              <TextInput
                placeholder="ten"
                onChangeText={(name)=>this.setState({name})}
            value={this.state.name}
                style={{ marginTop: 20 }}
              ></TextInput>
              <TextInput
               onChangeText={(date)=>this.setState({date})}
            value={this.state.date}
                placeholder="date"
                style={{ marginTop: 20 }}
              ></TextInput>
              <TextInput
               onChangeText={(classs)=>this.setState({classs})}
            value={this.state.classs}
                placeholder="lop"
                style={{ marginTop: 20 }}
              ></TextInput>

              <TouchableOpacity
               onPress={()=> {this._edit(this.state.key),this.setModalVisible(false)}}
                style={styles.btnsave}
                // onPress={() => {
                //   {
                //     navigation.navigate("Notification", {
                //   name:this.state.name
                //     });
                //     this.setModalVisible(false);
                //   }
                // }
                
                // }
              >
                <Text>lưu</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View style={styles.btnad}>
          <TouchableOpacity onPress={() => navigation.navigate("Insert")}>
            <Image source={hinhadd} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  btnad: {
    alignSelf: "flex-end",
    marginHorizontal: 20,
    position: "absolute",
    bottom: 20
  },

  btnadd: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  item: {
    marginTop: 30,
    flex: 1,
    marginBottom:50,
    paddingBottom:20
  },
  viewflat: {
    flexDirection: "row",
    margin: 10,

    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    alignItems: "center",
    padding: 10
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20
  },
  textstyle: {
    fontSize: 25
  },

  btned: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end"
  },
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

export default MesageScreen;
