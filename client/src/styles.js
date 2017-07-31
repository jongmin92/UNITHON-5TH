import ReactNative from 'react-native';

const {
  Dimensions,
  StyleSheet,
} = ReactNative;

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

// 제플린의 색깔을 정의하라.
export const colors = {
  white: '#ffffff',
  lightBlue: '#84bcf9',
  lightGray: '#cccccc',
  lightGreen: '#1ec05a',
  lightRed: '#F86141',
  boldGray: '#9b9b9b',
};

// 제플린의 fontWeight 를 정의하라.
const fontWeight = {
  'default': '500',
  regular: '400',
  bold: 'bold',
};

// font size 에 따른 lineHeight 를 정의하라.
const fontLineHeight = {
  '18': 24,
  '24': 34,
  '12': 14,
  '14': 16,
  '10': 12,
  '32': 40,
  '16': 22,
  '8': 10,
};

// text 스타일을 리턴한다. 'bold', 'color', 'size'
export const createText = (weightName = 'default', colorName = 'default',
  size = 24) => {
  let color = '';
  let fontStyle = 'normal';
  if (fontWeight[weightName] === undefined) {
    if (weightName === 'italic') {
      fontStyle = 'italic';
    }
    else {
      console.warn('weightName 이 올바르지 않습니다. styles.js 참고하세요');
    }
    weightName = 'default';
  }


  if (colors[colorName] === undefined) {
    color = colorName;
  }
  else {
    color = colors[colorName];
  }

  return {
    fontSize: size,
    lineHeight: fontLineHeight[`${size}`],
    fontWeight: fontWeight[weightName],
    color: color,
    fontStyle: fontStyle,
    backgroundColor: 'transparent',
  };
};

// css width %
export const percentX = (number) => {
  return Number((deviceWidth * number / 100).toFixed(3));
};

// css height %
export const percentY = (number) => {
  return Number((deviceHeight * number / 100).toFixed(3));
};

// css border 와 비슷 색깔도 정할 수 있다.
export const border = (px, color) => {
  let borderColor = '';
  if (colors[color] !== undefined) {
    borderColor = colors[color];
  }
  else {
    borderColor = color;
  }
  return {
    borderWidth: px,
    borderColor: borderColor,
  }
};

export const gs = StyleSheet.create({
  onParent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  navigationTransitioner: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  appContainerView: {
    flex: 1,
    position: 'relative',
  },
  scene: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'transparent'
  },
  textCenter: {
    textAlign: 'center',
  },
  radius: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  networkDisconnected: {
    width: percentX(100),
    height: percentY(100),
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  row: {
    flexDirection: 'row',
  },
  fpRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  fpCol: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  fp: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  fc: {
    flex: 1,
  },
  fcStretch: {
    alignSelf: 'stretch',
  },
  fcCenter: {
    alignSelf: 'center',
  },
  fpCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    position: 'absolute',
    width: percentX(100),
    height: percentY(100),
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    paddingBottom: 30,
  },
  border: {
    borderColor: 'red',
    borderWidth: 1
  },
});
