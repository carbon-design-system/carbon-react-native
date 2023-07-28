/**
 * Example of Native View from platforms. Not used or exported as of now.
 * Leaving for reference if needed in future.
 */

import { requireNativeComponent, UIManager, Platform, ViewStyle } from 'react-native';

const LINKING_ERROR = `The package '@carbon/react-native' doesn't seem to be linked. Make sure: \n\n` + Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';

type CarbonReactNativeProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'CarbonReactNativeView';

const CarbonReactNativeView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<CarbonReactNativeProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export default CarbonReactNativeView;
