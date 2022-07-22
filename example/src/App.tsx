import * as React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import { getColor, Header, HeaderAction } from 'carbon-react-native';
import TestButton from './Views/Button';
import TestHome from './Views/Home';
import TestText from './Views/Text';
import TestIcons from './Views/Icons';
import InformationIcon from '@carbon/icons/es/information/20';
import HomeIcon from '@carbon/icons/es/home/20';
import TestHeader from './Views/Header';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: getColor('background'),
  },
});

export default class App extends React.Component {
  state = {
    view: 'Home',
  }

  private headerActions: HeaderAction[] = [
    {
      text: 'Information',
      icon: InformationIcon,
      onPress: () => {
        Alert.alert('Carbon React Native test app', 'This test app is for testing Carbon React Native components.');
      }
    },
    {
      text: 'Go home',
      icon: HomeIcon,
      onPress: () => {
        this.changeView('Home');
      }
    }
  ];

  private viewList: [string, React.ReactNode][] = [
    ['Button', <TestButton />],
    ['Text', <TestText />],
    ['Icons', <TestIcons />],
    ['Header', <TestHeader />],
  ];

  private viewMap: Map<string, React.ReactNode> = new Map(this.viewList);

  private changeView = (view: string): void => {
    this.setState({view});
  }

  private get mainView(): React.ReactNode {
    const {view} = this.state;

    return this.viewMap.get(view) || <TestHome views={this.viewList} changeView={this.changeView} />;
  }

  render(): React.ReactNode {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={getColor('layerSelectedInverse', 'light')} barStyle="light-content" />
        <Header mainName="Carbon" secondaryName="React Native" actions={this.headerActions} />
        {this.mainView}
      </SafeAreaView>
    );
  }
}
