import React from 'react';
import { StyleSheet, ScrollView, Image, LayoutChangeEvent, View } from 'react-native';
import { ErrorState, getColor, Text, ThemeChoices, Tile } from 'carbon-react-native';
import type { ComponentItem } from '../App';

interface TestComponentListProps {
  changeView: (view: string) => void;
  viewList: [string, ComponentItem][];
  filterTerm: string;
  theme: ThemeChoices;
}

export default class TestComponentList extends React.Component<TestComponentListProps> {
  state = {
    viewWidth: 400,
  };

  private get styles() {
    const { viewWidth } = this.state;

    let size = viewWidth;

    if (viewWidth > 1720) {
      size = viewWidth / 7;
    } else if (viewWidth > 1450) {
      size = viewWidth / 6;
    } else if (viewWidth > 1200) {
      size = viewWidth / 5;
    } else if (viewWidth > 700) {
      size = viewWidth / 4;
    } else if (viewWidth > 550) {
      size = viewWidth / 3;
    } else if (viewWidth > 320) {
      size = viewWidth / 2;
    }

    size = Math.floor(size);

    return StyleSheet.create({
      view: {
        flex: 1,
      },
      container: {
        flexGrow: 1,
        paddingBottom: 64,
        flexWrap: 'wrap',
        flexDirection: 'row',
      },
      item: {
        flexDirection: 'column-reverse',
        alignItems: 'baseline',
        width: size,
        height: size,
        borderBottomColor: getColor('borderSubtle01'),
        borderRightColor: getColor('borderSubtle01'),
        borderBottomWidth: 1,
        borderRightWidth: 1,
        overflow: 'hidden',
      },
      itemImage: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        height: '80%',
      },
      itemText: {},
      noResults: {
        padding: 16,
      },
    });
  }

  private sortList = (itemA: [string, ComponentItem], itemB: [string, ComponentItem]): number => {
    const textA = (itemA[0] || '').toUpperCase();
    const textB = (itemB[0] || '').toUpperCase();

    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };

  private filterList = (item: [string, ComponentItem]): boolean => {
    const { filterTerm } = this.props;

    if (filterTerm && typeof filterTerm === 'string') {
      return (item[0] || '').toLowerCase().includes(filterTerm.toLowerCase());
    }

    return true;
  };

  private getView(view: [string, ComponentItem]): React.ReactNode {
    const { changeView, theme } = this.props;
    const image = theme === 'dark' ? view[1]?.imageDark : view[1]?.imageLight;

    return (
      <Tile type="clickable" key={view[0]} onPress={() => changeView(view[0])} style={this.styles.item}>
        <Text style={this.styles.itemText} type="body-compact-01" text={view[0]} />
        {image ? <Image style={this.styles.itemImage} source={image} /> : <View style={this.styles.itemImage} />}
      </Tile>
    );
  }

  private getLayout = (event: LayoutChangeEvent): void => {
    this.setState({ viewWidth: event.nativeEvent.layout.width || 400 });
  };

  private get noResults(): React.ReactNode {
    return <ErrorState style={this.styles.noResults} type="empty" title="No results" subTitle="Try changing your search term or using more generic terms." />;
  }

  render(): React.ReactNode {
    const { viewList } = this.props;

    const finalList = viewList
      .filter(this.filterList)
      .sort(this.sortList)
      .map((view) => this.getView(view));

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={this.styles.container} style={this.styles.view} onLayout={this.getLayout}>
        {finalList.length ? finalList : this.noResults}
      </ScrollView>
    );
  }
}
