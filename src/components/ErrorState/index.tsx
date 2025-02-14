import React from 'react';
import { type ViewProps, type StyleProp, StyleSheet, type ViewStyle, View, type ImageSourcePropType, Image, type ImageStyle } from 'react-native';
import { Text } from '../Text';
const accessImage = require('./access_error.png');
const emptyImage = require('./empty_error.png');
const genericImage = require('./generic_error.png');

/** Types of errors */
export type ErrorStateTypes = 'generic' | 'access' | 'empty';

/** Props for ErrorState component */
export type ErrorStateProps = {
  /** Type of error state (default is generic) */
  type?: ErrorStateTypes;
  /** Title of error state (primary reason) */
  title: string;
  /** Sub title of error state (longer reason or explanation) */
  subTitle?: string;
  /** Technical help or codes (shows as mono text) */
  errorCode?: string;
  /** Indicate if no image should be used (text only error) */
  noImage?: boolean;
  /** Custom image (override type image) */
  customImage?: ImageSourcePropType;
  /** Custom image styles */
  imageStyle?: StyleProp<ImageStyle>;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * ErrorState component for showing an error message and screen
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/ErrorState.tsx | Example code}
 */
export class ErrorState extends React.Component<ErrorStateProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      image: {
        width: 320,
        height: 405,
        margin: 16,
        marginRight: 32,
      },
      textWrapper: {
        flex: 1,
        minWidth: 300,
      },
      title: {
        marginBottom: 16,
      },
      subTitle: {
        marginBottom: 16,
      },
      errorCode: {},
    });
  }

  private get image(): ImageSourcePropType {
    const { customImage, type } = this.props;

    if (customImage) {
      return customImage;
    }

    switch (type) {
      case 'access':
        return accessImage;
      case 'empty':
        return emptyImage;
      case 'generic':
      default:
        return genericImage;
    }
  }

  render(): React.ReactNode {
    const { componentProps, style, title, subTitle, errorCode, imageStyle, noImage } = this.props;

    return (
      <View style={[this.styles.wrapper, style]} accessibilityLabel={title} accessibilityHint={subTitle + ' ' + errorCode} accessibilityRole="summary" {...(componentProps || {})}>
        {!noImage && <Image resizeMode="contain" style={[this.styles.image, imageStyle]} source={this.image} />}
        <View style={this.styles.textWrapper}>
          <Text style={this.styles.title} text={title} type="heading-04" />
          {!!subTitle && <Text style={this.styles.subTitle} text={subTitle} />}
          {!!errorCode && <Text style={this.styles.errorCode} text={errorCode} type="code-02" />}
        </View>
      </View>
    );
  }
}
