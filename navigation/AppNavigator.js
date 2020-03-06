import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Contacts from '../screens/ContactListHome';
import EditContact from '../screens/EditContact';
import ViewContact from '../screens/ViewContact';

const AppNavigator = createStackNavigator(
  {
    EditContact: {
      screen: EditContact,
      navigationOptions: {headerShown: false},
    },
    ContactsHome: {
      screen: Contacts,
      navigationOptions: {
        headerShown: false,
      },
    },
    ViewContact: {
      screen: ViewContact,
      navigationOptions: {headerShown: false},
    },
  },
  {initialRouteName: 'ContactsHome'},
);

const App1 = createAppContainer(AppNavigator);

export default App1;
