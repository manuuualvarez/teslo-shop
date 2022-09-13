import { ICartProduct } from '../../interfaces';
import { CartState } from './';


type CartActionType = 
| { type: '[Cart] - Load Cart from Cookies | storage', payload: ICartProduct[] }
| { type: '[Cart] - Update', payload: ICartProduct[] }
| { type: '[Cart] - Change Product Quantity', payload: ICartProduct }
| { type: '[Cart] - Remove Product', payload: ICartProduct }

export const cartReducer = ( state: CartState, action: CartActionType): CartState => {
     switch (action.type) {
       case '[Cart] - Load Cart from Cookies | storage':
           return { 
            ...state,
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
       default:
           return state;
 } 
}