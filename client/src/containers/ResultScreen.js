import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreators from '../actions';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import log from 'loglevel';
import { createText } from '../styles';

class ResultScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.emptyImage = 'https://s3.ap-northeast-2.amazonaws.com/testhyy/no_image_big.png';
  }

  getLocationTypeName(typeId) {
    // Food = 39, House = 32, Sights = 12
    if (typeId === 39) {
      return '맛집';
    } else if (typeId === 32) {
      return '숙박';
    } else if (typeId === 12) {
      return '명소';
    }
  }

  getLocationImageRes(typeId) {
    // Food = 39, House = 32, Sights = 12
    if (typeId === 39) {
      return require('../../img/food_track.png');
    } else if (typeId === 32) {
      return require('../../img/hotel_track.png');
    } else if (typeId === 12) {
      return require('../../img/tour_track.png');
    }
  }

  getBackgroundColor(typeId) {
    // Food = 39, House = 32, Sights = 12
    if (typeId === 39) {
      return { backgroundColor: '#ffcc00' };
    } else if (typeId === 32) {
      return { backgroundColor: '#1ec05a' };
    } else if (typeId === 12) {
      return { backgroundColor: '#ff9711' };
    }
  }

  tryPostLocationList() {
    this.props.postLocationList(this.props.selectLocationList);
  }

  renderCard() {
    return this.props.selectLocationList.map((location, i) =>
      <View key={i} style={s.card}>
        <View style={[s.label, this.getBackgroundColor(location.contenttypeid)]}>
          <Text style={createText('bold', 'white', 12)}>{this.getLocationTypeName(location.contenttypeid)}</Text>
        </View>
        <Image style={{ width: 40, height: 40, marginLeft: 9 }} source={this.getLocationImageRes(location.contenttypeid)}/>

        {location.firstimage ?
          <Image style={s.cardImage} source={{ uri: location.firstimage }}>
            <View style={s.cardInfoBox}>
              <Text style={[createText('bold', 'white', 14), { marginBottom: 2 }]}>{location.title}</Text>
              <Text style={createText('default', 'white', 12)}>{location.addr1}</Text>
            </View>
          </Image>
          :
          <Image style={s.cardImage} source={require('../../img/no_image.png')}>
            <View style={s.cardInfoBox}>
              <Text style={[createText('bold', 'white', 14), { marginBottom: 2 }]}>{location.title}</Text>
              <Text style={createText('default', 'white', 12)}>{location.addr1}</Text>
            </View>
          </Image>
        }
      </View>
    )
  }

  render() {
    const { name } = this.props.user;
    const mainArea = this.props.selectAreaInfo.mainArea.name;
    const subArea = this.props.selectAreaInfo.subArea.name;

    return (
      <View style={{ flex: 1 }}>
        <View style={s.header}>
          <Image style={s.profileImage} source={require('../../img/my_page.png')}/>

          <View style={{ marginLeft: 21 }}>
            <Text style={createText('bold', 'white', 18)}>{name} 님</Text>
            <Text style={createText('bold', 'white', 16)}>{mainArea} ❯ {subArea}</Text>
            <Text style={[createText('default', 'white', 14), { marginTop: 8 }]}>총 {this.props.selectLocationList.length}개의 셀렉션이 있습니다</Text>
          </View>
        </View>


        <ScrollView style={{ marginBottom: 50 }}>
          <View style={s.verticalLine}/>

          {this.renderCard()}
        </ScrollView>

        <View style={{ height: 52, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <TouchableOpacity style={s.selectButton} onPress={() => this.tryPostLocationList()}>
            <Text style={createText('bold', 'lightBlue', 16)}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 115,
    paddingLeft: 12,
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#84bcf9',
  },
  profileImage: {
    width: 61,
    height: 61,
    marginLeft: 23,
  },
  card: {
    height: 195,
    flexDirection: 'row',
    paddingTop: 27,
    paddingBottom: 35,
  },
  label: {
    width: 32,
    height: 18,
    borderRadius: 100,
    marginTop: 5,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    flex: 1,
    height: 133,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    marginLeft: 16,
    marginRight: 21,
    borderRadius: 8,
    backgroundColor: "#d8d8d8",
  },
  cardInfoBox: {
    marginLeft: 12,
    marginBottom: 6,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 1,
  },
  verticalLine: {
    width: 10,
    borderLeftWidth: 1,
    borderColor: '#d4d4d4',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 71
  },
  selectButton: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  }
});

function mapStateToProps(state) {
  return {
    user: state.user,
    selectLocationList: state.selectLocationList,
    selectAreaInfo: state.selectAreaInfo,
    travelOption: state.travelOption,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
