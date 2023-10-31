import React from 'react';
import type { ViewProps, StyleProp, ViewStyle } from 'react-native';
import type { ToolbarButton } from '../../types/navigation';
import { BottomToolbar } from '../BottomToolbar';
import { DocumentViewer, DocumentViewerSource } from '../DocumentViewer';
import { Modal } from '../Modal';
import { Text } from '../Text';

/** Props for AcceptTerms component */
export type AcceptTermsProps = {
  /** Title of text document */
  title: string;
  /** Content to render (supports HTML (text or URL) and plain text) */
  source: DocumentViewerSource;
  /** Disable padding (useful for loading websites) */
  disableContainerPadding?: boolean;
  /** Callback when flow finishes.  Returns success variable indicating if user accepted or refused the terms */
  resultsCallback: (result: boolean) => void;
  /** Text strings needed for the flow */
  textStrings: {
    /** Disagree action on toolbar. Ex: "Disagree" */
    disagree: string;
    /** Agree action on toolbar. Ex: "Agree" */
    agree: string;
    /** Popup title for disagreeing. Ex: "Are you sure?" */
    modalTitle: string;
    /** Popup body for disagreeing. Ex: "The use of this app requires agreement to the Terms and Conditions." */
    modalBody: string;
    /** Popup seondary option for disagreeing. Ex: "Disagree" */
    modalSecondaryAction: string;
    /** Popup primary option for disagreeing. Ex: "Continue" */
    modalPrimaryAction: string;
  };
  /** Force the view (mostly for teting) to a specific platform */
  forceView?: 'ios' | 'android';
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * AcceptTerms component for showing the accept legal terms flow
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/AcceptsTerms.tsx | Example code}
 */
export class AcceptTerms extends React.Component<AcceptTermsProps> {
  state = {
    showDisagree: false,
  };

  private agree = (): void => {
    const { resultsCallback } = this.props;

    if (typeof resultsCallback === 'function') {
      resultsCallback(true);
    }
  };

  private disagree = (): void => {
    const { resultsCallback } = this.props;

    if (typeof resultsCallback === 'function') {
      resultsCallback(false);
    }
  };

  private disagreeMain = (): void => {
    this.setState({ showDisagree: true });
  };

  private get disagreeModal(): React.ReactNode {
    const { textStrings } = this.props;
    const { showDisagree } = this.state;

    return (
      <Modal open={showDisagree} title={textStrings?.modalTitle || ''} secondaryActionOnPress={this.disagree} secondaryActionText={textStrings?.modalSecondaryAction || ''} primaryActionOnPress={() => this.setState({ showDisagree: false })} primaryActionText={textStrings?.modalPrimaryAction || ''}>
        <Text text={textStrings?.modalBody || ''} />
      </Modal>
    );
  }

  private get footer(): React.ReactNode {
    const { textStrings } = this.props;

    const items: ToolbarButton[] = [
      {
        text: textStrings?.disagree || '',
        alignItem: 'left',
        onPress: this.disagreeMain,
      },
      {
        text: textStrings?.agree || '',
        alignItem: 'right',
        textType: 'heading-compact-02',
        onPress: this.agree,
      },
    ];

    return <BottomToolbar items={items} />;
  }

  render(): React.ReactNode {
    const { componentProps, style, title, source, disableContainerPadding, forceView } = this.props;

    return <DocumentViewer title={title} source={source} style={style} componentProps={componentProps} disableContainerPadding={disableContainerPadding} forceView={forceView} navigationFooter={this.footer} renderChildComponent={this.disagreeModal} />;
  }
}
