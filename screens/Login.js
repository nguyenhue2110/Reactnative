import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  TouchableWithoutFeedback,
  AsyncStorage,
  Alert
} from "react-native";
import bglg from "../images/bgrlg.png";
import hinhad2 from "../images/hinhad.png";
import Icon from "react-native-vector-icons/AntDesign";
import firebaseConfig from "../firebase/firebase.js";
import Register from "../screens/Register";

import { Form } from "native-base";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPass: true,
      press: false,
      showProgress: false
    };
  }

  openProgress = kt => {
    this.setState({ showProgress: kt });
  };

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };
  getData = (username, password) => {
    if (username != "" && password != "") {
      this.setState({
        username: "",
        password: ""
      });
      this.openProgress(true);
      this.onLogin();
    } else {
      ToastAndroid.show("Vui lòng nhập đầy đủ thông tin!", ToastAndroid.SHORT);
    }
  };

  onLogin = () => {
    const { username, password } = this.state;
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(user => {
        // If you need to do anything with the user, do it here
        this.props.navigation.navigate("Home", {
          username: username
        });
        this.openProgress(false);
      })
      .catch(error => {
        const { code, message } = error;
        // representation of the error
        this.openProgress(false),
          Alert.alert("Lỗi! ", "Vui lòng đăng nhập lại", [], {
            cancelable: true
          });
      });
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bgroundcontainer} source={bglg}>
          <View style={styles.logocontainer}>
            <Text style={styles.title}>Welcome</Text>
            <Image source={hinhad2} style={styles.logo} />
          </View>

          <View>
            <TextInput
              style={styles.input}
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              placeholder={"Username"}
              placeholderTextColor={"black"}
            ></TextInput>
            <Icon
              name={"user"}
              size={30}
              color="black"
              style={styles.inputvector}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              placeholder={"Password"}
              secureTextEntry={true}
              placeholderTextColor={"black"}
            ></TextInput>
            <Icon
              name={"unlock"}
              size={30}
              color="black"
              style={styles.inputvector}
            />
          </View>
          <TouchableWithoutFeedback>
            <View>
              <Text style={styles.titlefor}>Forgot Password ?</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            style={styles.btnlogin}
            onPress={this.getData.bind(
              this,
              this.state.username,
              this.state.password
            )}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <View style={styles.textstyle}>
            <Text style={{ color: "white" }}>Don't have an account ?</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ fontSize: 17, color: "white", marginLeft: 10 }}>
                Sign up
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bgroundcontainer: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1
  },
  inputvector: {
    position: "absolute",
    top: 50,
    left: 37
  },
  logocontainer: {
    marginTop: 30,
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    color: "white"
  },
  logo: {
    marginTop: 20,
    height: 140,
    width: 146
  },
  input: {
    marginTop: 40,
    height: 55,
    width: 290,
    borderRadius: 25,
    fontSize: 20,
    paddingLeft: 45,
    backgroundColor: "white",
    marginHorizontal: 25
  },
  btnlogin: {
    height: 55,
    width: 290,
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#4055EB",
    borderRadius: 25
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  titlefor: {
    color: "white",
    marginLeft: 80,
    marginTop: 15
  },
  textstyle: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row"
  }
});
