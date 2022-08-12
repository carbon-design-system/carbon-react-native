import * as React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Alert, Appearance, View } from 'react-native';
import { getColor, Header, HeaderAction, LandingView, forceTheme, ThemeChoices, Loading } from 'carbon-react-native';
import TestButton from './Views/Button';
import TestHome from './Views/Home';
import TestText from './Views/Text';
import TestIcons from './Views/Icons';
import InformationIcon from '@carbon/icons/es/information/20';
import HomeIcon from '@carbon/icons/es/home/20';
import AsleepIcon from '@carbon/icons/es/asleep/20';
import AwakeIcon from '@carbon/icons/es/awake/20';
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
import TestNumberInput from './Views/NumberInput';
import TestMenu from './Views/Menu';
import TestTile from './Views/Tile';
import TestDropdown from './Views/Dropdown';
import TestActionSheet from './Views/ActionSheet';
import TestModal from './Views/Modal';
import TestAccordion from './Views/Accordion';
import TestTag from './Views/Tag';
import TestNotification from './Views/Notification';
import TestContentSwitcher from './Views/ContentSwitcher';
import TestTabs from './Views/Tabs';
import TestProgressIndicator from './Views/ProgressIndicator';
import TestList from './Views/List';

export default class App extends React.Component {
  state = {
    loading: false,
    view: 'Home',
    firstLoad: true,
    theme: 'light' as ThemeChoices,
  }

  private get styles() {
    return StyleSheet.create({
      container: {
        flexGrow: 1,
        backgroundColor: getColor('layerSelectedInverse', 'light'),
      },
      containerNoHeader: {
        position: 'relative',
        backgroundColor: '#000000',
        flexGrow: 1,
      },
      loading: {
        marginTop: 64,
        marginRight: 'auto',
        marginLeft: 'auto',
      },
      mainView: {
        backgroundColor: getColor('background'),
        flexGrow: 1,
      },
    });
  }

  private get headerActions(): HeaderAction[] {
    const {theme} = this.state;

    return [
      {
        text: 'Information',
        icon: InformationIcon,
        onPress: () => {
          Alert.alert('Carbon for Mobile', 'Use this app to view and interact with components and flows. Tap a component or flow to open its test page. Use the home icon at the top to return to the list.');
        }
      },
      {
        text: 'Change theme',
        icon: theme === 'dark' ? AwakeIcon : AsleepIcon,
        onPress: () => {
          const newTheme = theme === 'dark' ? 'light' : 'dark';
          forceTheme(newTheme);
          this.setState({theme: newTheme, loading: true});
          setTimeout(() => {
            this.setState({loading: false});
          }, 100);
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
  }

  private changeView = (view: string): void => {
    this.setState({view});
  }

  private goHome = (): void => {
    this.setState({view: 'Home'});
  }

  private fullScreenTestViews = ['Landing View'];

  private componentViewList: [string, React.ReactNode][] = [
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
    ['Number Input', <TestNumberInput />],
    ['Menu', <TestMenu />],
    ['Tile', <TestTile />],
    ['Dropdown', <TestDropdown />],
    ['Action Sheet', <TestActionSheet />],
    ['Modal', <TestModal />],
    ['Accordion', <TestAccordion />],
    ['Tag', <TestTag />],
    ['Notification', <TestNotification />],
    ['Content Switcher', <TestContentSwitcher />],
    ['Tabs', <TestTabs />],
    ['Progress Indicator', <TestProgressIndicator />],
    ['List', <TestList />],
  ];

  private flowViewList: [string, React.ReactNode][] = [
    ['Landing View', <TestLandinView goHome={this.goHome} />],
  ];

  private viewMap: Map<string, React.ReactNode> = new Map([...this.componentViewList, ...this.flowViewList]);

  private get mainView(): React.ReactNode {
    const {view} = this.state;

    return (
      <View style={this.styles.mainView}>
        {this.viewMap.get(view) || <TestHome componentViews={this.componentViewList} flowViews={this.flowViewList} changeView={this.changeView} />}
      </View>
    );
  }

  private onPrivacyPolicy = (): void => {

  };

  componentDidMount(): void {
    this.setState({theme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'});
  }

  render(): React.ReactNode {
    const {view, firstLoad, loading} = this.state;

    if (loading) {
      return (
        <SafeAreaView style={this.styles.containerNoHeader}>
          <Loading style={this.styles.loading} />
        </SafeAreaView>
      )
    }

    if (firstLoad) {
      return (
        <SafeAreaView style={this.styles.containerNoHeader}>
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
      return <SafeAreaView style={this.styles.containerNoHeader}>{this.viewMap.get(view)}</SafeAreaView>;
    }

    return (
      <SafeAreaView style={this.styles.container}>
        <StatusBar backgroundColor={getColor('layerSelectedInverse', 'light')} barStyle="light-content" />
        <Header mainName="IBM" secondaryName="Carbon" actions={this.headerActions} />
        {this.mainView}
      </SafeAreaView>
    );
  }
}
