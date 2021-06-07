import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAddToCart } from '../../../redux/actions/cart';

import './productCard.scss';

function ProductCard({data, handleAddToCart: AddToCart}) {
    return (
        <div className="Product-Card Flex Flex-Col">
            <h5 className="Product-Name">
                {data.name}
            </h5>
            <div className="Product-Detail">
                <div className="Product-Image">
                    <img src={data.imageURL} alt={data.name}/>
                </div>
                <div className="Product-Detail-Wrapper">
                <div className="Product-Description" title={data.description}>
                    <div className="Des-Text">{data.description}</div>
                </div>
                <div className="Product-Price-Detail Flex">
                    <div className="Product-Price">
                        {`MRP Rs.${data.price}`}
                    </div>
                    <button className="Buy-Now Button-Buy" onClick={() => {AddToCart(data)}}>
                        Buy Now
                    </button>
                </div>
                <div className="Product-Price-With-Buy-Now Flex">
                    <button className="Buy-Now Button-Buy" onClick={() => {AddToCart(data)}}>
                        {`Buy Now @ Rs.${data.price}`}
                    </button>
                </div>
                </div>
            </div>

        </div>
    )
}

ProductCard.defaultProps= {
    data: {}
}

ProductCard.propTypes = {
    data: PropTypes.object,
    handleAddToCart: PropTypes.func.isRequired,
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
    { handleAddToCart },
)(ProductCard);