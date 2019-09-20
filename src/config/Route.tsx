import React, {Component} from "react";
import {Router, Scene} from "react-native-router-flux";
import Home from "../screens/Home";
class Routes extends Component {



    render() {
      return (
        <Router>
          <Scene key="user">
          
           
            <Scene key="home" component={Home} title="Home" />
          
          </Scene>
        </Router>
      );
    }
  }
  export default Routes;