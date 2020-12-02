import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../Language/i18n';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class upcomingButton extends Component {
	constructor(props){
    super(props)
    this.state={
      user: props.userData&& props.userData,
      imageUrl: props.userData && props.userData.profile_image
    }
	}


  componentDidMount(){
      AsyncStorage.getItem("TOKEN").then(response => {
      this.props.getUserData(response)
    })
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    Actions.pop();
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.userData) {
      this.setState({
        data: nextProps.userData,
        user: nextProps.userData,
        imageUrl: nextProps.userData.profile_image,
      })
    }
  }

	render(){
    const {user,imageUrl} = this.state;
		return(
        <View style={styles.container}>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={()=> { Actions.drawerOpen(); }}
              style={{flexDirection: 'row'}}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/Images/menuDrawer.svg')}
                style={{width: 45,height:25}}
                resizeMode = 'contain'
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
    				<View style={styles.nameTextView}>
              <Text style={styles.badgeText}>
                Badge # {user && user.uuid.substr(user.uuid.length - 5)}
              </Text>
              <Text style={styles.profileName}>
                { user && user.full_name }
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>Actions.user()}
              style={styles.imageView}>
              <Image
                source={imageUrl ? {uri: 'https://core.isalamah.com/public/'+imageUrl } : require('../../assets/Images/user.svg')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
		)
	}
}

function mapStateToProps(state){
  return {
    userData: state.user.user,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(upcomingButton);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 10,
    justifyContent: 'space-between'
  },
  nameTextView:{
    justifyContent: 'center'
  },
  imageView:{
    height: 42,
    width: 42,
    borderRadius: 21,
    overflow: 'hidden',
    marginLeft: 10,
    borderWidth: 2.5,
    borderColor: '#ffffff'
  },
  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  badgeText:{
    color: '#ffffff',
    alignSelf: 'flex-end',
    fontSize: getAdjustedFontSize(12)
  },
  profileName:{
    color: '#ffffff',
    alignSelf: 'flex-end',
    fontSize: getAdjustedFontSize(18)
  }
})
