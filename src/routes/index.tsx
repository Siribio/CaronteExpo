import React from 'react';
import { ActivityIndicator, View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth, AuthProvider } from '../context/AuthContext'
import { CaronaProps } from ".././types/Carona";


// telas
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Search from '../screens/Search/Search';
import NewRide from '../screens/NewRide/NewRide';
import Financeiro from '../screens/Financial/Financeiro';
import DetalhesCarona from '../screens/Detail/DetalhesCarona';
import RideHistory from '../screens/RideHistory/RideHistory';
import Chat from '../screens/Chat/Chat';
// import tw from 'twrnc';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Search:undefined;
  NewRide:undefined;
  Financeiro:undefined;
  DetalhesCarona: { carona: CaronaProps };
  RideHistory:undefined;
  Chat: { chatData: {id: number, id_passageiro: number} };


};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerTitle: () => <Text>Voltar</Text> }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerTitle: () => <Text>Cadastro</Text> }}  />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            {user?.tipo_usuario === 2 && (
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
)}
            {user?.tipo_usuario === 1 && (
            <Stack.Screen name="NewRide" component={NewRide} options={{ headerShown: false }} />
)}
            <Stack.Screen name="Financeiro" component={Financeiro} options={{ headerTitle: () => <Text>Voltar</Text> }}  />
            <Stack.Screen name="DetalhesCarona" component={DetalhesCarona} options={{ headerTitle: () => <Text>Voltar</Text> }}/>
            <Stack.Screen name="RideHistory" component={RideHistory} options={{ headerTitle: () => <Text>Voltar</Text> }}/>
            <Stack.Screen name="Chat" component={Chat} options={{ headerTitle: () => <Text>Voltar</Text> }} />
          </>
        )}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Routes() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}


