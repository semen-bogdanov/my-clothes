import React, { useContext } from 'react'
import Card from '../components/Card/index'
//import AppContext from '../context' // вытаскиваем контекст из APP файла
import axios from 'axios'
import { useEffect, useState } from 'react';
import AppContext from '../context';


// страница мои заказы
function Orders() {
   const { onAddToFavorites, onAddToCart } = React.useContext(AppContext)
   const [orders, setOrders] = useState([]) // закладки, избранное
   const [isLoading, setIsLoading] = useState(true); // загрузка карточек. Когда их нет https://skeletonreact.com/

   useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get('https://6337645f5327df4c43d3b1fe.mockapi.io/orders')
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
            console.log(data)
         } catch (error) {
            alert('Ошибка при запросе заказов');
            console.error(error);
         }
      })();
   }, [])


   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>Мои заказы</h1>
         </div>
         <div className="d-flex flex-wrap">
            {(isLoading ? [...Array(8)] : orders).map((item, index) =>
               <Card
                  key={index}
           //       onFavorite={(obj) => onAddToFavorites(obj)}
           //       onPlus={(obj) => onAddToCart(obj)}
                  loading={isLoading}
                  {...item}

               />
            )}

         </div>
      </div>
   )
}

export default Orders;