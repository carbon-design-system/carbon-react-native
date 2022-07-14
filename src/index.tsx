import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'carbon-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type CarbonReactNativeProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'CarbonReactNativeView';

export const CarbonReactNativeView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<CarbonReactNativeProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
