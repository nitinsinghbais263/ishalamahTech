import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
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
import Modal from 'react-native-modal';
import {getAdjustedFontSize} from '../../Responsive/fontResponsive';
import LoaderButton from '../Common/LoaderButton';

const screenWidth = Math.round(Dimensions.get('window').width);

class Registration3 extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.data;
    this.state = {
      code: '',
      language: '',
      loading: false,
    };
  }

  state = {
    phone: '',
    otp: '',
  };

  onSubmit() {
    this.props.codeVerification(this, {
      phone: this.params.phone,
      otp: this.state.otp,
    });
  }

  // _onFulfill(code) {
  // 	// TODO: call API to check code here
  // 	// If code does not match, clear input with: this.refs.codeInputRef1.clear()
  // 	if (code == '123456') {
  // 		// Alert.alert(
  // 		// 	'Confirmation Code',
  // 		// 	'Successful!',
  // 		// 	[{text: 'OK'}],
  // 		// 	{ cancelable: false }
  //     // );
  //     this.setState({
  //       successMesssge: 'Verification Successfully',
  //       successModal: true,
  //     },()=>{setTimeout(() => {
  // 	this.setState({successModal: false })
  // }, 2000)})
  // 	} else {
  // 		// Alert.alert(
  // 		// 	'Confirmation Code',
  // 		// 	'Code not match!',
  // 		// 	[{text: 'OK'}],
  // 		// 	{ cancelable: false }
  //     // );
  // 		this.setState({
  // 			errorMesssge: 'Verification  Failed!',
  // 			errorModal: true,
  // 		},()=>{setTimeout(() => {
  // 			this.setState({errorModal: false })
  // 		}, 2000)})
  // 		this.refs.codeInputRef1.clear();
  // 	}
  // }

  // _onFinishCheckingCode1(isValid) {
  // 	console.log(isValid);
  // 	if (!isValid) {
  // 		Alert.alert(
  // 			'Confirmation Code',
  // 			'Code not match!',
  // 			[{text: 'OK'}],
  // 			{ cancelable: false }
  // 		);
  // 	} else {
  // 		Alert.alert(
  // 			'Confirmation Code',
  // 			'Successful!',
  // 			[{text: 'OK'}],
  // 			{ cancelable: false }
  // 		);
  // 	}
  // }

  _onFinishCheckingCode2(code) {
    this.setState({otp: code});
  }

  onChangeCode(code) {
    this.setState({
      code: code,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.verifyCode) {
      this.setState({loading: false});
    }
    if (nextProps.otpCodeError) {
      this.setState({loading: false});
      Alert.alert(nextProps.otpCodeError.error_message);
    }
  }

  render() {
    var {loading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#23bde4'}}>
          <View style={styles.mainView}>
            <View style={styles.countryView}>
              <Text style={styles.codeTitle}>{i18n.t('verificationCode')}</Text>
              <View style={styles.codeView}>
                <CodeInput
                  ref="codeInputRef2"
                  codeLength={6}
                  keyboardType="numeric"
                  secureTextEntry
                  activeColor="gray"
                  inactiveColor="#F8F8F8"
                  // compareWithCode='123456'
                  autoFocus={false}
                  ignoreCase={true}
                  inputPosition="center"
                  size={50}
                  onFulfill={(isValid, code) =>
                    this._onFinishCheckingCode2(isValid, code)
                  }
                  containerStyle={{marginTop: 15}}
                  codeInputStyle={styles.codeInput}
                />
              </View>
              <View style={styles.resendView}>
                <Text style={styles.firstText}>{i18n.t('didnCode')}</Text>
                <TouchableOpacity activeOpacity={0.8}>
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
                  onPress={() => this.onSubmit()}
                  activeOpacity={0.9}
                  style={styles.continueButton}>
                  <Text style={styles.buttonText}>{i18n.t('continue')}</Text>
                </TouchableOpacity> */}
              </View>
            </View>
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
        </SafeAreaView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.data,
    otpCodeError: state.registration.otpCodeError,
    verifyCode: state.registration.verifyCode,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration3);
