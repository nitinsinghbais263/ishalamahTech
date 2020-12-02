import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './Style';
import CountryCodes from './CountryCodes.json';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../Language/i18n';
import Modal from 'react-native-modal';

export default class Registration extends Component<Props> {
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
    var searchData = search.trim().toLowerCase();
    countryCodesSearch = countryCodes.filter(l => {
      return l.name.toLowerCase().match(searchData);
    });
    this.setState({
      countryCodesSearch: countryCodesSearch,
      searchCountry: search,
    });
  };

  render() {
    const {
      selectedCountry,
      countryCodes,
      language,
      modalOpen,
      countryCodesSearch,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#23bde4'}}>
          <View style={styles.mainView}>
            <View style={styles.countryView}>
              {language == 'ar' ? (
                <Text style={styles.title}>{i18n.t('country')}</Text>
              ) : (
                <Text style={styles.title}>{i18n.t('country')}</Text>
              )}
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
                  language == 'ar' ? styles.pickerViewAR : styles.pickerView
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
            </View>
            <View style={styles.buttonView}>
              <View style={styles.continueButtonBG}>
                <TouchableOpacity
                  style={styles.continueButton}
                  activeOpacity={0.9}
                  onPress={() =>
                    Actions.registration2({
                      selectedCountry: this.state.dialCode,
                    })
                  }>
                  <Text style={styles.buttonText}>{i18n.t('continue')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Modal
            coverScreen={false}
            isVisible={modalOpen}
            onBackdropPress={this.closeToggleModal}
            onBackButtonPress={this.closeToggleModal}
            backdropColor="#000000"
            style={{padding: 0}}
            // backdropOpacity={0.9}
            // transparent={true}
          >
            <View style={styles.modalView}>
              <View style={styles.searchCountryFieldView}>
                <TextInput
                  value={this.state.searchCountry}
                  onChangeText={searchCountry => {
                    this.searchCountries(searchCountry);
                  }}
                  style={{
                    ...styles.searchCountryField,
                    textAlign: i18n.locale === 'ar' ? 'right' : 'left',
                  }}
                  placeholder={i18n.t('searchCountry')}
                />
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
        </SafeAreaView>
      </View>
    );
  }
}
