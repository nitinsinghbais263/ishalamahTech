import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  BackHandler,
  Dimensions,
} from 'react-native'
import styles from './Style';
import Modal from "react-native-modal";
import CodeInput from 'react-native-confirmation-code-input';
import i18n from '../../Language/i18n';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';
import ProfileDetailsHeader from '../ProfileDetails/ProfileDetails.js';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilterComponent from './FilterComponent'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class CashBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
        setectedCustomer: i18n.t('customerName'),
        cUuid: "",
        collect_modal: true,
        dataSource: [],
        selectedText: "",
        code: "",
        categoryStatus: "",
        errorModal: false,
      };
}

  state = {
    token: "",
    search: "",
    cashUuid: "",
    data: [],
    otp: "",
    amount: "",
    isModalVisible1: false,
    isModalVisible2: false,
    isModalVisible3: false,
    category: "",
    categoryStatus: "",
    error: false,
    errorMesssge: "",
    errorModal: false,

  };

  componentDidMount() {
    this.getData()
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    Actions.pop();
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  selectedCategory = (status) => {
    const test= status;
    const {categoryStatus,token} = this.state;
    this.setState({categoryStatus: test})
  if(test===0 || test===1 ){
      this.props.getCashBook({
        token: token,
        categoryStatus: test
     })
   } else {
       this.props.getCashBook({
         token: token,
         categoryStatus: categoryStatus
     })
   }
  }

  getData = () =>{
    const {categoryStatus} = this.state;
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getCashBook({
          token: value,
          categoryStatus: categoryStatus
        })
    })
  }

  getCustomerName = () =>{
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getCustomerName(this,{
          token: this.state.token,
        })
    })
  }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.data) {
      this.setState({
        data:  nextProps.data.cash_book.data,
      })
    }

    if(nextProps.cashbookError){
      
      Alert.alert(nextProps.cashbookError.message)
      // this.setState({errorMesssge: nextProps.cashbookError.message, errorModal: true})

      this.setState({errorMesssge: nextProps.cashbookError.message,errorModal: true,},()=>{setTimeout(() => {
				this.setState({errorModal: false })
			}, 4000)})
    }
    if(nextProps.customerNameError){
      
       Alert.alert(nextProps.customerNameError.message)
      // this.setState({errorMesssge: nextProps.customerNameError.message, errorModal: true})
      this.setState({errorMesssge: nextProps.customerNameError.message,errorModal: true,},()=>{setTimeout(() => {
				this.setState({errorModal: false })
			}, 4000)})

    }
    if(nextProps.collectCashError){
      
       Alert.alert(nextProps.collectCashError.message)
      // this.setState({errorMesssge: nextProps.collectCashError.message, errorModal: true})
      this.setState({errorMesssge: nextProps.collectCashError.message,errorModal: true,},()=>{setTimeout(() => {
				this.setState({errorModal: false })
			}, 4000)})

    }
    // if(nextProps.requestCashError){
    //   
    //   Alert.alert(nextProps.requestCashError.message)
    //
    // }
    if(nextProps.customerName){
      this.setState({ dataSource: nextProps.customerName})
    }
    if(nextProps.category){
      this.setState({
        category: nextProps.category,
      })
    }

  }

  // _onFulfill(code) {
  //   // TODO: call API to check code here
  //   // If code does not match, clear input with: this.refs.codeInputRef1.clear()
  //   if (code == '123456') {
  //     this.setState({
  //         successMesssge: 'Verification Successfully',
  //         successModal: true,
  //       },()=>{setTimeout(() => {
  //       this.setState({successModal: false })
  //     }, 2000)})
  //   } else {
  //     this.setState({
  //       errorMesssge: 'Verification  Failed!',
  //       errorModal: true,
  //       },()=>{setTimeout(() => {
	// 	        this.setState({errorModal: false })
	//       }, 2000)})
  //     this.refs.codeInputRef1.clear();
  //   }
  // }

  // _onFinishCheckingCode1(isValid) {
  //   console.log(isValid);
  //   if (!isValid) {
  //     this.setState({
  //       errorMesssge: 'Code not match!',
  //       errorModal: true,
  //     },()=>{setTimeout(() => {
  //       this.setState({errorModal: false })
  //     }, 2500)})
  //
  //   } else {
  //     this.setState({
  //         successMesssge: 'Code matched',
  //         successModal: true,
  //       },()=>{setTimeout(() => {
  //         this.setState({successModal: false })
  //     }, 2000)})
  //   }
  // }

  _onFinishCheckingCode2(code) {
    this.setState({otp:code})

  }

  _selectedValue = (index, item) => {
    alert(item);
   this.setState({ selectedText: item.name });
 }

  toggleModal1 = (rowData) => {
    this.setState({ isModalVisible1: !this.state.isModalVisible1 });
  };

  toggleModal2 = (uuid) => {
    this.setState({ isModalVisible2: !this.state.isModalVisible2, cashUuid: uuid });
  };

  toggleModal3 = () => {
    this.setState({ isModalVisible3: !this.state.isModalVisible3 });
  };

  onSearch = (search) =>{
    if(search.length>=3){

    this.setState({search: search},()=>{
      this.props.getCustomerName(this,{
          token: this.state.token,
          search: search
      })
   })
   }
   else{
     this.setState({dataSource: []})
   }
  }

  selectedCustomer = (rowData) =>{
    this.setState({setectedCustomer: rowData.name, cUuid: rowData.uuid, dataSource: [], collect_modal: false, })
    this.toggleModal3()
  }

  onSubmitAmount = () =>{
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.requestCash(this,{
        token: this.state.token,
        clientUuid: this.state.cUuid,
        amount: this.state.amount
      })
    })
    this.setState({ isModalVisible1: false, dataSource: []  })
    this.getData()
}

  onSubmitOtp = () =>{
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getCollectCash(this,{
        token: this.state.token,
        cashUuid: this.state.cashUuid,
        code: this.state.otp
      })
    })
      this.setState({ isModalVisible2: false })
      this.getData()
}

  render() {
    
    // if(this.state.error = true){
    //   Alert.alert(this.state.errorMesssge)
    // }
    const {cashbookError, errorModal} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ProfileDetailsHeader />
        </View>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />

          <View style= {{width: '100%', height: 40, marginBottom: 10}}>
            <View style={{padding: 10, flexDirection: 'row'}}>
              <Text style={{fontSize: getAdjustedFontSize(18), color: '#6C6C6C'}}>{i18n.t('collectCash')}</Text>
            </View>
            <View style={{width: '100%', height: 60, flexDirection: 'row', padding: 10, marginTop: 10, backgroundColor: '#F8F8F8'}}>
              <TouchableOpacity acttiveOpcity={0.8} onPress={() => {this.toggleModal3()}} style={{ width: '60%', height: '100%', justifyContent: 'center',backgroundColor: '#F8F8F8',marginLeft: 15}}>
                  <Text
                    style={{fontSize: getAdjustedFontSize(16),backgroundColor: '#F8F8F8', color: '#6C6C6C', textAlign: i18n.locale === 'ar' ? 'right' : 'left'}}
                  >
                    {this.state.setectedCustomer}
                  </Text>
              </TouchableOpacity>
              <View style={{width: '40%', height: '100%', justifyContent: 'center',paddingRight: 20}}>
              <TouchableOpacity  activeOpacity={0.9} disabled={this.state.collect_modal} style={{width: '100%', height: '100%', justifyContent: 'center'}} onPress={() => this.toggleModal1()}>
                <View style={{width: 150, height: 40, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: '#23BDE4'}}>
                  <Text style={{fontSize: getAdjustedFontSize(12), color:"#FFFFFF"}}>{i18n.t('collectCash2')}</Text>
                </View>
              </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style= {{marginTop: 40}}>
            <View style= {{padding: 10, marginTop: 30, flexDirection: 'row',justifyContent: 'space-between',alignItems: "center"}}>
              <View>
                <Text style={{fontSize: getAdjustedFontSize(18), color: '#6C6C6C'}}>{i18n.t('cashCollection')}</Text>
              </View>
              <View>
                { !this.state.category?
                    <FilterComponent  selectedCategory= {this.selectedCategory} category={this.state.category}/>
                  : null
                }
              </View>
            </View>
            {
              this.props.serverError ?
                <View style={styles.serverErrorView}>
                  <Text style={styles.serverErrorText}>
                    {this.props.serverError}
                  </Text>
                </View>
              :
              <View style={{paddingBottom: Platform.OS==='android'?10: 0,height: Platform.OS==='android'? screenHeight/2+40: screenHeight/1.6}}>
               <FlatList
                  style={{...styles2.list,paddingBottom: Platform.OS==='android' ? 5: 10}}
                  data={this.state.data}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => {
                return (
                  <View style={styles2.separator}/>
                )
              }}
              renderItem={ ({item: rowData}) =>{

                var invoiceId = rowData.uuid
                var lastChar = invoiceId.substr(invoiceId.length - 5);
                return (
                  <View style={styles2.card}>
                    <View style={styles2.cardHeader}>
                      <View style={{ flexDirection: 'row'}}>
                        <Text style={[styles2.clientName, {color: rowData.confirmed_on === null ? '#F21414' : "#82BF18"}]}>{rowData.client.client_detail.full_name}</Text>
                        <Text style={{ color: '#285DB3', fontSize: getAdjustedFontSize(18), position:'absolute', right: 0 }}># {lastChar}</Text>
                      </View>
                      {i18n.locale==='ar'?
                        <View style={{paddingTop: 15,flexDirection: 'row'}}>
                          <Text style={{ color:'#888', fontSize: getAdjustedFontSize(22), alignSelf: 'flex-start'}} numberOfLines={1}>
                          SR {rowData.amount}
                          </Text>
                        </View>
                      :
                        <View style={{paddingTop: 15,flexDirection: 'row'}}>
                          <Text style={{ color:'#888', fontSize: getAdjustedFontSize(22), alignSelf: 'flex-start'}} numberOfLines={1}>
                            {rowData.amount} SR
                          </Text>
                        </View>
                      }

                      <View style={{paddingTop: 15,flexDirection: 'row'}}>
                        <Text style={{fontSize: getAdjustedFontSize(16), color:"#888"}}>{i18n.t('createdOn')}:    </Text>
                        <Text style={{fontSize: getAdjustedFontSize(16), color:"#888"}}>{rowData.created_at}</Text>
                      </View>
                      {rowData.confirmed_on !== null ?
                        <View style={{paddingTop: 10,flexDirection: 'row'}}>
                          <Text style={{fontSize: getAdjustedFontSize(16), color:"#888"}}>{i18n.t('collectedOn')}</Text>
                          <Text style={{fontSize: getAdjustedFontSize(16), color:"#888"}}>{rowData.confirmed_on}</Text>
                        </View>
                       :
                       <TouchableOpacity activeOpacity={0.9} onPress={() => this.toggleModal2(rowData.uuid)} style={{width: 120, height: 40, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', marginTop: 15, backgroundColor: '#23BDE4'}}>
                         <View>
                           <Text style={{fontSize: getAdjustedFontSize(12), color:"#FFFFFF"}}>{i18n.t('collectCash2')}</Text>
                         </View>
                       </TouchableOpacity>
                     }

                    </View>
                  </View>
                )
              }}/>
            </View>
            }
          </View>


          <View style={{ flex: 1, padding: 10 }}>
          <Modal isVisible={this.state.isModalVisible1}>
            <View style={{ width: '100%',  padding: 20, borderRadius: 25, overFlow: 'hidden', backgroundColor: '#ffffff' }}>

              <View style={{width: 30, height: 30, position: 'absolute', top: -10, right: -10}}>
                <TouchableOpacity style={{width: 30, height: 30}} onPress={this.toggleModal1} activeOpacity={0.9}>
                  <View style={{height: 30, width: 30}}>
                    <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/Images/Close.svg')} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ width: '100%', paddingBottom: 10,flexDirection: 'row'}}>
                <View>
                  <Text style={{color:'#707070', fontSize: getAdjustedFontSize(14)}}>{i18n.t('cashFrom')} </Text>
                  <Text style={{color:'#707070', fontSize: getAdjustedFontSize(18)}}>{this.state.setectedCustomer}</Text>
                </View>
              </View>

              <View style={{ backgroundColor: '#C4C4C4', width: '100%', height: 1}}></View>

                <View style={{ width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                  <TextInput
                    value={this.state.amount}
                    keyboardType="numeric"
                    onChangeText={(amount)=>{this.setState({amount: amount})}}
                    style={{width: '100%',height: 50,fontSize: getAdjustedFontSize(16), paddingLeft: 15, alignSelf: 'center',marginBottom: 20,marginTop: 15,backgroundColor: '#F8F8F8',textAlign: i18n.locale==='ar'? "right": "left"}}
                    placeholderTextColor="#C1C1C1"
                    selectionColor={'#ffffff'}
                    placeholder={i18n.t('enterAmount')}
                  />
                </View>

              <View style={{ width: '100%', height: 50, flexDirection: 'row', marginTop: 30, marginBottom: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#23BDE4'}}>
                <TouchableOpacity activeOpacity={0.9} style={{width: '100%', height: 50, flexDirection: 'row', alignItems: 'center',justifyContent: 'center', borderRadius: 50, backgroundColor: '#23BDE4'}} onPress={() => this.onSubmitAmount()}>
                  <Text style={{fontSize: getAdjustedFontSize(20), color:'#ffffff', alignSelf: 'center'}}>{i18n.t('collect')}</Text>
                </TouchableOpacity>
              </View>

            </View>
          </Modal>
          </View>

          <View style={{ flex: 1, padding: 10 }}>
          <Modal isVisible={this.state.isModalVisible2}>
            <View style={{ width: '100%', height: 380, padding: 20, borderRadius: 25, overFlow: 'hidden', backgroundColor: '#ffffff' }}>

              <View style={{width: 30, height: 30, position: 'absolute', top: -10, right: -10}}>
                <TouchableOpacity activeOpacity={0.9} style={{width: 30, height: 30}} onPress={this.toggleModal2}>
                  <View style={{height: 30, width: 30}}>
                    <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/Images/Close.svg')} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ width: '100%', height: 100, padding: 20, flexDirection: 'row'}}>
                <Text style={{color:'#707070', fontSize: getAdjustedFontSize(20), textAlign: 'center'}}>{i18n.t('cashMessage')}</Text>
              </View>

              <View style={{ backgroundColor: '#C4C4C4', width: '100%', height: 1}}></View>

              <View style={{ width: '100%', height: 120}}>
                <Text style={{ color: '#C1C1C1', fontSize: getAdjustedFontSize(16), alignSelf: 'center', marginTop: 20}}>{i18n.t('opt')}</Text>
                <View style={{ width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                <CodeInput
                  ref="codeInputRef1"
                  codeLength={6}
                  keyboardType="numeric"
                  secureTextEntry
                  activeColor='gray'
                  inactiveColor='#F8F8F8'
                  // compareWithCode='123456'
                  autoFocus={false}
                  ignoreCase={true}
                  inputPosition='center'
                  size={40}
                  onFulfill={(code) => this._onFinishCheckingCode2(code)}
                  // onChangeText={(otp) => { }}
                  codeInputStyle={{ height: 45, width: 45, fontSize: getAdjustedFontSize(18), borderWidth: 1, backgroundColor: '#F8F8F8' }}
                />
                </View>
              </View>

              <View style={{ width: '100%', height: 50, flexDirection: 'row', marginTop: 30,  alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#23BDE4'}}>
                <TouchableOpacity activeOpacity={0.9} style={{width: '100%', height: 50, flexDirection: 'row', alignItems: 'center',justifyContent: 'center', borderRadius: 50, backgroundColor: '#23BDE4'}} onPress={() => this.onSubmitOtp()}>
                  <Text style={{fontSize: getAdjustedFontSize(20), color:'#ffffff', alignSelf: 'center'}}>{i18n.t('collect')}</Text>
                </TouchableOpacity>
              </View>

            </View>
          </Modal>
          </View>

          <View style={{ flex: 1, padding: 10 }}>
          <Modal isVisible={this.state.isModalVisible3}>
            <View style={{ width: '100%', height: 480, padding: 20, borderRadius: 25, overFlow: 'hidden', backgroundColor: '#ffffff' }}>

              <View style={{width: 30, height: 30, position: 'absolute', top: -10, right: -10}}>
                <TouchableOpacity  activeOpacity={0.9} style={{width: 30, height: 30}} onPress={this.toggleModal3}>
                  <View style={{height: 30, width: 30}}>
                    <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/Images/Close.svg')} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ width: '100%', height: 100, padding: 20, flexDirection: 'row'}}>
                <TextInput
                  value={this.state.phone}
                  onChangeText={(search) => this.onSearch(search)}
                  style={{width: '100%',height: 50,fontSize: getAdjustedFontSize(16), paddingLeft: 15, alignSelf: 'center',marginBottom: 20,marginTop: 15,backgroundColor: '#F8F8F8',textAlign: i18n.locale==='ar'? "right": "left"}}
                  placeholderTextColor="#C1C1C1"
                  selectionColor={'#ffffff'}
                  placeholder={i18n.t('searchName')}
                />
              </View>

              <View style={{ backgroundColor: '#C4C4C4', width: '100%', height: 1}}></View>

              <View style={{ width: '100%', height: 300}}>
                {
                  this.state.dataSource.length !== 0 ?
                  <FlatList
                   style={styles2.list}
                   data={this.state.dataSource}
                   showsVerticalScrollIndicator={false}
                   ItemSeparatorComponent={() => {
                     return (
                       <View style={styles2.separator}/>
                     )
                  }}
                  renderItem={ ({item: rowData}) =>{

                    return (
                   <TouchableOpacity onPress={() => this.selectedCustomer(rowData)} activeOpacity={0.9}>
                      <Text style={styles2.clientName} numberOfLines={1}>{rowData.name}</Text>
                   </TouchableOpacity>
                 )
                  }}
               /> :
                 <View style={{ width: '100%', height: 300,  alignItems: 'center', justifyContent: 'center'}}>
                   <View style={{alignSelf: 'center'}}>
                      <Text style={styles2.clientName} numberOfLines={1}>{i18n.t('noFound')}</Text>
                   </View>
                 </View>
                }
              </View>
            </View>
          </Modal>
          </View>

          <View>
            <Modal
              animationInTiming={1000}
              animationOutTiming={1000}
              animationIn="fadeIn"
              animationOut="fadeOut"
              onBackdropPress={()=>{this.setState({successModal: false})}}
              isVisible={this.state.successModal}>
              <View
                style={{
                  width: screenWidth-20,
                  alignSelf: 'center',
                  padding: 10,
                  paddingVertical: 20,
                  borderRadius: 25,
                  overFlow: 'hidden',
                  backgroundColor: '#23BDE4'
                }}>

                <View style={{
                    width: 120,
                    height: 120,
                    position: 'absolute',
                    top: -60,
                    alignSelf: 'center'
                  }}>
                  <Image
                      style={{ width: '100%', height: '100%',resizeMode: 'contain'}}
                      source={i18n.locale==='ar'? require('../../assets/Images/successAR.svg'): require('../../assets/Images/successImage.svg')}
                    />
                </View>
                <View style={{marginTop: 70}}>
                  <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(32), alignSelf: 'center',}}>
                    {i18n.t('success')}
                  </Text>
                </View>

                <View style={{alignSelf: 'center',justifyContent: 'center',alignItems: 'center',marginTop: 20,width: screenWidth-100}}>
                  {this.state.successMesssge &&
                    <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(14), fontWeight: '600', alignSelf: 'center',textAlign: 'center' }}>
                      {this.state.successMesssge}
                    </Text>
                  }
                </View>
              </View>
            </Modal>
            {/* error modal  */}

            <Modal
              // animationInTiming={1000}
              // animationOutTiming={1000}
              animationIn="fadeIn"
              animationOut="fadeOut"
              backdropOpacity={0.5}
              onBackdropPress={()=>{this.setState({errorModal: false})}}
              isVisible={this.state.errorModal}>
                <View
                style={{
                  width: screenWidth-20,
                  alignSelf: 'center',
                  padding: 10,
                  paddingVertical: 20,
                  borderRadius: 25,
                  overFlow: 'hidden',
                  backgroundColor: '#F15E5E'
                }}>

                  <View style={{
                      width: 120,
                      height: 120,
                      position: 'absolute',
                      top: -60,
                      alignSelf: 'center'
                    }}>
                    <Image
                      style={{ width: '100%', height: '100%',resizeMode: 'contain'}}
                      source={require('../../assets/Images/cancel.svg')}
                    />
                  </View>
                  <View style={{marginTop: 70}}>
                    <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(32), alignSelf: 'center',}}>
                      {i18n.t('error')}
                    </Text>
                  </View>

                  <View style={{alignSelf: 'center',justifyContent: 'center',alignItems: 'center',marginTop: 20,width: screenWidth-100}}>
                    {this.state.errorMesssge &&
                      <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(14), fontWeight: '600', alignSelf: 'center',textAlign: 'center' }}>
                      {this.state.errorMesssge}
                      </Text>
                    }
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
    success: state.success ,
    error: state.error,
    message: state.message,
    data: state.cash.cashbook,
    serverError: state.cash.serverError,
    cashbookError: state.cash.cashbookError,
    customerName: state.cash.customerName,
    collectCash: state.cash.collectCash,
    customerNameError: state.cash.customerNameError,
    collectCashError: state.cash.collectCashError,
    requestCashError: state.cash.requestCashError
    //category: state.products.category,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CashBook);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  pickerStyle: {
    marginLeft: 18,
    elevation:3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth:1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  }
});
const styles2 = StyleSheet.create({
  container:{
    height: '100%',
    marginBottom: 50
  },
  list: {
    padding:5
  },
  separator: {
    marginBottom: 30,
  },
  /******** card **************/
  card:{
    width:'100%',
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:'#F8F8F8'
  },
  cardHeader: {
    width: '100%',
    // height: '100%',
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },


  /******** card components **************/
  title:{
    fontSize: getAdjustedFontSize(18),
    color: '#285DB3',
    position:'absolute',
    right: 10
  },
  description:{
    fontSize: getAdjustedFontSize(11),
    color:"#888",
    marginTop:5
  },
  newprice:{
    fontSize: getAdjustedFontSize(24),
    color: "#808080",
    fontWeight: "600",
  },
  discount:{
    fontSize: getAdjustedFontSize(14),
    color: "#808080",
    marginTop: 10,
    marginLeft: 5
  },
  timeContainer:{
    marginBottom:5,
    flexDirection:'row'
  },
  clientName:{
    fontSize: getAdjustedFontSize(18),
    alignSelf: 'flex-start'
  }

});
