//This is an example code to get Geolocation//  
import React from 'react';
//import react in our code. 
import {View, Text,  StyleSheet, Image ,PermissionsAndroid,Platform, Alert} from 'react-native';
//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';
//https://medium.com/better-programming/how-to-use-geolocation-in-react-native-hooks-aea06bf58263


export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentLongitude: 'unknown',//Initial Longitude
        currentLatitude: 'unknown',//Initial Latitude
     }
  }
   componentDidMount() {
  //Checking for the permission just after component loaded
  this.callLocation();  
}
callLocation(){
    Geolocation.getCurrentPosition(
       (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          const currentLatitude = JSON.stringify(position.coords.latitude);
          this.setState({ 
              currentLongitude:currentLongitude,
              currentLatitude:currentLatitude
         });
         //Alert.alert(`lat`,this.state.currentLatitude);
         //Alert.alert(this.state.longitude);
       },
       (error) => alert(error.message),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    Geolocation.watchPosition((position) => {
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
       this.setState({ 
            currentLongitude:currentLongitude,
            currentLatitude:currentLatitude
           });
           //Alert.alert(`lat`,this.state.currentLatitude, this.state.longitude);
    });
}

  render() {
    return (
     
        <View style = {styles.container}>
          <Image
            source={{uri:'https://png.icons8.com/dusk/100/000000/compass.png'}}
            style={{width: 100, height: 100}}
          />
          <Text style = {styles.boldText}>
             You are Here
          </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
            Longitude: {this.state.currentLongitude}
          </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
            Latitude: {this.state.currentLatitude}
          </Text>
       </View>
     
    );
  }
}

// styles
const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding:16,
    backgroundColor:'white'
 },
 boldText: {
    fontSize: 30,
    color: 'red',
 }
});