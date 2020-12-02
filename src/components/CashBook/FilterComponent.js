import React, {Component} from 'react';
import { ScrollView, Text, View, Image, FlatList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import i18n from "../../Language/i18n"
import { connect } from 'react-redux';
import { imageUrl } from '../../constants/API'
import {getAdjustedFontSize} from '../../Responsive/fontResponsive';

 

class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedValue: "All",
      selectedCategory: this.props.selectedCategory,
      category: this.props.category,
      active:0,
      data: [
        { title: "All", uuid: "" },
        { title: "Collected", uuid: 1 },
        { title: "Uncollected", uuid: 0 },
      ],
    };
  }

 

state = {
  isModalVisible: false,
  selectedValue: "All",
  selectedCategory: this.props.selectedCategory,
  category: this.props.category,
  active:0,
  data: [
    { title: "All", uuid: "" },
    { title: "Collected", uuid: 0 },
    { title: "Uncollected", uuid: 1 },
  ],
};

 

toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible});
};

 


// componentDidMount() {
//     this.setState(prevState => ({ data: prevState.data.concat(this.props.category) }))
// }

 

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

 

    return (
        <View style={{flexDirection: 'row',}}>
          {/*Filter*/}
          <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center',padding:10}}>
            <View style={{width: screenWidth/2+10}}>
              <TouchableOpacity 
                onPress={() => this.toggleModal()}
                activeOpacity={0.8}
              >
                <View style={{height:35, padding:10,paddingVertical: 25, backgroundColor: '#F8F8F8', borderRadius:10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                  <View style={{height:35,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontSize: getAdjustedFontSize(16)}}>{this.state.selectedValue}</Text>
                  </View>
                  <View style={{height: 10, width: 10}}>
                    <Image 
                      style={{ width: '100%', height: '100%', resizeMode: 'contain'}} 
                      source={require('../../assets/Images/dropdownArrow.svg')} 
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/*Modal*/}
          <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => this.toggleModal()}
            backdropOpacity={0.1}>
            <View style={{ position:'absolute',top: screenHeight/3.5,right: -10}}>
              <View style={{}}>
                <View style={{width: screenWidth/2+30, borderRadius: 10, padding: 10, backgroundColor: '#FFFFFF'}}>
                  <FlatList
                  
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    extraData={this.state.active}
                    ItemSeparatorComponent={() => (
                        <View style={{width: '100%', height: 1, backgroundColor: "#ECECEC"}}/>
                    )}
                    renderItem={ ({item: rowData, index,}) =>{
                       
                      return(
                        <View style={{ flexDirection: 'row',}}>
                          <TouchableOpacity 
                            style={{width: '100%',paddingVertical: 10,}}
                            activeOpacity={0.9} 
                            onPress={() =>{ this.setState({ active: index, selectedValue: rowData.title }); 
                            this.props.selectedCategory(rowData.uuid); this.toggleModal();}}
                          >
                            <Text 
                              style={{fontSize: 18, color: this.state.active === index ? '#285DB3' : '#707070'}}
                            >
                              {rowData.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                    )}}
                    keyExtractor={(item, index) => index}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
    );
  }
}

 

function mapStateToProps(state) {
  return {
    success: state.success ,
    error: state.error,
    message: state.message,
  };
}

 

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

 

export default connect(mapStateToProps,mapDispatchToProps)(FilterComponent);
 