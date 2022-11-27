import React from 'react'
import AppContext from '../context';



const Info = ({title, image, description}) => {
  const {setCartOpened} = React.useContext(AppContext);

  return (
    <div className="cratEmppty d-flex align-center justify-center flex-column flex">
         <img className="mr-20" width={120} src={image} alt="Sneakers"/>
         <h2>{title}</h2>
         <p className="opacity-6 text1">{description}</p>
         <button onClick={() => setCartOpened(false)} className="greenButton">
            <img className="textArr" src="/img/Arr.svg" alt="Arrow"/>
            Вернуться назад
         </button>
    </div>
  )
}

export default Info;