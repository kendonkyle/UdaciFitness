import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import EntryDetail from './components/EntryDetail';
import History from './components/History';
import Live from './components/Live';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { setLocalNotification } from './utils/helpers'


const Tabs = createBottomTabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      title: 'History',
      // tabBarLable: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      title: 'Add Entry',
      // tabBarLable: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
  Live: {
    screen: Live,
    navigationOptions: {
      title: 'Live',
      // tabBarLable: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  },
},
{
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Platform.OS === 'iso' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
},
//  { headerMode: 'screen' }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'stretch',
    // justifyContent: 'center',
  },
});

function UdaciStatusBar({ backgroundColor, ...props })  {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }} >
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  state = {
    value: 0,
  }

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <MainNavigator />
          {/* <Tabs /> */}
          {/* <AddEntry /> */}
        </View>
      </Provider>
    );
  }
}

