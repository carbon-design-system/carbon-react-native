import React from 'react';
import { ViewProps, StyleProp, StyleSheet, ViewStyle, Modal as ReactModal, Platform, SafeAreaView, View, ScrollView } from 'react-native';
import { styleReferenceBreaker } from '../../helpers';
import { Overlay } from '../Overlay';
import CloseIcon from '@carbon/icons/es/close/20';
import { modalPresentations } from '../../constants/constants';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';
import { Button } from '../Button';
import WebView from 'react-native-webview';
import type { WebViewSource } from 'react-native-webview/lib/WebViewTypes';
import { defaultText } from '../../constants/defaultText';
import { zIndexes } from '../../styles/z-index';
import { BottomSafeAreaColorOverride } from '../BottomSafeAreaColorOverride';

/** Soource of DocumentViewer either string or WebView source */
export type DocumentViewerSource = string | WebViewSource;

/** Props for DocumentViewer component */
export type DocumentViewerProps = {
  /** Title of text document */
  title: string;
  /** Content to render (supports HTML (text or URL) and plain text) */
  source?: DocumentViewerSource;
  /** Content to render as React Nodes. If set source is not used.  Content is automatically wrapped in a ScrollView. */
  sourceNode?: React.ReactNode;
  /** Force no scroll view for sourceNode */
  disableScrollView?: boolean;
  /** Callback when the view is dismissed (if not set will not render close option) */
  onDismiss?: () => void;
  /** Disable padding (useful for loading websites) */
  disableContainerPadding?: boolean;
  /** On dismiss accessibility or visible text (iOS is visible, Android is accessibility). Defaults to ENGLISH "Done" */
  dismissText?: string;
  /** Force the view (mostly for teting) to a specific platform */
  forceView?: 'ios' | 'android';
  /** Navigation footer to load in the document viewer (used mostly by other flows) */
  navigationFooter?: React.ReactNode;
  /** Render children component into the document viewer. This is useful for rendering a modal within here. */
  renderChildComponent?: React.ReactNode;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * DocumentViewer component mostly for Legal content (like Privacy Policy, Terms and Conditions...).
 * But can also be used for web login flows or any popup overlay flow.
 * If source is a STRING the text will be rendered as plain text.  For custom styling create an HTML file with proper styling per guidelines and use WebViewSource.
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/DocumentViewer.tsx | Example code}
 */
export class DocumentViewer extends React.Component<DocumentViewerProps> {
  private get androidViewType(): boolean {
    const { forceView } = this.props;

    if (forceView) {
      return forceView === 'android';
    } else {
      return Platform.OS === 'android';
    }
  }

  private get styles() {
    return StyleSheet.create({
      modal: {
        zIndex: zIndexes.document,
      },
      safeAreaWrapper: {
        position: 'relative',
        flexGrow: 1,
        paddingBottom: 1,
        marginBottom: 1,
      },
      wrapper: {
        flexGrow: 1,
      },
      blurBackground: {
        zIndex: zIndexes.behind,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        flex: 1,
      },
      baseHeader: {
        height: 48,
        borderBottomWidth: 1,
        backgroundColor: getColor('layer01'),
        borderBottomColor: getColor('borderSubtle01'),
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        position: 'relative',
        flexDirection: 'row',
      },
      textAndroid: {
        paddingTop: 10,
        paddingLeft: 16,
        flex: 1,
        paddingRight: 20,
      },
      textIos: {
        paddingTop: 13,
        textAlign: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: zIndexes.base,
        paddingLeft: 90,
        paddingRight: 90,
      },
      headerActionAndroid: {
        alignSelf: 'flex-start',
      },
      headerActionIos: {
        alignSelf: 'flex-start',
        zIndex: zIndexes.baseOver,
        paddingRight: 16,
      },
      contentContainer: {
        backgroundColor: getColor('background'),
        padding: 16,
        paddingTop: 32,
        paddingBottom: 0,
      },
      noScrollView: {
        flex: 1,
      },
      webView: {
        backgroundColor: 'transparent',
        flex: 1,
      },
      contentView: {
        backgroundColor: getColor('background'),
        flexGrow: 1,
        flex: 1,
      },
    });
  }

  private get headerBar(): React.ReactNode {
    const { title, dismissText, onDismiss } = this.props;
    const baseStyle: ViewStyle = styleReferenceBreaker(this.styles.baseHeader);

    if (this.androidViewType) {
      baseStyle.borderTopRightRadius = undefined;
      baseStyle.borderTopLeftRadius = undefined;
    } else {
      baseStyle.marginTop = 8;
      baseStyle.flexDirection = 'row-reverse';
    }

    return (
      <View style={baseStyle}>
        {!!onDismiss && <Button textType="heading-compact-02" kind="ghost" overrideColor={this.androidViewType ? getColor('iconPrimary') : undefined} style={this.androidViewType ? this.styles.headerActionAndroid : this.styles.headerActionIos} iconOnlyMode={this.androidViewType} icon={this.androidViewType ? CloseIcon : undefined} text={dismissText || defaultText.done} onPress={onDismiss} />}
        <Text style={this.androidViewType ? this.styles.textAndroid : this.styles.textIos} type={this.androidViewType ? 'heading-03' : 'heading-compact-02'} text={title} breakMode="tail" />
      </View>
    );
  }

  private get mainView(): React.ReactNode {
    const { source, disableContainerPadding, sourceNode, disableScrollView } = this.props;
    const containerStyle: ViewStyle = styleReferenceBreaker(this.styles.contentContainer);

    if (disableContainerPadding) {
      containerStyle.paddingRight = 0;
      containerStyle.paddingTop = 0;
      containerStyle.paddingLeft = 0;
      containerStyle.paddingBottom = 0;
    }

    if (sourceNode) {
      if (disableScrollView) {
        return <View style={[this.styles.noScrollView, containerStyle]}>{sourceNode}</View>;
      }

      return (
        <ScrollView style={this.styles.contentView} contentContainerStyle={containerStyle}>
          {sourceNode}
        </ScrollView>
      );
    }

    if (typeof source === 'string') {
      return (
        <ScrollView style={this.styles.contentView} contentContainerStyle={containerStyle}>
          <Text text={source} />
        </ScrollView>
      );
    } else if (source) {
      return <WebView source={source} style={this.styles.webView} containerStyle={containerStyle} />;
    } else {
      return null;
    }
  }

  render(): React.ReactNode {
    const { componentProps, style, navigationFooter, renderChildComponent } = this.props;

    return (
      <ReactModal style={this.styles.modal} supportedOrientations={modalPresentations} transparent={true} animationType="slide">
        <Overlay style={this.styles.blurBackground} />
        <BottomSafeAreaColorOverride color={navigationFooter ? getColor('layer01') : getColor('background')} />
        <SafeAreaView style={this.styles.safeAreaWrapper}>
          <View style={[this.styles.wrapper, style]} {...(componentProps || {})}>
            {this.headerBar}
            {this.mainView}
          </View>
          {!!navigationFooter && navigationFooter}
        </SafeAreaView>
        {!!renderChildComponent && renderChildComponent}
      </ReactModal>
    );
  }
}
