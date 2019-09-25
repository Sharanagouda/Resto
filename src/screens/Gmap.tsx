import React,{Component} from "react";
import {Text, View,Dimensions, Alert, Platform, KeyboardAvoidingView,StyleSheet,SafeAreaView, FlatList, TouchableWithoutFeedback, TouchableOpacity,Image, TextInput} from "react-native";
import MapView,{PROVIDER_GOOGLE, Marker} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Icon from "react-native-elements";

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 12.9317;
const LONGITUDE = 77.6914;
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
      },
      textInputValue: '',
   
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
        console.log(position);
        this.setState({ 
          region: {
            latitude: Number(position.coords.latitude),
            longitude: Number(position.coords.longitude),
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
      console.log(JSON.stringify(position));
     this.setState({ 
            region: {
              latitude: Number(position.coords.latitude),
              longitude: Number(position.coords.longitude),
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            data: [
              {id:1,  name: "Comunity",   image:"https://img.icons8.com/clouds/100/000000/groups.png",           count:124.711},
              {id:2,  name: "Housing",    image:"https://img.icons8.com/color/100/000000/real-estate.png",       count:234.722},
              {id:3,  name: "Jobs",       image:"https://img.icons8.com/color/100/000000/find-matching-job.png", count:324.723} ,
              {id:4,  name: "Personal",   image:"https://img.icons8.com/clouds/100/000000/employee-card.png",    count:154.573} ,
              {id:5,  name: "For sale",   image:"https://img.icons8.com/color/100/000000/land-sales.png",        count:124.678} ,
            ]
         });
  });
}


// componentWillUnmount() {
//   Geolocation.clearWatch(this.watchID);
// }
     render() { 
       console.log(this.state.region);
            return (    
              <SafeAreaView style={stylesheet.stationfindercontainer}>
                  
                   <KeyboardAvoidingView behavior="height" enabled>
                      
                      <View style={stylesheet.searchbarcontainer}>
                    
                          <View style={{ flexDirection:'row',backgroundColor:'red',borderRadius:9}}>
                          <TextInput
                                ref={this.searchbar}
                                style={stylesheet.textInputSearch}
                                placeholder="Search" 
                                onChangeText={this.searchStore}
                                onFocus={this.onFocusSearchBar}
                                value={this.state.textInputValue}
                          /> 
                            { this.state.textInputValue.length > 0 &&
                          <TouchableOpacity style={{justifyContent:'center',alignItems:'center', backgroundColor:'#F4F4F4',borderRadius:9,borderTopLeftRadius:0,borderBottomLeftRadius:0,padding:5}} onPress={this.emptySearchBar}>
                          <View >
                                <Text>x</Text>
                          </View>
                          </TouchableOpacity>
                            }
                          </View>
                          </View>
                    </KeyboardAvoidingView>
                     <View style={{flex:1}}>
                    { (Platform.OS === 'ios') ? 
                    <MapView
                          style={{ flex:1, height:"100%", width:"100%"}}
                          showsMyLocationButton={false}
                          loadingEnabled={true}
                          showsUserLocation={true}
                          zoomEnabled={true}
                          zoomControlEnabled={true}
                          region={this.state.region || undefined}
                          onRegionChange={ region => this.setState({region}) }
                        
                        >
                          <Marker draggable
                            coordinate={ this.state.region }
                            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                            title={"You are here"}
                            description={"Marker Description Text"}
                          />
                      </MapView>
                  :  <MapView
                        style={{ flex:1, height:"100%", width:"100%"}}
                        showsMyLocationButton={false}
                        loadingEnabled={true}
                        showsUserLocation={true}
                        zoomEnabled={true}
                        provider={PROVIDER_GOOGLE}
                        zoomControlEnabled={true}
                        region={this.state.region || undefined}
                        onRegionChange={ region => this.setState({region}) }
                      >
                        <MapView.Marker
                          coordinate={ this.state.region }
                          title={"You are here"}
                          description={"Marker Description Text"}
                        />
                    </MapView>
                  }
                  </View>
                  <View style={{ }}>
                  <FlatList
                      style={stylesheet.contentList}
                      columnWrapperStyle={stylesheet.listContainer}
                      data={this.state.data}
                      keyExtractor= {(item) => {
                        return item.id;
                      }}
                      renderItem={({item}) => {
                      return (
                        <TouchableOpacity style={stylesheet.card} onPress={() => {this.clickEventListener(item)}}>
                          <Image style={stylesheet.image} source={{uri: item.image}}/>
                          <View style={stylesheet.cardContent}>
                            <Text style={stylesheet.name}>{item.name}</Text>
                            <Text style={stylesheet.count}>{item.count}</Text>
                            <TouchableOpacity style={stylesheet.followButton} onPress={()=> this.clickEventListener(item)}>
                              <Text style={stylesheet.followButtonText}>Explore now</Text>  
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      )}}/>
                      </View>
                      
                  </SafeAreaView>
        ); 
     }}

  
  
  const stylesheet = StyleSheet.create({
     stationfindercontainer : { 
         flex: 1, 
         backgroundColor: '#fff' 
      },
     mylocationbutton : {
          alignSelf: 'flex-end',
           zIndex: 2, 
           marginRight: 13, 
           top:0,
          },
      textInputSearch : {
        height: 40,
        borderRadius:8,
        backgroundColor:'#F4F4F4',
        padding:10,
        flexDirection:'row',
        flex:1
      },
      searchbarcontainer :{ 
        flexDirection: 'row', 
        marginLeft: 15, 
        marginRight: 15, 
        backgroundColor: '#FFFFFF',
        borderRadius:10 ,
        marginTop: 10,
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:10
     },
     modalFlatlistItemseperator :{ 
      marginLeft: 20, 
      marginRight: 20,        
      height: 0.5, 
      backgroundColor: '#efefef',
      borderBottomWidth:1,
      borderColor:'#efefef'
   },
   contentList:{
   height:100
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:10,
    marginBottom:10,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },
  count:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },
    });

export default Gmap;