import React, {useEffect, useState} from "react";
import styles from './Card.module.scss'


function Card({ id, title, price, imageUrl, onFavorite, onPlus, favorited = false}) {
 
   const [isAdded, setIsAdded] = useState(false);
   const [isFavorite, setisFavorite] = useState(favorited); // избранное

  // клик на кнопку купить в карточке товара 
   const onClickPlus = () => {
      onPlus({title, imageUrl, price});
      setIsAdded(!isAdded); // значение инвертируеться! Клик на кнопку в карточке. Видео №4 1:18:00
   }

   // клик на кнопку Like - нравиться или нет. Добавление в закладки
   const onClickFavorite = () => {
      onFavorite({id, title, imageUrl, price});
      setisFavorite(!isFavorite); // значение инвертируеться! Клик на кнопку в карточке. Видео №4 1:18:00
   }

   useEffect(() => { // Пример работы useEffect
   //   console.log(`Переменная изменилась`)
   }, [isAdded]);

    return (
        <div className={styles.card}>
        <div className={styles.favorite} onClick={onClickFavorite}>
           <img src={isFavorite ? "/img/card/Like.svg" : "/img/card/unLiket.svg"} alt="Unliked"/>
        </div>
        <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
          </div>
             <img 
             className={styles.plus} 
             onClick={onClickPlus}
             src= {isAdded ? "/img/card/buy.svg" : "/img/card/cross.svg"}
             alt="plus"/>
        </div>
   </div>
   )
}
 
export default Card;