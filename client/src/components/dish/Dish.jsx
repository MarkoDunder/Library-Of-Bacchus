import React from 'react';
import './Dish.css';
import {Link} from 'react-router-dom';

function Dish(props) {
  return (
    <>
    <li className='dish__item'>
      <Link className='dish__item__link' to={props.path}>
        <figure className='dish__item__pic-wrap' data-category={props.label}>
          <img src={props.src} alt="selected dish" className='dish__item__image'/> 
        </figure>

        <div className="dish__item__info">
            <h5 className='dish__item__text'>
              {props.text}
            </h5>
        </div>

      </Link>
    </li>
    </>
    
  )
}

export default Dish