import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, quantity = 0, onUpdateQuantity }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-lg mb-4">${product.price}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onUpdateQuantity(Math.max(0, quantity - 1))}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={() => onAddToCart(quantity)}
            disabled={quantity === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              quantity > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard