
import Card from '../components/Card/index';
import React from 'react'



function Home({
   items,
   //  cartItems, 
   searchValue,
   setSearchValue,
   onAddToCart,
   onAddToFavorites,
   isLoading,
   onChangeSearchInput }) {

   //const {isItemAdded} = React.useContext(AppContext);   

   const RenderItems = () => {
      const filtredItems = items.filter((items) => items.title.toLowerCase().includes(searchValue),);
      return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
         <Card key={index}
            onFavorite={(obj) => onAddToFavorites(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            //   added = {isItemAdded(item && item.id)} 
            loading={isLoading}
            {...item}
         />
      ));
   }


   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : `Все кросовки`}</h1>
            <div className="search-block d-flex">
               <img src="/img/searh.svg" alt="searh" />
               {searchValue && <img onClick={() => setSearchValue('')} className="clear" src="/img/btn_remove.svg" alt="Clear" />}
               <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." maxLength="37" />
            </div>
         </div>
         <div className="d-flex flex-wrap">

            {RenderItems()}

         </div>
      </div>
   )
}

export default Home;