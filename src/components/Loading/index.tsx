import React from 'react';
import { Animated, Easing, StyleProp, View, ViewStyle } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { getColor } from '../../styles/colors';
import { defaultText } from '../../constants/defaultText';
import { DimensionValue } from 'react-native';

export const centerLoadingStyle = {
  marginLeft: 'auto' as DimensionValue,
  marginRight: 'auto' as DimensionValue,
  marginTop: 20,
};

/** Props for Loading component */
export type LoadingProps = {
  /** Indicates type of loading spinner (large is default) */
  type?: 'large' | 'medium' | 'small';
  /** Text to use for loader (accessibility). Defaults to ENGLISH "Loading" */
  loadingText?: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
};

/**
 * Loading component for rendering a loading spinner
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Loading.tsx | Example code}
 */
export class Loading extends React.Component<LoadingProps> {
  private animatedValue = new Animated.Value(0);

  private get largeLoading(): React.ReactNode {
    return (
      <Svg height="84" width="84" viewBox="0 0 84 84">
        <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <G transform="translate(-2.000000, -2.000000)" fill={getColor('interactive')}>
            <Path d="M43.6033007,2 C29.5624393,2.00099987 15.8226411,8.89209746 7.74040687,21.4924474 C4.89849125,25.9238671 3.00825872,30.682244 2,35.5346086 L9.97312407,36.8974301 C10.7985222,33.0529335 12.3139412,29.2874266 14.5638331,25.779886 C20.9023253,15.8991799 31.7577762,9.99995239 43.6033007,9.99895252 C50.1024273,9.99895252 56.4540532,11.8327124 61.9732089,15.3002583 C77.9639093,25.3469427 82.7132322,46.3961862 72.561946,62.2211139 C66.2234538,72.10182 55.3680029,78.0010475 43.5224784,78.0010475 C37.0233518,78.0010475 30.671726,76.1682875 25.1525703,72.7007416 C22.5854506,71.0879528 20.3274764,69.1792027 18.3564215,67.0664794 L12.248273,72.3117925 C14.7244675,74.9924415 17.5734551,77.4131245 20.8204927,79.4538572 C27.8732523,83.8852769 35.7443382,86 43.5224784,86 C57.5633398,86 71.303138,79.1079025 79.3853723,66.5085525 C91.9451643,46.9281166 86.0895856,20.9785147 66.3052864,8.54714264 C59.2525268,4.11572294 51.3814409,2 43.6033007,2 Z" transform="translate(44.000000, 44.000000) scale(-1, 1) translate(-44.000000, -44.000000)" />
          </G>
        </G>
      </Svg>
    );
  }

  private get mediumLoading(): React.ReactNode {
    return (
      <Svg height="32" width="32" viewBox="0 0 32 32">
        <G>
          <G>
            <Path fill={getColor('interactive')} fillRule="evenodd" d="M16.15,0A16.2,16.2,0,0,1,29.81,7.43,15.57,15.57,0,0,1,32,12.78l-3,.51a12.71,12.71,0,0,0-1.75-4.23,13,13,0,0,0-11.06-6,13.19,13.19,0,0,0-7,2,12.88,12.88,0,0,0-4,17.87,13.17,13.17,0,0,0,18.06,4,12.9,12.9,0,0,0,2.59-2.14l2.33,2A16.19,16.19,0,0,1,16.18,32,16.2,16.2,0,0,1,2.52,24.57a15.91,15.91,0,0,1,5-22.08A16.3,16.3,0,0,1,16.15,0Z" />
          </G>
        </G>
      </Svg>
    );
  }

  private get smallLoading(): React.ReactNode {
    return (
      <Svg height="16" width="16" viewBox="0 0 16 16">
        <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <G>
            <Path d="M8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 Z M8,3 C5.23857625,3 3,5.23857625 3,8 C3,10.7614237 5.23857625,13 8,13 C10.7614237,13 13,10.7614237 13,8 C13,5.23857625 10.7614237,3 8,3 Z" fill={getColor('interactive')} />
            <Path d="M8,0 L8,3 C5.23857625,3 3,5.23857625 3,8 C3,8.87409301 3.22429577,9.69579894 3.61847183,10.4107023 L1.01999782,11.9118286 C0.370434512,10.7552759 0,9.42089773 0,8 C0,3.581722 3.581722,0 8,0 Z" fill={getColor('layerAccent01')} />
          </G>
        </G>
      </Svg>
    );
  }

  private get size(): number {
    const { type } = this.props;

    switch (type) {
      case 'medium':
        return 32;
      case 'small':
        return 16;
      case 'large':
      default:
        return 84;
    }
  }

  private animateSpin = () => {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      isInteraction: false,
      useNativeDriver: true,
    }).start(() => this.animateSpin());
  };

  private get animatedStyle(): any {
    return {
      width: this.size,
      height: this.size,
      transform: [
        {
          rotate: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    };
  }

  private get mainView(): React.ReactNode {
    const { type } = this.props;

    switch (type) {
      case 'medium':
        return this.mediumLoading;
      case 'small':
        return this.smallLoading;
      case 'large':
      default:
        return this.largeLoading;
    }
  }

  componentDidMount(): void {
    this.animateSpin();
  }

  render(): React.ReactNode {
    const { loadingText, style } = this.props;

    return (
      <View style={style} accessible={true} accessibilityLabel={loadingText || defaultText.loading}>
        <Animated.View style={this.animatedStyle}>{this.mainView}</Animated.View>
      </View>
    );
  }
}
