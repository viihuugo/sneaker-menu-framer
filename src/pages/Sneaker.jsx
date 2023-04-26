import React from 'react'
import { useParams } from 'react-router-dom';

import data from '../data/produtcs'

export default function Sneaker() {

    const { id } = useParams();
    const thisProduct = data.find(prod => prod.id === id);

  return (
    <>
        <div className="banner">
            <div className="inner-banner">
                <div className="container fluid">
                    <h1 className="main-headline">{thisProduct.title}</h1>
                    <div className="image">
                        <img src={thisProduct.src}></img>
                    </div>                
                </div>
            </div>
        </div>
    </>
  )
}
