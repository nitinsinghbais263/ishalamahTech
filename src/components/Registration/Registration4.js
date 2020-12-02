import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './Style';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import i18n from '../../Language/i18n';
import LoaderButton from '../Common/LoaderButton';

class Registration4 extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.data;
    this.state = {
      password: '',
      language: '',
      user_uuid: '',
      phone: '',
    };
  }

  componentDidMount() {
    this._loadInitialState();
  }

  _loadInitialState = () => {
    AsyncStorage.getItem('USER_UUID').then(value => {
      this.setState({user_uuid: value});
    });
  };

  onSubmit() {
    this.setState({loading: true});
    this.props.createPassword(this, {
      password: this.state.password,
      user_uuid: this.state.user_uuid,
      phone: this.params.phone,
    });
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.verifyCode) {
      this.setState({loading: false});
    }
    if (nextProps.otpCodeError) {
      this.setState({loading: false});
    }
  }

  render() {
    const {language, loading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#23bde4'}}>
          <View style={styles.mainView}>
            <View style={styles.countryView}>
              {language == 'ar' ? (
                <Text style={styles.title}>{i18n.t('password')}</Text>
              ) : (
                <Text style={styles.title}>{i18n.t('password')}</Text>
              )}
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
            </View>
            <View style={styles.buttonView}>
              <View style={styles.continueButtonBG}>
                <LoaderButton
                  style={styles.continueButton}
                  onPress={() => this.onSubmit()}
                  text={i18n.t('start')}
                  isLoading={loading}
                />

                {/* <TouchableOpacity
                  style={styles.continueButton}
                  activeOpacity={0.9}
                  onPress={() => this.onSubmit()}>
                  <Text style={styles.buttonText}>{i18n.t('start')}</Text>
                </TouchableOpacity> */}
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
)(Registration4);
