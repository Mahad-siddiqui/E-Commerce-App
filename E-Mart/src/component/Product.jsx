import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { addCart } from '../redux/action';

export default function Product() {
    const { id }                = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const dispatch   = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));  // dispatch an action to add the product to the cart
    }
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        }
        getProduct();
    }, [id]);

    const Loading = () => (
        <>
            <div      className = 'col-md-6' style = {{ lineHeight: 2 }}>
            <Skeleton height    = '400px' />
            </div>
            <div      className = 'col-md-6'>
            <Skeleton height    = '50px' width = {300} />
            <Skeleton height    = '75px' />
            <Skeleton height    = '25px' width = {150} />
            <Skeleton height    = '50px' />
            <Skeleton height    = '150px' />
            <Skeleton height    = '50px' width = {100} />
            <Skeleton height    = '50px' width = {100} style = {{ marginLeft: 6 }} />
            </div>
        </>
    );

    const ShowProduct = () => (
        <>
            <div className = 'col-md-6'>
            <img src       = {product.image} alt = {product.title} height = "400px" width = "400px" />
            </div>
            <div className = 'col-md-6'>
            <h4  className = 'text-uppercase text-black-50'>
                    {product.category}
                </h4>
                <h1 className = 'display-9'>{product.title}</h1>
                <p  className = 'lead fw-bold'>
                    Rating {product.rating && product.rating.rate}
                    <i className = 'fa fa-star'></i>
                </p>
                <h3 className = 'display-7 fw-bold my-3 text-danger'>
                    $ {product.price}
                </h3>
                <p>
                    {product.description}
                </p>
                <button  className = 'btn btn-outline-dark px-4 py-2' onClick = {() => window.history.back()}>back</button>
                <button  className = 'btn btn-outline-dark px-4 py-2' onClick = {() => addProduct(product)}>Add to cart</button>
                <NavLink to        = '/cart' className                        = 'btn btn-dark ms-2 px-3 py-2'>Go to cart</NavLink>
            </div>
        </>
    );

    return (
        <div>
            <div className = "container py-4">
            <div className = "row">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    );
}
