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
import TestLandinView from './Views/LandingView';
import TestLink from './Views/Link';
import TestTextInput from './Views/TextInput';
import TestTextArea from './Views/TextArea';
import TestPasswordInput from './Views/PasswordInput';

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

  private changeView = (view: string): void => {
    this.setState({view});
  }

  private goHome = (): void => {
    this.setState({view: 'Home'});
  }

  private fullScreenTestViews = ['Landing View'];

  private viewList: [string, React.ReactNode][] = [
    // Components
    ['Button', <TestButton />],
    ['Text', <TestText />],
    ['Icons', <TestIcons />],
    ['Header', <TestHeader />],
    ['Link', <TestLink />],
    ['Text Input', <TestTextInput />],
    ['Text Area', <TestTextArea />],
    ['Password Input', <TestPasswordInput />],
    // Views
    ['Landing View', <TestLandinView goHome={this.goHome} />],
  ];

  private viewMap: Map<string, React.ReactNode> = new Map(this.viewList);

  private get mainView(): React.ReactNode {
    const {view} = this.state;

    return this.viewMap.get(view) || <TestHome views={this.viewList} changeView={this.changeView} />;
  }

  render(): React.ReactNode {
    const {view} = this.state;

    if (this.fullScreenTestViews.includes(view)) {
      return <SafeAreaView style={styles.container}>{this.viewMap.get(view)}</SafeAreaView>;
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={getColor('layerSelectedInverse', 'light')} barStyle="light-content" />
        <Header mainName="Carbon" secondaryName="React Native" actions={this.headerActions} />
        {this.mainView}
      </SafeAreaView>
    );
  }
}
