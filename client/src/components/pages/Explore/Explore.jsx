import React from 'react';
import { Dish } from '../../indexComp';
import './Explore.css';

function Explore() {
  return (
    <div className='dish__card'>
        <h1>Italian</h1>
        <div className='dish__container'>
            <div className='dish__wrapper'>
                <ul className='dish__items'>
                    <li>
                    <Dish src='../assets/carbonara.jpg'
                          text="Explore the jewels of the Mediterranean"
                          label='Italian'
                          path='/Italian'

                    />
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Explore