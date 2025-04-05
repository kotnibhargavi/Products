import React, { useState, useEffect } from 'react';
import { PRODUCTS, FREE_GIFT, THRESHOLD } from './data';
import ProductCard from './components/ProductCard';
import CartItem from './components/CartItem';
import ProgressBar from './components/ProgressBar';
import { ShoppingBag } from 'lucide-react';

function App() {
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [showGiftMessage, setShowGiftMessage] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    const shouldHaveFreeGift = cartTotal >= THRESHOLD;
    const hasFreeGift = cart.some(item => item.id === FREE_GIFT.id);

    if (shouldHaveFreeGift && !hasFreeGift) {
      setCart(prev => [...prev, { ...FREE_GIFT, quantity: 1 }]);
      setShowGiftMessage(true);
      setTimeout(() => setShowGiftMessage(false), 3000);
    } else if (!shouldHaveFreeGift && hasFreeGift) {
      setCart(prev => prev.filter(item => item.id !== FREE_GIFT.id));
    }
  }, [cartTotal]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleAddToCart = (product, quantity) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setQuantities(prev => ({ ...prev, [product.id]: 0 }));
  };

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showGiftMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          🎉 Congratulations! You've earned a free gift!
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PRODUCTS.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 0}
              onUpdateQuantity={(qty) => handleUpdateQuantity(product.id, qty)}
              onAddToCart={(qty) => handleAddToCart(product, qty)}
            />
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ShoppingBag className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          </div>

          <ProgressBar current={cartTotal} threshold={THRESHOLD} />

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateCartQuantity}
                    onRemove={handleRemoveFromCart}
                    isFreeGift={item.id === FREE_GIFT.id}
                  />
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-xl font-semibold">
                  <span>Total:</span>
                  <span>${cartTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;