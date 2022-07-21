# Carbon React Native Library
Component and shared patterns for React Native apps using Carbon. Styles are based on the [Carbon Native Mobile](https://carbondesignsystem.com/designing/design-resources/#native-mobile) designs. Color (g10 for light theme and g100 for dark theme) and typography tokens are based on Carbon 11.

## Installation
1. Install the package in your project `npm install @carbon/react-native` or `yarn add @carbon/react-native`
2. Go into the `ios` directory and use `pod install` (be sure to use the system Ruby on Mac if you are using rvm or similar tool)
3. Create or edit `react-native.config.js` file to be:
``` javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [
    './node_modules/@carbon/react-native/assets/fonts/'  // This needs to be added if file already exists
  ],
};
```
4. Run `npx react-native link` to link the fonts.

## Usage

### Components

```js
import { Button } from "@carbon/react-native";

<Button kind="primary" text="My Button" onPress={() => {}} />
```

### Colors

You can use `getColor` to retrieve a color token using the system theme for Carbon colors. You can pass a second param to force a theme (light/dark).

```js
import { getColor } from "@carbon/react-native";

const styles = StyleSheet.create({
  example: {
    padding: 16,
    color: getColor('textPrimary'),
    backgroundColor: getColor('background'),
  },
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
