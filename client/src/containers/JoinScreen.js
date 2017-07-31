import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreators from '../actions';
import { bindActionCreators } from 'redux';
import log from 'loglevel';
import LinearGradient from 'react-native-linear-gradient';
import { createText } from '../styles';

class JoinScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      username: '',
      password: '',
      rePassword: '',
      keyboardHeight: 0,
    };
    this.changeText = this.changeText.bind(this);
    this.tryJoin = this.tryJoin.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
      this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
      this._keyboardDidHide.bind(this));
  }

  _keyboardDidShow() {
    this.setState({
      keyboardHeight: 100,
    });
  }

  _keyboardDidHide() {
    this.setState({
      keyboardHeight: 0,
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDismiss() {
    Keyboard.dismiss();
  }

  changeText(evt, text) {
    this.setState({ [evt]: text });
  }

  tryJoin() {
    const { email, username, password, rePassword } = this.state;

    if (email.length === 0) {
      Alert.alert('이메일을 입력해주세요.');
    } else if (username.length === 0) {
      Alert.alert('사용자 이름을 입력해주세요.');
    } else if (password.length <= 3) {
      Alert.alert('비밀번호가 길이가 짧습니다.');
    } else if (password !== rePassword) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
    } else {
      this.props.tryJoin(email, username, password);
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <LinearGradient colors={['#95d3fe', '#8792f9']} style={[s.container, { bottom: this.state.keyboardHeight}]}>
        <View style={{ alignSelf: 'stretch', }}>
          <Text style={[createText("regular", "white", 50), { marginTop: 159, marginLeft: 55 }]}>Sign Up</Text>
        </View>

        <View style={s.inputContainer}>
          <View style={s.row}>
            <Image style={{ width: 20, height: 19, }} source={require('../../img/email.png')}/>
            <TextInput
              style={s.textInput}
              onChangeText={text => this.changeText('email', text)}
              value={this.state.email}
              keyboardType={'email-address'}
              underlineColorAndroid={'transparent'}
              autoCapitalize='none'
              multiline={false}
              placeholder={'Email'}
              placeholderTextColor="white"
            />
          </View>

          <View style={[s.row, { marginTop: 17 }]}>
            <Image style={{ marginLeft: 3, width: 17, height: 19, }} source={require('../../img/user_image_small.png')}/>
            <TextInput
              style={s.textInput}
              onChangeText={text => this.changeText('username', text)}
              value={this.state.username}
              underlineColorAndroid={'transparent'}
              autoCapitalize='none'
              multiline={false}
              placeholder={'Username'}
              placeholderTextColor="white"
            />
          </View>

          <View style={[s.row, { marginTop: 17 }]}>
            <Image style={{ marginLeft: 3, width: 17, height: 22, }} source={require('../../img/password_small.png')}/>
            <TextInput
              style={s.textInput}
              onChangeText={text => this.changeText('password', text)}
              value={this.state.password}
              underlineColorAndroid={'transparent'}
              autoCapitalize='none'
              multiline={false}
              placeholder={'Password'}
              placeholderTextColor="white"
              secureTextEntry={true}
              maxLength={10}
            />
          </View>

          <View style={[s.row, { marginTop: 17 }]}>
            <Image style={{ marginLeft: 3, width: 17, height: 22, }} source={require('../../img/password_small.png')}/>
            <TextInput
              style={s.textInput}
              onChangeText={text => this.changeText('rePassword', text)}
              value={this.state.rePassword}
              underlineColorAndroid={'transparent'}
              autoCapitalize='none'
              multiline={false}
              placeholder={'Password Confirm'}
              placeholderTextColor="white"
              secureTextEntry={true}
              maxLength={10}
            />
          </View>

          <TouchableOpacity style={s.joinButton} onPress={() => this.tryJoin()}>
            <Text style={createText('bold', 'white', 14)}>JOIN</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 57,
    marginTop: 46
  },
  row: {
    height: 40,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 12,
    color: 'white',
    fontSize: 14,
    alignItems: 'center',
  },
  joinButton: {
    alignSelf: 'stretch',
    height: 48,
    marginTop: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 24,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(JoinScreen);
