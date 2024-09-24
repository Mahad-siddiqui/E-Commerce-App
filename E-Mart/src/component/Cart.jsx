import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addCart, deleteCart } from '../redux/action'; // Import actions

export default function Cart() {
    const cartItems = useSelector(state => state.handleCart); // Get cart items from Redux store
    const dispatch = useDispatch(); // Get dispatch function

    const handleRemove = (product) => {
        dispatch(deleteCart(product)); // Dispatch the delete action
    };

    const handleIncrease = (product) => {
        dispatch(addCart(product)); // Dispatch the add action
    };

    const handleDecrease = (product) => {
        dispatch(deleteCart(product)); // Reuse deleteCart for decreasing quantity
    };

    return (
        <div className="container py-4">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <h4>Your cart is empty</h4>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item d-flex align-items-center my-3">
                            <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', marginRight: '15px' }} />
                            <div className="flex-grow-1">
                                <h5>{item.title}</h5>
                                <p>Price: ${item.price}</p>
                                <div className="d-flex align-items-center">
                                    <button 
                                        className="btn btn-secondary me-2"
                                        onClick={() => handleDecrease(item)}
                                        disabled={item.qty === 1} // Disable if qty is 1
                                    >
                                        -
                                    </button>
                                    <p className="m-0">Quantity: {item.qty}</p>
                                    <button 
                                        className="btn btn-secondary ms-2"
                                        onClick={() => handleIncrease(item)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button className="btn btn-danger ms-3" onClick={() => handleRemove(item)}>Remove</button>
                        </div>
                    ))}
                    <h3>
                        Total: ${cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}
                    </h3>
                </div>
            )}
            <NavLink to="/products" className="btn btn-primary">Continue Shopping</NavLink>
        </div>
    );
}
