import * as React from 'react';
import { StyleSheet, Appearance, View, ImageSourcePropType } from 'react-native';
import { ThemeChoices, Loading, TopNavigationBar, TopNavigationBarProps, BottomNavigationBar, NavigationButton, ActionSheet, ActionSheetItem, forceTheme, Search, ViewWrapper } from 'carbon-react-native';
import TestButton from './Views/Button';
import TestComponentList from './Views/ComponentList';
import TestText from './Views/Text';
import TestIcons from './Views/Icons';
import ThemeIcon from '@carbon/icons/es/color-palette/20';
import LayoutIcon from '@carbon/icons/es/open-panel--left/20';
import ResourcesIcon from '@carbon/icons/es/document/20';
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
import TestOverlay from './Views/Overlay';
import TestPagination from './Views/Pagination';
import TestDataTable from './Views/DataTable';
import TestBottomNavigationBar from './Views/BottomNavigationBar';
import TestBottomToolbar from './Views/BottomToolbar';
import TestBottomToolbarPrimaryAction from './Views/BottomToolbarPrimaryAction';
import TestSearch from './Views/Search';
import TestTopNavigationBar from './Views/TopNavigationBar';
import TestNavigationLisst from './Views/NavigationList';
import TestResources from './Views/Resources';
import TestErrorState from './Views/ErrorState';
import TestDocumentViewer from './Views/DocumentViewer';
import TestAcceptTerms from './Views/AcceptsTerms';
import RealLandingView from './Views/RealLandingView';
import TestGrantPermission from './Views/GrantPermission';
import TestViewWrapper from './Views/ViewWrapper';
import TestUiPanel from './Views/UiPanel';
import TestTooltip from './Views/Tooltip';
import TestDateInput from './Views/DateInput';
import TestLogin from './Views/Login';
import TestSlider from './Views/Slider';
import TestTopNavigationBarLogin from './Views/TopNavigationBarLogin';
import TestLoginForgotPassword from './Views/LoginForgotPassword';
import TestLoginCreatePassword from './Views/LoginCreatePassword';
import TestLoginCreateAccount from './Views/LoginCreateAccount';

export type ComponentItem = {
  component: React.ReactNode;
  imageLight: ImageSourcePropType | null;
  imageDark: ImageSourcePropType | null;
  fullScreen?: boolean;
  hidden?: boolean;
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
      loading: {
        marginTop: 64,
        marginRight: 'auto',
        marginLeft: 'auto',
      },
      mainView: {
        flexGrow: 1,
      },
      searchBox: {
        paddingTop: 0,
      },
    });
  }

  private changeView = (view: string): void => {
    this.setState({ view });
  };

  private clearView = (): void => {
    this.setState({ view: '' });
  };

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
    ['Navigation list', { component: <TestNavigationLisst />, imageLight: null, imageDark: null }],
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
    ['Error state', { component: <TestErrorState />, imageLight: null, imageDark: null }],
    ['View wrapper', { component: <TestViewWrapper goHome={this.clearView} />, fullScreen: true, imageLight: null, imageDark: null }],
    ['UI panel', { component: <TestUiPanel goHome={this.clearView} />, fullScreen: true, imageLight: null, imageDark: null }],
    ['Tooltip', { component: <TestTooltip />, imageLight: null, imageDark: null }],
    ['Date input', { component: <TestDateInput />, imageLight: null, imageDark: null }],
    ['Top navigation bar login', { component: <TestTopNavigationBarLogin />, imageLight: null, imageDark: null }],
    ['Slider', { component: <TestSlider />, imageLight: null, imageDark: null }],
  ];

  private flowViewList: [string, ComponentItem][] = [
    ['Landing', { component: <TestLandinView goHome={this.clearView} />, fullScreen: true, imageLight: null, imageDark: null }],
    ['Document viewer', { component: <TestDocumentViewer />, imageLight: null, imageDark: null }],
    ['Accept terms', { component: <TestAcceptTerms />, imageLight: null, imageDark: null }],
    ['Grant permission', { component: <TestGrantPermission />, imageLight: null, imageDark: null }],
    ['Login', { component: <TestLogin changeView={this.changeView} goHome={this.clearView} />, fullScreen: true, imageLight: null, imageDark: null }],
    ['Login - Forgot password', { component: <TestLoginForgotPassword changeView={this.changeView} />, fullScreen: true, imageLight: null, imageDark: null }],
    ['Login - Create password', { component: <TestLoginCreatePassword changeView={this.changeView} />, fullScreen: true, imageLight: null, imageDark: null }],
    ['Login - After set', { component: <TestLogin changeView={this.changeView} goHome={this.clearView} afterReset={true} />, hidden: true, fullScreen: true, imageLight: null, imageDark: null }],
    ['Login - Create account', { component: <TestLoginCreateAccount />, imageLight: null, imageDark: null }],
  ];

  private viewMap: Map<string, ComponentItem> = new Map([...this.componentViewList, ...this.flowViewList]);

  private get topView(): React.ReactNode {
    const { topView, filterTerm, theme } = this.state;

    switch (topView) {
      case 'resources':
        return <TestResources />;
      case 'layouts':
        return <TestComponentList viewList={this.flowViewList.filter((item) => !item[1].hidden)} filterTerm={filterTerm} changeView={this.changeView} theme={theme} listView={true} />;
      case 'components':
      default:
        return <TestComponentList viewList={this.componentViewList.filter((item) => !item[1].hidden)} filterTerm={filterTerm} changeView={this.changeView} theme={theme} listView={true} />;
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
            backButtonMode: true,
            iconSize: 15,
          }
        : undefined,
      additionalHeaderContent: this.hasSearch ? (
        <Search
          style={this.styles.searchBox}
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
          this.setState({ topView: 'layouts', view: '', filterTerm: '' });
        },
      },
      {
        text: 'Components',
        active: topView === 'components',
        icon: ComponentIcon,
        onPress: () => {
          this.setState({ topView: 'components', view: '', filterTerm: '' });
        },
      },
      {
        text: 'Resources',
        active: topView === 'resources',
        icon: ResourcesIcon,
        onPress: () => {
          this.setState({ topView: 'resources', view: '', filterTerm: '' });
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
        <ViewWrapper>
          <Loading style={this.styles.loading} />
        </ViewWrapper>
      );
    }

    if (firstLoad) {
      return <RealLandingView continueAction={() => this.setState({ firstLoad: false })} />;
    }

    const viewTouse = this.viewMap.get(view);

    if (viewTouse?.fullScreen) {
      return viewTouse?.component;
    }

    return (
      <ViewWrapper hasTopNavigation={true} hasBottomNavigation={true}>
        <TopNavigationBar {...this.topNavProps} />
        {this.mainView}
        <BottomNavigationBar items={this.bottomNavItems} />
        <ActionSheet open={openThemeChoice} title="Theme" cancelButtonIndex={0} items={this.themeChoices} forceCustomActionSheet={true} />
      </ViewWrapper>
    );
  }
}
