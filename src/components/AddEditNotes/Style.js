import { StyleSheet, Dimensions, Platform} from 'react-native';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';

const sysWidth = Dimensions.get('window').width;
const sysHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: '#ffffff'
  },
  header:{
  	position: 'relative', 
  	backgroundColor:'#23BDE4', 
  	top: 0, 
  	width: '100%', 
  	height: 60, 
  	justifyContent: 'center'
  },
  attachTextView:{
  	marginTop: 20,
    padding: 10
  },
  attachText:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(20)
  },
  imageView:{
    paddingHorizontal: 10,
  	flexDirection: 'row',
  	flex: 1,
    flexWrap: 'wrap',
  	// width: 300,
  	// height: 200
  },
  imageOneView:{
  	marginRight: 5,
  	borderRadius: 10,
  	height: 65,
  	width: 65,
  	marginTop: 10,
  	overflow: 'hidden',
  	position: 'relative'
  },
  image:{
  	height: '100%',
  	width: '100%',
  	resizeMode: 'cover'
  },
  plusWhiteSignViewBG:{
  	marginRight: 5,
  	borderRadius: 10,
  	height: 65,
  	width: 65,
  	overflow: 'hidden',
  	backgroundColor: '#D4D4D4',
  	marginTop: 10
  },
  plusWhiteSignView:{
  	borderRadius: 10,
  	height: 65,
  	width: 65,
  	overflow: 'hidden',
  	backgroundColor: '#D4D4D4',
  	justifyContent: 'center'
  },
  plusWhiteSign:{
  	alignSelf: 'center'
  },
  redButtonBG:{
  	position: 'absolute',
  	bottom: 4,
  	right: 4,
  	height: 18,
  	width: 18,
  	borderRadius: 9,
  	borderWidth: 2,
  	borderColor: '#ffffff',
  	overflow: 'hidden'
  },
  redButton:{
  	height: 20,
  	width: 20,
  	backgroundColor: '#FF0000'
  },
  contentView:{
    marginTop: 20,
    padding: 10
  },
  contentText:{
    color: '#6C6C6C',
    fontSize: getAdjustedFontSize(20)
  },
  contentInput: {
    backgroundColor: '#F8F8F8',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    fontSize: getAdjustedFontSize(15)
  },
  placeholdersStyle:{
    fontStyle: 'italic',
    fontSize: getAdjustedFontSize(15)
  },
  saveButton:{
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#23BDE4',
    width: '100%',
    height: 50
  },
  rightSign:{
    alignSelf: 'center'
  },
  saveText:{
    alignSelf: 'center',
    fontSize: getAdjustedFontSize(22),
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 20
  }
})



















