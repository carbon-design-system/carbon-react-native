import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, View, LayoutChangeEvent } from 'react-native';
import { getColor } from '../../styles/colors';
import { styleReferenceBreaker } from '../../helpers';
import type { NavigationButton } from '../../types/navigation';
import { Button } from '../Button';
import { Link, LinkProps } from '../Link';
import { Text } from '../Text';
import { RegularFont } from '../../styles/typography';

export const headerBarGetItems = (items: NavigationButton[], style: ViewStyle, itemStyle: ViewStyle, type: 'right' | 'left', forceDarkMode?: boolean): React.ReactNode => {
  const finalWrapperStyles = styleReferenceBreaker(style);

  if (type === 'right') {
    finalWrapperStyles.justifyContent = 'flex-end';
  } else if (type === 'left') {
    finalWrapperStyles.justifyContent = 'flex-start';
  }

  return (
    <View style={finalWrapperStyles}>
      {items.map((item, index) => {
        const finalStyles: ViewStyle = StyleSheet.flatten([itemStyle, item.style]);
        let finalColor = getColor('iconPrimary', forceDarkMode ? 'dark' : undefined);

        if (item.disabled) {
          finalColor = getColor('iconDisabled', forceDarkMode ? 'dark' : undefined);
        } else if (item.active) {
          finalStyles.backgroundColor = getColor('backgroundActive', forceDarkMode ? 'dark' : undefined);
        }

        return (
          <View style={finalStyles} key={index}>
            <Button kind="ghost" overrideColor={finalColor} disabled={item.disabled} icon={item.icon} iconOnlyMode={true} text={item.text} onPress={item.onPress} onLongPress={item.onLongPress} />
          </View>
        );
      })}
    </View>
  );
};

/** Props for TopNavigationBar component */
export type TopNavigationBarProps = {
  /** Title to show */
  title: string;
  /** Sub title to use */
  subTitle?: string;
  /** Indicate if header mode for title should be used (larger page header) */
  headerMode?: boolean;
  /** Left link to load */
  leftLink?: LinkProps;
  /** Left navigation items to load (will not be loaded if leftLink is used). Do not use more than 2 or can get funky looking. */
  leftItems?: NavigationButton[];
  /** Right link to load */
  rightLink?: LinkProps;
  /** Right navigation items to load (will not be loaded if rightLink is used). Do not use more than 2 or can get funky looking. */
  rightItems?: NavigationButton[];
  /** Additional components to load into the header (useful for like Search or tabs) */
  additionalHeaderContent?: React.ReactNode;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * TopNavigationBar component for rendering a navigation bar at the top of the page (with title and actions)
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/TopNavigationBar.tsx | Example code}
 */

export class TopNavigationBar extends React.Component<TopNavigationBarProps> {
  state = {
    leftLinkWidth: 100,
    rightLinkWidth: 100,
  };

  private get styles() {
    return StyleSheet.create({
      wrapper: {
        width: '100%',
        backgroundColor: getColor('layer01'),
        flexDirection: 'column',
        borderBottomColor: getColor('borderSubtle01'),
        borderBottomWidth: 1,
      },
      headerWrapper: {
        minHeight: 48,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
      headerItemWrapper: {
        minWidth: 100,
      },
      itemWrapper: {
        flexDirection: 'row',
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
      headerSubTitle: {
        textAlign: 'center',
        color: getColor('textSecondary'),
      },
      pageTitleWrapper: {
        paddingRight: 16,
        paddingLeft: 16,
        marginBottom: 8,
      },
      pageHeaderTitle: {
        ...RegularFont(),
      },
      pageHeaderSubTitle: {
        color: getColor('textSecondary'),
      },
      additionalContent: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
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

  private getLeftLinkLayout = (event: LayoutChangeEvent): void => {
    this.setState({ leftLinkWidth: event.nativeEvent.layout.width || 100 });
  };

  private getRightLinkLayout = (event: LayoutChangeEvent): void => {
    this.setState({ rightLinkWidth: event.nativeEvent.layout.width || 100 });
  };

  private get headerTitleArea(): React.ReactNode {
    const { title, subTitle, headerMode } = this.props;

    return (
      <View style={this.styles.headerTitleWrapper}>
        {!headerMode && <Text style={this.styles.headerTitle} type="heading-compact-02" text={title} breakMode="tail" />}
        {!!subTitle && !headerMode && <Text style={this.styles.headerSubTitle} type="helper-text-01" text={subTitle} breakMode="tail" />}
      </View>
    );
  }

  private get baseHeader(): React.ReactNode {
    const { leftItems, leftLink, rightItems, rightLink } = this.props;
    const { leftLinkWidth, rightLinkWidth } = this.state;
    const wrapperStyle = styleReferenceBreaker(this.styles.headerItemWrapper);

    if (!leftLink && !rightLink) {
      if ((!leftItems || !leftItems?.length) && (!rightItems || !rightItems?.length)) {
        wrapperStyle.minWidth = 0;
      } else if ((leftItems?.length === 1 && rightItems?.length === 1) || (leftItems?.length === 1 && !rightItems?.length) || (!leftItems?.length && rightItems?.length === 1)) {
        wrapperStyle.minWidth = 50;
      }
    } else {
      wrapperStyle.minWidth = (leftLinkWidth > rightLinkWidth ? leftLinkWidth : rightLinkWidth) || 100;
    }

    return (
      <View style={this.styles.headerWrapper}>
        <View style={wrapperStyle}>{leftLink ? <Link {...leftLink} style={this.styles.leftLink} textBreakMode="tail" componentProps={{ onLayout: this.getLeftLinkLayout }} /> : headerBarGetItems(leftItems || [], this.styles.itemWrapper, this.styles.itemStyle, 'left')}</View>
        {this.headerTitleArea}
        <View style={wrapperStyle}>{rightLink ? <Link {...rightLink} style={this.styles.rightLink} textBreakMode="tail" componentProps={{ onLayout: this.getRightLinkLayout }} /> : headerBarGetItems(rightItems || [], this.styles.itemWrapper, this.styles.itemStyle, 'right')}</View>
      </View>
    );
  }

  private get pageHeader(): React.ReactNode {
    const { title, subTitle } = this.props;

    return (
      <View style={this.styles.pageTitleWrapper}>
        <Text style={this.styles.pageHeaderTitle} type="heading-05" text={title} />
        {!!subTitle && <Text style={this.styles.pageHeaderSubTitle} type="helper-text-01" text={subTitle} />}
      </View>
    );
  }

  private get additionalContent(): React.ReactNode {
    const { additionalHeaderContent } = this.props;

    return <View style={this.styles.additionalContent}>{additionalHeaderContent}</View>;
  }

  private get mainView(): React.ReactNode {
    const { headerMode, additionalHeaderContent } = this.props;

    return (
      <>
        {this.baseHeader}
        {!!headerMode && this.pageHeader}
        {!!additionalHeaderContent && this.additionalContent}
      </>
    );
  }

  render(): React.ReactNode {
    const { componentProps, style } = this.props;

    return (
      <View style={[this.styles.wrapper, style]} accessibilityRole="toolbar" {...(componentProps || {})}>
        {this.mainView}
      </View>
    );
  }
}
