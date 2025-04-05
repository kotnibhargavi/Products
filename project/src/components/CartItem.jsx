import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove, isFreeGift }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 animate-fadeIn">
      <div className="flex items-center space-x-4">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {!isFreeGift && (
          <>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
        {isFreeGift && (
          <span className="text-green-600 text-sm font-medium">Free Gift! 🎁</span>
        )}
      </div>
    </div>
  );
};

export default CartItem