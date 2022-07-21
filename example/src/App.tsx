import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { getColor } from 'carbon-react-native';
import TestButton from './Views/Button';
import TestHome from './Views/Home';
import TestText from './Views/Text';

export type ViewType = 'home'|'text'|'button';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: getColor('background'),
  },
});

export default class App extends React.Component {
  state = {
    view: 'home' as ViewType,
  }

  private changeView = (view: ViewType): void => {
    this.setState({view});
  }

  private get mainView(): React.ReactNode {
    const {view} = this.state;

    switch (view) {
      case 'button':
        return <TestButton />
      case 'text':
        return <TestText />
      case 'home':
      default:
        return <TestHome changeView={this.changeView} />;
    }
  }

  render(): React.ReactNode {
    return <SafeAreaView style={styles.container}>{this.mainView}</SafeAreaView>;
  }
}
