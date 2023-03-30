import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EventListScreen from './EventList'

import HomeScreen from './Home'
import EventDetailsScreen from './EventDetails';
import FavoritEventsScreen from './FavoriteEvents';

const MainNavigator = createStackNavigator({

  Home: { screen: HomeScreen },
  EventList: { screen: EventListScreen },
  EventDetails: { screen: EventDetailsScreen },
  FavoriteEvents: { screen: FavoritEventsScreen }

});

const App = createAppContainer(MainNavigator);
export default App;