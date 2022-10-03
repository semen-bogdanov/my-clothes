import Card from '../components/Card/index'


function Favorites({items, onAddToFavorites}) {
   return (
    <div className="content p-40">
    <div className="d-flex align-center justify-between mb-40">
             <h1>Мои закладки</h1>     
       </div>
       <div className="d-flex flex-wrap">
    
    {items.map((element, item) => 
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