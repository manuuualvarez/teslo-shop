import { ICartProduct } from '../../interfaces';
import { CartState } from './';
import { ShippingAddress } from './CartProvider';


type CartActionType = 
| { type: '[Cart] - Load Cart from Cookies | storage', payload: ICartProduct[] }
| { type: '[Cart] - Update', payload: ICartProduct[] }
| { type: '[Cart] - Change Product Quantity', payload: ICartProduct }
| { type: '[Cart] - Remove Product', payload: ICartProduct }
| { type: '[Cart] - Load Address from cookies', payload: ShippingAddress }
| { type: '[Cart] - Update Address', payload: ShippingAddress }
| { 
    type: '[Cart] - Update cart summary', 
    payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
    }
}

export const cartReducer = ( state: CartState, action: CartActionType): CartState => {
     switch (action.type) {
       case '[Cart] - Load Cart from Cookies | storage':
           return { 
            ...state,
            isLoaded: true,
            cart: action.payload
            };
        case '[Cart] - Update':
            return {
                ...state,
                cart: [ ...action.payload ]
            }
        case '[Cart] - Change Product Quantity':
            return {
                ...state,
                cart: state.cart.map( product => {
                    if( product._id !== action.payload._id) return product;
                    if( product.size !== action.payload.size) return product;
                    return action.payload;
                })
            }
        case '[Cart] - Remove Product':
            return {
                ...state,
                cart: state.cart.filter( product  => !(product._id === action.payload._id && product.size === action.payload.size))
            }
        case '[Cart] - Update cart summary':
            return {
                ...state,
                isLoaded: true,
                numberOfItems: action.payload.numberOfItems,
                subTotal: action.payload.subTotal,
                tax: action.payload.tax,
                total: action.payload.total
            }
        case '[Cart] - Update Address':
        case '[Cart] - Load Address from cookies': 
            return {
                ...state,
                shippingAddress: action.payload
            }
       default:
           return state;
 } 
}