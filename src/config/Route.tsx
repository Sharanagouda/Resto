import React, {Component} from "react";
import {Router, Scene} from "react-native-router-flux";
import Home from "../screens/Home";
import Gmap from "../screens/Gmap";
import GeolocationExample from "../screens/Geolocation";

import Craigslist from "../screens/FlatScreen"
class Routes extends Component {



    render() {
      return (
        <Router>
          <Scene key="user">
          <Scene key="flatlist" initial={true}   component={Craigslist} title="Flat list" />
          <Scene key="gmap"   hideNavBar={true} component={Gmap} title="Google Map" />
            <Scene key="home"   component={Home} title="Home" />
            <Scene key="Geo" component={GeolocationExample} title="Geo Exp" />
          </Scene>
        </Router>
      );
    }
  }
  export default Routes;