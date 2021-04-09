import Icon from '../../Icon';
import './cart.scss';


function Cart({handleCartClick}) {
    return (
        <div className="Cart Flex" onClick={handleCartClick}>
            <div className="Image-Wrapper">
                <Icon name="cart" />
            </div>
            <div className="Cart-Text">0 items</div>
        </div>
    )
}

export default Cart;