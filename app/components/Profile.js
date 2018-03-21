import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loaded: "false"
    };
  }

  _loadInitialState = async () => {
    let user = await AsyncStorage.getItem("MyStoreUser");
    if (user !== null) {
      this.setState({ username: user, loaded: "true" });
    }
  };

  componentWillMount() {
    this._loadInitialState().done();
  }

  render() {
    let userValue = this.state.username;
    if (this.state.loaded === "false") {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Welcome {userValue}</Text>
        <TouchableOpacity style={styles.btn} onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
  logout = () => {
    console.log("This is logout");
    const { navigate } = this.props.navigation;
    AsyncStorage.removeItem("MyStoreUser");
    navigate("Home");
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    paddingLeft: 40,
    paddingRight: 40
  },
  btn: {
    alignSelf: "stretch",
    backgroundColor: "#01c853",
    padding: 20,
    alignItems: "center"
  }
});
