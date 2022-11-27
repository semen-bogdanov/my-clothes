import React from 'react'
import Header from './components/Header';
import Drawer from './components/Drawer/Index';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context'; // Контекст. Храниться в отдельном файле

 
 

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
  const [favorites, setFavorites] = useState([]) // закладки, избранное
  const [searchValue, setSearchValue] = useState('') // поиск по сайту
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // загрузка карточек. Когда их нет https://skeletonreact.com/

//console.log(cartItems)
   

useEffect(() => {

  // Как принять данные (вытащить массив) с помощью fetch №4 1:55:00

    // fetch('https://6337645f5327df4c43d3b1fe.mockapi.io/items').then(res => {
    //   return res.json();
    // })
    // .then((json) => {
    //   setItems(json);
    // });

   async function fetchData() {
    try {
     const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all(
      [
           axios.get('https://6337645f5327df4c43d3b1fe.mockapi.io/cart'), 
           axios.get('https://6337645f5327df4c43d3b1fe.mockapi.io/favorites'), 
           axios.get('https://6337645f5327df4c43d3b1fe.mockapi.io/items'),
      ]);
           // axios (библиотека №5 00:47:00) отправляет get запрос и даёт мне данные по указанному в скобках адресу
    // then - берёт ответ от сервера 
     // передача в корзину данных с сервера (т.е. те карточки, данные (кросовки), который выбрал клиент)
   //const cartResponse = await axios.get('https://6337645f5327df4c43d3b1fe.mockapi.io/cart/')
   
   // передача в "Мои избранные" данных с сервера (т.е. те карточки, данные (кросовки), который выбрал клиент)
   //const favoritesResponse = await axios.get('https://6337645f5327df4c43d3b1fe.mockapi.io/favorites/')
   //const itemsResponse = await axios.get('https://6337645f5327df4c43d3b1fe.mockapi.io/items/')

   setIsLoading(false)
   setCartItems(cartResponse.data)
   setFavorites(favoritesResponse.data)
   setItems(itemsResponse.data)
 
    } catch (error) {
      alert('Ошибка при запросе данных ;(');
      console.error(error);
    }
   }

   fetchData();

}, [])



// добавление в корзину
const onAddToCart = async (obj) => {
  try {
    // Проверка карточки. Если она есть в корзине, то при отжатии кнопки 
    // она снова не должна добавляться. Исправление багов №6 00: 31:00
    const finditem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
   if(finditem) {
  setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
  await axios.delete(`https://6337645f5327df4c43d3b1fe.mockapi.io/cart/${finditem.id}`);
 
}else {
// отправка на сервер (post) данные, которые добавляються в карточку
setCartItems((prev) => [...prev, obj]);  
// передача объекта вторым параметром - obj
const {data} = await axios.post('https://6337645f5327df4c43d3b1fe.mockapi.io/cart', obj);
//  берут предыдущие данные и возвращает обратно в массив.
setCartItems((prev) => prev.map(item => {
  if (item.parentId === data.parentId) {
    return {
      ...item,
      id: data.id
    };
  }
  return item;
}));  
 
   
} 
  } catch (error) {
    alert('Ошибка при добавлении в корзину ;(');
    console.error(error);
  }
}

// удаление карточек в корзине
const onRemoveItem = (id) => {
  // отправка на сервер (post) данные, которые добавляються в карточку
  // передача id карточки, которую необходимо удалить - #5 00:57:00 
 try {
    // delete - удаляет карточку по указанному id 
    axios.delete(`https://6337645f5327df4c43d3b1fe.mockapi.io/cart/${id}`);
    //  берут предыдущие данные и возвращает обратно в массив.
   setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id))); // №5 1:02:00
 } catch (error) {
  alert('Ошибка при удалении из корзины ;(');
  console.error(error);
 }
 }

 // добавление в избранное/закладки
const onAddToFavorites = async (obj) => { // async #5 02:31:00
  try { // #5 try 02:38:30
 // Условие, если в "Моих закладках" есть ID и мы пытаемся его снова добавить, то удали его"
 if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
  axios.delete(`https://6337645f5327df4c43d3b1fe.mockapi.io/favorites/${obj.id}`);
  setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
  // и из стейта с помощью фильтрации удали этот id #5 02:22:00
//  setFavorites(prev => prev.filter(item => item.id !== obj.id)); // смотреть уроки по useState!!!    
}else {
// отправка на сервер (post) данные, которые добавляються в карточку
// передача объекта вторым параметром - obj
// axios.post('https://6337645f5327df4c43d3b1fe.mockapi.io/favorites', obj);
//  берут предыдущие данные и возвращает обратно в массив.
const {data} = await axios.post('https://6337645f5327df4c43d3b1fe.mockapi.io/favorites/', obj); // await #5 02:32:00
setFavorites((prev) => [...prev, data]); // смотреть уроки по useState!!! 
}
  }catch(error) {
        alert('Не удалось добавить в фавориты')
        console.error(error);
  }
}
 
// поиск на сайте
const onChangeSearchInput = (event) => {
//  console.log(event.target.value); // выводиться то что я написал в input
  setSearchValue(event.target.value);
}
 
const isItemAdded = (id) => {
  return cartItems.some((obj) => Number(obj.parentId) === Number(id))
}

 
return (
  <AppContext.Provider value={{
    items,
    cartItems,
    favorites,
    isItemAdded,
    onAddToFavorites,
    onAddToCart,
    setCartOpened,
    setCartItems
  }}> 
  <>

    <div className="wrapper clear">
     <Drawer items = {cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>  
          {/* {cartOpened ? <Drawer items = {cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null} */}
             {/* !!! или другой вариант написания. Более сокращенный вариант №4 1:34:45 */}
             {/* {cartOpened && <Drawer onClose={() => setCartOpened(false)}/>} */}
        <Header onClickCart={() => setCartOpened(true)}/>
        
        <Routes>
    {/* <Route path="/Home" element={<Home 
    cartItems={cartItems}
    items={items} 
    searchValue={searchValue} 
    setSearchValue={setSearchValue} 
    onAddToCart={onAddToCart}
    onAddToFavorites={onAddToFavorites}
    onChangeSearchInput={onChangeSearchInput}/>} />  */}

  <Route path="/" element={<Home 
    cartItems={cartItems}
    items={items} 
    searchValue={searchValue} 
    setSearchValue={setSearchValue} 
    onAddToCart={onAddToCart}
    onAddToFavorites={onAddToFavorites}
    isLoading={isLoading}
    onChangeSearchInput={onChangeSearchInput}/>} /> 

<Route path="/favorites" element={<Favorites />} /> 
<Route path="/orders" element={<Orders />} /> 

</Routes>

 
 
 
      
    </div>
 
 </>
 </AppContext.Provider>
  );
}

export default App;
