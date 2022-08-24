import React from 'react';
import { StyleSheet, View, Dimensions, EmitterSubscription } from 'react-native';
import { zIndexes } from '../../styles/z-index';

export type BottomSafeAreaColorOverrideProps = {
  /** Color to force the safe area bottom to be */
  color: string;
  /** Custom margin to the right  */
  marginRight?: number;
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
      wrapper: {
        zIndex: zIndexes.behind,
        backgroundColor: color,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 34,
        marginRight: marginRight || 0,
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
    if (this.isPortrait) {
      return <View style={this.styles.wrapper} accessible={false} />;
    } else {
      return null;
    }
  }
}
