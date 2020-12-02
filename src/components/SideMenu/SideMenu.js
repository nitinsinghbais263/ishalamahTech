import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  Alert,
  Dimensions,
  BackHandler
} from 'react-native';
import RNRestart from 'react-native-restart';
import { Actions } from 'react-native-router-flux';
import i18n from '../../Language/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state ={
      modalVisible: false,
      user: false
    }
  };

  componentWillMount(){
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getUserDetails(this,{
          token: this.state.token,
        })
    })
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    if(this.props.navigation.state.isDrawerOpen){
      Actions.drawerClose()
    }else{
      BackHandler.exitApp();
    }
    return true;
  }

  handleLogout = async () => {
    this.setState({modalVisible:true});
    Actions.drawerClose();
  }

  logout=async()=>{
    AsyncStorage.removeItem('TOKEN', (err) => {
      this.setState({ visibleModal: null })
      // Actions.login({text: 'goBack'})
      // Actions.reset('login')
      RNRestart.Restart();
    });
    // Actions.login({text: 'goBack'})
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


  render() {
    const {user,imageUrl,language} = this.state;
    return (
      <View style={styles.container}>
        {
          this.props.navigation.state.isDrawerOpen &&
            <TouchableOpacity
              style={styles.drawerOuterView}
              activeOpacity={0.9}
              onPress={()=> {Actions.drawerClose()}}
            ></TouchableOpacity>
        }
        <View style={styles.topView}>
          <View style={styles.imageView}>
            <View style={styles.profileView}>
              <TouchableOpacity
                style={styles.profileImageView}
                activeOpacity={0.9}
                onPress={() => Actions.user()}
              >
                <Image
                  source={imageUrl ? {uri: 'https://core.isalamah.com/public/'+imageUrl } : require('../../assets/Images/user.svg')}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.nameView}>
            <View style={styles.nameSecondView}>
              <Text
                style={ language == "ar" ? styles.welcomeTextAR : styles.welcomeText}
              >
                Badge # {user && user.uuid.substr(user.uuid.length - 5)}
              </Text>
              <View style={styles.fullNameView}>
                <Text style={styles.firstNameText}>
                  { user && user.full_name }
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.homeView}>
            <TouchableOpacity
              style={styles.sectionView}
              activeOpacity={0.9}
              onPress={() => {
                Actions.drawerClose();
                Actions.home({initial: "true"});
              }}
              activeOpacity={0.7}
            >
              <Image
                style={styles.image}
                source={require('../../assets/Images/homeIcon.svg')}
              />
              <Text style={styles.homeText}>
                {i18n.t('Dashboard')}
              </Text>
            </TouchableOpacity>
          </View>
          {/*
            <View style={styles.homeView}>
              <TouchableOpacity
                style={styles.sectionView}
                activeOpacity={0.9}
                onPress={()=>Actions.cashbook()}
              >
                <Image
                  style={styles.image}
                  source={i18n.locale==='ar'? require('../../assets/Images/cashbookAR.svg') : require('../../assets/Images/cashbook.svg')}
                />
                <Text style={styles.homeText}>
                  {i18n.t('CashBook')}
                </Text>
              </TouchableOpacity>
            </View>
          */}
          <View style={styles.homeView}>
            <TouchableOpacity
              style={styles.sectionView}

              onPress={()=>Actions.settings({uuid: this.state.uuid, selectedValue: this.state.selectedValue })}
              activeOpacity={0.9}
            >
              <Image
                style={styles.image}
                source={require('../../assets/Images/settingIcon.svg')}
              />
              <Text style={styles.homeText}>
                {i18n.t('Settings')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.homeView}>
            <TouchableOpacity
              style={styles.sectionView}
              activeOpacity={0.9}
              onPress={()=>Actions.about()}
            >
              <Image
                style={styles.image}
                source={require('../../assets/Images/aboutAppIcon.svg')}
              />
              <Text style={styles.homeText}>
                {i18n.t('AboutApp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logoutView}>
          <View style={styles.homeView}>
            <TouchableOpacity
              style={styles.sectionView}
              activeOpacity={0.8}
              onPress={()=>this.handleLogout()}
            >
              <Image
                style={styles.image}
                source={require('../../assets/Images/logoutIcon.svg')}
              />
              <Text style={styles.homeText}>
                {i18n.t('LogOut')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Modal
            animationIn={"fadeIn"}
            animationOut={'fadeOut'}
            isVisible={this.state.modalVisible}
          >
            <View style={styles.popUp}>
              <View style={styles.messageView}>
                <Text style={styles.logoutMessage}>
                  {i18n.t('logoutMessage')}
                </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.yesButton}
                  activeOpacity={0.8}
                  onPress={()=>{this.setState({modalVisible:false});this.logout()}}
                >
                  <Text style={styles.textStyle}>
                    {i18n.t('yes')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.noButton}
                  activeOpacity={0.8}
                  onPress={()=>{this.setState({modalVisible: false})}}
                >
                  <Text style={styles.textStyle}>
                    {i18n.t('no')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
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


export default connect(mapStateToProps,mapDispatchToProps)(SideMenu);
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#23BDE4',
  },
  drawerOuterView:{
    position: 'absolute',
    backgroundColor: 'transparent',
    height: '100%',
    width: 150,
    right: Platform.OS === 'ios' ? -120 : -140
  },
  topView:{
    flex: 2,
    justifyContent: 'center'
  },
  bottomView:{
    flex: 2,
    paddingTop: 15
  },
  logoutView:{
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  imageView:{
    marginTop: 30,
  },
  image:{
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  profileImageView:{
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    overflow: 'hidden',
    marginLeft: 25
  },
  profileImage:{
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    // borderRadius: 150/2,
    alignSelf: 'center',
  },
  nameView:{
  },
  nameSecondView:{
    marginLeft: 25,
    marginTop: 20
  },
  welcomeText:{
    fontSize: getAdjustedFontSize(18),
    color: '#ffffff'
  },
  welcomeTextAR:{
    fontSize: getAdjustedFontSize(18),
    color: '#ffffff',
    alignSelf: 'flex-start'
  },
  fullNameView:{
    flexDirection: 'row'
  },
  firstNameText:{
    fontSize: getAdjustedFontSize(24),
    color: '#ffffff'
  },
  lastNameText:{
    fontSize: getAdjustedFontSize(24),
    marginLeft: 10,
    color: '#ffffff'
  },
  homeView:{
    marginTop: 20,
    marginLeft: 25,
    marginRight: 10,
    marginBottom: 10
  },
  sectionView:{
    flexDirection: 'row'
  },
  homeText:{
    fontSize: getAdjustedFontSize(18),
    color: '#ffffff',
    marginLeft: 20,
    alignSelf: 'center'
  },
  popUp:{
    alignSelf: 'center',
    width: screenWidth-20,
    height: screenWidth/1.5,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelView:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
    alignSelf: 'flex-end',
    height: 20,
    width: 20,
  },
  messageView:{
    width: screenWidth/1.2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  logoutMessage:{
    fontSize: getAdjustedFontSize(24),
    marginTop: 10,
    color: '#707070',
    textAlign: 'center'
  },
  buttonView:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  yesButton:{
    height: 50,
    width: 150,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23BDE4'
  },
  noButton:{
    height: 50,
    width: 150,
    marginLeft: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DF2B2B'
  },
  textStyle:{
    fontSize: getAdjustedFontSize(20),
    color: '#ffffff'
  },
});
