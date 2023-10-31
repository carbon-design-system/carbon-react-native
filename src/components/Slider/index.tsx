import React from 'react';
import { LayoutChangeEvent, PanResponder, PanResponderGestureState, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { defaultText } from '../../constants/defaultText';
import { styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

/** Props for Slider component */
export type SliderProps = {
  /** Text to render */
  label: string;
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
  /** Indicate if range labels should be hidden */
  hideRangeLabels?: boolean;
  /** Change event returns the current value of the item */
  onChange?: (value: number) => void;
  /** Text to use for slider (accessibility). Defaults to ENGLISH "Slider" */
  accessibleText?: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
};

/**
 * Slider component for rendering a slider between numbers
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Slider.tsx | Example code}
 */
export class Slider extends React.Component<SliderProps> {
  private barWidth: number | undefined;

  state = {
    active: false,
  };

  private _panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderStart: () => this.onStart(),
    onPanResponderMove: (_event, gestureState) => this.onMove(gestureState),
    onPanResponderEnd: () => this.onEndMove(),
    onPanResponderTerminate: () => this.onEndMove(),
  });

  private onStart() {
    this.setState({ active: true });
  }

  private onMove(gestureState: PanResponderGestureState) {
    const { value } = this.props;
    const newDeltaValue = this.getValueFromOffset(gestureState.dx);
    const cappedValue = this.capValueWithinRange(value + newDeltaValue);

    gestureState.dx = 0;

    this.setState({ active: true });
    this.onSliderValueChanged(cappedValue, true);
  }

  private onEndMove() {
    const { value } = this.props;
    const cappedValue = this.capValueWithinRange(value);

    this.setState({ active: false });
    this.onSliderValueChanged(cappedValue, true);
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

    if (this.barWidth === undefined) {
      return 0;
    }

    return ((maxValue - minValue) * offset) / this.barWidth;
  };

  private getOffsetFromValue = (value: number) => {
    const { minValue, maxValue } = this.props;

    if (this.barWidth === undefined) return 0;

    const valueOffset = value - minValue;
    const totalRange = maxValue - minValue;
    const percentage = valueOffset / totalRange;

    return this.barWidth * percentage;
  };

  private onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;

    this.barWidth = width;

    this.forceUpdate();
  };

  private onChangeText = (inputValue: string): void => {
    const { minValue, maxValue } = this.props;

    let value = Number(inputValue);

    if (Number.isNaN(value)) {
      value = 0;
    }

    if (value < minValue) {
      value = minValue;
    }

    if (value > maxValue) {
      value = maxValue;
    }

    this.onSliderValueChanged(value, false);
  };

  private onSliderValueChanged(value: number, setInputText: boolean) {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(value);
    }

    if (setInputText) {
      this.setState({ inputValue: value.toString() });
    }
  }

  private get styles() {
    const { disabled } = this.props;
    const { active } = this.state;
    const currentKnobSize = active ? 20 : 14;

    return StyleSheet.create({
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
      },
      sliderOuterWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      sliderWrapper: {
        height: 48,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      sliderBar: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 2,
        backgroundColor: getColor('borderSubtle00'),
        marginLeft: 16,
        marginRight: 16,
      },
      sliderProgress: {
        height: '100%',
        backgroundColor: getColor(disabled ? 'borderDisabled' : active ? 'interactive' : 'borderInverse'),
      },
      sliderKnob: {
        position: 'absolute',
        width: currentKnobSize,
        height: currentKnobSize,
        backgroundColor: getColor(disabled ? 'borderDisabled' : active ? 'interactive' : 'iconPrimary'),
        borderRadius: currentKnobSize / 2,
        marginLeft: -(currentKnobSize / 2),
        marginRight: -(currentKnobSize / 2),
      },
      sliderRangeLabel: {
        color: getColor(disabled ? 'textDisabled' : 'textPrimary'),
      },
      textInput: {
        paddingTop: 0,
        marginLeft: 16,
        minWidth: 72,
      },
      label: {
        color: getColor(disabled ? 'textDisabled' : 'textSecondary'),
      },
    });
  }

  private rangeLabel(value: number): React.ReactNode {
    const { hideRangeLabels } = this.props;

    if (hideRangeLabels) {
      return null;
    }

    return <Text style={this.styles.sliderRangeLabel} type="code-02" text={value.toString()} />;
  }

  private get slider(): React.ReactNode {
    const { value, minValue, maxValue, disabled } = this.props;
    const cappedValue = this.capValueWithinRange(value);
    const offset = this.getOffsetFromValue(cappedValue);

    return (
      <View style={this.styles.sliderWrapper}>
        {this.rangeLabel(minValue)}
        <View style={this.styles.sliderBar} onLayout={this.onLayout}>
          <View style={[this.styles.sliderProgress, { width: offset }]} />
          <View style={[this.styles.sliderKnob, { left: offset }]} {...(!disabled ? this._panResponder.panHandlers : {})} />
        </View>
        {this.rangeLabel(maxValue)}
      </View>
    );
  }

  render(): React.ReactNode {
    const { label, disabled, hideLabel, hideTextInput, accessibleText, style, value } = this.props;

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityLabel={accessibleText || defaultText.slider} accessibilityHint={label}>
        {!hideLabel && <Text style={this.styles.label} type="label-01" text={label} />}
        <View style={this.styles.sliderOuterWrapper}>
          {this.slider}
          {!hideTextInput && <TextInput style={this.styles.textInput} value={String(value)} disabled={disabled} onChangeText={this.onChangeText} componentProps={{ keyboardType: 'number-pad' }} />}
        </View>
      </View>
    );
  }
}
