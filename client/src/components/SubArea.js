import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import log from 'loglevel';

class SubArea extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderSubAreaList() {
    if (this.props.area.length !== 0) {
      return this.props.area.districts.map((area, i) =>
        <View key={i} style={{ marginLeft: 25 }}>
          <TouchableOpacity style={s.areaItem} onPress={() => this.props.selectSubArea(area)}>
            <View style={s.row}>
              <Text>{area.name}</Text>
              <Text>></Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={s.container}>
        <ScrollView>
          {this.renderSubAreaList()}
        </ScrollView>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  areaItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 41,
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  }
});

export default SubArea;
