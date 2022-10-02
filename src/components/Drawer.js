 

function Drawer({items = [], onRemove, onClose}) {

    return (
      // style={{display: 'none'}}
        <div className="overlay"> 
        <div className="drawer">
        <h2 className="d-flex justify-between mb-30">Корзина 
            <img onClick={onClose} className="removeBtn cu-p" src="/img/btn_remove.svg" alt="Close"/>
        </h2>
     <div className="items">

       {items.map((obj, item) =>  
          <div key={item} className="cartItem d-flex align-center mb-20">
           {/* <img className="mr-20" width={70} height={70}  src="/img/card/image_cros_1.jpg" alt="Sneakers"/> */}
           <div style={{backgroundImage:`url(${obj.imageUrl})`}} className="cartItemImg"></div>

           <div className="mr-20 flex">
              <p className="mb-5">{obj.title}</p> 
              <b>{obj.price} руб.</b>
           </div>
           <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn_remove.svg" alt="Remove"/>
        </div>
   )} 

     </div>
    <div className="cartTotalBlock">
    <ul className="cartTotalBlock">
         <li>
           <span>Итого:</span>
           <div></div>
           <b>21 498 руб.</b>
         </li>
         <li>
           <span>Налог 5%</span>
           <div></div>
           <b>1074 руб.</b>
         </li>
       </ul>
      <button className="greenButton">Оформить заказ
        <img src="/img/arr_white.svg" alt="Arrow"/>
      </button>
    </div>
    </div>
     </div>
   )
}
 
export default Drawer;