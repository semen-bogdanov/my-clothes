import React from 'react'
import Card from '../components/Card/index'
import AppContext from '../context' // вытаскиваем контекст из APP файла



function Favorites() {
   const {favorites, onAddToFavorites } = React.useContext(AppContext);

   
   return (
    <div className="content p-40">
    <div className="d-flex align-center justify-between mb-40">
             <h1>Мои закладки</h1>     
       </div>
       <div className="d-flex flex-wrap">
    
    {favorites.map((element, item) => 
          <Card key={item}
          id={element.id}
          title={element.title}
          price= {element.price}
          imageUrl= {element.imageUrl}
          favorited={true}
          onFavorite={onAddToFavorites}
        
          // Посмотреть и разобраться, как это работает
          //   {...item} // #5 02:24:40
          />
     )}
        </div>
  </div>
   )
}

export default Favorites;