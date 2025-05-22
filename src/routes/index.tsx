import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//telas
import { Text } from 'react-native';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Search from '../screens/Search/Search'
import NewRide from '../screens/NewRide/NewRide'


// Definindo os tipos das rotas
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Search:undefined;
  NewRide:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: () => <Text>Cadastro</Text>,
          }}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Profile" component={Profile}
        options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewRide"
          component={NewRide}
          options={{
            headerShown: false,
          }}
          >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}