import React, { useState} from "react";
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import AppContext from '../../context' // вытаскиваем контекст из APP файла
//import React from 'react'



function Card({ 
   id, 
   title, 
   price, 
   imageUrl, 
   onFavorite, 
   onPlus,  
   favorited = false, 
 //  added = false,
   loading = false
}) {

   const {isItemAdded} = React.useContext(AppContext);  
   //const [isAdded, setIsAdded] = useState(added);
   const [isFavorite, setisFavorite] = useState(favorited); // избранное
   const obj = {id, parentId: id, title, imageUrl, price};
 
   //console.log(title, isItemAdded(id))

  // клик на кнопку купить в карточке товара 
   const onClickPlus = () => {
      onPlus(obj);
    //  setIsAdded(!isAdded); // значение инвертируеться! Клик на кнопку в карточке. Видео №4 1:18:00
   }

   // клик на кнопку Like - нравиться или нет. Добавление в закладки
   const onClickFavorite = () => {
      onFavorite(obj);
      setisFavorite(!isFavorite); // значение инвертируеться! Клик на кнопку в карточке. Видео №4 1:18:00
   }

   //useEffect(() => { // Пример работы useEffect
   //   console.log(`Переменная изменилась`)
   //}, [isAdded]);

    return (
        <div className={styles.card}>
        {
         loading ? <ContentLoader 
         speed={2}
         width={150}
         height={220}
         viewBox="0 0 150 220"
         backgroundColor="#f3f3f3"
         foregroundColor="#ecebeb"
       >
         <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
         <rect x="0" y="100" rx="3" ry="3" width="150" height="15" /> 
         <rect x="0" y="127" rx="0" ry="0" width="93" height="15" /> 
         <rect x="0" y="166" rx="8" ry="8" width="80" height="24" /> 
         <rect x="116" y="158" rx="8" ry="8" width="32" height="32" />
       </ContentLoader> :
            <>
          {onFavorite &&(
             <div className={styles.favorite} onClick={onClickFavorite}>
             <img src={isFavorite ? "/img/card/Like.svg" : "/img/card/unLiket.svg"} alt="Unliked"/>
             </div>
          )}
     <img width={100} height={112} src={imageUrl} alt="Sneakers"/>
     <h5>{title}</h5>
     <div className="d-flex justify-between align-left">
       <div className="d-flex flex-column ">
           <span>Цена:</span>
           <b>{price} руб.</b>
       </div>
       {onPlus && ( 
          <img 
          className={styles.plus} 
          onClick={onClickPlus}
          src= {isItemAdded(id) ? "/img/card/buy.svg" : "/img/card/cross.svg"}
          alt="plus"/>
          )}
     </div> 
            </>
           
        }


        
   </div>
   )
}
 
export default Card;