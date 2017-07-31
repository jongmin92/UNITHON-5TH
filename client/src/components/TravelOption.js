import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, TextInput, StyleSheet } from 'react-native';
import { createText } from '../styles';
import log from 'loglevel';

class TravelOption extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getBackgroundRes(label) {
    if (label === '맛집') {
      return require('../../img/food.png');
    } else if (label === '숙박') {
      return require('../../img/hotel.png');
    } else if (label === '관광') {
      return require('../../img/tourist_attraction.png');
    }
  }

  render() {
    const { label, valueName, count } = this.props;

    return (
      <ImageBackground style={s.selectOptionRow} source={this.getBackgroundRes(label)} resizeImage='center'>
        <Text style={[createText('bold', 'white', 20), { marginLeft: 25 }]}>{label}</Text>

        <View style={{ flexDirection: 'row', marginRight: 26, alignItems: 'center', }}>
          <TouchableOpacity style={s.circleButton} onPress={() => this.props.countDiff(valueName, -1)}>
            <Text style={createText('bold', 'white', 12)}>-</Text>
          </TouchableOpacity>
          <View style={s.countBox}>
            <Text style={createText('bold', '#6d6d6d', 18)}>
              {count.toString()}
            </Text>
          </View>
          <TouchableOpacity style={s.circleButton} onPress={() => this.props.countDiff(valueName, 1)}>
            <Text style={createText('bold', 'white', 12)}>+</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const s = StyleSheet.create({
  selectOptionRow: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleButton: {
    width: 25,
    height: 25,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBox: {
    width: 45,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
  }
});

export default TravelOption;
