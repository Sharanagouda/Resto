import React,{Component} from "react";
import {View,Text, StyleSheet} from "react-native";
import {connect} from "react-redux";
import Routes from "./config/Route";

class Main extends Component{
    

    render(){
        return(
            <View style={style.container}>
                <Routes/>
            </View>
        )
    }
}

const style = StyleSheet.create({
container:{
    flex:1
}
})
const mapStateToProps = state =>({

});

export default connect(mapStateToProps)(Main);