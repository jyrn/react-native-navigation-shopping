import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, Alert } from 'react-native';
import { useCart } from '../components/CartContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigation = useNavigation();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleDecreaseQuantity = (id: number, quantity: number) => {
    if (quantity === 1) {
      Alert.alert(
        'Remove Item',
        'Are you sure you want to delete this item?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => removeFromCart(id) },
        ],
        { cancelable: false }
      );
    } else {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigation.navigate('Checkout');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      <View style={styles.listContainer}>
        {cart.length === 0 ? (
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
                </View>

                <View style={styles.quantityControls}>
                  <Pressable onPress={() => handleDecreaseQuantity(item.id, item.quantity)} style={styles.fixedButton}>
                    <Text style={styles.buttonText}>−</Text>
                  </Pressable>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Pressable onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.fixedButton}>
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>
                </View>

                <Pressable onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
                  <Icon name="trash" size={20} color="#D9534F" />
                </Pressable>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <Text style={styles.total}>Total: <Text style={styles.totalPrice}>${totalPrice}</Text></Text>
          <Pressable
            style={[styles.checkoutButton, cart.length === 0 && styles.disabledButton]}
            onPress={handleCheckout}
            disabled={cart.length === 0}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFEF5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  listContainer: {
    flex: 1,
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    flex: 1,
    justifyContent: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#EFEFE9',
    borderRadius: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 15,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF5412',
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    minWidth: 30,
    textAlign: 'center',
  },
  fixedButton: {
    backgroundColor: '#506D59',
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFEF5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
    marginBottom: 75,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight:10

  },
  totalPrice: {
    color: '#FF5412', 
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#DD911E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
});
