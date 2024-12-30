import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AllProductsScreen from './src/screens/AllProductsScreen/AllProductsScreen';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import { View, Text } from 'react-native';
import { UserProvider } from './src/context/UserContext';
import { ItemClickProvider } from './src/context/ItemClickContext';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AllProductsStack = ({ route }) => {
  const { username } = route.params || {};
  return (
    <Stack.Navigator initialRouteName="AllProducts">
      <Stack.Screen
        name="AllProducts"
        component={AllProductsScreen}
        options={{ headerShown: false }}
        initialParams={{ username }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = ({ route }) => {
  const { username } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          display: 'none', 
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Shop') {
            iconName = 'storefront';
          } else if (route.name === 'Cart') {
            iconName = 'cart';
          }

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === 'Cart' && totalItems > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -6,
                    top: -3,
                    backgroundColor: 'black',
                    borderRadius: 9,
                    width: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                  >
                    {totalItems}
                  </Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Shop"
        component={AllProductsStack}
        initialParams={{ username }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider>
      <ItemClickProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainApp"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ItemClickProvider>
    </UserProvider>
  );
};

export default App;
