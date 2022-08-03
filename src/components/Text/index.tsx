import React from 'react';
import { StyleProp, StyleSheet, Text as ReactText, TextProps as ReactTextProps, TextStyle } from 'react-native';
import { styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Body01, Body02, BodyCompact01, BodyCompact02, Code01, Code02, Heading01, Heading02, Heading03, Heading04, Heading05, Heading06, Heading07, HeadingCompact01, HeadingCompact02, HelperText01, HelperText02, Label01, Label02, Legal01, Legal02 } from '../../styles/typography';

export type TextTypes = 'code-01'|'code-02'|'label-01'|'label-02'|'helper-text-01'|'helper-text-02'|'legal-01'|'legal-02'|'body-compact-01'|'body-compact-02'|'body-01'|'body-02'|'heading-compact-01'|'heading-compact-02'|'heading-01'|'heading-02'|'heading-03'|'heading-04'|'heading-05'|'heading-06'|'heading-07';
export type TextBreakModes = 'head' | 'middle' | 'tail';

export type TextProps = {
  /** Text to render */
  text?: string;
  /** Type of text to render (style of Carbon) body-02 is default */
  type?: TextTypes;
  /** If set will not wrap text and use break mode (tail is normal use) */
  breakMode?: TextBreakModes;
  /** Style to set on the item */
  style?: StyleProp<TextStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ReactTextProps;
}

export class Text extends React.Component<TextProps> {
  private get textStyle(): StyleProp<TextStyle> {
    const {type, style} = this.props;
    let finalStyle: any = {};

    switch (type) {
      case 'code-01':
        finalStyle = styleReferenceBreaker(Code01);
        break;
      case 'code-02':
        finalStyle = styleReferenceBreaker(Code02);
        break;
      case 'label-01':
        finalStyle = styleReferenceBreaker(Label01);
        break;
      case 'label-02':
        finalStyle = styleReferenceBreaker(Label02);
        break;
      case 'helper-text-01':
        finalStyle = styleReferenceBreaker(HelperText01);
        break;
      case 'helper-text-02':
        finalStyle = styleReferenceBreaker(HelperText02);
        break;
      case 'legal-01':
        finalStyle = styleReferenceBreaker(Legal01);
        break;
      case 'legal-02':
        finalStyle = styleReferenceBreaker(Legal02);
        break;
      case 'body-compact-01':
        finalStyle = styleReferenceBreaker(BodyCompact01);
        break;
      case 'body-compact-02':
        finalStyle = styleReferenceBreaker(BodyCompact02);
        break;
      case 'body-01':
        finalStyle = styleReferenceBreaker(Body01);
        break;
      case 'heading-compact-01':
        finalStyle = styleReferenceBreaker(HeadingCompact01);
        break;
      case 'heading-compact-02':
        finalStyle = styleReferenceBreaker(HeadingCompact02);
        break;
      case 'heading-01':
        finalStyle = styleReferenceBreaker(Heading01);
        break;
      case 'heading-02':
        finalStyle = styleReferenceBreaker(Heading02);
        break;
      case 'heading-03':
        finalStyle = styleReferenceBreaker(Heading03);
        break;
      case 'heading-04':
        finalStyle = styleReferenceBreaker(Heading04);
        break;
      case 'heading-05':
        finalStyle = styleReferenceBreaker(Heading05);
        break;
      case 'heading-06':
        finalStyle = styleReferenceBreaker(Heading06);
        break;
      case 'heading-07':
        finalStyle = styleReferenceBreaker(Heading07);
        break;
      case 'body-02':
      default:
          finalStyle = styleReferenceBreaker(Body02);
          break;
    }

    return StyleSheet.create(Object.assign(finalStyle, {color: getColor('textPrimary')}, style));
  }

  render(): React.ReactNode {
    const {text, breakMode, componentProps} = this.props;

    return (
      <ReactText style={this.textStyle} numberOfLines={breakMode ? 1 : undefined} ellipsizeMode={breakMode} {...(componentProps || {})}>
        {text}
      </ReactText>
    );
  }
}
