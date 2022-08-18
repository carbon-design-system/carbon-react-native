import * as React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Appearance, View, ImageSourcePropType } from 'react-native';
import { getColor, LandingView, ThemeChoices, Loading, useDarkMode, TopNavigationBar, TopNavigationBarProps, BottomNavigationBar, NavigationButton, ActionSheet, ActionSheetItem, forceTheme, Search } from 'carbon-react-native';
import TestButton from './Views/Button';
import TestComponentList from './Views/ComponentList';
import TestText from './Views/Text';
import TestIcons from './Views/Icons';
import ThemeIcon from '@carbon/icons/es/color-palette/20';
import LayoutIcon from '@carbon/icons/es/open-panel--left/20';
import ResourcesIcon from '@carbon/icons/es/document/20';
import ArrowLeftIcon from '@carbon/icons/es/arrow--left/16';
import ComponentIcon from '@carbon/icons/es/view--mode-2/20';
import TestWebHeader from './Views/WebHeader';
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
import { versionCode } from './constants/versionCode';
import { version } from '../package.json';
import TestOverlay from './Views/Overlay';
import TestPagination from './Views/Pagination';
import TestDataTable from './Views/DataTable';
import TestBottomNavigationBar from './Views/BottomNavigationBar';
import TestBottomToolbar from './Views/BottomToolbar';
import TestBottomToolbarPrimaryAction from './Views/BottomToolbarPrimaryAction';
import TestSearch from './Views/Search';
import TestTopNavigationBar from './Views/TopNavigationBar';
import TestNavigationLisstItem from './Views/NavigationListItem';
import TestResources from './Views/Resources';

export type ComponentItem = {
  component: React.ReactNode;
  imageLight: ImageSourcePropType | null;
  imageDark: ImageSourcePropType | null;
};

export default class App extends React.Component {
  state = {
    loading: false,
    openThemeChoice: false,
    topView: 'components',
    view: '',
    firstLoad: true,
    filterTerm: '',
    theme: 'light' as ThemeChoices,
  };

