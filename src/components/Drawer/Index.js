import React from 'react'
import axios from 'axios';

import Info from '../info'
import {useState } from 'react';
//import AppContext from '../context';
 
import {useCart} from '../../hooks/useCart';
import styles from './Drawer.module.scss'


//const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({items = [], onRemove,  onClose, opened}) {
  // const {cartItems, setCartItems} = React.useContext(AppContext);
     const {cartItems, setCartItems, totalPrice} = useCart(); // кастомный хук
     const [orderId, setOrderId] = useState(null);
     const [isOrderComplete, setIsOrderComplete] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
 //  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0); // сумма (стоимость)  всех заказов в карзине 7 урок 18:00

     
 const onClickOrder = async () => {
  try {
    setIsLoading(true);
   const {data} = await axios.post('https://6337645f5327df4c43d3b1fe.mockapi.io/orders/', {
     items: cartItems,
   });
   
   setOrderId(data.id);
   setIsOrderComplete(true);
   setCartItems([]);

   // #6 3:12:00 
   //for (let i = 0; i < cartItems.length; i++) {
   //  const item = cartItems[i];
   //  await axios.delete('https://6337645f5327df4c43d3b1fe.mockapi.io/cart/', + item.id);
   //  await delay(1000);
   //}

  cartItems.forEach(element => {
    
    console.log(element.id)
    axios.delete('https://6337645f5327df4c43d3b1fe.mockapi.io/cart/', + element.id);
  });

  }catch (error) {
      alert('Ошибка при создании заказа :(');
  }
  setIsLoading(false);
 }
    console.log(cartItems);
    return (
      // style={{display: 'none'}}
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}> 
        <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">Корзина 
            <img onClick={onClose} className="removeBtn cu-p" src="/img/btn_remove.svg" alt="Close"/>
        </h2>
        {
          items.length > 0 ? 
          <> 
          <div className="items">

          {items.map((obj, item) =>  
             <div key={obj.id} className="cartItem d-flex align-center mb-20">
              {/* <img className="mr-20" width={70} height={70}  src="/img/card/image_cros_1.jpg" alt="Sneakers"/> */}
              <div style={{backgroundImage:`url(${obj.imageUrl})`}} className="cartItemImg"></div>
   
              <div className="mr-20 flex">
                 <p className="mb-5">{obj.title}</p> 
                 <b>{obj.price} руб.</b>
              </div>
              <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn_remove.svg" alt="Remove"/>
           </div>
      )} 
        </div> 
<div className="cartTotalBlock">
<ul className="cartTotalBlock">
     <li>
       <span>Итого:</span>
       <div></div>
       <b>{totalPrice} руб.</b>
     </li>
     <li>
       <span>Налог 5%</span>
       <div></div>
       <b>{Math.floor(totalPrice / 100 * 5)} руб.</b>
     </li>
   </ul>

  <button disabled={isLoading}  onClick={onClickOrder} className="greenButton">Оформить заказ
    <img src="/img/arr_white.svg" alt="Arrow"/>
  </button>
</div>
</> 
        :
        <Info 
        title={isOrderComplete === true ? "Заказ оформлен!" : "Корзина пуста"} 
        description={isOrderComplete === true ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотябы одну пару кросовок, чтобы сделать заказ"} 
        image={isOrderComplete === true ? "/img/complite_img.svg" : "/img/box_clear.png"}/>
   
        }
    </div>
     </div>
   )
}
 
export default Drawer;