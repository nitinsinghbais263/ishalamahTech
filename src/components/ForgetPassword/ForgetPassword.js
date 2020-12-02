import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import styles from './Style';
import CountryCodes from './CountryCodes.json';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../Language/i18n';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const screenWidth = Math.round(Dimensions.get('window').width);
import {getAdjustedFontSize} from '../../Responsive/fontResponsive';
import LoaderButton from '../Common/LoaderButton';

class ForgetPassword extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      countryCodes: CountryCodes,
      countryCodesSearch: CountryCodes,
      selectedCountry: CountryCodes[189],
      dialCode: CountryCodes[189].dial_code,
      language: '',
      place: {},
      modalOpen: false,
      user: '',
      phone: '',
      email: '',
      isActive: false,
      errorModal: false,
      successModal: false,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  closeToggleModal = () => {
    this.setState({modalOpen: false});
  };

  searchCountries = search => {
    var {countryCodes, countryCodesSearch} = this.state;
    if (!search.startsWith('+')) {
      var searchData = search.trim().toLowerCase();
      countryCodesSearch = countryCodes.filter(l => {
        return l.name.toLowerCase().match(searchData);
      });
    } else {
      var searchData = search;
      countryCodesSearch = countryCodes.filter(l => {
        return l.dial_code.startsWith(searchData);
      });
    }

    this.setState({
      countryCodesSearch: countryCodesSearch,
      searchCountry: search,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      debugger;
      this.setState(
        {
          successMesssge: nextProps.success.message,
          successModal: true,
          loading: false,
        },
        () => {
          setTimeout(() => {
            this.setState({successModal: false});

            var data = {};
            data.data = nextProps.success;
            data.user = !this.state.isActive
              ? this.state.email
              : this.state.dialCode + this.state.phone;
            data.type = !this.state.isActive ? 'email' : 'phone';
            debugger;
            Actions.forgetpasswordtwo({
              data: data,
            });
          }, 1000);
        },
      );
    }
    if (nextProps.error) {
      debugger;
      this.setState(
        {
          errorMesssge: nextProps.error.message
            ? nextProps.error.message
            : nextProps.error.error_message
            ? nextProps.error.error_message
            : i18n.t('somethingWentWrong'),
          errorModal: true,
          loading: false,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
    }
  }

  onSubmit = () => {
    this.setState({loading: true});
    if (!this.state.isActive) {
      this.props.forgetPassword({
        user: this.state.email,
      });
    } else {
      this.props.forgetPassword({
        user: this.state.dialCode + this.state.phone,
      });
    }
  };

  render() {
    const {
      selectedCountry,
      countryCodes,
      language,
      modalOpen,
      countryCodesSearch,
      loading,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#23bde4'}}>
          <View style={styles.mainView}>
            <KeyboardAwareScrollView
              bounces={false}
              scrollEnabled
              style={styles.containerScroll}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between',
              }}>
              <View style={styles.mainContainer}>
                <View style={{padding: 10}}>
                  <View style={styles.headerView}>
                    <Text style={styles.headerText2}>
                      {i18n.t('resetPasswordMessage')}
                    </Text>
                  </View>
                  <View style={styles.rowContainer}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.setState({isActive: false});
                      }}
                      style={{
                        ...styles.boxStyle,
                        backgroundColor: this.state.isActive
                          ? '#FFFFFF'
                          : '#EEEEEE',
                      }}>
                      <View style={styles.imageView}>
                        <Image
                          style={styles.imageStyle}
                          source={require('../../assets/Images/email1.svg')}
                        />
                      </View>
                      <View style={styles.textView}>
                        <Text style={styles.innerText}>
                          {i18n.t('viaEmail')}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.setState({isActive: true});
                      }}
                      style={{
                        ...styles.boxStyle,
                        backgroundColor: !this.state.isActive
                          ? '#FFFFFF'
                          : '#EEEEEE',
                      }}>
                      <View style={styles.imageView}>
                        <Image
                          style={styles.imageStyle}
                          source={
                            i18n.locale === 'ar'
                              ? require('../../assets/Images/callphoneAR.svg')
                              : require('../../assets/Images/callphone.svg')
                          }
                        />
                      </View>
                      <View style={styles.textView}>
                        <Text style={styles.innerText}>
                          {i18n.t('viaPhone')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputView}>
                  {this.state.isActive ? (
                    <View>
                      <View style={styles.countryView}>
                        <Text style={styles.title}>{i18n.t('country')}</Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          this.setState({
                            modalOpen: true,
                            searchCountry: '',
                            countryCodesSearch: CountryCodes,
                          })
                        }
                        style={
                          language == 'ar'
                            ? styles.pickerViewAR
                            : styles.pickerView
                        }>
                        <Text style={styles.itemText}>
                          {selectedCountry.dial_code +
                            ' (' +
                            selectedCountry.name +
                            ')'}
                        </Text>
                        <View
                          style={
                            language == 'ar'
                              ? styles.dropdownArrowViewAR
                              : styles.dropdownArrowView
                          }>
                          <Image
                            source={require('../../assets/Images/dropdownArrow.svg')}
                            style={styles.dropdownImage}
                          />
                        </View>
                      </TouchableOpacity>
                      <View>
                        <View style={styles.countryView}>
                          <Text style={styles.title}>{i18n.t('phone')}</Text>
                        </View>
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
                            returnKeyType={'done'}
                            onSubmitEditing={() => {
                              Keyboard.dismiss();
                            }}
                            placeholder={i18n.t('enterPhone')}
                          />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={styles.countryView}>
                        <Text style={styles.title}>{i18n.t('email')}</Text>
                      </View>
                      <View style={styles.pickerView}>
                        <TextInput
                          value={this.state.email}
                          onChangeText={email => {
                            this.setState({
                              email: email,
                            });
                          }}
                          style={[
                            styles.numberInput,
                            {textAlign: language == 'ar' ? 'right' : 'left'},
                          ]}
                          placeholder={i18n.t('email')}
                        />
                      </View>
                    </View>
                  )}
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
                  //onPress={()=> Actions.registration2({selectedCountry : this.state.dialCode})}
                  onPress={() => this.onSubmit()}>
                  <Text style={styles.buttonText}>{i18n.t('continue')}</Text>
                </TouchableOpacity> */}
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
          <Modal
            coverScreen={false}
            isVisible={modalOpen}
            onBackdropPress={this.closeToggleModal}
            onBackButtonPress={this.closeToggleModal}
            backdropColor="#000000"
            style={{
              padding: 0,
              position: 'absolute',
              top: -20,
              bottom: -20,
              right: -20,
              left: -20,
            }}
            // backdropOpacity={0.9}
            // transparent={true}
          >
            <View style={styles.modalView}>
              <View
                style={{
                  ...styles.searchCountryFieldView,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  value={this.state.searchCountry}
                  autoFocus={true}
                  onChangeText={searchCountry => {
                    this.searchCountries(searchCountry);
                  }}
                  style={{
                    ...styles.searchCountryField,
                    textAlign: i18n.locale === 'ar' ? 'right' : 'left',
                  }}
                  placeholder={i18n.t('searchCountry')}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    this.setState({
                      modalOpen: false,
                    })
                  }
                  style={styles.crossView}>
                  <Image
                    source={require('../../assets/Images/cross3.svg')}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {countryCodesSearch.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      style={styles.itemView}
                      onPress={() => {
                        this.setState({
                          dialCode: item.dial_code,
                          selectedCountry: item,
                        });
                        this.closeToggleModal();
                      }}>
                      <Text style={styles.itemText}>
                        {item.dial_code + ' (' + item.name + ')'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </Modal>

          <View>
            <Modal
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
    success: state.registration.forgetData,
    error: state.registration.forgetServerError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPassword);
