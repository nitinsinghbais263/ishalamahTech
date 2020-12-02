import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import styles from './Style';
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

class ForgetPassword3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      language: '',
      conformPassword: '',
      userInfo: this.props.navigation.state.params.userData,
      loading: false,
    };
  }

  onSubmit() {
    const {password, conformPassword, userInfo} = this.state;
    if (password === conformPassword) {
      this.setState({loading: true});
      this.props.resetPassword({
        user: userInfo.phone,
        otp: userInfo.otp,
        password: password,
      });
    } else {
      this.setState(
        {
          errorMesssge: 'Password Not Matched',
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

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState(
        {
          successMesssge: nextProps.success.message,
          successModal: true,
          loading: false,
        },
        () => {
          setTimeout(() => {
            this.setState({successModal: false});
          }, 1000);
        },
      );
      setTimeout(() => {
        Actions.login();
      }, 2000);
    }
    if (nextProps.error) {
      this.setState(
        {errorMesssge: nextProps.error, errorModal: true, loading: false},
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
    }
  }

  render() {
    const {language, loading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#23bde4'}}>
          <View style={styles.mainView}>
            <View>
              <View style={{...styles.headerView, padding: 10}}>
                <Text style={styles.headerText2}>{i18n.t('setPassword')}</Text>
              </View>

              <View style={styles.countryView}>
                <Text style={styles.title}>{i18n.t('password2')}</Text>
              </View>

              <View style={styles.pickerView}>
                <TextInput
                  value={this.state.password}
                  onChangeText={password => {
                    this.setState({
                      password: password,
                    });
                  }}
                  style={[
                    styles.numberInput,
                    {textAlign: language == 'ar' ? 'right' : 'left'},
                  ]}
                  secureTextEntry={true}
                  placeholder={i18n.t('typeHere')}
                />
              </View>

              <View style={styles.countryView}>
                <Text style={styles.title}>{i18n.t('conformPassword')}</Text>
              </View>

              <View style={styles.pickerView}>
                <TextInput
                  value={this.state.confromPassword}
                  onChangeText={password => {
                    this.setState({
                      conformPassword: password,
                    });
                  }}
                  style={[
                    styles.numberInput,
                    {textAlign: language == 'ar' ? 'right' : 'left'},
                  ]}
                  secureTextEntry={true}
                  placeholder={i18n.t('typeHere')}
                />
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
                  style={styles.continueButton}
                  activeOpacity={0.9}
                  onPress={() => this.onSubmit()}>
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
  return {
    success: state.registration.resetData,
    error: state.registration.resetServerError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPassword3);
