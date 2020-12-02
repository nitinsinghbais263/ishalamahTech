import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StatusBar,
  TextInput,
  BackHandler,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import i18n from '../../Language/i18n';
import styles from './Style.js';
import RNPickerSelect from 'react-native-picker-select';
import Header from './Header.js';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import CodeInput from 'react-native-confirmation-code-input';
import {getAdjustedFontSize} from '../../Responsive/fontResponsive.js';
import ImagePicker from 'react-native-image-crop-picker';
import {imageUrl} from '../../constants/API';
import {ImagePickerPerMissionIos} from '../../Responsive/permissions';

const screenWidth = Math.round(Dimensions.get('window').width);
class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      uuid: '',
      mcuuid: '',
      reportFileds: [],
      options: [],
      fields: [],
      value: [],
      imgSource: [],
      imgData: [],
      key: 0,
      resendCode: false,
      confirmationCode: '',
      language: 'en',
      overallStatus: [
        {
          value: {en: 'Good', ar: 'ملائم'},
        },
        {
          value: {en: 'Not good', ar: 'غير ملائم'},
        },
      ],
      selectedStatus: [],
    };
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

  componentDidMount() {
    this.getData();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  _onFinishCheckingCode2(code) {
    this.setState({otp: code});
  }

  getData = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.setState({mcuuid: this.props.mcuuid});
      this.setState({uuid: this.props.uuid});
      // this.props.getReportFields(this,{
      //     token: this.state.token,
      //     mcuuid: this.state.mcuuid,
      //   })
      this.props.getReportFields(this, {
        token: this.state.token,
        uuid: this.state.uuid,
      });
    });
  };

  handleSelectValue(val, uuid, remarks) {
    var reportFileds = this.state.reportFileds;
    for (let i in reportFileds) {
      if (reportFileds[i].mrffUuid === uuid) {
        for (let j in reportFileds[i].options) {
          if (reportFileds[i].options[j].en === val) {
            reportFileds[i].value = reportFileds[i].options[j];
          }
        }
        if (remarks) {
          reportFileds[i].remarks = remarks;
        }
        this.setState({reportFileds, key: this.state.key + 1});
      }
    }
  }

  handleSelectOverall(val) {
    var selectedStatus = this.state.selectedStatus;
    this.setState({selectedStatus: val});
  }

  localDeleteImage(path) {
    let imgData = this.state.imgData;

    imgData = imgData.filter(item => {
      return item.path !== path;
    });
    this.setState({imgData: imgData});
  }

  serverDeleteIMage = image => {
    const {token} = this.state;
    this.props.deleteServerImg(token, image.uuid);
  };

  imagePicker() {
    const _that = this;

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      maxFiles: 20,
    }).then(image => {
      image.map((item, index) => {
        _that.state.imgData.push(item);
      });

      _that.setState({
        imgData: _that.state.imgData,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reportFileds) {
      var reportFileds = [];
      var reports = nextProps.reportFileds.report_field_counts;
      reports.forEach(item => {
        reportFileds.push({
          mrffUuid: item.mrff_uuid,
          label: item.get_field.label,
          label_ar: item.get_field.label_ar,
          count: item.count,
          overallStatus: item.overall_status,
          options: JSON.parse(item.get_field.options),
          value: item.field_content && JSON.parse(item.field_content.value),
          remarks: item.field_content == null ? '' : item.field_content.remarks,
        });
      });
      this.setState({
        reportFileds: reportFileds,
        currentStatus:
          nextProps.reportFileds.report && nextProps.reportFileds.report.status,
        imgSource:
          nextProps.reportFileds.report &&
          nextProps.reportFileds.report.attachments,
      });
    }

    if (nextProps.serverError) {
      Alert.alert(nextProps.serverError.error_message);
    }
    if (nextProps.reportSubmitError) {
      Alert.alert(nextProps.reportSubmitError.error_message);
    }

    if (nextProps.deleteImage) {
      this.getData();
    }

    if (nextProps.deleteImageError) {
      Alert.alert('No image found');
    }
  }

  handlePress() {
    debugger
    if (this.state.imgData == null) {
      Alert.alert(i18n.t('sorry'), i18n.t('atleast3'));
    } else if (this.state.imgData.length < 3) {
      Alert.alert(i18n.t('sorry'), i18n.t('atleast3'));
    } else {
      this.setState({isModalVisible2: true});
      debugger
    }
    // this.setState({isModalVisible2: true})
  }

  onSubmit(action) {
    debugger
    const {
      isValid,
      resendCode,
      confirmationCode,
      otp,
      imgData,
      imgSource,
      selectedStatus,
    } = this.state;

    let formData = new FormData();
    var image = imgData;
    image.length > 0 &&
      image.forEach((item, index) => {
        let pathParts = item.path.split('/');
        let photo = {
          uri: item.path,
          type: item.mime,
          name: pathParts[pathParts.length - 1],
        };
        formData.append(`attachments[${index}]`, photo);
      });
    this.state.reportFileds.forEach((item, index) => {
      // formData.append(`fields[${index}]['mrffUuid']`,item.mrffUuid);
      // formData.append(`fields[${index}]['remarks']`,item.remarks);
      // formData.append(`fields[${index}]['value']`,item.value);
      formData.append(`fields[${index}][mrffUuid]`, item.mrffUuid);
      formData.append(`fields[${index}][remarks]`, item.remarks);
      formData.append(
        `fields[${index}][value][en]`,
        item.value ? item.value.en : null,
      );
      formData.append(
        `fields[${index}][value][ar]`,
        item.value ? item.value.ar : null,
      );
    });
    formData.append(`overallStatus[en]`, selectedStatus.en);
    formData.append(`overallStatus[ar]`, selectedStatus.ar);
    formData.append('ticketUuid', this.state.uuid);
    formData.append('action', action);
    formData.append('resendCode', resendCode);
    formData.append('confirmationCode', otp ? otp : null);

    // if(image.length < 3){
    // 	Alert.alert(i18n.t('sorry') , i18n.t('atleast3'))
    // } else {
    // 	this.setState({isModalVisible2: false, uuid: this.props.uuid})
    // 	this.props.submitReport(this,{
    //     token: this.state.token,
    //     formData: formData
    //   })
    // }

    this.setState({isModalVisible2: false, uuid: this.props.uuid});
    this.props.submitReport(this, {
      token: this.state.token,
      formData: formData,
    });

    // else{
    //   this.setState({
    //     successMesssge: 'Wrong OTP',
    //     successModal: true,
    //     otp: code
    //   },()=>{setTimeout(() => {
    //     this.setState({successModal: false })
    // }, 2000)})
    // }
  }

  render() {
    const {
      language,
      value,
      remarks,
      reportFileds,
      currentStatus,
      overallStatus,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <View style={styles.header}>
          <Header />
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}>
          {reportFileds.length == 0 ? (
            <View style={styles.topView}>
              <Text style={styles.noServiceText}>
                {i18n.t('No service report')}
              </Text>
            </View>
          ) : (
            <View style={styles.topView}>
              <View style={styles.attatchmentsView}>
                <Text style={styles.attatchments}>
                  {i18n.t('attatchments')}
                </Text>
              </View>
              <View style={{width: '100%', padding: 10}}>
                <View
                  style={{
                    width: '100%',
                    marginBottom: 10,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {this.state.imgSource &&
                    this.state.imgSource.map(image => {
                      return (
                        <View
                          style={{
                            width: 60,
                            height: 60,
                            margin: 5,
                            borderRadius: 10,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{uri: imageUrl + image.path}}
                            style={{
                              width: '100%',
                              height: '100%',
                              resizeMode: 'cover',
                            }}
                          />
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.serverDeleteIMage(image)}
                            style={{
                              height: 20,
                              width: 20,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 20 / 2,
                              borderWidth: 1,
                              borderColor: '#FFFFFF',
                              backgroundColor: '#FFFFFF',
                              position: 'absolute',
                              bottom: 5,
                              right: 5,
                              overflow: 'hidden',
                            }}>
                            <View style={{height: 20, width: 20}}>
                              <Image
                                source={require('../../assets/Images/cross.svg')}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {this.state.imgData &&
                      this.state.imgData.map(image => {
                        return (
                          <View
                            style={{
                              width: 60,
                              height: 60,
                              margin: 5,
                              borderRadius: 10,
                              overflow: 'hidden',
                            }}>
                            <Image
                              source={{uri: image.path}}
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                              }}
                            />
                            <TouchableOpacity
                              activeOpacity={0.9}
                              onPress={() => this.localDeleteImage(image.path)}
                              style={{
                                height: 20,
                                width: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 20 / 2,
                                borderWidth: 1,
                                borderColor: '#FFFFFF',
                                backgroundColor: '#FFFFFF',
                                position: 'absolute',
                                bottom: 5,
                                right: 5,
                                overflow: 'hidden',
                              }}>
                              <View style={{height: 20, width: 20}}>
                                <Image
                                  source={require('../../assets/Images/cross.svg')}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{width: 60, height: 60, marginTop: 2, marginLeft: 5}}
                    onPress={() => this.selectImage()}>
                    <View style={{width: 60, height: 60, marginTop: 2}}>
                      <Image
                        source={require('../../assets/Images/addImage.svg')}
                        style={{
                          resizeMode: 'contain',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{padding: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 14}}>{i18n.t('note')}</Text>
                </View>
                <View style={{paddingHorizontal: 5}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12}}>{i18n.t('3image')}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12}}>{i18n.t('note1')}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12}}>{i18n.t('note2')}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12}}>{i18n.t('note3')}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.autoTitle}>
                <Text style={styles.autoText}>Overall Status</Text>
                <Text style={styles.autoText}>حالة النظام الحالة</Text>
              </View>
              <View
                style={
                  language == 'ar' ? styles.pickerViewAR : styles.pickerView
                }>
                <RNPickerSelect
                  onValueChange={value => {
                    this.handleSelectOverall(value);
                  }}
                  style={styles.picker}
                  Icon={() => {
                    return (
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
                    );
                  }}
                  placeholder={{
                    label:
                      overallStatus.value !== null &&
                      overallStatus.value &&
                      overallStatus.value.length > 0
                        ? overallStatus.value.en
                        : 'Select one',
                    value:
                      overallStatus.value !== null &&
                      overallStatus.value &&
                      overallStatus.value.length > 0
                        ? overallStatus.value.en
                        : null,
                  }}
                  value={overallStatus.value && overallStatus.value.en}
                  items={
                    overallStatus &&
                    overallStatus.map((item, index) => {
                      return {
                        label: `${item.value.en} (${item.value.ar})`,
                        value: item.value,
                      };
                    })
                  }
                />
              </View>

              <FlatList
                extraData={this.state.key}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                data={this.state.reportFileds}
                renderItem={({item: rowData}) => {
                  return (
                    <View style={styles.autoView}>
                      <View style={styles.autoTitle}>
                        <Text style={styles.autoText}>{rowData.label}</Text>
                        <Text style={styles.autoText}>{rowData.label_ar}</Text>
                      </View>
                      <View
                        style={
                          language == 'ar'
                            ? styles.pickerViewAR
                            : styles.pickerView
                        }>
                        <RNPickerSelect
                          onValueChange={value => {
                            this.handleSelectValue(value, rowData.mrffUuid, '');
                          }}
                          style={styles.picker}
                          Icon={() => {
                            return (
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
                            );
                          }}
                          placeholder={{
                            label:
                              rowData.value !== null && rowData.value.length > 0
                                ? rowData.value.en
                                : 'Select one',
                            value:
                              rowData.value !== null && rowData.value.length > 0
                                ? rowData.value.en
                                : null,
                          }}
                          value={rowData.value && rowData.value.en}
                          items={rowData.options.map((item, index) => {
                            return {
                              label: `${item.en} (${item.ar})`,
                              value: item.en,
                            };
                          })}
                        />
                      </View>
                      <View style={styles.autoInputView}>
                        <TextInput
                          value={rowData.remarks}
                          onChangeText={remarks => {
                            this.handleSelectValue(
                              '',
                              rowData.mrffUuid,
                              remarks,
                            );
                          }}
                          style={[
                            styles.autoInput,
                            {textAlign: language == 'ar' ? 'right' : 'left'},
                          ]}
                          placeholderTextColor="#C1C1C1"
                          placeholder="Type here"
                        />
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            </View>
          )}
        </ScrollView>
        {reportFileds.length !== 0 && currentStatus !== 'completed' && (
          <View style={styles.bottomView}>
            {/*
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.saveButton}
                onPress={() => this.onSubmit('')}>
                <Image
                  style={styles.image}
                  source={require('../../assets/Images/rightSign.svg')}
                />
                <Text style={styles.saveText}>{i18n.t('Save')}</Text>
              </TouchableOpacity>
            */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.submitButton}
              onPress={() => this.handlePress()}>
              <Text style={styles.submitText}>{i18n.t('submit')}</Text>
            </TouchableOpacity>
          </View>
        )}
        <SafeAreaView style={{backgroundColor: '#1DBC47'}} />
        <Modal isVisible={this.state.isModalVisible2}>
          <View
            style={{
              width: '100%',
              height: 300,
              padding: 20,
              borderRadius: 25,
              overFlow: 'hidden',
              backgroundColor: '#ffffff',
            }}>
            <TouchableOpacity
              onPress={() => this.setState({isModalVisible2: false})}
              activeOpacity={0.9}
              style={styles.closeModelView}>
              <Image source={require('../../assets/Images/cancelSvg.svg')} />
            </TouchableOpacity>
            <View style={{width: '100%', height: 120}}>
              <Text
                style={{
                  color: '#C1C1C1',
                  fontSize: getAdjustedFontSize(24),
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                {i18n.t('opt')}
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <CodeInput
                  ref="codeInputRef1"
                  codeLength={6}
                  keyboardType="numeric"
                  secureTextEntry
                  activeColor="gray"
                  inactiveColor="#F8F8F8"
                  // compareWithCode='123456'
                  autoFocus={false}
                  ignoreCase={true}
                  inputPosition="center"
                  size={40}
                  onFulfill={code => this._onFinishCheckingCode2(code)}
                  // onChangeText={(otp) => { }}
                  codeInputStyle={{
                    height: 45,
                    width: 45,
                    fontSize: getAdjustedFontSize(18),
                    borderWidth: 1,
                    backgroundColor: '#F8F8F8',
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                marginTop: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#23BDE4',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: '#23BDE4',
                }}
                onPress={() => this.onSubmit('submit')}>
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
            <TouchableOpacity
              style={styles.resendOtpView}
              activeOpacity={0.9}
              onPress={() => {
                this.setState({resendCode: true}, () =>
                  this.onSubmit('submit'),
                );
              }}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    success: state.success,
    error: state.error,
    message: state.message,
    serverError: state.ticket.serverError,
    reportFileds: state.ticket.reportFileds,
    reportSubmit: state.ticket.reportSubmit,
    reportSubmitError: state.ticket.reportSubmitError,
    deleteImage: state.ticket.deleteImage,
    deleteImageError: state.ticket.deleteImageError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportForm);
