import AppContext from '../context';
import React from 'react'

// кастомный хук
export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0); // сумма (стоимость)  всех заказов в карзине 7 урок 18:00
    return { cartItems, setCartItems, totalPrice};
}

 