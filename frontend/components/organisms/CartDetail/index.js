import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleIncreaseQuantity, handleDecreaseQuantity } from '../../../redux/actions/cart';

import './cartDetail.scss';

function CartDetail({ cart, handleClickCross, handleIncreaseQuantity: handleIncreaseQuant, handleDecreaseQuantity: handleDecreaseQuant }) {
    const cartData = cart.cartItems;
    const isCartEmpty = cartData && cartData.length === 0;
    let totalPrice;
    if (!isCartEmpty) {
        totalPrice = cartData.reduce((accumulator, current) => accumulator + (current.price*current.quantity), 0)
    }
    return (<div className={`Cart-Detail-Wrap Flex Flex-Col ${isCartEmpty ? 'Empty-Wrapper' : ''}`}>
        <div className={`My-Cart ${isCartEmpty ? 'Emp-Cart-Header' : ''}`}>
            My Cart {!isCartEmpty && (<span className="Item-Count">(1 item)</span>)}
            <span className="Cross" onClick={handleClickCross}>X</span>
        </div>
        {isCartEmpty && (
            <div className="Empty-Cart">
                <div className="Empty-Content">
                    <h4>No items in your cart</h4>
                    <div>Your favourite items are just a click away</div>
                </div>
            </div>
        )}
        {!isCartEmpty && (<>
            <div className="Products-Data">
                {cartData.map((element, index) => (
                    <div className="Product-Wrap">
                        <img src={element.imageURL} alt={element.name} />
                        <div className="Product-Name-Wrap">
                            <h4>{element.name}</h4>
                            <div className="Action-Wrap Flex Mt-10">
                                <div className="Action" onClick={() => { handleDecreaseQuant({'index': index}) }}><span className="Symbol">-</span></div>
                                <div className="Font-Size-12 Font-WB">{element.quantity}</div>
                                <div className="Action" onClick={() => { handleIncreaseQuant({'index': index}) }}><span className="Symbol Plus">+</span></div>
                                <div className="Font-Size-12">x</div>
                                <div className="Font-Size-12 Price-Per_Qty">{`Rs.${element.price}`}</div>

                            </div>
                        </div>
                        <div className="Font-Size-14 Total-Price">{`Rs. ${element.quantity * element.price}`}</div>
                    </div>
                ))}
            </div>
            <div className="LowestPrice-Wrap">
                <img src="../../../static/images/lowest-price.png" alt="lowest" />
                <div className="Font-Size-12 Ml-10">You won't find it cheaper anywhere</div>
            </div>
        </>)}
        <div className={`Checkout-Wrap ${isCartEmpty ? 'Empty-Checkout' : ''}`}>
            {!isCartEmpty && (<div className="Font-Size-10">Promo code can be applied on the payment page</div>)}
            <button>
                <div>
                    {isCartEmpty ? 'Start Shopping' : 'Proceed to Checkout'}
                </div>
                {!isCartEmpty && (<div>
                    Rs. {totalPrice}
                </div>)}
            </button>
        </div>
    </div>)
}

CartDetail.propTypes = {
    handleIncreaseQuantity: PropTypes.func.isRequired,
    handleDecreaseQuantity: PropTypes.func.isRequired,
};

function mapStateToProps({
    cart,
}) {
    return {
        cart
    };
}

export default connect(
    mapStateToProps,
    { handleIncreaseQuantity, handleDecreaseQuantity },
)(CartDetail);