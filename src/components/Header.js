import {Link } from "react-router-dom";
import React from 'react'
//import AppContext from '../context';
import {useCart} from '../hooks/useCart';

function Header(props) {
   //const {cartItems} = React.useContext(AppContext);   
   //const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);  // сумма (стоимость) всех заказов в карзине 7 урок 18:00
   const {totalPrice} = useCart(); // кастомный хук
 
    return (
        <header className="d-flex justify-between align-center p-40">
          <Link to={'/'}>  
                 <div className="d-flex align-center">
                      <img width={40} height={40}  src="/img/logo_store.png"  alt="Логотип"/>
                      <div>
                      <h3 className="storeName text-uppercase">React Sneakers</h3>
                      <p className="storeName color">Магазин лучших кросовок</p>
                 </div>
                 </div>
          </Link> 
          <ul className="d-flex">
             <li onClick={props.onClickCart} className="mr-30  cu-p">
             <img width={18} height={18}  src="/img/Cart.svg" alt="Корзина"/>
                 <span>{totalPrice} <span>₽</span></span>
            </li>
            <Link to={'/favorites'}> 
            <li className="cu-p">
                <img  width={18} height={18}  src="/img/zmdi_favorite.svg" alt="Закладки" />  
            </li>
            </Link> 

            <Link to={'/orders'}> 
            <li className="cu-p">
                <img  width={18} height={18}  src="/img/Union.svg" alt="Пользователь" />  
            </li>
            </Link> 
         </ul>
     </header>
   )
}
 
export default Header;