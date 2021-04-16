import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import './cart.scss';


function Cart({handleCartClick, cart}) {
    const items = cart?.cartItems?.length || 0;
    return (
        <div className="Cart Flex" onClick={handleCartClick}>
            <div className="Image-Wrapper">
                <Icon name="cart" />
            </div>
            <div className="Cart-Text">{items } items</div>
        </div>
    )
}

Cart.propTypes = {
    handleCartClick: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
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
    {},
)(Cart);