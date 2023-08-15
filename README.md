<p align="center">
  <a href="https://www.carbondesignsystem.com">
    <img alt="Carbon Design System" src="https://github.com/carbon-design-system/carbon-react-native/assets/3360588/c0c4aaff-a4bd-478b-95e2-d8c97b17185c" width="100%" />
  </a>
</p>
<h1 align="center">
  Carbon for React Native
</h1>

> The React Native implementation of the [Carbon Design System](https://github.com/carbon-design-system/carbon)

<p align="center">
  <a href="https://github.com/carbon-design-system/carbon-react-native/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="Carbon is released under the Apache-2.0 license" />
  </a>
  <a href="https://github.com/carbon-design-system/carbon-react-native/actions/workflows/ci.yml">
    <img src="https://github.com/carbon-design-system/carbon-react-native/actions/workflows/ci.yml/badge.svg" alt="CI workflow status" />
  </a>
  <a href="https://github.com/carbon-design-system/carbon-react-native/blob/main/.github/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" />
  </a>
  <a href="https://bestpractices.coreinfrastructure.org/projects/7741">
    <img src="https://bestpractices.coreinfrastructure.org/projects/7741/badge">
  </a> 
  <a href="https://discord.gg/J7JEUEkTRX">
    <img src="https://img.shields.io/discord/689212587170201628?color=5865F2" alt="Chat with us on Discord">
  </a>
</p>

Component and shared patterns for React Native apps using Carbon. Styles are based on the [Carbon Native Mobile](https://carbondesignsystem.com/designing/design-resources/#native-mobile) designs. Color (`g10` for light theme and `g100` for dark theme) and typography tokens are based on Carbon v11.

## Getting started

To install `@carbon/react-native` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/react-native
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/react-native
```

1. Go into the `ios` directory and run `pod install` (be sure to use the system Ruby on Mac if you are using rvm or similar tool)
1. Create or edit `react-native.config.js` file to be:
   ```javascript
   module.exports = {
     project: {
       ios: {},
       android: {},
     },
     assets: [
       './node_modules/@carbon/react-native/src/assets/fonts/', // This needs to be added if file already exists
     ],
   };
   ```
1. Run `npx react-native-asset` to link the fonts (install this package if not already).
1. Install the following peer dependencies (install as dependencies. [See dependecies here for tested versions](example/package.json)):
   - `@carbon/themes`
   - `@carbon/icons`
   - `@carbon/icon-helpers`
   - `react-native-svg`
   - `react-native-webview`

## Recommended Settings

For best experience with navigation we recommend for Android setting `android:windowSoftInputMode="adjustPan"` in your AndroidManifest file. This will prevent the bottom navigation from pushing up. Other known mechanisms exist and you should consider keyboard overlay for developing input areas.

## Usage

### Components

```js
import { Button } from '@carbon/react-native';

<Button kind="primary" text="My Button" onPress={() => {}} />;
```

### Colors

You can use `getColor` to retrieve a color token using the system theme for Carbon colors. You can pass a second param to force a theme (light/dark).

```js
import { getColor } from '@carbon/react-native';

const styles = StyleSheet.create({
  example: {
    padding: 16,
    color: getColor('textPrimary'),
    backgroundColor: getColor('background'),
  },
});
```

Color scheme will follow the OS. You can request specific colors at any point via second param on get Color. If you wish to use a theme for your app you will need to set the theme globally. This means that any color you use in your own styling will need to be done via a getter (and have this component reload its state). For changing your own colors on the fly you need to ensure getters are used for those styles using color. You can use the `forceTheme` function to change the theme and trigger a state update to change the color.

### Icons

You can use icons from `@carbon/icons` to pass to components. We do not bundle all icons in this library to reduce size. You can import specific icons from that library directly as needed. An example of how to pass icons to the React Native components is below.

```javascript
import AddIcon from '@carbon/icons/es/add/20';

// Using an icon with a component that supports Carbon Icons.
<Button icon={AddIcon} />

// Using an icon directly in your own component. You can use our helper.  See `createIcon` params for options.
<View>{createIcon(icon, 20, 20)}</View>
```

## Contributing

See the [contributing guide](/.github/CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
