import React from 'react';
import { StyleSheet, View, Dimensions, EmitterSubscription } from 'react-native';
import { zIndexes } from '../../styles/z-index';
import { Overlay } from '../Overlay';

export type BottomSafeAreaColorOverrideProps = {
  /** Color to force the safe area bottom to be */
  color: string;
  /** Custom margin to the right  */
  marginRight?: number;
  /** Include overlay behind the color box */
  backgroundOverlay?: boolean;
};

/**
 * This component is for setting a color to apply to bottom zone under safe areas.
 * This is used for specific flows who are full screen and need to override the bottom while not touching the top.
 * This component is not exported.
 */
export class BottomSafeAreaColorOverride extends React.Component<BottomSafeAreaColorOverrideProps> {
  private resizeEvent: EmitterSubscription | undefined;

  private get styles() {
    const { color, marginRight } = this.props;

    return StyleSheet.create({
      parentWrapper: {
        zIndex: zIndexes.behind,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 34,
      },
      wrapper: {
        marginRight: marginRight || 0,
        height: '100%',
        backgroundColor: color,
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
    });
  }

  private get isPortrait(): boolean {
    const dim = Dimensions.get('screen');

    return dim.height >= dim.width;
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
    const { backgroundOverlay } = this.props;

    if (this.isPortrait) {
      return (
        <View style={this.styles.parentWrapper} accessible={false}>
          <View style={this.styles.wrapper} />
          {backgroundOverlay && <Overlay style={this.styles.blurBackground} />}
        </View>
      );
    } else {
      return null;
    }
  }
}
