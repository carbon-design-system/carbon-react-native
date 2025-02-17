import React from 'react';
import { Pressable, ScrollView, StyleProp, StyleSheet, ViewProps, ViewStyle, PressableStateCallbackType } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, pressableFeedbackStyle } from '../../helpers';
import { defaultText } from '../../constants/defaultText';
import CircleIcon from '@carbon/icons/es/circle--solid/20';

/** Props for Pagination component */
export type PaginationProps = {
  /** Number of pages */
  totalPages: number;
  /** Current page (1 - totalPages) */
  currentPage: number;
  /** Text to use for pagination wrapper (accessibility). Defaults to ENGLISH "Pagination" */
  paginationText?: string;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
};

/**
 * Pagination component for rendering a pagination menu
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/Pagination.tsx | Example code}
 */

export class Pagination extends React.Component<PaginationProps> {
  private get styles() {
    return StyleSheet.create({
      wrapper: {
        width: '100%',
        flexDirection: 'column',
      },
      wrapperContent: {
        marginRight: 'auto',
        marginLeft: 'auto',
      },
      item: {
        padding: 8,
        paddingLeft: 4,
        paddingRight: 4,
      },
    });
  }

  private changePage = (page: number): void => {
    const { onPageChange } = this.props;

    if (typeof onPageChange === 'function') {
      onPageChange(page);
    }
  };

  private getPageItem(index: number): React.ReactNode {
    const { currentPage } = this.props;
    const page = index + 1;

    const getStateStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
      return state.pressed ? { backgroundColor: getColor('layerActive01') } : undefined;
    };

    return (
      <Pressable style={(state) => pressableFeedbackStyle(state, this.styles.item, getStateStyle)} key={index} onPress={() => this.changePage(page)} accessibilityLabel={String(page)}>
        {createIcon(CircleIcon, 8, 8, currentPage === page ? getColor('buttonTertiary') : getColor('iconOnColorDisabled'))}
      </Pressable>
    );
  }

  render() {
    const { componentProps, style, paginationText, totalPages } = this.props;
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < totalPages; i++) {
      elements.push(this.getPageItem(i));
    }

    return (
      <ScrollView bounces={false} style={[this.styles.wrapper, style]} contentContainerStyle={this.styles.wrapperContent} {...(componentProps || {})} accessibilityLabel={paginationText || defaultText.pagination} horizontal={true}>
        {elements.map((item) => item)}
      </ScrollView>
    );
  }
}
