import { ICartProduct } from '../../interfaces';
import { CartState } from './';


type CartActionType = 
| { type: '[Cart] - Load Cart from Cookies | storage', payload: ICartProduct[] }
| { type: '[Cart] - Update', payload: ICartProduct[] }

export const cartReducer = ( state: CartState, action: CartActionType): CartState => {
     switch (action.type) {
       case '[Cart] - Load Cart from Cookies | storage':
           return { ...state, };
        case '[Cart] - Update':
            return {
                ...state,
                cart: [ ...action.payload ]
            }
       default:
           return state;
 } 
}