import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addCart } from '../redux/action'; // Import action to add to cart

export default function Products() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.handleCart); // Get cart items from Redux store

    useEffect(() => {
        let componentMounted = true;

        const getProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (response.ok) {
                    const jsonResponse = await response.json();
                    if (componentMounted) {
                        setData(jsonResponse);
                        setFilter(jsonResponse);
                    }
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                if (componentMounted) {
                    setLoading(false);
                }
            }
        };

        getProducts();

        return () => {
            componentMounted = false;
        };
    }, []);

    const filterProduct = (cat) => {
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList);
    };

    const addToCart = (product) => {
        dispatch(addCart(product)); // Use Redux dispatch to add product
    };

    const Loading = () => (
        <>
            <div className = 'col-md-3'><Skeleton height = '300px' /></div>
            <div className = 'col-md-3'><Skeleton height = '300px' /></div>
            <div className = 'col-md-3'><Skeleton height = '300px' /></div>
            <div className = 'col-md-3'><Skeleton height = '300px' /></div>
        </>
    );
    //     const Loading = () => {
    //         return (
    //             <>
    //                 <div      className = 'col-md-3'>
    //                 <Skeleton height    = '300px' />
    //                 </div>
    //                 <div      className = 'col-md-3'>
    //                 <Skeleton height    = '300px' />
    //                 </div>
    //                 <div      className = 'col-md-3'>
    //                 <Skeleton height    = '300px' />
    //                 </div>
    //                 <div      className = 'col-md-3'>
    //                 <Skeleton height    = '300px' />
    //                 </div>
    //             </>
    //         )
    //     }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="buttons d-flex justify-content-center mb-5 pb-5">
                        <button className='btn btn-outline-dark me-2' onClick={() => setFilter(data)}>All</button>
                        <button className='btn btn-outline-dark me-2' onClick={() => filterProduct('electronics')}>Electronics</button>
                        <button className='btn btn-outline-dark me-2' onClick={() => filterProduct('jewelery')}>Jewelery</button>
                        <button className='btn btn-outline-dark me-2' onClick={() => filterProduct('men\'s clothing')}>Men Clothing</button>
                        <button className='btn btn-outline-dark me-2' onClick={() => filterProduct('women\'s clothing')}>Women Clothing</button>
                    </div>
                    <div className="col-12 col-md-9 col-lg-12">
                        <div className="row">
                            {loading ? (
                                <Loading />
                            ) : (
                                filter.map((product) => (
                                    <div className='col-12 col-md-3 mb-4' key={product.id}>
                                        <div className='card h-100 text-center p-4'>
                                            <img src={product.image} className='card-img-top' alt={product.title} height="250px" />
                                            <div className='card-body'>
                                                <h5 className='card-title mb-0'>{product.title.substring(0, 12)}...</h5>
                                                <p className='card-text lead fw-bold'>${product.price}</p>
                                                {cartItems.find(item => item.id === product.id) ? (
                                                    <button className='btn btn-outline-dark' disabled>
                                                        Product Added ({cartItems.find(item => item.id === product.id).qty})
                                                    </button>
                                                ) : (
                                                    <button className='btn btn-outline-dark' onClick={() => addToCart(product)}>
                                                        Buy Now
                                                    </button>
                                                )}
                                                <NavLink to={`/product/${product.id}`} className='btn btn-outline-dark ms-2'>
                                                    View Details
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
