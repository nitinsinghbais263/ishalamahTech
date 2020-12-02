import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import styles from './Style';
import CodeInput from 'react-native-confirmation-code-input';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import i18n from '../../Language/i18n';
const screenWidth = Math.round(Dimensions.get('window').width);
import {getAdjustedFontSize} from '../../Responsive/fontResponsive';
import Modal from 'react-native-modal';
import LoaderButton from '../Common/LoaderButton';

class ForgetPassword2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      userInfo: props.navigation.state.params.data.data,
      language: '',
      otp: '',
      loading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.resendOtpCodeError != this.props.resendOtpCodeError) {
      debugger;
      if (this.props.resendOtpCodeError) {
        this.setState({submit: false});
        Alert.alert(this.props.resendOtpCodeError.message);
      }
    }

    if (prevProps.resendCode != this.props.resendCode) {
      debugger;
      if (this.props.resendCode) {
        this.setState({submit: false});
        Alert.alert(this.props.resendCode.message);
      }
    }

    if (prevProps.verifyOtpData != this.props.verifyOtpData) {
      if (this.props.verifyOtpData) {
        const {userInfo, otp} = this.state;
        this.setState({submit: false, loading: false});
        debugger;
        Actions.forgetpassword3({userData: {phone: userInfo.phone, otp: otp}});
      }
    }

    if (this.props.verifyOtpError != prevProps.verifyOtpError) {
      if (this.props.verifyOtpError) {
        this.setState({submit: false, loading: false});
        if (this.props.verifyOtpError.errors) {
          Alert.alert(this.props.verifyOtpError.errors[0]);
        } else if (this.props.verifyOtpError.message) {
          Alert.alert(this.props.verifyOtpError.message);
        } else {
          Alert.alert(i18n.t('somethingWentWrong'));
        }
      }
      debugger;
    }
  }

  onSubmit() {
    const {userInfo, otp, isValid} = this.state;
    if (isValid) {
      const user = this.props.navigation.state.params.data.user;

      this.setState({loading: true});
      this.props.verifyOtp({
        otp: otp,
        user: user,
      });
      //Actions.forgetpassword3({userData: {phone: userInfo.phone, otp: otp}});
    } else {
      this.setState(
        {
          errorMesssge: 'Code not match!',
          errorModal: true,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
    }
  }

  _onFulfill(code) {
    if (code && code.length == 6) {
      this.setState({otp: code, isValid: true});
    } else {
      this.setState(
        {
          errorMesssge: 'Code not match!',
          errorModal: true,
          isValid: false,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
    }

    // if (isValid) {
    //   this.setState(
    //     {
    //       successMesssge: 'Verification Successfully',
    //       successModal: true,
    //     },
    //     () => {
    //       setTimeout(() => {
    //         this.setState({successModal: false});
    //       }, 2000);
    //     },
    //   );
    // } else {
    //   this.setState(
    //     {
    //       errorMesssge: 'Verification  Failed!',
    //       errorModal: true,
    //     },
    //     () => {
    //       setTimeout(() => {
    //         this.setState({errorModal: false});
    //       }, 2000);
    //     },
    //   );
    // }
  }

  onChangeCode(code) {
    this.setState({
      code: code,
    });
  }

  resendOTP = () => {
    this.props.resendOtp({
      otp_to: this.props.navigation.state.params.data.user,
      otp_type: this.props.navigation.state.params.data.type,
    });
  };

  render() {
    var {loading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#23bde4'}}>
          <View style={styles.mainView}>
            <View>
              <View>
                <Text style={styles.codeTitle}>
                  {i18n.t('verificationCode')}
                </Text>
              </View>
              <View style={styles.codeView}>
                <CodeInput
                  ref="codeInputRef2"
                  codeLength={6}
                  keyboardType="numeric"
                  secureTextEntry
                  activeColor="gray"
                  inactiveColor="#F8F8F8"
                  autoFocus={false}
                  ignoreCase={true}
                  inputPosition="center"
                  size={50}
                  onFulfill={code => this._onFulfill(code)}
                  containerStyle={{marginTop: 15}}
                  codeInputStyle={styles.codeInput}
                />
              </View>
              <View style={styles.resendView}>
                <Text style={styles.firstText}>{i18n.t('didnCode')}</Text>
                <TouchableOpacity activeOpacity={0.9} onPress={this.resendOTP}>
                  <Text style={styles.resendText}>{i18n.t('resend')}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonView}>
              <View style={styles.continueButtonBG}>
                <LoaderButton
                  style={styles.continueButton}
                  onPress={() => this.onSubmit()}
                  text={i18n.t('continue')}
                  isLoading={loading}
                />

                {/* <TouchableOpacity
                activeOpacity={0.9}
                //onPress={() => this.onSubmit()}
                onPress={() => this.onSubmit()}
                style={styles.continueButton}>
                <Text style={styles.buttonText}>{i18n.t('continue')}</Text>
              </TouchableOpacity> */}
              </View>

              <View>
                <Modal
                  animationInTiming={1000}
                  animationOutTiming={1000}
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  onBackdropPress={() => {
                    this.setState({successModal: false});
                  }}
                  isVisible={this.state.successModal}>
                  <View
                    style={{
                      width: screenWidth - 20,
                      alignSelf: 'center',
                      padding: 10,
                      paddingVertical: 20,
                      borderRadius: 25,
                      overFlow: 'hidden',
                      backgroundColor: '#23BDE4',
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
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                        source={
                          i18n.locale === 'ar'
                            ? require('../../assets/Images/successAR.svg')
                            : require('../../assets/Images/successImage.svg')
                        }
                      />
                    </View>
                    <View style={{marginTop: 70}}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: getAdjustedFontSize(32),
                          alignSelf: 'center',
                        }}>
                        {i18n.t('success')}
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
                      {this.state.successMesssge && (
                        <Text
                          style={{
                            color: '#ffffff',
                            fontSize: getAdjustedFontSize(14),
                            fontWeight: '600',
                            alignSelf: 'center',
                            textAlign: 'center',
                          }}>
                          {this.state.successMesssge}
                        </Text>
                      )}
                    </View>
                  </View>
                </Modal>
                {/* error modal  */}

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
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
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
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log(375375, state.registration);
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.data,
    resendOtpCodeError: state.registration.resendOtpCodeError,
    resendCode: state.registration.resendCode,
    verifyOtpError: state.registration.verifyOtpError,
    verifyOtpData: state.registration.verifyOtpData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPassword2);
