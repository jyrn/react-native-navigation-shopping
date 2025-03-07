import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../components/CartContext';
import { LinearGradient } from 'expo-linear-gradient';
import Cart from './Cart';
import Icon from 'react-native-vector-icons/FontAwesome5';

const products = [
  { id: 1, name: 'Modern Chair', price: 100, image: require('../assets/modern.png') },
  { id: 2, name: 'Luxury Sofa', price: 200, image: require('../assets/sofa.png') },
  { id: 3, name: 'Wooden Table', price: 300, image: require('../assets/tablepng.png') },
  { id: 4, name: 'Cozy Armchair', price: 400, image: require('../assets/armchair.png') },
  { id: 5, name: 'Office Desk', price: 500, image: require('../assets/office.png') },
];

const Home = () => {
  const { addToCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 700);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showCart ? (
        <Cart />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.headerText}>Find the Perfect Furniture</Text>

          <View style={styles.roundedContainerWrapper}>
            <LinearGradient 
              colors={['#95ada9', '#F1F0E9']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }} 
              style={styles.roundedContainer}
            >
              <Text style={styles.containerText}>20% OFF</Text>
              <Text style={styles.spacetext}>THIS 3.3 SALE!</Text>
            </LinearGradient>
            <Image source={require('../assets/chair.png')} style={styles.overlappingImage} resizeMode="contain" />
          </View>

          <Text style={styles.productTitle}>Products</Text>

          <View style={styles.horizontalListContainer}>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                  </View>
                  <View style={styles.productDetails}>
                    <Text style={styles.productText}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.productPrice}>${item.price}</Text>
                      <Pressable style={styles.addButton} onPress={() => handleAddToCart(item)}>
                        <Text style={styles.addButtonText}>Add to Cart</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}

      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => setShowCart(false)} style={[styles.navButton, !showCart && styles.activeButton]}>
          <Icon name="home" size={24} color={!showCart ? '#FFFEF5' : '#868686'} />
          {!showCart && <Text style={styles.activeText}>Home</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowCart(true)} style={[styles.navButton, showCart && styles.activeButton]}>
          <Icon name="shopping-cart" size={24} color={showCart ? '#FFFEF5' : '#868686'} />
          {showCart && <Text style={styles.activeText}>Cart</Text>}
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={30} color="#4CAF50" />
            <Text style={styles.modalText}>Item successfully added!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#333',
    padding: 35,
  },
  roundedContainerWrapper: {
    position: 'relative',
    marginBottom: 20,
    padding: 30,
  },
  roundedContainer: {
    borderRadius: 15,
    elevation: 3,
    justifyContent: 'center',
    overflow: 'hidden',
    height: 150,
  },
  containerText: {
    padding: 30,
    fontSize: 25,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
  },
  spacetext: {
    padding: 30,
    marginTop: -40,
    color: '#7f7f7f',
    fontWeight: 'bold',
    fontSize: 20,
  },
  overlappingImage: {
    width: 190,
    height: 190,
    position: 'absolute',
    top: -25,
    right: 4,
    zIndex: 1,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingLeft: 30,
  },
  horizontalListContainer: {
    marginLeft: 10,
  },
  horizontalList: {
    paddingRight: 0,
  },
  productItem: {
    padding: 10,
    backgroundColor: '#EFEFE9',
    marginRight: 15,
    borderRadius: 10,
    width: 230,
    height: 380,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 80,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    marginTop: 100,
  },
  productDetails: {
    width: '100%',
    paddingHorizontal: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  productText: {
    fontSize: 16,
    fontWeight: '600',    
    textAlign: 'left',
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#506D59',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#3F403F',
    borderRadius: 100,
    padding: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  activeButton: {
    padding: 10,
    borderRadius: 10,
  },
  activeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFEF5',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent:'center',
    padding:10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
