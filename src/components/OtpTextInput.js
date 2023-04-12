import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';
import fonts from '../constants/fonts';

const AutoFocus = props => {
  // useFocusEffect(() => {
  //     props.setFocus()
  // })
  return <View />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    height: getScreenHeight(10),
    width: getScreenWidth(12),
    borderBottomWidth: 4,
    textAlign: 'center',
    fontSize: getScreenHeight(2),
    fontWeight: '500',
    color: '#000000',
  },
  textmainstyles: {
    width: getScreenHeight(4),
    textAlign: 'center',
    fontSize: getScreenHeight(2),
    height: getScreenHeight(8),
    color: 'white',
      fontFamily: fonts.medium,
      borderColor: "white",
    borderBottomWidth: getScreenHeight(0.1)
  },
});

const getOTPTextChucks = (inputCount, inputCellLength, text) => {
  let otpText =
    text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || [];

  otpText = otpText.slice(0, inputCount);

  return otpText;
};

class OTPTextView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 0,
      otpText: getOTPTextChucks(
        props.inputCount,
        props.inputCellLength,
        props.defaultValue,
      ),
    };

    this.setFocus = this.setFocus.bind(this);
    this.inputs = [];
  }

  componentDidMount() {
    this.clear();
  }

  setFocus = () => {
    if (this.state.otpText.length === 6 && this.state.otpText[5] !== '') {
      this.inputs[this.state.otpText.length - 1].focus();
    }
  };

  basicValidation = text => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };

  onTextChange = (text, i) => {
    const {inputCellLength, inputCount, handleTextChange} = this.props;

    if (text && !this.basicValidation(text)) {
      return;
    }

    this.setState(
      prevState => {
        let {otpText} = prevState;

        otpText[i] = text;
        return {
          otpText,
        };
      },
      () => {
        handleTextChange(this.state.otpText.join(''));
        if (text.length === inputCellLength && i !== inputCount - 1) {
          this.inputs[i + 1].focus();
        }
      },
    );
  };

  onInputFocus = i => {
    const {otpText} = this.state;

    const prevIndex = i - 1;

    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
      this.inputs[prevIndex].focus();
      return;
    }

    this.setState({focusedInput: i});
  };

  onKeyPress = (e, i) => {
    const val = this.state.otpText[i] || '';
    let temp = this.state.otpText;
    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      if (!(val.length - 1)) {
        this.inputs[i].focus();
      } else {
        this.inputs[i - 1].focus();
        temp.splice(i - 1, 1, '');
      }
    }
  };

  clear = () => {
    this.setState(
      {
        otpText: [],
      },
      () => {
        this.inputs[0].focus();
      },
    );
  };

  setValue = value => {
    const {inputCount, inputCellLength} = this.props;
    this.setState(
      {
        otpText: getOTPTextChucks(inputCount, inputCellLength, value),
      },
      () => {
        this.props.handleTextChange(value);
      },
    );
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      inputCellLength,
      containerStyle,
      textInputStyle,
      keyboardType,
      ...textInputProps
    } = this.props;

    const {focusedInput, otpText} = this.state;

    const TextInputs = [];

    for (let i = 0; i < inputCount; i += 1) {
      const inputStyle = [
        styles.textInput,
        textInputStyle,
        {borderColor: offTintColor},
      ];

      if (focusedInput === i) {
        inputStyle.push({borderColor: tintColor});
      }

      TextInputs.push(
        <TextInput
          ref={e => {
            this.inputs[i] = e;
          }}
          key={i}
          allowFontScaling={false}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoFocus={false}
          value={otpText[i] || ''}
          style={[styles.textmainstyles, {color: this.props.black ? "black" : "white", borderColor: this.props.black ? "black" : "white"}]}
          maxLength={this.props.inputCellLength}
          onFocus={() => this.onInputFocus(i)}
          onChangeText={text => this.onTextChange(text, i)}
          multiline={false}
          onKeyPress={e => this.onKeyPress(e, i)}
          {...textInputProps}
          blurOnSubmit={true}
        />,
      );
    }

    return (
      <View>
        <View style={[styles.container, containerStyle]}>{TextInputs}</View>
        <AutoFocus setFocus={this.setFocus} />
      </View>
    );
  }
}

OTPTextView.propTypes = {
  defaultValue: PropTypes.string,
  inputCount: PropTypes.number,
  containerStyle: PropTypes.any,
  textInputStyle: PropTypes.any,
  inputCellLength: PropTypes.number,
  tintColor: PropTypes.string,
  offTintColor: PropTypes.string,
  handleTextChange: PropTypes.func,
  inputType: PropTypes.string,
  keyboardType: PropTypes.string,
};

OTPTextView.defaultProps = {
  defaultValue: '',
  inputCount: 4,
  tintColor: 'white',
  offTintColor: 'white',
  inputCellLength: 1,
  containerStyle: {},
  textInputStyle: {},
  handleTextChange: () => {},
  keyboardType: 'numeric',
};

export default OTPTextView;