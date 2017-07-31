import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Platform } from 'react-native';

import Login from './containers/LoginScreen';
import Join from './containers/JoinScreen';
import Area from './containers/AreaScreen';
import TravelOption from './containers/TravelOptionScreen';
import SelectCardScreen from './containers/SelectCardScreen';
import ResultScreen from './containers/ResultScreen';
import HistoryScreen from './containers/HistoryScreen';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: (Platform.OS === 'ios') ? 22 : 0, }}>
      <Scene key="Login" component={Login} hideNavBar/>
      <Scene key="Join" component={Join} hideNavBar/>
      <Scene key="Area" component={Area} hideNavBar/>
      <Scene key="TravelOption" component={TravelOption} hideNavBar/>
      <Scene key="SelectCard" component={SelectCardScreen} hideNavBar/>
      <Scene key="Result" component={ResultScreen} hideNavBar/>
      <Scene key="History" component={HistoryScreen} hideNavBar/>
    </Router>
  );
};

export default RouterComponent;
