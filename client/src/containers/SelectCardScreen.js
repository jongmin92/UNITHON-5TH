import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreators from '../actions';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import SwipeCards from 'react-native-swipe-cards';
import tourApi from '../lib/tourApi';
import log from 'loglevel';
import { colors, createText, gs } from '../styles';

let Card = React.createClass({
  render() {
    let { title, firstimage, tel, addr1 } = this.props;
    firstimage = firstimage || 'https://s3.ap-northeast-2.amazonaws.com/testhyy/no_image_big.png';

    return (
      <View style={s.card}>
        <Image style={s.cardImage} source={{ uri: firstimage }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
            <Image style={{ width: 54, height: 61 }} source={require('../../img/dislike.png')}/>
            <View style={{ flex: 1, paddingBottom: 14, }}>
              <Text style={[{ marginBottom: 4 }, createText('bold', 'white', 14)]}>{title}</Text>
              <View style={s.line}/>
              <Text style={[{ marginBottom: 3 }, createText('default', 'white', 12)]}>{addr1}</Text>
              <Text style={createText('default', 'white', 12)}>{tel}</Text>
            </View>
            <Image style={{ width: 54, height: 61 }} source={require('../../img/like.png')}/>
          </View>
        </Image>
      </View>
    )
  }
});

let NoData = React.createClass({
  render() {
    return (
      <View style={{ alignItems: 'center', }}>
        <Text>해당 데이터가 없습니다.</Text>
        <TouchableOpacity
          style={{ backgroundColor: colors.lightGray, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginTop: 10, height: 30, }}
          onPress={() => {this.props.jumpCount()}}>
          <Text>건너뛰기</Text>
        </TouchableOpacity>
      </View>
    )
  }
});

class SelectCardScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      curTabIndex: 0, // 0 = 맛집 | 1 = 숙박 | 2 = 관광
      areaFoodList: [],
      areaHouseList: [],
      areaSightsList: [],
      curCardList: [],

      curFoodCount: 0,
      curHouseCount: 0,
      curSightsCount: 0,
    };
    this.getTravelAllData = this.getTravelAllData.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    this.getTravelAllData()
      .then(res => {
        //log.warn('0', res[0].data.response.body);
        //log.warn('1', res[1].data.response.body);
        //log.warn('2', res[2].data.response.body);
        const areaFoodList = [...res[0].data.response.body.items.item];
        const areaHouseList = [...res[1].data.response.body.items.item];
        const areaSightsList = [...res[2].data.response.body.items.item];

        this.setState({
          curCardList: areaFoodList,
          areaFoodList,
          areaHouseList,
          areaSightsList
        });
      })
      .catch(err => log.warn(err));
  }

  getTravelAllData() {
    // Food = 39, House = 32, Sights = 12
    const { mainArea, subArea } = this.props.selectAreaInfo;
    const areaCode = mainArea.code;
    const sigunguCode = subArea.code;

    const getAreaBasedFood = tourApi.getAreaBasedData(areaCode, sigunguCode, 39);
    const getAreaBasedHouse = tourApi.getAreaBasedData(areaCode, sigunguCode, 32);
    const getAreaBasedSights = tourApi.getAreaBasedData(areaCode, sigunguCode, 12);

    return Promise.all([getAreaBasedFood, getAreaBasedHouse, getAreaBasedSights])
  }

  changeTab(tabIndex) {
    log.warn('this.state', this.state);

    if (tabIndex === 0) {
      this.setState({ curTabIndex: tabIndex, curCardList: this.state.areaFoodList });
    } else if (tabIndex === 1) {
      this.setState({ curTabIndex: tabIndex, curCardList: this.state.areaHouseList });
    } else if (tabIndex === 2) {
      this.setState({ curTabIndex: tabIndex, curCardList: this.state.areaSightsList });
    }
    log.warn('changeTab', this.state.curCardList);
  }

  saveCard(item) {
    //log.warn('saveCard', item);
    this.updateCount(item.contenttypeid);
    this.props.selectLocation(item);
    //this.updateTab(item.contenttypeid);
  }

  rejectCard(item) {
    //log.warn('rejectCard', item);
  }

  tabBoldText(index) {
    if (this.state.curTabIndex === index) {
      return { color: colors.lightBlue };
    } else {
      return null;
    }
  }

  updateCount(typeId) {
    // Food = 39, House = 32, Sights = 12
    if (typeId === 39) {
      this.setState({ curFoodCount: this.state.curFoodCount + 1 }, () => this.updateTab());
    } else if (typeId === 32) {
      this.setState({ curHouseCount: this.state.curHouseCount + 1 }, () => this.updateTab());
    } else if (typeId === 12) {
      this.setState({ curSightsCount: this.state.curSightsCount + 1 }, () => this.updateTab());
    }
  }

  updateTab() {
    const { foodCount, houseCount, sightsCount } = this.props.travelOption;

    if (this.state.curSightsCount >= sightsCount) {
      Actions.Result();
    } else if (this.state.curHouseCount >= houseCount) {
      if (this.state.areaSightsList.length === 0) {
        Alert.alert('해당 지역의 관광 카테고리 데이터가 없어 다음 과정을 진행합니다.');
        Actions.Result();
      } else {
        this.setState({ curTabIndex: 2 });
      }
      this.changeTab(2);
    } else if (this.state.curFoodCount >= foodCount) {
      let nextTab;
      if (this.state.areaHouseList && this.state.areaHouseList.length !== 0) {
        nextTab = 1;
      } else {
        Alert.alert('해당 지역의 숙박 카테고리 데이터가 없어 다음 과정을 진행합니다.');
        nextTab = 2;
      }

      this.setState({ curTabIndex: nextTab });
      this.changeTab(nextTab);
    }
  }

  jumpCount() {
    if (this.state.curTabIndex === 0) {
      this.setState({ curFoodCount: this.state.curFoodCount + 1 }, () => this.updateTab());
    } else if (this.state.curTabIndex === 1) {
      this.setState({ curHouseCount: this.state.curHouseCount + 1 }, () => this.updateTab());
    } else if (this.state.curTabIndex === 2) {
      this.setState({ curSightsCount: this.state.curSightsCount + 1 }, () => this.updateTab());
    }
  }

  render() {
    const { foodCount, houseCount, sightsCount } = this.props.travelOption;
    const { curFoodCount, curHouseCount, curSightsCount } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={s.header}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={createText('bold', 'lightBlue', 16)}>선호하는 사진은</Text>
            <Text style={createText('bold', 'lightGreen', 16)}> 오른쪽</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={createText('bold', 'lightBlue', 16)}>선호하지 않는 사진은</Text>
            <Text style={createText('bold', 'lightRed', 16)}> 왼쪽</Text>
            <Text style={createText('bold', 'lightBlue', 16)}>으로 넘겨주세요</Text>
          </View>
        </View>

        <View style={s.tabButtonContainer}>
          <View style={[{ flex: 1 }, this.state.curTabIndex === 0 ? s.selectedButton : null]}>
            <View style={s.tabButton}>
              <Text style={[createText('bold', 'boldGray', 14), this.tabBoldText(0)]}>
                맛집
              </Text>
              <Text style={createText('default', 'lightGray', 12)}>({curFoodCount}/{foodCount})</Text>
            </View>
          </View>

          <View style={[{ flex: 1 }, this.state.curTabIndex === 1 ? s.selectedButton : null]}>
            <View style={s.tabButton}>
              <Text style={[createText('bold', 'boldGray', 14), this.tabBoldText(1)]}>
                숙박
              </Text>
              <Text style={createText('default', 'lightGray', 12)}>({curHouseCount}/{houseCount})</Text>
            </View>
          </View>

          <View style={[{ flex: 1 }, this.state.curTabIndex === 2 ? s.selectedButton : null]}>
            <View style={s.tabButton}>
              <Text style={[createText('bold', 'boldGray', 14), this.tabBoldText(2)]}>
                관광
              </Text>
              <Text style={createText('default', 'lightGray', 12)}>({curSightsCount}/{sightsCount})</Text>
            </View>
          </View>
        </View>

        <SwipeCards
          cards={this.state.curCardList}
          loop={true}
          renderCard={(cardData) => <Card {...cardData}/>}
          renderNoMoreCards={() => <NoData jumpCount={this.jumpCount.bind(this)}/>}
          dragY={false}
          showYup={false}
          showNope={false}
          showMaybe={false}

          handleYup={this.saveCard.bind(this)}
          handleNope={this.rejectCard.bind(this)}
          //cardRemoved={this.cardRemoved}
        />

        <TouchableOpacity style={s.backButtonGroup}
                          onPress={() => {
                            Actions.pop();
                            this.props.clearSelecteLocationList();
                          }}>
          <Image style={{ width: 21, height: 17 }} source={require('../../img/back.png')}/>
          <Text style={[{ marginLeft: 10 }, createText('bold', 'boldGray', 16)]}>BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const s = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fafafa',
  },
  tabButtonContainer: {
    height: 53,
    flexDirection: 'row'
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedButton: {
    borderBottomWidth: 3,
    borderColor: colors.lightBlue,
  },
  card: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 15,
    marginVertical: 30,
  },
  cardImage: {
    flex: 1,
    width: 340,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    borderRadius: 8,
    backgroundColor: "#d8d8d8",
  },
  line: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: colors.white,
    marginBottom: 4,
  },
  backButtonGroup: {
    marginLeft: 15,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    selectAreaInfo: state.selectAreaInfo,
    travelOption: state.travelOption,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCardScreen);
