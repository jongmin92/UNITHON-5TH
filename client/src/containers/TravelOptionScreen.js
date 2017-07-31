import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreators from '../actions';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { createText } from '../styles';
import log from 'loglevel';

import TravelOption from '../components/TravelOption'

class TravelOptionScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      foodCount: 1,
      houseCount: 1,
      sightsCount: 1,
    };
    this.countDiff = this.countDiff.bind(this);
    this.saveAndGoNextPage = this.saveAndGoNextPage.bind(this);
    log.warn('###############', this.props);
  }

  countDiff(value, diff) {
    let { foodCount, houseCount, sightsCount } = this.state;
    let curCount = this.state[value];

    if (foodCount + houseCount + sightsCount >= 8 && diff === 1) {
      Alert.alert('최대 8개까지 선택 가능합니다.');
      return;
    }

    if (curCount <= 1 && diff === -1) {
      return;
    }

    this.setState({ [value]: curCount + diff });
  }

  saveAndGoNextPage() {
    const { foodCount, houseCount, sightsCount } = this.state;
    this.props.saveTravelOption(foodCount, houseCount, sightsCount);
    Actions.SelectCard();
  }

  render() {
    const { username } = this.props.user;
    const mainArea = this.props.selectAreaInfo.mainArea.name;
    const subArea = this.props.selectAreaInfo.subArea.name;

    return (
      <View style={{ flex: 1 }}>
        <View style={s.header}>
          <View>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Text style={createText('bold', 'white', 20)}>❮</Text>
            </TouchableOpacity>
          </View>

          <Image style={s.profileImage} source={require('../../img/my_page.png')}/>

          <View style={{ marginLeft: 21 }}>
            <Text style={createText('bold', 'white', 18)}>{username} 님</Text>
            <Text style={createText('bold', 'white', 16)}>{mainArea} ❯ {subArea}</Text>
            <Text style={[createText('default', 'white', 14), { marginTop: 8 }]}>최대 8개까지 선택 가능합니다</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <TravelOption
            label={'맛집'}
            valueName={'foodCount'}
            count={this.state.foodCount}
            countDiff={this.countDiff}
          />
          <TravelOption
            label={'숙박'}
            valueName={'houseCount'}
            count={this.state.houseCount}
            countDiff={this.countDiff}
          />
          <TravelOption
            label={'관광'}
            valueName={'sightsCount'}
            count={this.state.sightsCount}
            countDiff={this.countDiff}
          />
        </View>

        <View style={{ height: 52 }}>
          <TouchableOpacity style={s.selectButton} onPress={() => this.saveAndGoNextPage()}>
            <Text style={createText('bold', 'lightBlue', 16)}>SELECT</Text>
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
  selectOptionRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 61,
    height: 61,
    marginLeft: 23,
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
    selectAreaInfo: state.selectAreaInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelOptionScreen);
