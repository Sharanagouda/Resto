import React,{Component} from "react";
import Geolocation from '@react-native-community/geolocation';
import {Text, View} from "react-native";
import MapView,{PROVIDER_GOOGLE} from "react-native-maps";

class Gmap extends Component { 
     render() { 
            return (    
                 <View style={{flex:1}}>
                      <MapView
                        style={{ flex:1}}
                          showsUserLocation={true}
                          zoomEnabled={true}
                          zoomControlEnabled={true}
                          initialRegion={{
                            latitude: 12.971599,
                            longitude: 77.594566,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}>
                      </MapView>
                  </View>
        ); 
     }}

export default Gmap;