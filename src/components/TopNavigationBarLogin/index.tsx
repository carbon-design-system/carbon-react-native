import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, GestureResponderEvent } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import type { NavigationButton } from '../../types/navigation';
import { Link, LinkProps } from '../Link';
import { Text } from '../Text';
import { headerBarGetItems } from '../TopNavigationBar';

/** Props for TopNavigationBarLogin component */
export type TopNavigationBarLoginProps = {
  /** Title to show */
  title: string;
  /** Sub title to use. This can include links by padding ReactNode. Normally body-compact-02 styling if using ReactNode */
  subTitle?: string | React.ReactNode;
  /** Text for back button (this will auto style. This shoudl be `Back` or `Prior_page_name` depending on context. See design file for usage.) */
  backText?: string;
  /** On press event for back button */
  backOnPress?: (event: GestureResponderEvent) => void;
  /** Right link to load */
  rightLink?: LinkProps;
  /** Right navigation items to load (will not be loaded if rightLink is used). Do not use more than 2 or can get funky looking. */
  rightItems?: NavigationButton[];
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * TopNavigationBarLogin component for rendering the top navigation bar for login flows (which is different from regular views)
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/TopNavigationBarLogin.tsx | Example code}
 */
export class TopNavigationBarLogin extends React.Component<TopNavigationBarLoginProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        width: '100%',
        backgroundColor: '#000000',
        flexDirection: 'column',
      },
      headerWrapper: {
        height: 48,
        maxHeight: 48,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
      headerItemWrapper: {
        flex: 1,
      },
      itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      itemStyle: {},
      headerTitleWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
      headerTitle: {
        textAlign: 'center',
      },
      pageTitleWrapper: {
        paddingRight: 16,
        paddingLeft: 16,
        marginBottom: 14,
      },
      pageHeaderTitle: {
        color: getColor('textOnColor', 'dark'),
      },
      subHeaderText: {
        color: getColor('textOnColor', 'dark'),
      },
      pageHeaderSubTitle: {
        marginTop: 28,
      },
      leftLink: {
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 16,
        paddingRight: 8,
      },
      rightLink: {
        paddingTop: 13,
        paddingBottom: 13,
        paddingRight: 16,
        marginLeft: 'auto',
      },
    });
  }

  private get baseHeader(): React.ReactNode {
    const { backOnPress, backText, rightItems, rightLink } = this.props;

    return (
      <View style={this.styles.headerWrapper}>
        <View style={this.styles.headerItemWrapper}>{!!(backText && backOnPress) && <Link text={backText} forceDarkMode={true} onPress={backOnPress} backButtonMode={true} style={this.styles.leftLink} textBreakMode="tail" />}</View>
        <View style={this.styles.headerItemWrapper}>{rightLink ? <Link {...rightLink} forceDarkMode={true} style={this.styles.rightLink} textBreakMode="tail" /> : headerBarGetItems(rightItems || [], this.styles.itemWrapper, this.styles.itemStyle, 'right', true)}</View>
      </View>
    );
  }

  private get pageHeader(): React.ReactNode {
    const { title, subTitle } = this.props;

    return (
      <View style={this.styles.pageTitleWrapper}>
        <Text style={this.styles.pageHeaderTitle} type="heading-04" text={title} />
        <View style={this.styles.pageHeaderSubTitle}>{typeof subTitle === 'string' ? <Text style={this.styles.subHeaderText} text={subTitle || ''} /> : subTitle || null}</View>
      </View>
    );
  }

  render(): React.ReactNode {
    const { componentProps, style } = this.props;
    const finalStyles = styleReferenceBreaker(this.styles.wrapper, style);

    return (
      <View style={finalStyles} accessibilityRole="toolbar" {...(componentProps || {})}>
        {this.baseHeader}
        {this.pageHeader}
      </View>
    );
  }
}
