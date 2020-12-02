import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  StatusBar,
  Image,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  FlatList,
  Switch,
  Platform,
  Dimensions,
  DeviceEventEmitter,
  RefreshControl
} from 'react-native';
import styles from './Style';
import i18n from '../../Language/i18n';
import CountDown from 'react-native-countdown-component';
import {Actions} from 'react-native-router-flux';
import {Rating, AirbnbRating} from 'react-native-elements';
import ProfileDetailsHeader from '../ProfileDetails/ProfileDetails.js';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {getAdjustedFontSize} from '../../Responsive/fontResponsive';

const screenWidth = Dimensions.get('window').width;

let initial = true
class Home extends Component {
  constructor(props) {
    debugger
    super(props);
    this.state = {
      waiting_acceptance: true,
      not_acceptance:
        props.userData &&
        props.userData.user_technician.accept_tickets === 'accept'
          ? false
          : true,
      switchValue: false,
      token: '',
      uuid: '',
      client_uuid: '',
      ticketDetail: {},
      isLoading: false,
    };
    this.backPressSubscriptions = new Set();
  }

   myFunction = () => {
     debugger
     // have access to this (props and state) here
     // this.blah = "what ever you want to do"
     alert('Clicked')
  }


  static onEnter() {
    debugger
       // homeSceneKey needs to be the same key that you use to configure the Scene
       myFunction();
       initial = true
       this.getUser();
    };


  componentDidMount = () => {
     debugger

    // this.getUser();
    // this.getWatingTicket()
    // this.getPreviousJobs()
    // this.getCurrentJobs()
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      let invokeDefault = true;
      const subscriptions = [];

      this.backPressSubscriptions.forEach(sub => subscriptions.push(sub));

      for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        if (subscriptions[i]()) {
          invokeDefault = false;
          break;
        }
      }

