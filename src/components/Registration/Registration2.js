import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import styles from './Style';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CountryCodes from './CountryCodes.json';
import mobile from './mobile.json';
import i18n from '../../Language/i18n';
import Modal from 'react-native-modal';
import {getAdjustedFontSize} from '../../Responsive/fontResponsive';
import LoaderButton from '../Common/LoaderButton';
const screenWidth = Math.round(Dimensions.get('window').width);

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Registration2 extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.selectedCountry;
    this.state = {
      phone: '',
      language: '',
      country: '',
      errorModal: false,
      loading: false,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
    AsyncStorage.getItem('OneSignalId').then(value => {
      this.setState({OneSignalId: value});
    });
  }

  onSubmit(data) {
    var countries = CountryCodes;
    var currentNumber = {};
    const {OneSignalId} = this.state;
    countries.forEach(item => {
      if (item.dial_code === data) {
        currentNumber = item.code;
      }
    });
    var allMobileNum = mobile;
    this.setState({country: data});
    if (this.state.phone.length !== allMobileNum[currentNumber].length) {
      this.setState(
        {
          errorMesssge: 'Invalid number',
          errorModal: true,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2500);
        },
      );
    } else {
      this.setState({loading: true});
      this.props.registration(this, {
        phone: data + this.state.phone,
        oneSignalId: this.state.oneSignalId,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({loading: false});
    }
    if (nextProps.serverError) {
      this.setState(
        {
          errorMesssge: nextProps.serverError[0],
          errorModal: true,
          loading: false,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2500);
        },
      );
    }
  }

  render() {
    const {language, loading} = this.state;
    var selectedCountry = this.params;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#23bde4'}}>
        <DismissKeyboard>
          <View style={styles.container}>
            <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
            <View style={styles.mainView}>
              <View style={styles.countryView}>
                {language == 'ar' ? (
                  <Text style={styles.title}>{i18n.t('phone')}</Text>
                ) : (
                  <Text style={styles.title}>{i18n.t('phone')}</Text>
                )}
                <View style={styles.pickerView}>
                  <TextInput
                    value={this.state.phone}
                    onChangeText={phone => {
                      this.setState({
                        phone: phone,
                      });
                    }}
                    style={[
                      styles.numberInput,
                      {textAlign: language == 'ar' ? 'right' : 'left'},
                    ]}
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholder={i18n.t('enterPhone')}
                  />
                </View>
              </View>
              <View style={styles.buttonView}>
                <View style={styles.continueButtonBG}>
                  <LoaderButton
                    style={styles.continueButtonBG}
                    onPress={() => this.onSubmit(selectedCountry)}
                    text={i18n.t('continue')}
                    isLoading={loading}
                  />
                  {/*<TouchableOpacity
                  onPress={() => this.onSubmit(selectedCountry)}
                  activeOpacity={0.9}
                  style={styles.continueButton}>
                  <Text style={styles.buttonText}>{i18n.t('continue')}</Text>
                </TouchableOpacity>*/}
                </View>
              </View>
            </View>
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
        </DismissKeyboard>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    serverError: state.registration.serverError,
    data: state.registration.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration2);
