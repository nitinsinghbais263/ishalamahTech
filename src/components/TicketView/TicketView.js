import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  Alert,
  Dimensions,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
  I18nManager,
  StyleSheet,
  BackHandler,
  SafeAreaView,
  Platform,
} from 'react-native';
import styles from './Style';
import i18n from '../../Language/i18n';
import {getAdjustedFontSize} from '../../Responsive/fontResponsive.js';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modal';
import CodeInput from 'react-native-confirmation-code-input';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ProfileDetailsHeader from '../ProfileDetails/ProfileDetails.js';

const screenWidth = Math.round(Dimensions.get('window').width);
class TicketView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingTickets: {},
      uuid: '',
      client_uuid: '',
      serviceId: '',
      clientId: '',
      mc_uuid: '',
      language: 'en',
      notes: [],
    };
  }

  componentDidMount() {
    if (this.props.waitingTickets) {
      var cuuidId = this.props.waitingTickets.client_uuid;
      var mcuuidId = this.props.waitingTickets.mc_uuid;
      clientUuid = cuuidId.substr(cuuidId.length - 5);
      mcUuid = mcuuidId.substr(mcuuidId.length - 5);
      this.setState({client_uuid: clientUuid, mc_uuid: mcUuid});
    }
    this.getData();

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
    });
  }

  getData = () => {
    const {ticketDetails} = this.props;
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      // this.setState({ tUuid: this.props.navigation.state.params.rowData.uuid })
      this.props.getTicketDetail(this, {
        token: this.state.token,
        ticketUuid: ticketDetails.uuid,
      });
    });
  };

  componentWillMount() {
    const {ticketDetails} = this.props;
    this.setState({waitingTickets: ticketDetails});
  }

  //===call press===
  dialCall = () => {
    const {techName} = this.state;
    if (techName) {
      const number = '+' + techName;
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = 'tel:${' + number + '}';
      } else {
        phoneNumber = 'telprompt:' + phoneNumber;
      }
      Linking.openURL(phoneNumber);
    }
  };

  _onFinishCheckingCode2(code) {
    this.setState({otp: code});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ticket_detail) {
      this.setState({
        data: nextProps.ticket_detail,
        clientId: nextProps.ticket_detail.client_uuid,
        serviceId: nextProps.ticket_detail.mc_uuid,
        techName: '+' + nextProps.ticket_detail.technician_phone,
        haveReport: nextProps.ticket_detail.have_report,
        starCount: nextProps.ticket_detail.rate,
        notes: nextProps.ticket_detail.notes,
      });
    }
    if (nextProps.completedTicketError) {
      Alert.alert(nextProps.completedTicketError.message);
    }
  }

  handleBackPress = () => {
    Actions.pop('home');
    return true;
  };

  completeTicket = (uuid, status, otp) => {
    const {token} = this.state;
    this.setState({isModalVisible2: false});
    this.props.completeTicket(token, uuid, status, this.state.otp);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  render() {
    var waitingTickets = {};
    waitingTickets = this.props.ticketDetails;
    var data = {};
    data = this.state.data;

    // var notes = []
    // notes = this.state.data.notes

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ProfileDetailsHeader />
        </View>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 60,
          }}>
          <View style={styles.ticketTopView}>
            <View style={styles.imageBackView}>
              <ImageBackground
                source={require('../../assets/Images/ticket_back_img.svg')}
                imageStyle={{height: '100%', width: '100%'}}
                style={styles.imageBack}>
                <View style={styles.clientTitleView}>
                  <Text style={styles.clientTitleText}>
                    {i18n.t('client')}{' '}
                    {this.state.clientId &&
                      this.state.clientId.substr(
                        this.state.clientId.length - 5,
                      )}
                  </Text>
                </View>
                <View style={styles.companyNameView}>
                  <Text style={styles.companyNameText}>
                    {data && data.subject}
                  </Text>
                </View>
                {/*
									<View style={styles.dateView}>
			          		<Text style={styles.dayText}>
			          			Monday
			          		</Text>
			          		<Text style={styles.dateText}>
			          			11/12/2019
			          		</Text>
			          		<Text style={styles.timeText}>
			          			12:05 PM
			          		</Text>
			          	</View>
							*/}
              </ImageBackground>
            </View>
            <View style={styles.clientProfileImageView}>
              <Image
                source={
                  waitingTickets &&
                  waitingTickets.client &&
                  waitingTickets.client.client_location.profile_image
                    ? {
                        uri:
                          'https://core.isalamah.com/public/' +
                          waitingTickets.client.client_location.profile_image,
                      }
                    : require('../../assets/Images/pic-default.png')
                }
                style={styles.clientProfileImage}
              />
            </View>
          </View>
          <View style={styles.threeImageView}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.ticketArrowsView}
              onPress={() =>
                Actions._declineRequest({uuid: waitingTickets.uuid})
              }>
              <View style={styles.ticketArrowsView}>
                <Image
                  source={
                    i18n.locale === 'ar'
                      ? require('../../assets/Images/ticketArrowsAR.svg')
                      : require('../../assets/Images/ticketArrows.svg')
                  }
                  style={styles.ticketArrows}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.ticketLocationView}
              onPress={() => Alert.alert(i18n.t('sorry'), i18n.t('map'))}>
              <View>
                <Image
                  source={require('../../assets/Images/ticketLocation.svg')}
                  style={styles.ticketLocation}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ticketPhoneView}
              activeOpacity={0.8}
              onPress={() => Alert.alert(i18n.t('sorry'), i18n.t('call'))}>
              <Image
                source={
                  i18n.locale === 'ar'
                    ? require('../../assets/Images/ticketPhoneAR.svg')
                    : require('../../assets/Images/ticketPhone.svg')
                }
                style={styles.ticketPhone}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.detailsTitleView}>
            <Text style={styles.detailsTitle}>{i18n.t('details')}</Text>
          </View>
          <View style={styles.monthlycheckView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.monthlycheckTitle}>
                {waitingTickets && waitingTickets.subject}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.monthlycheckDesc}>
                {waitingTickets && waitingTickets.content}
              </Text>
            </View>
          </View>
          <View style={styles.relatedServiceView}>
            <Text style={styles.relatedService}>
              {i18n.t('relatedService')}
            </Text>
          </View>
          <View style={styles.ticketMenuView}>
            <Text style={styles.serviceCodeText}>
              {this.state.serviceId &&
                this.state.serviceId.substr(this.state.serviceId.length - 10)}
            </Text>
            <TouchableOpacity
              style={styles.menuImageView}
              activeOpacity={0.9}
              onPress={() =>
                Actions.reportForm({
                  mcuuid: waitingTickets.mc_uuid,
                  uuid: waitingTickets.uuid,
                })
              }>
              <Image
                source={require('../../assets/Images/ticketMenu.svg')}
                style={styles.ticketMenuImage}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginBottom: 50}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(18),
                fontWeight: '400',
                color: '#707070',
                margin: 10,
                marginBottom: 10,
              }}>
              {i18n.t('notes')}
            </Text>
            {this.state.notes && this.state.notes.length > 0 ? (
              <FlatList
                style={{padding: 5}}
                data={this.state.notes}
                ItemSeparatorComponent={() => {
                  return <View style={{marginBottom: 20}} />;
                }}
                renderItem={({item: rowData}) => {
                  return (
                    <View style={styles2.card}>
                      <View style={styles2.cardHeader}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: getAdjustedFontSize(14),
                              fontWeight: 'bold',
                              color: '#6C6C6C',
                            }}>
                            {rowData.by_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: getAdjustedFontSize(12),
                              color: '#6C6C6C',
                            }}>
                            {rowData.created_at}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#888',
                              marginTop: 20,
                              fontSize: getAdjustedFontSize(14),
                              alignSelf: 'flex-start',
                            }}>
                            {rowData.content}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            marginBottom: 10,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            padding: 5,
                          }}>
                          {rowData.ticket_notes_attachments &&
                            rowData.ticket_notes_attachments.map(image => {
                              return (
                                <View
                                  style={{
                                    width: 51,
                                    height: 51,
                                    margin: 5,
                                    borderRadius: 7,
                                    overflow: 'hidden',
                                  }}>
                                  <Image
                                    source={{
                                      uri:
                                        'https://core.isalamah.com/public/' +
                                        image.path,
                                    }}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      resizeMode: 'cover',
                                    }}
                                  />
                                </View>
                              );
                            })}
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 150,
                  marginBottom: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: getAdjustedFontSize(18),
                    fontWeight: 'bold',
                    color: '#D4D4D4',
                    textAlign: 'center',
                  }}>
                  {i18n.t('noNotesFound')}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#23BDE4',
            }}
            activeOpacity={0.9}
            onPress={() =>
              Actions._addEditNotes({ticket: this.state.waitingTickets})
            }>
            <View style={{height: 20, width: 20}}>
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                source={require('../../assets/Images/Add.svg')}
              />
            </View>
            <Text
              style={{
                color: '#ffffff',
                fontSize: getAdjustedFontSize(18),
                fontWeight: 'bold',
                alignSelf: 'center',
                padding: 10,
              }}>
              {i18n.t('addNote')}
            </Text>
          </TouchableOpacity>
          <View style={styles.completedButtonBG}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                this.completeTicket(this.props.ticketDetails.uuid, 'completed');
                this.setState({isModalVisible2: true});
              }}
              style={styles.completedButton}>
              <Image
                source={require('../../assets/Images/ticketRightSign.svg')}
                style={styles.ticketRightSign}
              />
              <Text style={styles.completedText}>{i18n.t('completed')}</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={{backgroundColor: '#1DBC47'}} />
        </View>

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
                onPress={() =>
                  this.completeTicket(
                    this.props.ticketDetails.uuid,
                    'completed',
                    this.state.otp,
                  )
                }>
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
                  this.completeTicket(
                    this.props.ticketDetails.uuid,
                    'completed',
                    this.state.otp,
                  ),
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

const styles2 = StyleSheet.create({
  container: {
    height: '100%',
    marginBottom: 50,
  },
  list: {
    padding: 5,
  },
  separator: {
    marginRight: 15,
  },
  /******** card **************/
  card: {
    flex: 1,
    padding: 10,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: '#F8F8F8',
  },
  cardHeader: {
    width: '100%',
    // paddingVertical: 5,
    // paddingHorizontal: 5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  /******** card components **************/
  title: {
    fontSize: 18,
    color: '#285DB3',
    position: 'absolute',
    right: 30,
  },
  description: {
    fontSize: 11,
    color: '#888',
    marginTop: 5,
  },
  newprice: {
    fontSize: 24,
    color: '#808080',
    fontWeight: '600',
  },
  discount: {
    fontSize: 14,
    color: '#808080',
    marginTop: 10,
    marginLeft: 5,
  },
  timeContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
});

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    ticket_detail: state.ticket.ticket_detail,
    completedTicket: state.ticket.completedTicket,
    completedTicketError: state.ticket.completedTicketError,
    // notes: state.notes.notes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketView);
