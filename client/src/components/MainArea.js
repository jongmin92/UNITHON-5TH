import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

class MainArea extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderMainAreaList() {
    if (this.props.area.length !== 0) {
      return this.props.area.map((area, i) =>
        <View key={i}>
          <TouchableOpacity style={s.areaItem} onPress={() => this.props.selectMainArea(area)}>
            <Text>
              {area.name}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={s.container}>
        <ScrollView>
          {this.renderMainAreaList()}
        </ScrollView>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    width: 109,
    borderRightWidth: 1,
    borderColor: '#dcdcdc',
  },
  areaItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 41,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
  },
});

export default MainArea;
