import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import Checkout from './components/Checkout';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" 
         screenOptions={{
          headerStyle: { backgroundColor: '#4d5251' }, 
          headerTintColor: '#FFF', 
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, 
        }}>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout}  options={{ headerBackTitle: "Cart" }} />
        </Stack.Navigator>
        
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
