import * as React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import { getColor, Header, HeaderAction, LandingView } from 'carbon-react-native';
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
import TestCheckbox from './Views/Checkbox';
import TestRadioButton from './Views/RadioButton';
import TestToggle from './Views/Toggle';
import TestLoading from './Views/Loading';
import TestFileUploaderItem from './Views/FileUploaderItem';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: getColor('background'),
  },
  containerNoHeader: {
    position: 'relative',
    backgroundColor: '#000000',
    flexGrow: 1,
  }
});

export default class App extends React.Component {
  state = {
    view: 'Home',
    firstLoad: true,
  }

  private headerActions: HeaderAction[] = [
    {
      text: 'Information',
      icon: InformationIcon,
      onPress: () => {
        Alert.alert('Carbon for Mobile', 'This test app is for testing Carbon React Native components.');
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
    ['Checkbox', <TestCheckbox />],
    ['Radio Button', <TestRadioButton />],
    ['Toggle', <TestToggle />],
    ['Loading', <TestLoading />],
    ['File Uploader Item', <TestFileUploaderItem />],
    // Views
    ['Landing View', <TestLandinView goHome={this.goHome} />],
  ];

  private viewMap: Map<string, React.ReactNode> = new Map(this.viewList);

  private get mainView(): React.ReactNode {
    const {view} = this.state;

    return this.viewMap.get(view) || <TestHome views={this.viewList} changeView={this.changeView} />;
  }

  private onPrivacyPolicy = (): void => {

  };

  render(): React.ReactNode {
    const {view, firstLoad} = this.state;

    if (firstLoad) {
      return (
        <SafeAreaView style={styles.containerNoHeader}>
          <LandingView
            productImage={require('./assets/productImage.png')}
            companyImage={require('./assets/companyImage.png')}
            longProductName="Carbon for Mobile"
            versionText="Version 1.0.0 (1)"
            copyrightText="Copyright © 2022 IBM"
            continueText="Continue"
            continueOnPress={() => {
              this.setState({firstLoad: false});
            }}
            privacyPolicyText="Privacy Policy"
            privacyPolicyOnPress={this.onPrivacyPolicy}
          />
        </SafeAreaView>
      );
    }

    if (this.fullScreenTestViews.includes(view)) {
      return <SafeAreaView style={styles.containerNoHeader}>{this.viewMap.get(view)}</SafeAreaView>;
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={getColor('layerSelectedInverse', 'light')} barStyle="light-content" />
        <Header mainName="IBM" secondaryName="Carbon" actions={this.headerActions} />
        {this.mainView}
      </SafeAreaView>
    );
  }
}
