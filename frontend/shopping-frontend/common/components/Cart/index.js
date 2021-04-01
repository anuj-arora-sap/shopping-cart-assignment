import Icon from '../../Icon';
import './cart.scss';


function Cart() {
    return (
        <div className="Cart Flex">
            <div className="Image-Wrapper">
                <Icon name="cart" />
            </div>
            <div className="Cart-Text">0 items</div>
        </div>
    )
}

export default Cart;