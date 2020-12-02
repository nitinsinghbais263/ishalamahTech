import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  BackHandler,
  ScrollView,
  Alert,
  I18nManager,
  PermissionsAndroid,
} from 'react-native';
import styles from './Style';
import i18n from '../../Language/i18n';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modal';
import SpinnerButton from 'react-native-spinner-button';

import {getAdjustedFontSize} from '../../Responsive/fontResponsive';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const screenWidth = Math.round(Dimensions.get('window').width);

class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      timezone: 'Asia/Kolkata',
      currentLongitude: 'unknown',
      currentLatitude: 'unknown',
      language: 'en',
      errorModal: false,
      spinnerEnable: false,
    };
  }

  state = {
    currentLongitude: 'unknown',
    currentLatitude: 'unknown',
    spinnerEnable: false,
  };

  componentDidMount = () => {
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            alert('Permission Denied');
          }
        } catch (err) {
          // alert("err",err);
          console.warn(err);
        }
      }
      requestLocationPermission();
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };

  callLocation(that) {
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        that.setState({currentLongitude: currentLongitude});

        //Setting state Longitude to re re-render the Longitude Text
        that.setState({currentLatitude: currentLatitude});
        //Setting state Latitude to re re-render the Longitude Text
      },
      // (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    that.watchID = Geolocation.watchPosition(position => {
      //Will give you the location on location change
      console.log(position);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json
      that.setState({currentLongitude: currentLongitude});
      //Setting state Longitude to re re-render the Longitude Text
      that.setState({currentLatitude: currentLatitude});
      //Setting state Latitude to re re-render the Longitude Text
    });
  }

  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  //=== focus Next ====
  _focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
    AsyncStorage.getItem('OneSignalId').then(value => {
      this.setState({OneSignalId: value});
    });
  }

  onSubmit() {
    this.setState({spinnerEnable: true});
    this.props.login(this, {
      phone: this.state.phone,
      password: this.state.password,
      timezone: this.state.timezone,
      coordinates: {
        lat: this.state.currentLatitude,
        lng: this.state.currentLongitude,
      },
      oneSignalId: this.state.OneSignalId,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverError) {
      this.setState(
        {
          errorMesssge: nextProps.serverError.message,
          errorModal: true,
          spinnerEnable: false,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
    }
  }

  render() {
    const language = this.state.language;
    const spinnerEnable = this.state.spinnerEnable;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <KeyboardAwareScrollView
          bounces={false}
          scrollEnabled
          style={styles.containerScroll}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={
              language == 'ar' ? styles.bgImageViewAR : styles.bgImageView
            }>
            <Image
              source={require('../../assets/Images/bg.svg')}
              style={styles.bgImage}
            />
          </View>
          <View style={styles.imageView}>
            <Image
              source={require('../../assets/Images/Logo.svg')}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              value={this.state.phone}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this._focusNextField('password');
              }}
              onChangeText={phone => {
                this.setState({
                  phone: phone,
                });
              }}
              style={[
                styles.phone,
                {textAlign: language == 'ar' ? 'right' : 'left'},
              ]}
              placeholderTextColor="#ffffff"
              selectionColor={'#ffffff'}
              placeholder={i18n.t('emailorPhone')}
            />
            <TextInput
              value={this.state.password}
              onChangeText={password => {
                this.setState({
                  password: password,
                });
              }}
              style={[
                styles.password,
                {textAlign: language == 'ar' ? 'right' : 'left'},
              ]}
              ref="password"
              placeholderTextColor="#ffffff"
              selectionColor={'#ffffff'}
              returnKeyType={'done'}
              secureTextEntry={true}
              placeholder={i18n.t('password')}
            />
            <TouchableOpacity
              style={styles.forgotView}
              onPress={() => {
                Actions.forgetpassword();
              }}
              activeOpacity={0.8}>
              <Text style={styles.forgotText}>{i18n.t('forgotPassword')}</Text>
            </TouchableOpacity>
            <View style={styles.loginButtonBG}>
              {!spinnerEnable ? (
                <TouchableOpacity
                  onPress={() => this.onSubmit()}
                  activeOpacity={0.8}
                  style={styles.loginButton}>
                  <Text style={styles.loginText}> {i18n.t('Login')} </Text>
                </TouchableOpacity>
              ) : (
                <View style={{width: '100%', height: 50}}>
                  <SpinnerButton
                    buttonStyle={{
                      width: '100%',
                      height: 50,
                      backgroundColor: '#00b5ec',
                      borderRadius: 10,
                    }}
                    isLoading={spinnerEnable}
                    indicatorCount={10}
                    size={8}
                    spinnerType="DotIndicator"
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.bottomView}>
            <View style={styles.registerView}>
              <Text style={styles.accountTitle}>{i18n.t('DonYet')}</Text>
              <TouchableOpacity
                style={styles.registerText}
                activeOpacity={0.9}
                onPress={() => Actions.registration()}>
                <Text style={styles.register}>{i18n.t('register')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View>
          <Modal
            animationInTiming={1000}
            animationOutTiming={1000}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropOpacity={0.5}
            onBackdropPress={() => {
              this.setState({errorModal: false});
            }}
            isVisible={this.state.errorModal}>
            <View
              style={{
                width: screenWidth - 20,
                alignSelf: 'center',
                padding: 10,
                paddingVertical: 20,
                borderRadius: 25,
                overFlow: 'hidden',
                backgroundColor: '#F15E5E',
              }}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  position: 'absolute',
                  top: -60,
                  alignSelf: 'center',
                }}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={require('../../assets/Images/cancel.svg')}
                />
              </View>
              <View style={{marginTop: 70}}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: getAdjustedFontSize(32),
                    alignSelf: 'center',
                  }}>
                  {i18n.t('error')}
                </Text>
              </View>

              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  width: screenWidth - 100,
                }}>
                {this.state.errorMesssge && (
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: getAdjustedFontSize(14),
                      fontWeight: '600',
                      alignSelf: 'center',
                      textAlign: 'center',
                    }}>
                    {this.state.errorMesssge}
                  </Text>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.logIn.currentUser,
    serverError: state.logIn.serverError,
    data: state.logIn.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
