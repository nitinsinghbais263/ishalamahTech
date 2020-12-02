import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from 'react-native';
import i18n from '../../Language/i18n';
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {Actions} from 'react-native-router-flux';
import {getAdjustedFontSize} from '../../Responsive/fontResponsive.js';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import countryCodes from './CountryCodes';
import {valueString} from '../../helpers/core';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const screenWidth = Math.round(Dimensions.get('window').width);
import {ImagePickerPerMissionIos} from '../../Responsive/permissions';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    token: '',
    edit: false,
    data: '',
    countries: [],
    countryId: '',
    states: [],
    stateId: '',
    cities: [],
    avatarSource: null,
    profile_pic: null,
    isModalVisible: false,
  };

  componentDidMount() {
    this.getData();
    this.getCountry();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  selectImage = () => {
    const that = this;
    if (Platform.OS === 'ios') {
      const grant = ImagePickerPerMissionIos();
      grant && that.imagePicker();
    } else {
      that.imagePicker();
    }
  };

  handleBackPress = () => {
    Actions.home();
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  getData = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getUserDetails(this, {
        token: this.state.token,
      });
    });
  };

  getCountry = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getCountry(this, {
        token: this.state.token,
      });
    });
  };

  getStates = value => {
    if (value !== null) {
      this.setState({country_name: value});
      AsyncStorage.getItem('TOKEN').then(token => {
        this.setState({token: token});
        this.props.getState(this, {
          token: this.state.token,
          countryId: this.state.country_name,
        });
      });
    }
  };

  getCity = value => {
    this.setState({state_name: value});
    AsyncStorage.getItem('TOKEN').then(token => {
      this.setState({token: token});
      this.props.getCity(this, {
        token: this.state.token,
        stateId: this.state.state_name,
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile_pic) {
      this.getData();
    }
    if (nextProps.data) {
      this.setState({
        data: nextProps.data,
        phone: '+' + nextProps.data.phone,
        zip_code: '' + nextProps.data.zip_code,
      });
    }
    if (nextProps.update_data) {
      this.setState(
        {
          successMesssge: nextProps.update_data.message,
          successModal: true,
          isModalVisible: false,
          edit: false,
        },
        () => {
          setTimeout(() => {
            this.setState({successModal: false});
            Actions.home();
          }, 2000);
        },
      );
      this.getData();
    }
    if (nextProps.updateError) {
      this.setState(
        {
          errorMesssge: nextProps.updateError.message,
          errorModal: true,
          edit: false,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
    }
    if (nextProps.countries) {
      this.setState({countries: nextProps.countries});
    }
    if (nextProps.states) {
      this.setState({states: nextProps.states});
    }
    if (nextProps.cities) {
      this.setState({cities: nextProps.cities});
    }
  }

  toggleModal = rowData => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  onSubmit() {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value, isModalVisible: false});
      this.props.updateUserDetails(this, {
        token: this.state.token,
        fullname: this.state.fullname,
        address1: this.state.address1,
        address2: this.state.address2,
        country_name: this.state.country_name,
        state_name: this.state.state_name,
        city_name: this.state.city_name,
        zip_code: this.state.zip_code,
        email: this.state.email,
        phone: this.state.phone,
        image: this.state.profile_pic,
        currentPassword: this.state.password,
      });
    });
  }

  addImage = (image, uuid) => {
    let formData = new FormData();
    let pathParts = image.path.split('/');
    let photo = {
      uri: image.path,
      type: image.mime,
      name: pathParts[pathParts.length - 1],
    };
    formData.append('profileImage', photo);
    formData.append('_method', 'PATCH');

    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.uploadProfile(this, {
        token: this.state.token,
        formData: formData,
      });
    });
  };

  imagePicker = uuid => {
    const _that = this;

    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      maxFiles: 20,
      waitAnimationEnd: false,
      includeExif: true,
      // cropping: true,
      multiple: false,
    })
      .then(image => {
        this.addImage(image, uuid);
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    let {
      full_name,
      address_1,
      address_2,
      country,
      state,
      city,
      zip_code,
      email,
      phone,
    } = (this.props && this.props.data) || {};
    const {edit, successModal} = this.state;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{backgroundColor: '#2383C3'}}>
          <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
          <View
            style={{
              width: '100%',
              height: 60,
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
              backgroundColor: '#23BDE4',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginTop: 10}}
              onPress={() => Actions.home()}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  transform: [
                    {rotate: i18n.locale === 'ar' ? '180deg' : '0deg'},
                  ],
                }}
                source={require('../../assets/Images/back.svg')}
              />
            </TouchableOpacity>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{fontSize: getAdjustedFontSize(18), color: '#ffffff'}}>
                {i18n.t('userProfile')}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              {edit ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.setState({edit: false})}>
                  <View style={{height: 20, width: 20, marginTop: 10}}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../../assets/Images/cross2.svg')}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.setState({edit: true})}>
                  <View style={{height: 25, width: 25, marginTop: 10}}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        transform: [
                          {rotate: i18n.locale === 'ar' ? '270deg' : '0deg'},
                        ],
                      }}
                      source={require('../../assets/Images/Edit.svg')}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
        <KeyboardAwareScrollView
          bounces={false}
          scrollEnabled
          style={{paddingBottom: 50}}
          contentContainerStyle={{
            flexGrow: 1,
            marginBottom: 50,
            paddingBottom: 60,
          }}>
          <View
            style={{
              width: '100%',
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 120,
                width: 120,
                borderRadius: 172 / 2,
                borderWidth: 5,
                borderColor: '#ffffff',
                overflow: 'hidden',
              }}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={
                  this.props.data && this.props.data.profile_image
                    ? {
                        uri:
                          'https://core.isalamah.com/public/' +
                          this.props.data.profile_image,
                      }
                    : require('../../assets/Images/user.svg')
                }
              />
            </View>
            {this.state.edit && (
              <View
                style={{
                  height: 30,
                  width: 30,
                  position: 'absolute',
                  bottom: 15,
                  right: 140,
                }}>
                <TouchableOpacity
                  style={{height: 30, width: 30}}
                  onPress={() => this.selectImage()}
                  activeOpacity={0.8}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                    source={require('../../assets/Images/EditProfile.svg')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('fullName')}:
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
              textAlign: i18n.locale === 'ar' ? 'right' : 'left',
            }}
            placeholder={i18n.t('typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={valueString(this.state.fullname, full_name)}
            onChangeText={fullname => this.setState({fullname: fullname})}
          />

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('address1')}:
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
              textAlign: i18n.locale === 'ar' ? 'right' : 'left',
            }}
            placeholder={i18n.t('typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={valueString(this.state.address1, address_1)}
            onChangeText={address1 => this.setState({address1: address1})}
          />

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('address2')}:
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
              textAlign: i18n.locale === 'ar' ? 'right' : 'left',
            }}
            placeholder={i18n.t('typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={valueString(this.state.address2, address_2)}
            onChangeText={address2 => this.setState({address2: address2})}
          />

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('country')}:
          </Text>
          <View
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              justifyContent: 'center',
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
            }}>
            <RNPickerSelect
              onValueChange={value => this.getStates(value)}
              editable={this.state.edit}
              Icon={() => {
                return (
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      width: 10,
                      height: 10,
                      top: Platform.OS !== 'ios' ? 22 : 2,
                    }}>
                    <Image
                      source={require('../../assets/Images/Dropdown.svg')}
                      style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </View>
                );
              }}
              placeholder={this.state.place}
              value={valueString(
                this.state.country_name,
                country ? country.name : '',
              )}
              items={this.state.countries.map((item, index) => {
                return {label: item ? item.name : '', value: item.id};
              })}
            />
          </View>

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('state')}:
          </Text>
          <View
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              justifyContent: 'center',
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
            }}>
            <RNPickerSelect
              onValueChange={value => this.getCity(value)}
              editable={this.state.edit}
              Icon={() => {
                return (
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      width: 10,
                      height: 10,
                      top: Platform.OS !== 'ios' ? 22 : 2,
                    }}>
                    <Image
                      source={require('../../assets/Images/Dropdown.svg')}
                      style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </View>
                );
              }}
              placeholder={this.state.place}
              value={valueString(
                this.state.state_name,
                state ? state.name : '',
              )}
              items={this.state.states.map((item, index) => {
                return {label: item ? item.name : '', value: item.id};
              })}
            />
          </View>

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('city')}:
          </Text>
          <View
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              justifyContent: 'center',
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
            }}>
            <RNPickerSelect
              onValueChange={value => this.setState({city_name: value})}
              editable={this.state.edit}
              Icon={() => {
                return (
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      width: 10,
                      height: 10,
                      top: Platform.OS !== 'ios' ? 22 : 2,
                    }}>
                    <Image
                      source={require('../../assets/Images/Dropdown.svg')}
                      style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </View>
                );
              }}
              placeholder={this.state.place}
              value={valueString(
                this.state.city_name,
                city ? city.name : '',
              )}
              items={this.state.cities.map((item, index) => {
                return {label: item ? item.name : '', value: item.id};
              })}
            />
          </View>

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('zipCode')}:
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
              textAlign: i18n.locale === 'ar' ? 'right' : 'left',
            }}
            placeholder={i18n.t('typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={valueString(
              this.state.zip_code,
              `${zip_code ? zip_code : ''}`,
            )}
            onChangeText={zip_code => this.setState({zip_code: zip_code})}
          />

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('email')}:
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
              textAlign: i18n.locale === 'ar' ? 'right' : 'left',
            }}
            placeholder={i18n.t('typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={valueString(this.state.email, email)}
            onChangeText={email => this.setState({email: email})}
          />

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('phone')}:
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
              textAlign: i18n.locale === 'ar' ? 'right' : 'left',
            }}
            placeholder={i18n.t('typeHere')}
            editable={this.state.edit}
            underlineColorAndroid="transparent"
            value={valueString(this.state.phone)}
            onChangeText={phone => this.setState({phone: phone})}
          />
        </KeyboardAwareScrollView>
        {this.state.edit && (
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              position: 'absolute',
              bottom: 0,
              backgroundColor: '#23BDE4',
            }}
            onPress={() => this.toggleModal()}
            activeOpacity={0.8}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: getAdjustedFontSize(18),
                alignSelf: 'center',
                padding: 10,
              }}>
              {i18n.t('save')}
            </Text>
          </TouchableOpacity>
        )}

        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              width: '100%',
              height: 380,
              padding: 20,
              borderRadius: 25,
              overFlow: 'hidden',
              backgroundColor: '#ffffff',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                position: 'absolute',
                top: -10,
                right: -10,
              }}>
              <TouchableOpacity
                style={{width: 30, height: 30}}
                onPress={this.toggleModal}
                activeOpacity={0.8}>
                <View style={{height: 30, width: 30}}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/Images/Close.svg')}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{width: '100%', paddingBottom: 10, alignItems: 'center'}}>
              <Text
                style={{
                  color: '#76848B',
                  fontSize: getAdjustedFontSize(14),
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                {i18n.t('enterPassword')}
              </Text>
            </View>

            <View
              style={{backgroundColor: '#C4C4C4', width: '100%', height: 1}}
            />

            <View style={{alignItems: 'center', paddingBottom: 50}}>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'flex-start',
                  marginTop: 25,
                  marginLeft: 10,
                }}>
                {i18n.t('password1')}
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#F8F8F8',
                  width: '100%',
                  height: 45,
                  paddingLeft: 10,
                  marginTop: 15,
                  fontSize: getAdjustedFontSize(16),
                  borderBottomColor: '#F8F8F8',
                  textAlign: i18n.locale === 'ar' ? 'right' : 'left',
                }}
                placeholder={i18n.t('typeHere')}
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                // value={this.state.fullname}
                onChangeText={password => this.setState({password: password})}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#23BDE4',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: '#23BDE4',
                }}
                onPress={() => this.onSubmit()}>
                <Text
                  style={{
                    fontSize: getAdjustedFontSize(20),
                    color: '#ffffff',
                    alignSelf: 'center',
                  }}>
                  {i18n.t('submit')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            onBackdropPress={() => {
              this.setState({successModal: false});
            }}
            isVisible={successModal}>
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
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
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
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.user.user,
    update_data: state.user.update_data,
    countries: state.user.countries,
    states: state.user.states,
    cities: state.user.cities,
    profile_pic: state.user.profile_pic,
    updateError: state.user.updateError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
