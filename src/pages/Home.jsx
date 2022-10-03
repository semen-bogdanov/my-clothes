
import Card from '../components/Card/index';


function Home({items, searchValue, setSearchValue, onAddToCart, onAddToFavorites, onChangeSearchInput}) {
   return (
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
         id={element.id}
         title={element.title}
         price= {element.price}
         imageUrl= {element.imageUrl}
         onFavorite = {(obj) => onAddToFavorites(obj)} 
         onPlus = {(obj) => onAddToCart(obj)}
         />
    )}
          
          
       </div>
  </div>
   )
}

export default Home;