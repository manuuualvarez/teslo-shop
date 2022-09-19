import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookies from 'js-cookie';

export interface CartState {
     isLoaded: boolean;
     cart: ICartProduct[];
     numberOfItems: number;
     subTotal: number;
     tax: number;
     total: number;
     shippingAddress?: ShippingAddress
}
export interface ShippingAddress {
      firstName: string;
      lastName: string;
      address: string;
      address2: string;
      zip: string;
      city: string;
      country: string;
      phone: string; 
}

const getCookies = () => {
  try {
    return Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : []
  } catch (error) {
    return []
  }
}

const CART_INITIAL_STATE: CartState = {
     isLoaded: false,
     cart: getCookies(),  
     numberOfItems: 0,
     subTotal: 0,
     tax: 0,
     total: 0,
     shippingAddress: undefined
}

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(state.cart));
  }, []);

  useEffect(() => {
    if ( Cookies.get('firstName')) {
      const shippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      }
      dispatch({ type: '[Cart] - Load Address from cookies', payload: shippingAddress });
    }

  }, [state.cart]);


  useEffect(() => {

    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev,0);
    const subTotal =  state.cart.reduce((prev, current) => (current.price * current.quantity) + prev,0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
  
    const orderSummary = {
      numberOfItems, 
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
  
    }
    dispatch({ type: '[Cart] - Update cart summary', payload: orderSummary});
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
  
  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change Product Quantity', payload: product})
  }

  const removeItemForCart = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove Product', payload: product})
  }

  const updateAddress = (address: ShippingAddress) => {
    Cookies.set('firstName', address.firstName);
    Cookies.set('lastName', address.lastName);
    Cookies.set('address', address.address);
    Cookies.set('address2', address.address2 || '');
    Cookies.set('zip', address.zip);
    Cookies.set('city', address.city);
    Cookies.set('country', address.country);
    Cookies.set('phone', address.phone);
    dispatch({type: '[Cart] - Update Address', payload: address});
    
  }

  return (
   <CartContext.Provider value={{
     ...state,
    //  Methods
     addProductToCart,
     updateCartQuantity,
     removeItemForCart,
     updateAddress,
   }}>
     { children }
   </CartContext.Provider>
  )
}