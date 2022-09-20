import React from 'react';
import { LayoutChangeEvent, PanResponder, PanResponderGestureState, StyleProp, StyleSheet, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { TextInput } from 'carbon-react-native';
import { defaultText } from '../../constants/defaultText';
import { styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';

const sliderWrapperHeight = 48;
const sliderKnobSize = 14;

export type SliderProps = {
  /** Text to render */
  label: string;
  /** ID of item (any identifier to identify the slider) */
  id: string;
  /** Current value */
  value: number;
  /** Minimum Value */
  minValue: number;
  /** Maximum Value */
  maxValue: number;
  /** Indicate if disabled */
  disabled?: boolean;
  /** Indicate if label should be hidden (label is used for accessibility even when hidden)  */
  hideLabel?: boolean;
  /** Indicate if text input should be hidden */
  hideTextInput?: boolean;
  /** onValueChanged event returns the current value and ID of the item */
  onValueChanged?: (value: number, id: string) => void;
  /** Text to use for slider (accessibility). Defaults to ENGLISH "Slider" */
  accessibleText?: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
};

export class Slider extends React.Component<SliderProps> {
  state = {
    barWidth: null,
    deltaValue: 0,
    value: this.props.value,
    inputValue: this.props.value.toString(),
  };

  private panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderStart: () => this.onStart(),
    onPanResponderMove: (_, gestureState) => this.onMove(gestureState),
    onPanResponderEnd: () => this.onEndMove(),
    onPanResponderTerminate: () => this.onEndMove(),
  });

  private onStart() {
    this.setState({ deltaValue: 0 });
  }

  private onMove(gestureState: PanResponderGestureState) {
    const { value } = this.state;

    const newDeltaValue = this.getValueFromOffset(gestureState.dx);
    const cappedValue = this.capValueWithinRange(value + newDeltaValue);

    gestureState.dx = 0;

    this.setState({ value: cappedValue, deltaValue: 0 });

    this.onSliderValueChanged();
  }

  private onEndMove() {
    const { value, deltaValue } = this.state;

    const cappedValue = this.capValueWithinRange(value + deltaValue);

    this.setState({ value: cappedValue, deltaValue: 0 });

    this.onSliderValueChanged();
  }

  private capValueWithinRange = (value: number) => {
    const { minValue, maxValue } = this.props;

    let rounded = Math.round(value);

    if (rounded < minValue) {
      return minValue;
    }

    if (rounded > maxValue) {
      return maxValue;
    }

    return rounded;
  };

  private getValueFromOffset = (offset: number) => {
    const { minValue, maxValue } = this.props;
    const { barWidth } = this.state;

    if (barWidth === null) return 0;

    return ((maxValue - minValue) * offset) / barWidth;
  };

  private getOffsetFromValue = (value: number) => {
    const { minValue, maxValue } = this.props;
    const { barWidth } = this.state;

    if (barWidth === null) return 0;

    const valueOffset = value - minValue;
    const totalRange = maxValue - minValue;
    const percentage = valueOffset / totalRange;

    return barWidth * percentage;
  };

  private onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;

    this.setState({ barWidth: width });
  };

  private onChangeText = (inputValue: string): void => {
    const { minValue, maxValue } = this.props;

    if (inputValue === '') {
      this.setState({ value: 0, inputValue: '' });

      return;
    }

    let value = Number(inputValue);

    if (!Number.isNaN(value)) {
      if (value < minValue) {
        value = 0;
      }

      if (value > maxValue) {
        value = maxValue;
      }

      this.setState({ value: value, inputValue: value.toString() });
    }
  };

  private onBlur = (): void => {
    const { value } = this.state;

    this.setState({ inputValue: value.toString() });
  };

  private onSliderValueChanged() {
    const { id, onValueChanged } = this.props;
    const { value } = this.state;

    if (typeof onValueChanged === 'function') {
      onValueChanged(value, id);
    }

    this.setState({ inputValue: value.toString() });
  }

  private get styles() {
    const { disabled } = this.props;

    return StyleSheet.create({
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
      },
      sliderOuterWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      sliderWrapper: {
        height: sliderWrapperHeight,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      sliderBar: {
        position: 'relative',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 2,
        backgroundColor: getColor('iconDisabled'),
        marginLeft: 16,
        marginRight: 16,
      },
      sliderProgress: {
        height: '100%',
        backgroundColor: getColor(disabled ? 'iconDisabled' : 'iconPrimary'),
      },
      sliderKnob: {
        position: 'absolute',
        width: sliderKnobSize,
        height: sliderKnobSize,
        backgroundColor: getColor(disabled ? 'iconDisabled' : 'iconPrimary'),
        borderRadius: sliderKnobSize / 2,
        marginLeft: -(sliderKnobSize / 2),
        marginRight: -(sliderKnobSize / 2),
      },
      sliderRangeLabel: {
        color: getColor(disabled ? 'textDisabled' : 'textPrimary'),
        lineHeight: sliderWrapperHeight,
      },
      valueStyle: {
        marginStart: 16,
        marginTop: -22,
      },
    });
  }

  private get textStyle(): StyleProp<TextStyle> {
    const { disabled } = this.props;

    let finalStyle: any = {
      color: getColor(disabled ? 'textDisabled' : 'textPrimary'),
      lineHeight: 20,
      marginBottom: 8,
    };

    return StyleSheet.create(finalStyle);
  }

  private get slider(): React.ReactNode {
    const { minValue, maxValue, disabled } = this.props;
    const { value, deltaValue } = this.state;

    const cappedValue = this.capValueWithinRange(value + deltaValue);

    const offset = this.getOffsetFromValue(cappedValue);

    return (
      <View style={this.styles.sliderWrapper}>
        <Text style={this.styles.sliderRangeLabel} text={minValue.toString()} />
        <View style={this.styles.sliderBar} onLayout={this.onLayout}>
          <View style={[this.styles.sliderProgress, { width: offset }]} />
          <View style={[this.styles.sliderKnob, { left: offset }]} {...(!disabled ? this.panResponder.panHandlers : {})} />
        </View>
        <Text style={this.styles.sliderRangeLabel} text={maxValue.toString()} />
      </View>
    );
  }

  render(): React.ReactNode {
    const { label, disabled, hideLabel, hideTextInput, accessibleText, style } = this.props;
    const { inputValue } = this.state;

    let componentProps: TextInputProps = {
      keyboardType: 'number-pad',
    };

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityLabel={accessibleText || defaultText.slider} accessibilityHint={label}>
        {!hideLabel && <Text style={this.textStyle} text={label} />}
        <View style={this.styles.sliderOuterWrapper}>
          {this.slider}
          {!hideTextInput && <TextInput style={this.styles.valueStyle} value={inputValue} disabled={disabled} onChangeText={this.onChangeText} onBlur={this.onBlur} componentProps={componentProps} />}
        </View>
      </View>
    );
  }
}