  private get styles() {
    return StyleSheet.create({
      container: {
        flexGrow: 1,
        backgroundColor: getColor('layer01'),
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

  private changeView = (view: string): void => {
    this.setState({ view });
  };

  private clearView = (): void => {
    this.setState({ view: '' });
  };

  private fullScreenTestViews = ['Landing View'];

  private componentViewList: [string, ComponentItem][] = [
    ['Button', { component: <TestButton />, imageLight: require('./assets/components/button-light.png'), imageDark: require('./assets/components/button-light.png') }],
    ['Text', { component: <TestText />, imageLight: null, imageDark: null }],
    ['Icons', { component: <TestIcons />, imageLight: null, imageDark: null }],
    ['Web header', { component: <TestWebHeader />, imageLight: null, imageDark: null }],
    ['Link', { component: <TestLink />, imageLight: null, imageDark: null }],
    ['Text input', { component: <TestTextInput />, imageLight: null, imageDark: null }],
    ['Text area', { component: <TestTextArea />, imageLight: null, imageDark: null }],
    ['Password input', { component: <TestPasswordInput />, imageLight: null, imageDark: null }],
    ['Checkbox', { component: <TestCheckbox />, imageLight: null, imageDark: null }],
    ['Radio button', { component: <TestRadioButton />, imageLight: null, imageDark: null }],
    ['Toggle', { component: <TestToggle />, imageLight: null, imageDark: null }],
    ['Loading', { component: <TestLoading />, imageLight: null, imageDark: null }],
    ['File uploader item', { component: <TestFileUploaderItem />, imageLight: null, imageDark: null }],
    ['Number input', { component: <TestNumberInput />, imageLight: null, imageDark: null }],
    ['Menu', { component: <TestMenu />, imageLight: null, imageDark: null }],
    ['Tile', { component: <TestTile />, imageLight: null, imageDark: null }],
    ['Bottom navigation bar', { component: <TestBottomNavigationBar />, imageLight: null, imageDark: null }],
    ['Top navigation bar', { component: <TestTopNavigationBar />, imageLight: null, imageDark: null }],
    ['Bottom toolbar', { component: <TestBottomToolbar />, imageLight: null, imageDark: null }],
    ['Bottom toolbar primary action', { component: <TestBottomToolbarPrimaryAction />, imageLight: null, imageDark: null }],
    ['Navigation list', { component: <TestNavigationLisstItem />, imageLight: null, imageDark: null }],
    ['Search', { component: <TestSearch />, imageLight: null, imageDark: null }],
    ['Dropdown', { component: <TestDropdown />, imageLight: null, imageDark: null }],
    ['Action sheet', { component: <TestActionSheet />, imageLight: null, imageDark: null }],
    ['Modal', { component: <TestModal />, imageLight: null, imageDark: null }],
    ['Accordion', { component: <TestAccordion />, imageLight: null, imageDark: null }],
    ['Tag', { component: <TestTag />, imageLight: null, imageDark: null }],
    ['Notification', { component: <TestNotification />, imageLight: null, imageDark: null }],
    ['Content switcher', { component: <TestContentSwitcher />, imageLight: null, imageDark: null }],
    ['Tabs', { component: <TestTabs />, imageLight: null, imageDark: null }],
    ['Progress indicator', { component: <TestProgressIndicator />, imageLight: null, imageDark: null }],
    ['List', { component: <TestList />, imageLight: null, imageDark: null }],
    ['Overlay', { component: <TestOverlay />, imageLight: null, imageDark: null }],
    ['Pagination', { component: <TestPagination />, imageLight: null, imageDark: null }],
    ['Data table', { component: <TestDataTable />, imageLight: null, imageDark: null }],
  ];

  private flowViewList: [string, ComponentItem][] = [['Landing View', { component: <TestLandinView goHome={this.clearView} />, imageLight: null, imageDark: null }]];

  private viewMap: Map<string, ComponentItem> = new Map([...this.componentViewList, ...this.flowViewList]);

  private get topView(): React.ReactNode {
    const { topView, filterTerm, theme } = this.state;

    switch (topView) {
      case 'resources':
        return <TestResources />;
      case 'layouts':
        return <TestComponentList viewList={this.flowViewList} filterTerm={filterTerm} changeView={this.changeView} theme={theme} />;
      case 'components':
      default:
        return <TestComponentList viewList={this.componentViewList} filterTerm={filterTerm} changeView={this.changeView} theme={theme} />;
    }
  }

  private get mainView(): React.ReactNode {
    const { view } = this.state;

    return <View style={this.styles.mainView}>{this.viewMap.get(view)?.component || this.topView}</View>;
  }

  private get hasSearch(): boolean {
    const { view, topView } = this.state;

    return !view && ['layouts', 'components'].includes(topView);
  }

  private onPrivacyPolicy = (): void => {};

  private get topNavProps(): TopNavigationBarProps {
    const { view, topView, filterTerm } = this.state;

    const pageNames: any = {
      layouts: 'Layouts',
      components: 'Components',
      resources: 'Resources',
    };

    return {
      title: view || pageNames[topView],
      rightItems: [
        {
          text: 'Change theme',
          icon: ThemeIcon,
          onPress: () => {
            this.setState({ openThemeChoice: true });
          },
        },
      ],
      leftLink: view
        ? {
            text: pageNames[topView],
            onPress: this.clearView,
            leftIcon: ArrowLeftIcon,
            iconSize: 15,
          }
        : undefined,
      additionalHeaderContent: this.hasSearch ? (
        <Search
          value={filterTerm}
          placeholder="Search"
          light={true}
          onChangeText={(value) => {
            this.setState({ filterTerm: value });
          }}
        />
      ) : undefined,
    };
  }

  private get themeChoices(): ActionSheetItem[] {
    const changeTheme = (theme: ThemeChoices): void => {
      forceTheme(theme);
      this.setState({ loading: true, openThemeChoice: false, theme: theme });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 100);
    };

    return [
      {
        text: 'Cancel',
        onPress: () => {
          this.setState({ openThemeChoice: false });
        },
      },
      {
        text: 'System',
        onPress: () => {
          changeTheme(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');
        },
      },
      {
        text: 'Light',
        onPress: () => {
          changeTheme('light');
        },
      },
      {
        text: 'Dark',
        onPress: () => {
          changeTheme('dark');
        },
      },
    ];
  }

  private get bottomNavItems(): NavigationButton[] {
    const { topView } = this.state;

    return [
      {
        text: 'Layouts',
        active: topView === 'layouts',
        icon: LayoutIcon,
        onPress: () => {
          this.setState({ topView: 'layouts', view: '' });
        },
      },
      {
        text: 'Components',
        active: topView === 'components',
        icon: ComponentIcon,
        onPress: () => {
          this.setState({ topView: 'components', view: '' });
        },
      },
      {
        text: 'Resources',
        active: topView === 'resources',
        icon: ResourcesIcon,
        onPress: () => {
          this.setState({ topView: 'resources', view: '' });
        },
      },
    ];
  }

  componentDidMount(): void {
    this.setState({
      theme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
    });
  }

  render(): React.ReactNode {
    const { view, firstLoad, loading, openThemeChoice } = this.state;

    if (loading) {
      return (
        <SafeAreaView style={this.styles.containerNoHeader}>
          <Loading style={this.styles.loading} />
        </SafeAreaView>
      );
    }

    if (firstLoad) {
      return (
        <SafeAreaView style={this.styles.containerNoHeader}>
          <StatusBar backgroundColor={'#000000'} barStyle="light-content" />
          <LandingView
            productImage={require('./assets/app_icon.png')}
            companyImage={require('./assets/companyImage.png')}
            longProductName="Carbon for Mobile"
            versionText={`Version ${version} (${versionCode})`}
            copyrightText="Copyright © 2022 IBM"
            continueText="Continue"
            continueOnPress={() => {
              this.setState({ firstLoad: false });
            }}
            privacyPolicyText="Privacy Policy"
            privacyPolicyOnPress={this.onPrivacyPolicy}
          />
        </SafeAreaView>
      );
    }

    if (this.fullScreenTestViews.includes(view)) {
      return (
        <SafeAreaView style={this.styles.containerNoHeader}>
          <StatusBar backgroundColor={'#000000'} barStyle="light-content" />
          {this.viewMap.get(view)?.component}
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={this.styles.container}>
        <StatusBar backgroundColor={getColor('layer01')} barStyle={useDarkMode() ? 'light-content' : 'dark-content'} />
        <TopNavigationBar {...this.topNavProps} />
        {this.mainView}
        <BottomNavigationBar items={this.bottomNavItems} />
        <ActionSheet open={openThemeChoice} title="Theme" cancelButtonIndex={0} items={this.themeChoices} forceCustomActionSheet={true} />
      </SafeAreaView>
    );
  }
}
