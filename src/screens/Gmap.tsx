import React,{Component} from "react";
import {Text, View,Dimensions, Alert} from "react-native";
import MapView,{PROVIDER_GOOGLE} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class Gmap extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
     }
  }
   componentDidMount() {
  //Checking for the permission just after component loaded
  this.callLocation();  
}


callLocation(){
  Geolocation.getCurrentPosition(
     (position) => {
        // const currentLongitude = Number(JSON.stringify(position.coords.longitude));
        // const currentLatitude = Number(JSON.stringify(position.coords.latitude));
        this.setState({ 
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
       });
       //Alert.alert(this.state.region.latitude,"--", this.state.region.longitude)
     },
     (error) => alert(error.message),
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
  this.watchId=Geolocation.watchPosition((position) => {
      console.log(position);
      // const currentLongitude = Number(JSON.stringify(position.coords.longitude));
      // const currentLatitude = Number(JSON.stringify(position.coords.latitude));
     // console.log(JSON.stringify(position));
     this.setState({ 
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
         });
  });
}
componentWillUnmount() {
  Geolocation.clearWatch(this.watchID);
}
     render() { 
            return (    
                 <View style={{flex:1}}>
                      <MapView
                        style={{ flex:1, height:"100%", width:"100%"}}
                        showsMyLocationButton={false}
                          showsUserLocation={true}
                          zoomEnabled={true}
                          provider={PROVIDER_GOOGLE}
                          zoomControlEnabled={true}
                          region={ this.state.region }
                          onRegionChange={ region => this.setState({region}) }
                        >
                          <MapView.Marker
                            coordinate={ this.state.region }
                          />
                      </MapView>
                  </View>
        ); 
     }}

export default Gmap;