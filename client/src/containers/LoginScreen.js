import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreators from '../actions';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import log from 'loglevel';
import LinearGradient from 'react-native-linear-gradient';
import { createText } from '../styles';

class LoginScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
    };
    this.changeText = this.changeText.bind(this);
    this.tryLogin = this.tryLogin.bind(this);
  }

  changeText(evt, text) {
    this.setState({ [evt]: text });
  }

  tryLogin() {
    const { email, password } = this.state;

    if (email.length === 0) {
      Alert.alert('이메일을 입력해주세요.');
    } else if (password.length <= 3) {
      Alert.alert('비밀번호가 길이가 짧습니다.');
    } else {
      this.props.tryLogin(email, password);
    }
  }

  render() {
    return (
      <LinearGradient colors={['#95d3fe', '#8792f9']} style={s.container}>
        <Image style={s.profile} source={require('../../img/user_image.png')}/>

        <View style={s.inputContainer}>
          <View style={s.row}>
            <Image style={{ width: 20, height: 19, }} source={require('../../img/email.png')}/>
            <TextInput
              style={s.textInput}
              onChangeText={text => this.changeText('email', text)}
              value={this.state.email}
              underlineColorAndroid={'transparent'}
              autoCapitalize='none'
              multiline={false}
              placeholder={'Email'}
              placeholderTextColor="white"
            />
          </View>

          <View style={[s.row, { marginTop: 35 }]}>
            <Image style={{ marginLeft: 2, width: 17, height: 22, }} source={require('../../img/password_small.png')}/>
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

          <TouchableOpacity onPress={() => Actions.Join()}>
            <Text style={[createText('bold', 'white', 12), { marginTop: 10, alignSelf: 'flex-end' }]}>
              회원이 아니신가요?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.loginButton} onPress={() => this.tryLogin()}>
            <Text style={createText('bold', 'white', 14)}>LOGIN</Text>
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
  profile: {
    width: 90,
    height: 90,
    marginTop: 83,
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
    fontSize: 14
  },
  loginButton: {
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

export default connect(null, mapDispatchToProps)(LoginScreen);
