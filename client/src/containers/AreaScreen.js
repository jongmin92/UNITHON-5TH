import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreators from '../actions';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { createText } from '../styles';
import log from 'loglevel';
import tourApi from '../lib/tourApi';

import MainArea from '../components/MainArea';
import SubArea from '../components/SubArea';

class AreaScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedMainArea: [],
    };
    this.selectMainArea = this.selectMainArea.bind(this);
    this.selectSubArea = this.selectSubArea.bind(this);
  }

  componentDidMount() {
    this.props.getArea();
  }

  selectMainArea(mainArea) {
    this.setState({ selectedMainArea: mainArea });
  }

  selectSubArea(subArea) {
    //log.warn('selectSubArea -> mainArea', this.state);
    //log.warn('selectSubArea -> subArea', subArea);
    this.props.selectArea(this.state.selectedMainArea, subArea);
    Actions.TravelOption();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <View style={s.header}>
            <Text style={[createText('bold', 'white', 18)]}>지역선택 </Text>
            <TouchableOpacity style={s.profileImage} onPress={() => Actions.History()}>
              <Image style={{ width: 30, height: 30, }} source={require('../../img/my_page.png')}/>
            </TouchableOpacity>
          </View>

          <View style={s.areaContainer}>
            <MainArea
              area={this.props.area}
              selectMainArea={this.selectMainArea}
            />
            <SubArea
              area={this.state.selectedMainArea}
              selectSubArea={this.selectSubArea}
            />
          </View>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  header: {
    height: 57,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#84bcf9',
    paddingHorizontal: 14,
  },
  areaContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    position: 'absolute',
    width: 30,
    height: 30,
    right: 14
  }
});

function mapStateToProps(state) {
  return {
    area: state.areaList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaScreen);
