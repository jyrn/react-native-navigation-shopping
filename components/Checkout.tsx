import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, Alert } from 'react-native';
import { useCart } from '../components/CartContext';

const Checkout = ({ navigation }: { navigation: any }) => {
  const { cart, clearCart } = useCart(); 

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert(
      'Checkout Successful',
      'Thank you for your purchase!',
      [{ text: 'OK', onPress: () => {
        clearCart(); 
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }], 
        });
      }}]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      <View style={styles.listContainer}>
        {cart.length === 0 ? (
          <Text style={styles.emptyCart}>No items to checkout.</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.checkoutItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {cart.length > 0 && (
        <View style={styles.footerContainer}>
          <View style={styles.footer}>
            <Text style={styles.total}>Total: <Text style={styles.totalPrice}>${totalPrice}</Text></Text>
            <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Place Order</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFEF5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    flex: 1
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    flex: 1,
    justifyContent: 'center',
  },
  checkoutItem: {
    flexDirection: 'row',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF5412',
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: 'gray',
  },
  footerContainer: {
    position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
    backgroundColor: '#FFFEF5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:10,
    marginBottom:20
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
    backgroundColor: '#E86513',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
