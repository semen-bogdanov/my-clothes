
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useEffect, useState } from 'react';
import axios from 'axios'

 
// const arr = [
//   {
//     title: "Мужские Кроссовки Nike Blazer Mid Suede", 
//   price: 12999,
//   imageUrl: '/img/card/image_cros_1.jpg'
//   },

//   {
//     title: "Мужские Кроссовки Nike Air Max 270", 
//   price: 15600,
//   imageUrl: '/img/card/image_cros_2.jpg'
//   },

//   {
//     title: "Мужские Кроссовки Nike Blazer Mid Suede", 
//   price: 8499,
//   imageUrl: '/img/card/image_cros_3.jpg' 
//   },
  
//   {
//     title: "Кроссовки Puma X Aka Boku Future Rider", 
//   price: 8999,
//   imageUrl: '/img/card/image_cros_4.jpg' 
//   }
// ]


function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([]) // корзина. Добавление в корзину
  const [searchValue, setSearchValue] = useState('') // поиск по сайту
  const [cartOpened, setCartOpened] = useState(false);

   
useEffect(() => {
  // Как принять данные (вытащить массив) с помощью fetch №4 1:55:00

    // fetch('https://6337645f5327df4c43d3b1fe.mockapi.io/items').then(res => {
    //   return res.json();
    // })
    // .then((json) => {
    //   setItems(json);
    // });


    // axios (библиотека №5 00:47:00) отправляет get запрос и даёт мне данные по указанному в скобках адресу
    // then - берёт ответ от сервера 
   axios.get('https://6337645f5327df4c43d3b1fe.mockapi.io/items').then(res => {
    // и в консоль лог отобрази res data
      setItems(res.data)
   })

   // передача в корзину данных с сервера (т.е. те карточки, данные (кросовки), который выбрал клиент)
   axios.get('https://6337645f5327df4c43d3b1fe.mockapi.io/cart').then(res => {
    // и в консоль лог отобрази res data
    setCartItems(res.data)
   })

}, [])



// добавление в корзину
const onAddToCart = (obj) => {
// отправка на сервер (post) данные, которые добавляються в карточку
// передача объекта вторым параметром - obj
  axios.post('https://6337645f5327df4c43d3b1fe.mockapi.io/cart', obj);
  //  берут предыдущие данные и возвращает обратно в массив.
  setCartItems(prev => [...prev, obj]); // смотреть уроки по useState   
}

// удаление карточек в корзине
const onRemoveItem = (id) => {
  // отправка на сервер (post) данные, которые добавляються в карточку
  // передача id карточки, которую необходимо удалить - 00:57:00 
  // delete - удаляет карточку по указанному id 
   axios.delete(`https://6337645f5327df4c43d3b1fe.mockapi.io/cart/${id}`);
    //  берут предыдущие данные и возвращает обратно в массив.
   setCartItems(prev => prev.filter(item => item.id !== id)); // №5 1:02:00
 }


// поиск на сайте
const onChangeSearchInput = (event) => {
//  console.log(event.target.value); // выводиться то что я написал в input
  setSearchValue(event.target.value);
}

 
  return (
    <div className="wrapper clear">
              {cartOpened ? <Drawer items = {cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null} 
             {/* !!! или другой вариант написания. Более сокращенный вариант №4 1:34:45 */}
             {/* {cartOpened && <Drawer onClose={() => setCartOpened(false)}/>} */}
        <Header onClickCart={() => setCartOpened(true)}/>
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
                 <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : `Все кросовки`}</h1>     
                 <div className="search-block d-flex">
                    <img src="/img/searh.svg" alt="searh"/>
                    {searchValue && <img onClick={() => setSearchValue('')} className="clear" src="/img/btn_remove.svg" alt="Clear"/>}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." maxLength="37"/>
                 </div>
           </div>
       <div className="d-flex flex-wrap">
        
       {items
            .filter((filterItem) =>
              filterItem.title
                .toLowerCase()
                .includes(searchValue),
            )
        .map((element, item) => 
             <Card key={item}
             title={element.title}
             price= {element.price}
             imageUrl= {element.imageUrl}
             onFavorite = {() => console.log('Добавили в закладки')} 
             onPlus = {(obj) => onAddToCart(obj)}
             />
        )}
              
              
           </div>
      </div>
    </div>
  );
}

export default App;
