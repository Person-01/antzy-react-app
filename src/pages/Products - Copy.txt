import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import '../css/style.css';
import searchpng from '../images/search.png';


class Products extends React.Component{
    render() {
        return(
        <div>
            <ProductHeader />
            <Banner />
            <ShowProducts/>
        </div>
        )
    };
}
function ProductHeader(){
    return(
        <header className="product-header">
            <div className="header-1">
                <div className="hamburger">
                    <div>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>
            <div className="header-2">
                <h1 className="product-title">Products</h1>
            </div>
            <div className="header-3">
                <img className="product-search" src={searchpng} alt="search png" />
            </div>
        </header>
    )
}
function Banner(){
    return(
        <div className="banner">
            <h2>Totally sale</h2>
            <p className="banner-text">
                It was some time before he obtained 
                any answer, and the reply, when made, 
                was superficial.
            </p>
        </div>
    )
}

const ShowProducts = () =>{
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState ([]);
    useEffect(() => {
        setLoading(true);
    axios({
        method:"GET",
        url:"https://fakestoreapi.com/products"
    }).then(res=> {
        // console.log(res.data)
        setData(res.data)
    }).catch(e=>console.log(e))
    .finally(()=>setLoading(false));
    }, []);
        return(
            <div className="products" id="products">
            {loading && (
                <div>
                    {" "}
                    <h1>Loading...</h1>
                </div>
            )}
            {data.map((product)=> (
                <div key={product.id}>
                    <Link to={'/product/'+product.id}>
                        <div className="card">
                            <img src={product.image} alt="#"/>
                            <p className="product-name text-black">{product.title}</p>
                            <p className="product-category">{product.category}</p>
                            <p className="product-price">${product.price}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
        )
}

export default Products;