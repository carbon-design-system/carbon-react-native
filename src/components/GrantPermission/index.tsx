import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, Modal as ReactModal, SafeAreaView, View, EmitterSubscription, Dimensions, Image, ScrollView, ImageSourcePropType } from 'react-native';
import { getColor } from '../../styles/colors';
import { modalPresentations } from '../../constants/constants';
import { styleReferenceBreaker } from '../../helpers';
import { zIndexes } from '../../styles/z-index';
import { Button } from '../Button';
import { Text } from '../Text';
const cameraPermissionImage = require('./camera_permission.png');
const filePermissionImage = require('./file_permission.png');
const locationPermissionImage = require('./location_permission.png');
const notificationsPermissionImage = require('./notifications_permission.png');

/** Props for GrantPermission component */
export type GrantPermissionProps = {
  /** The type of permission.  This will prefill image and style. You can override image for any other custom cases and leave this undefined. */
  type?: 'files' | 'camera' | 'notifications' | 'location';
  /** Title for view (usually "Grant access" or similar) */
  title: string;
  /** Reasoning for needing permission (Ex: "In order for us to retrieve the content you intend to upload, we will need access to your photos. This will be used for upload purposes only.") */
  reasoning: string;
  /** Additional info or reasoning to show (Ex: "Please allow APP_NAME to access your photos when you are prompted.") */
  additionalReasoning?: string;
  /** Text to show for primary action (usually "Continue" or similar) */
  continueText: string;
  /** Text to show for cancel action (usually "Cancel" or similar) */
  cancelText: string;
  /** Custom image (override type image) */
  customImage?: ImageSourcePropType;
  /** Custom image styles */
  imageStyle?: StyleProp<ViewStyle>;
  /** Callback when flow finishes.  Returns success variable indicating if user accepted or refused to move forward with permission flow */
  resultsCallback: (result: boolean) => void;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * GrantPermission component for showing the grant device permission flow
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/GrantPermission.tsx | Example code}
 */
export class GrantPermission extends React.Component<GrantPermissionProps> {
  private resizeEvent: EmitterSubscription | undefined;

  private get wideScreen(): boolean {
    const width = Dimensions.get('window').width;

    return width >= 500;
  }

  private get styles() {
    return StyleSheet.create({
      modal: {
        zIndex: zIndexes.permissions,
      },
      safeAreaWrapper: {
        backgroundColor: getColor('background'),
        position: 'relative',
        flexGrow: 1,
      },
      wrapper: {
        flexGrow: 1,
        padding: 16,
      },
      contentWrapper: {
        flex: 1,
        paddingTop: this.wideScreen ? 32 : 64,
      },
      contentWrapperScroll: {
        flexDirection: this.wideScreen ? 'row' : 'column',
        justifyContent: 'flex-start',
      },
      textWrapper: {
        flex: 1,
      },
      title: {
        marginBottom: 16,
      },
      reasoning: {},
      image: {
        width: 300,
        height: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: this.wideScreen ? 0 : 16,
      },
      action: {
        marginTop: 16,
      },
    });
  }

  private accept = (): void => {
    const { resultsCallback } = this.props;

    if (typeof resultsCallback === 'function') {
      resultsCallback(true);
    }
  };

  private reject = (): void => {
    const { resultsCallback } = this.props;

    if (typeof resultsCallback === 'function') {
      resultsCallback(false);
    }
  };

  private get imageSource(): ImageSourcePropType {
    const { customImage, type } = this.props;

    if (customImage) {
      return customImage;
    }

    switch (type) {
      case 'camera':
        return cameraPermissionImage;
      case 'location':
        return locationPermissionImage;
      case 'notifications':
        return notificationsPermissionImage;
      case 'files':
      default:
        return filePermissionImage;
    }
  }

  componentWillUnmount(): void {
    if (this.resizeEvent && typeof this.resizeEvent.remove === 'function') {
      this.resizeEvent.remove();
    }
  }

  componentDidMount(): void {
    this.resizeEvent = Dimensions.addEventListener('change', () => {
      this.setState({});
    });
  }

  render(): React.ReactNode {
    const { componentProps, style, title, reasoning, additionalReasoning, continueText, cancelText, imageStyle } = this.props;

    return (
      <ReactModal style={this.styles.modal} supportedOrientations={modalPresentations} transparent={true} animationType="slide">
        <SafeAreaView style={this.styles.safeAreaWrapper}>
          <View style={styleReferenceBreaker(this.styles.wrapper, style)} {...(componentProps || {})}>
            <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" bounces={false} style={this.styles.contentWrapper} contentContainerStyle={this.styles.contentWrapperScroll}>
              <View style={this.styles.textWrapper}>
                <Text style={this.styles.title} text={title} type="heading-05" />
                <Text style={this.styles.reasoning} text={reasoning} type="body-02" />
                {!!additionalReasoning && <Text style={this.styles.reasoning} text={additionalReasoning} type="body-02" />}
              </View>
              <Image resizeMode="contain" style={styleReferenceBreaker(this.styles.image, imageStyle)} source={this.imageSource} />
            </ScrollView>
            <Button style={this.styles.action} onPress={this.accept} text={continueText} />
            <Button style={this.styles.action} kind="secondary" onPress={this.reject} text={cancelText} />
          </View>
        </SafeAreaView>
      </ReactModal>
    );
  }
}
