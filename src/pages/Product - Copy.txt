import React from 'react';
import '../css/style.css'
import downarrowpng from '../images/down-arrow.png';
import leftarrowpng from '../images/left-arrow.png';
import pluspng from '../images/plus.png';
import blackcirclepng from '../images/black-circle.png';

export class Product extends React.Component {
    render(){
        return(
        <div>
            <header className="product-header">
                <div className="detail-header-1">
                    <img className="left-arrow" src={leftarrowpng} alt="left arrow png" />
                </div>
                <div className="detail-header-2">
                    <h1 className="product-title">Product</h1>
                </div>
                <div className="detail-header-3">
                    <img src={pluspng} alt="plus png" />
                </div>
            </header>
            <div id="product-detail">
                <ShowProduct />
            </div>
            <button className="size"><span className="small">SMALL</span><img className="down-arrow" src={downarrowpng} alt="down arrow png" /></button>
            <button className="color"><span className="black-color">COLOR</span><img className="black-circle" src={blackcirclepng} alt="black circle png" /></button>
        </div>
        )
    }
}

const ShowProduct = () =>{
var parts = window.location.href.split('/');
var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash

console.log(lastSegment);
//Request data from https://fakestoreapi.com/products
fetch(`https://fakestoreapi.com/products/${lastSegment}`).then((data)=>{
    //convert json data to object data
    return data.json();
    //Store data from fakestoreapi's response 
}).then((values)=>{
    document.title = `${values.title}`;
    let data1="";
    //Show product's title, image, and price on products.html
    data1 =
    `
    <div class="content">
        <img src=${values.image} alt="">
    </div>
    <div class="product-info">
        <p style="margin-bottom: 2px;">${values.title}</p>
        <p>$${values.price}</p>
    </div>
    `;
    document.getElementById("product-detail").innerHTML=data1;
    //If there is an error, console log will show error message
}).catch((err)=>{
    console.log(err);
})
}

export default Product;