      if (invokeDefault) {
        BackHandler.exitApp();
      }
    });

    this.backPressSubscriptions.add(this.handleBackPress);
  };


  getUser = () => {
    debugger
    this.setState({isLoading: true,loader: true})
    AsyncStorage.multiGet(['USER_TECH', 'TOKEN']).then(response => {
      this.setState({uuid: response[0][1]});
      this.setState({token: response[1][1]});
      this.props.getPreviousJobs({
        token: response[1][1],
        uuid: response[0][1],
      });
      this.props.getCurrentJobs({
        token: response[1][1],
        uuid: response[0][1],
      });
      this.props.myWaitingTickets({
        token: response[1][1],
      });
      this.props.getTechStatus({
        token: response[1][1],
      });
    }).finally(() => { ; this.setState({isLoading: false})} )
  };

  // getStatus = () =>{
  // 	this.props.getTechStatus({
  // 		token: response[1][1],
  // 	})
  // }

  getWatingTicket = () => {
    this.props.myWaitingTickets({
      token: this.state.token,
    });
  };

  getPreviousJobs = () => {
    this.props.getPreviousJobs({
      token: this.state.token,
      uuid: this.state.uuid,
    });
  };

  getCurrentJobs = () => {
    this.props.getCurrentJobs({
      token: this.state.token,
      uuid: this.state.uuid,
    });
  };

  getUserProfile = () => {
    this.props.getUserDetails({
      token: this.state.token,
    });
  };

  onRefresh = () => {
    this.getUser();
  };


  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  componentWillUnmount = () => {
    // BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    this.backPressSubscriptions.clear();

  };

  toggleSwitch = value => {
    const that = this;
    that.setState({
      switchValue: value,
      not_acceptance: false,
      ticketSetting: 'accept',
    });
    AsyncStorage.getItem('TOKEN').then(value => {
      that.setState({token: value});

      that.props.ticketSettings({
        token: that.state.token,
        uuid: that.state.uuid,
        acceptTicket: 'accept',
      });
    });
    // this.setState({switchValue: value, not_acceptance: !this.state.not_acceptance})
  };

  componentWillReceiveProps(nextProps) {
    const {token} = this.state;
    if (nextProps.serverError) {
      this.setState({jobsError: nextProps.serverError});
    }
    if (nextProps.ticketSetting) {
      this.setState({
        switchValue: false,
        not_acceptance:
          nextProps.ticketSetting &&
          nextProps.ticketSetting.technician.accept_tickets === 'accept'
            ? false
            : true,
      });
    }
    if (nextProps.statusError) {
      this.setState({jobsError: nextProps.statusError});
    }
    if (nextProps.currentJobsError) {
      this.setState({currentJobsError: nextProps.currentJobsError});
    }
    if (nextProps.waitingTickets) {
      var uuidId = nextProps.waitingTickets.client_uuid;
      var lastChar = uuidId.substr(uuidId.length - 5);
      this.setState({
        waitingTickets: nextProps.waitingTickets,
        client_uuid: lastChar,
      });
    }
    if (nextProps.waitingTicketsError) {
      this.setState({waitingTicketsError: nextProps.waitingTicketsError});
    }
    if (nextProps.acceptTicket) {
      // Actions._ticketView({waitingTickets: waitingTickets})
    }
    if (nextProps.userData) {
      if (nextProps.userData.user_technician.accept_tickets == 'accept') {
        this.setState({
          uuid: nextProps.userData.user_technician.uuid,
          ticketSetting: nextProps.userData.user_technician.accept_tickets,
          not_acceptance: false,
        });
      } else {
        this.setState({
          uuid: nextProps.userData.user_technician.uuid,
          ticketSetting: nextProps.userData.user_technician.accept_tickets,
        });
      }
    }
  }

  onSubmit(uuid, ticketDetail) {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.setState({uuid: this.props.uuid});
      this.props.acceptTicket(this, {
        token: this.state.token,
        uuid: uuid,
        ticketDetail: ticketDetail,
      });
    });
  }

  render() {
    const user = this.props.userData;
    const {
      language,
      jobsError,
      currentJobsError,
      waitingTicketsError,
      waitingTickets,
    } = this.state;
    var status = [];
    status = this.props.status;

    if(initial){
      debugger
      initial = false;
      this.getUser();
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ProfileDetailsHeader />
        </View>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <ScrollView
          style={styles.containerScroll}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
          refreshControl={
            <RefreshControl
             refreshing={this.state.isLoading}
             onRefresh={() => {this.onRefresh()}}
            />
           }
           >
          {/*no accept ticket*/}
          {this.state.not_acceptance ? (
            <View style={styles.notAcceptanceView}>
              <View style={styles.notTitleView}>
                <View>
                  <Text style={styles.notTitleText}>
                    {i18n.t('notAccepting')}
                  </Text>
                </View>

                <View>
                  <Text style={styles.descriptionText}>
                    {i18n.t('descriptionMessage')}
                  </Text>
                </View>
              </View>

              <View style={styles.switchView}>
                <View style={styles.switchViewBG}>
                  <Switch
                    style={{alignSelf: 'center'}}
                    onValueChange={this.toggleSwitch}
                    value={this.state.switchValue}
                    thumbColor="#23BDE4"
                    ios_backgroundColor="#ffffff"
                    trackColor={{false: '#ffffff', true: '#23BDE4'}}
                  />
                </View>
              </View>
            </View>
          ) : null}
          {/*Status*/}
          <View style={styles.statusView}>
            <View style={styles.performanceView}>
              <View style={styles.overallTextView}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.overallText}>{i18n.t('overall')}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.overallText}>
                    {i18n.t('performance')}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.overallPointsText}>
                  {(status && status.averageRating) || 'N/A'}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.ticketCountText}>{i18n.t('over')}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.ticketCountText}>
                    {' '}
                    {status && status.totalTicket}{' '}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.ticketCountText}>
                    {i18n.t('tickets')}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.totalTicketView}>
              <View style={styles.totalTextView}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.totalText}>{i18n.t('totalTickets')}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.thisMonthText}>
                    {i18n.t('thisMonth')}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.countText}>
                  {status && status.thisMonthTicket}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.thisWeekText}>{i18n.t('thisWeek')}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.thisWeekText}>
                    {' '}
                    {status && status.thisWeekTicket}{' '}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.thisWeekText}>{i18n.t('tickets')}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Wating Approval*/}
          {waitingTickets ? (
            <View style={styles.WaitingAcceptanceView}>
              <View style={styles.waitingTitleView}>
                <Text style={styles.waitingTitle}>
                  {i18n.t('waitingApproval')}
                </Text>
                <CountDown
                  size={20}
                  until={waitingTickets.remaining_time}
                  onFinish={() => {
                    this.setState({waitingTickets: !waitingTickets});
                  }}
                  digitStyle={{backgroundColor: '#FFF'}}
                  digitTxtStyle={{color: '#285DB3'}}
                  separatorStyle={{color: '#285DB3'}}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: null, s: null}}
                  showSeparator
                />
              </View>
              <View style={styles.waitingDetailView}>
                <View style={styles.clientBoyView}>
                  <Text style={styles.clientText}>{i18n.t('client')}</Text>
                  <Text style={styles.boyText}>{this.state.client_uuid}</Text>
                </View>
                <View style={styles.clientLocationView}>
                  <Text style={styles.locationText}>
                    {i18n.t('clientLocation')}
                  </Text>
                  <Text style={styles.stateText}>
                    {waitingTickets.client.client_location.state.name},{' '}
                    {waitingTickets.client.client_location.country.name}
                  </Text>
                </View>
                <View style={styles.clientDateView}>
                  <Text style={styles.assignedText}>
                    {i18n.t('assignedNn')}
                  </Text>
                  <View style={styles.dateView}>
                    <Text style={styles.assignDateText}>
                      {waitingTickets.assigned_on}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.WaitingAcceptanceButtons}>
                <View style={styles.declineButtonBG}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      Actions._declineRequest({uuid: waitingTickets.uuid})
                    }
                    style={styles.declineButton}>
                    <Image
                      source={require('../../assets/Images/declineCross.svg')}
                      style={styles.declineCrossImage}
                    />
                    <Text style={styles.declineText}>{i18n.t('decline')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.acceptButtonBG}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      this.onSubmit(waitingTickets.uuid, waitingTickets)
                    }
                    style={styles.acceptButton}>
                    <Image
                      source={require('../../assets/Images/acceptRight.svg')}
                      style={styles.acceptRightImage}
                    />
                    <Text style={styles.acceptText}>{i18n.t('acceptNow')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}

          {/* current Jobs*/}
          <View style={styles.previousView}>
            <View
              style={{...styles.previousJobsTextView, flexDirection: 'row'}}>
              <Text style={styles.previousJobsText}>
                {i18n.t('currentJobs')}
              </Text>
            </View>
            {currentJobsError ? (
              <View style={styles.serverErrorView}>
                <Text style={styles.serverErrorText}>{currentJobsError}</Text>
              </View>
            ) : (
              <View style={styles.listView}>
                <FlatList
                  data={this.props.currentJobs}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          Actions._ticketView({ticketDetails: item})
                        }
                        key={index}
                        style={{
                          ...styles.listCards,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.nameText}>{item.subject}</Text>
                          </View>

                          <Text style={styles.dateText}>{item.created_at}</Text>
                        </View>
                        <View style={styles.rating}>
                          <AirbnbRating
                            // onFinishRating={()=>{this.setState({ratingPress: this.state.ratingPress+1}); this.ratingCompleted()}}
                            // key={this.state.ratingPress}
                            size={15}
                            startingValue={item.rate}
                            defaultRating={item.rate}
                            ratingBackgroundColor="#F8F8F8"
                            showRating={false}
                            readonly={true}
                            style={styles.rating}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
          </View>

          {/*previous Jobs*/}
          <View style={styles.previousView}>
            <View
              style={{...styles.previousJobsTextView, flexDirection: 'row'}}>
              <Text style={styles.previousJobsText}>
                {i18n.t('previousJobs')}
              </Text>
            </View>
            {jobsError ? (
              <View style={styles.serverErrorView}>
                <Text style={styles.serverErrorText}>{jobsError}</Text>
              </View>
            ) : (
              <View style={styles.listView}>
                <FlatList
                  data={this.props.previousJobs}
                  renderItem={({item, index}) => {
                    return (
                      <View key={index} style={styles.listCards}>
                        <Text style={styles.nameText}>{item.subject}</Text>
                        <Text style={styles.dateText}>{item.completed_on}</Text>
                        <View style={styles.rating}>
                          <AirbnbRating
                            size={15}
                            startingValue={item.rate}
                            defaultRating={item.rate}
                            ratingBackgroundColor="#F8F8F8"
                            showRating={false}
                            readonly={true}
                            style={styles.rating}
                          />
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.jobs.userData,
    previousJobs: state.jobs.previousJobs,
    serverError: state.jobs.serverError,
    currentJobs: state.jobs.currentJobs,
    currentJobsError: state.jobs.currentJobsError,
    waitingTickets: state.jobs.waitingTickets,
    waitingTicketsError: state.jobs.waitingTicketsError,
    // ticketSetting: state.ticket.ticketSetting,
    status: state.status.status,
    statusError: state.status.statusError,
    acceptTicket: state.ticket.acceptTicket,
    ticketSetting: state.ticket.ticketSetting,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
