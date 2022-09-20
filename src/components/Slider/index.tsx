import React from 'react';
import { LayoutChangeEvent, PanResponder, PanResponderGestureState, StyleProp, StyleSheet, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { TextInput } from 'carbon-react-native';
import { defaultText } from '../../constants/defaultText';
import { styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';

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
  private barWidth: number | undefined;

  state = {
    deltaValue: 0,
    hover: false,
    value: this.props.value,
    inputValue: this.props.value.toString(),
  };

  private _panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderStart: () => this.onStart(),
    onPanResponderMove: (_, gestureState) => this.onMove(gestureState),
    onPanResponderEnd: () => this.onEndMove(),
    onPanResponderTerminate: () => this.onEndMove(),
  });

  private onStart() {
    this.setState({ hover: true, deltaValue: 0 });
  }

  private onMove(gestureState: PanResponderGestureState) {
    const { value } = this.state;

    const newDeltaValue = this.getValueFromOffset(gestureState.dx);
    const cappedValue = this.capValueWithinRange(value + newDeltaValue);

    gestureState.dx = 0;

    this.setState({ hover: true, value: cappedValue, deltaValue: 0 });

    this.onSliderValueChanged();
  }

  private onEndMove() {
    const { value, deltaValue } = this.state;

    const cappedValue = this.capValueWithinRange(value + deltaValue);

    this.setState({ hover: false, value: cappedValue, deltaValue: 0 });

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

    if (this.barWidth === undefined) return 0;

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
    const { hover } = this.state;

    const sliderWrapperHeight = 48;
    const defaultKnobSize = 14;
    const hoverKnobSize = 20;

    const currentKnobSize = hover ? hoverKnobSize : defaultKnobSize;

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
        backgroundColor: getColor('borderSubtle00'),
        marginLeft: 16,
        marginRight: 16,
      },
      sliderProgress: {
        height: '100%',
        backgroundColor: getColor(disabled ? 'borderDisabled' : hover ? 'interactive' : 'borderInverse'),
      },
      sliderKnob: {
        position: 'absolute',
        width: currentKnobSize,
        height: currentKnobSize,
        backgroundColor: getColor(disabled ? 'borderDisabled' : hover ? 'interactive' : 'iconPrimary'),
        borderRadius: currentKnobSize / 2,
        marginLeft: -(currentKnobSize / 2),
        marginRight: -(currentKnobSize / 2),
      },
      sliderRangeLabel: {
        fontSize: 14,
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
      fontSize: 12,
      color: getColor(disabled ? 'textDisabled' : 'textSecondary'),
      lineHeight: 12,
    };

    return StyleSheet.create(finalStyle);
  }

  private rangeLabel(value: number): React.ReactNode {
    return <Text style={this.styles.sliderRangeLabel} type="code-02" text={value.toString()} />;
  }

  private get slider(): React.ReactNode {
    const { minValue, maxValue, disabled } = this.props;
    const { value, deltaValue } = this.state;

    const cappedValue = this.capValueWithinRange(value + deltaValue);

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
    const { label, disabled, hideLabel, hideTextInput, accessibleText, style } = this.props;
    const { inputValue } = this.state;

    let componentProps: TextInputProps = {
      keyboardType: 'number-pad',
    };

    return (
      <View style={styleReferenceBreaker(this.styles.wrapper, style)} accessibilityLabel={accessibleText || defaultText.slider} accessibilityHint={label}>
        {!hideLabel && <Text style={this.textStyle} type="label-01" text={label} />}
        <View style={this.styles.sliderOuterWrapper}>
          {this.slider}
          {!hideTextInput && <TextInput style={this.styles.valueStyle} value={inputValue} disabled={disabled} onChangeText={this.onChangeText} onBlur={this.onBlur} componentProps={componentProps} />}
        </View>
      </View>
    );
  }
}
