import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";
var jwtDecode = require("jwt-decode");
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  componentDidMount() {
    this._loadInitialState().done();
  }
  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem("MyStoreUser");
    if (value !== null) {
      this.props.navigation.navigate("Profile");
    }
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}> Login</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
            underlineColorAndriod="transparent"
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            underlineColorAndriod="transparent"
          />
          <TouchableOpacity style={styles.btn} onPress={this.login}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  login = () => {
    const { navigate } = this.props.navigation;
    fetch("http://172.20.10.2:8080/JwtAuthentication/rest/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(function(response) {
        if (response.status === 200) {
          var token = response.headers.get("Authorization");
          var decoded = jwtDecode(token);
          AsyncStorage.setItem("MyStoreUser", decoded.sub);
          navigate("Profile");
        } else {
          alert("Wrong username or password");
          return;
        }
      })
      .catch(function(err) {
        console.log("Fetch Error", err);
      });
  };
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    paddingLeft: 40,
    paddingRight: 40
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: "#fff",
    fontWeight: "bold"
  },
  textInput: {
    alignSelf: "stretch",
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  btn: {
    alignSelf: "stretch",
    backgroundColor: "#01c853",
    padding: 20,
    alignItems: "center"
  }
});
