'use client';

import React, { useCallback } from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { Item, getItem, getItemFromTemplate, inStock } from './cart.utils';
import { useLocalStorage } from '@utils/use-local-storage';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { deleteFromCart } from '@utils/delete-from-cart';
interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  updateCart: () => void;
  removeItemFromCart: (id: Item['id']) => void;
  clearItemFromCart: (id: Item['id']) => void;
  getItemFromCart: (id: Item['id']) => any | undefined;
  isInCart: (id: Item['id']) => boolean;
  isInStock: (id: Item['id']) => boolean;
  resetCart: () => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export function CartProvider(props: React.PropsWithChildren<any>) {
  const [savedCart, saveCart] = useLocalStorage(
    `yougazine-cart`,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!)
  );

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const updateCart = async () => {
    try {
      const { data } = await http.get(API_ENDPOINTS.CART);
      const cart: Item[] = data.data.data?.map((d: any) => ({
        _id: d._id,
      template_name: d.template.name,
      template_id: d.template._id,
      template: d.template,
      price_id: d.price_id,
      prices: d.template.prices,
      preview_images: d.preview_images,
      slug: d.template.slug,
      category: d.template.category,
      price: d.price_details.price,
      quality: d.price_details.quality,
      quantity: d.price_details.quantity,
      binding: d.price_details.binding,
      type: d.price_details.type,
      pages: d.price_details.pages
      }))
      dispatch({ type: 'UPDATE_CART', data: cart}); 
    } catch(err) {
      dispatch({ type: 'UPDATE_CART', data: []}); 
    }
    
  }

  const clearItemFromCart =async  (id: Item['id']) =>{
      deleteFromCart(id)
  dispatch({ type: 'REMOVE_ITEM', id })}


  const addItemToCart = (item: Item, quantity: number) =>
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
  const removeItemFromCart = (id: Item['id']) =>
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id });
;
  const isInCart = useCallback(
    (templateId: string) => !!getItemFromTemplate(state.items, templateId),
    [state.items]
  );
  const getItemFromCart = useCallback(
    (id: Item['id']) => getItem(state.items, id),
    [state.items]
  );
  const isInStock = useCallback(
    (id: Item['id']) => inStock(state.items, id),
    [state.items]
  );
  const resetCart = () => dispatch({ type: 'RESET_CART' });
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      updateCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
    }),
    [getItemFromCart, isInCart, isInStock, state]
  );
  return <cartContext.Provider value={value} {...props} />;
}
