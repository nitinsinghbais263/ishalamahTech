import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  I18nManager,
  BackHandler,
  Keyboard,
} from 'react-native';
import i18n from '../../Language/i18n';
import ImagePicker from 'react-native-image-crop-picker';
import {getAdjustedFontSize} from '../../Responsive/fontResponsive.js';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import CustomHeader from '../ProfileDetails/CustomHeader.js';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class AddEditNotes extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      imgSource: [],
      imgData: [],
      avatarSource: null,
      uuid: '',
      content: '',
      attachements: [],
    };
    this.uploadImage = this.uploadImage.bind(this);
  }

  state = {
    token: '',
    uuid: '',
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  onSubmit() {
    let formData = new FormData();

    var image = this.state.imgData;

    image.length > 0 &&
      image.forEach(item => {
        let pathParts = item.path.split('/');
        let photo = {
          uri: item.path,
          type: item.mime,
          name: pathParts[pathParts.length - 1],
        };

        formData.append('ticketUuid', this.props.ticket.uuid);
        formData.append('content', this.state.content);
        formData.append('attachments[]', photo);
      });

    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.setState({uuid: this.props.navigation.state.params.ticket});
      this.props.createNotes(this, {
        token: this.state.token,
        // uuid: this.state.uuid,
        formData: formData,
        // content: this.state.content,
      });
    });
  }

  onDelete(path) {
    let imageSource = this.state.imgSource;

    imageSource = imageSource.filter(item => {
      return item !== path;
    });
    this.setState({imgSource: imageSource});
  }

  imagePicker() {
    const _that = this;
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      maxFiles: 20,
    }).then(image => {
      image.map((item, index) => {
        _that.state.imgSource.push(item.path), _that.state.imgData.push(item);
      });

      _that.setState({
        imgSource: _that.state.imgSource,
        imgData: _that.state.imgData,
      });

      _that.uploadImage(image);
    });
  }

  uploadImage(image) {
    // let formData = new FormData();
    //
    // image.forEach((item) =>{
    //
    //   let pathParts = item.path.split('/');
    //    let photo = {
    //     uri: item.path,
    //     type: item.mime,
    //     name: pathParts[pathParts.length - 1],
    //
    //   };
    //
    //   formData.append('attachments[]', photo);
    // })
    this.setState({attachements: formData});
    // const { token } = this.state;
    // this.props.uploadImage(token, uuid, formData)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            position: 'relative',
            backgroundColor: '#23BDE4',
            top: 0,
            width: '100%',
            height: 60,
            justifyContent: 'center',
          }}>
          <CustomHeader settingScreen={true} oneStep={true} />
        </View>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(14),
                alignSelf: 'flex-start',
                marginTop: 20,
                marginLeft: 10,
              }}>
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
                        width: 72,
                        height: 72,
                        margin: 5,
                        borderRadius: 7,
                        overflow: 'hidden',
                      }}>
                      <Image
                        source={{uri: image}}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.onDelete(image)}
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
              <TouchableOpacity
                activeOpacity={0.9}
                style={{width: 72, height: 72, marginTop: 2}}
                onPress={() => this.imagePicker()}>
                <View style={{width: 72, height: 72, marginTop: 2}}>
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
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(14),
                alignSelf: 'flex-start',
                marginTop: 20,
                marginLeft: 10,
              }}>
              {i18n.t('content')}
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 150,
              textAlignVertical: 'top',
              paddingLeft: 10,
              marginTop: 10,
              fontSize: getAdjustedFontSize(14),
              borderBottomColor: '#F8F8F8',
            }}
            placeholder={i18n.t('typeHere')}
            keyboardType="email-address"
            multiline={true}
            numberOfLines={4}
            returnKeyType={'done'}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            underlineColorAndroid="transparent"
            onChangeText={content => this.setState({content: content})}
          />
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            width: '100%',
            height: 50,
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#23BDE4',
          }}
          onPress={() => this.onSubmit()}>
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
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    notes: state.notes.notes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddEditNotes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
