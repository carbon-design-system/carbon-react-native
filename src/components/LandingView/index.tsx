import React from 'react';
import { View, StyleSheet, Image, Dimensions, EmitterSubscription, ScrollView, ImageSourcePropType, GestureResponderEvent, ImageStyle } from 'react-native';
import ArrowRightIcon from '@carbon/icons/es/arrow--right/20';
import { getColor } from '../../styles/colors';
import { Button } from '../Button';
import { Text } from '../Text';
import { Link } from '../Link';
import { styleReferenceBreaker } from '../../helpers';
import { ViewWrapper } from '../ViewWrapper';
import { SemiBoldFont } from '../../styles/typography';

/** Props for LandingView component */
export type LandingViewProps = {
  /** Company image to load in top right. Can pass in many ways including require `require('../../assets/images/image.png')` */
  companyImage?: ImageSourcePropType;
  /** Product image to load under. Can pass in many ways including require `require('../../assets/images/image.png')` */
  productImage: ImageSourcePropType;
  /** Company image size (defaults to 61px x 24px). Defaults should be followed; but slight (few pixel) alterations may be needed based on image used. */
  companyImageSize?: {
    width: number;
    height: number;
  };
  /** Product image size (defaults to 96px x 96px). Defaults should be followed; but slight (few pixel) alterations may be needed based on image used. */
  productImageSize?: {
    width: number;
    height: number;
  };
  /** Product name (full legal name) */
  longProductName: string;
  /** Version text to show on screen (normally: `Version 5.2.3 (30)`) */
  versionText: string;
  /** Copyright text (normally: `Copyright (c) YYYY Company`) */
  copyrightText: string;
  /** Text to show for privacy policy */
  privacyPolicyText?: string;
  /** onPress event when Privacy policy pressed */
  privacyPolicyOnPress?: (event: GestureResponderEvent) => void;
  /** onLongPress event when Privacy policy pressed */
  privacyPolicyOnLongPress?: (event: GestureResponderEvent) => void;
  /** Text to show for continue button */
  continueText: string;
  /** onPress event when Continue pressed */
  continueOnPress: (event: GestureResponderEvent) => void;
  /** onLongPress event when Continue pressed */
  continueOnLongPress?: (event: GestureResponderEvent) => void;
  /** Indicate that continue is disabled */
  continueDisabled?: boolean;
};

/**
 * LandingView component for showing the IBM app landing page
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/LandingView.tsx | Example code}
 */
export class LandingView extends React.Component<LandingViewProps> {
  private resizeEvent: EmitterSubscription | undefined;

  private get styles() {
    return StyleSheet.create({
      view: {
        flex: 1,
        backgroundColor: getColor('background'),
      },
      container: {
        flex: 1,
        padding: 16,
        paddingBottom: 16,
      },
      logoArea: {
        backgroundColor: '#000000',
        height: 192,
      },
      companyImage: {
        width: 61,
        height: 24,
        position: 'absolute',
        top: 16,
        right: 16,
      },
      productImage: {
        height: 96,
        width: 96,
        position: 'absolute',
        bottom: 16,
        left: 16,
      },
      privacyPolicyLink: {
        alignSelf: 'flex-start',
      },
      title: {
        marginBottom: 16,
        ...SemiBoldFont(),
      },
      helperContent: {},
      contentWrapper: {
        flex: 1,
        flexGrow: 1,
      },
      actionWrapper: {
        marginTop: 32,
      },
    });
  }

  private get heightSafe(): boolean {
    const height = Dimensions.get('window').height;

    return height >= 500;
  }

  private get banner(): React.ReactNode {
    const { companyImage, productImage, productImageSize, companyImageSize } = this.props;
    const companyImageStyle = styleReferenceBreaker(this.styles.companyImage);
    const productImageStyle = styleReferenceBreaker(this.styles.productImage);

    if (companyImageSize) {
      companyImageStyle.width = companyImageSize.width;
      companyImageStyle.height = companyImageSize.height;
    }

    if (productImageSize) {
      productImageStyle.width = productImageSize.width;
      productImageStyle.height = productImageSize.height;
    }

    return (
      <View style={this.styles.logoArea}>
        {companyImage && <Image resizeMode="contain" style={companyImageStyle as ImageStyle} source={companyImage} />}
        <Image resizeMode="contain" style={productImageStyle as ImageStyle} source={productImage} />
      </View>
    );
  }

  componentDidMount(): void {
    this.resizeEvent = Dimensions.addEventListener('change', () => {
      this.setState({});
    });
  }

  componentWillUnmount(): void {
    if (this.resizeEvent && typeof this.resizeEvent.remove === 'function') {
      this.resizeEvent.remove();
    }
  }

  render(): React.ReactNode {
    const { longProductName, copyrightText, versionText, privacyPolicyText, privacyPolicyOnPress, privacyPolicyOnLongPress, continueText, continueOnLongPress, continueOnPress, continueDisabled } = this.props;

    return (
      <ViewWrapper topBackgroundColor={this.heightSafe ? '#000000' : getColor('background')} bottomBackgroundColor={getColor('background')} statusBarStyle={this.heightSafe ? 'light-content' : undefined}>
        <View style={this.styles.view}>
          {this.heightSafe && this.banner}
          <View style={this.styles.container}>
            <ScrollView style={this.styles.contentWrapper} bounces={false}>
              <Text style={this.styles.title} text={longProductName} type="heading-04" />
              <View style={this.styles.helperContent}>
                <Text text={versionText} />
                <Text text={copyrightText} />
              </View>
              <View>{!!(privacyPolicyText && privacyPolicyOnPress) && <Link style={this.styles.privacyPolicyLink} onPress={privacyPolicyOnPress} onLongPress={privacyPolicyOnLongPress} text={privacyPolicyText} textType="body-compact-02" />}</View>
            </ScrollView>
            <View style={this.styles.actionWrapper}>
              <Button kind="primary" disabled={continueDisabled} icon={ArrowRightIcon} onPress={continueOnPress} onLongPress={continueOnLongPress} text={continueText} />
            </View>
          </View>
        </View>
      </ViewWrapper>
    );
  }
}
