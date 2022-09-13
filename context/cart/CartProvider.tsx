import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookie from 'js-cookie'

export interface CartState {
     cart: ICartProduct[];
}

const getCookies = () => {
  try {
    return Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
  } catch (error) {
    return []
  }
}

const CART_INITIAL_STATE: CartState = {
     cart: getCookies()     
}

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);
  

  const addProductToCart = (product: ICartProduct) => {
    //? Option 1: Failed
    // dispatch({type: '[Cart] - Add Product', payload: product})
    //? Option 2: A lot of logic
    // const productsInCart = state.cart.filter( item => item._id !== product._id && item.size !== product.size);
    // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product]});
    //! Option 3: Better
    // Check if the id is in the cart, if not append
    const productInCart = state.cart.some( item => item._id === product._id);
    if (!productInCart) return dispatch({type: '[Cart] - Update', payload: [...state.cart, product]});
    // Check if the id is in the cart, if yes, and the size is not in the array, append:
    const productInCartButDifferentSize = state.cart.some(item => item._id === product._id && item.size === product.size);
    if (!productInCartButDifferentSize) return dispatch({type: '[Cart] - Update', payload: [...state.cart, product]});
    // If this method does not return, means that I need to update the quantity in some item:
    const updateProductByQuantity = state.cart.map( item => {
      if(item._id !== product._id) return item;
      if(item.size !== product.size) return item;
      // Update the item
      item.quantity += product.quantity;
      return item;
    });

    dispatch({ type: '[Cart] - Update', payload: updateProductByQuantity});
  }

  return (
   <CartContext.Provider value={{
     ...state,
     addProductToCart,
   }}>
     { children }
   </CartContext.Provider>
  )
}