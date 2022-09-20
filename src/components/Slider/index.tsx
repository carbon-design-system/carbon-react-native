import React from 'react';
import { LayoutChangeEvent, PanResponder, PanResponderGestureState, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { TextInput } from 'carbon-react-native';
import { defaultText } from '../../constants/defaultText';

import { styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';

const SLIDER_WRAPPER_HEIGHT = 48;
const SLIDER_KNOB_SIZE = 20;

export type SliderProps = {
  /** Text to render */
  label: string;
  /** ID of item (any identifier to identify the checkbox) */
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
  /** Text to use for checkbox (accessibility). Defaults to ENGLISH "Checkbox"/"Radio button" depending on use */
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

    let value = Number(inputValue);

    if (!Number.isNaN(value)) {
      if (value < minValue) {
        value = 0;
      }

      if (value > maxValue) {
        value = maxValue;
      }

      this.setState({ value: value, inputValue: value.toString() });
    } else {
      this.setState({ value: 0, inputValue: '' });
    }
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
        height: SLIDER_WRAPPER_HEIGHT,
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
        width: '100%',
        height: 2,
        backgroundColor: getColor('iconDisabled'),
        overflow: 'visible',
        marginHorizontal: 16,
      },
      sliderProgress: {
        height: '100%',
        backgroundColor: getColor(disabled ? 'iconDisabled' : 'iconPrimary'),
      },
      sliderKnob: {
        position: 'absolute',
        width: SLIDER_KNOB_SIZE,
        height: SLIDER_KNOB_SIZE,
        backgroundColor: getColor(disabled ? 'iconDisabled' : 'iconPrimary'),
        borderRadius: SLIDER_KNOB_SIZE / 2,
        marginHorizontal: -(SLIDER_KNOB_SIZE / 2),
      },
      sliderRangeLabel: {
        color: getColor(disabled ? 'textDisabled' : 'textPrimary'),
        lineHeight: SLIDER_WRAPPER_HEIGHT,
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

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityLabel={accessibleText || defaultText.slider} accessibilityHint={label}>
        {!hideLabel && <Text type="body-compact-02" style={this.textStyle} text={label} />}
        <View style={this.styles.sliderOuterWrapper}>
          {this.slider}
          {!hideTextInput && <TextInput style={this.styles.valueStyle} value={inputValue} disabled={disabled} onChangeText={this.onChangeText} />}
        </View>
      </View>
    );
  }
}
