import './cartDetail.scss';

function CartDetail({ cartData, handleClickCross }) {
    const isCartEmpty = cartData && cartData.length === 0;
    let totalPrice;
    if (!isCartEmpty) {
        totalPrice = cartData.reduce((acc, curr) => ({ price: acc.price + (curr.price * curr.quantity) }));
    }
    return (<div className={`Cart-Detail-Wrap Flex Flex-Col ${isCartEmpty ? 'Empty-Wrapper' : ''}`}>
        <div className={`My-Cart ${isCartEmpty ? 'Emp-Cart-Header' : ''}`}>
            My Cart {!isCartEmpty && (<span className="Item-Count">(1 item)</span>)}
            <span className="Cross" onClick={handleClickCross}>X</span>
        </div>
        {isCartEmpty&& (
            <div className="Empty-Cart">
                <div className="Empty-Content">
                <h4>No items in your cart</h4>
                <div>Your favourite items are just a click away</div>
                </div>
            </div>
        )}
        {!isCartEmpty && (<>
            <div className="Products-Data">
                {cartData.map((element) => (
                    <div className="Product-Wrap">
                        <img src={element.imageURL} alt={element.name} />
                        <div className="Product-Name-Wrap">
                            <h4>{element.name}</h4>
                            <div className="Action-Wrap Flex Mt-10">
                                <div className="Action" onClick={() => { console.log('yes') }}><span className="Symbol">-</span></div>
                                <div className="Font-Size-12 Font-WB">{element.quantity}</div>
                                <div className="Action" onClick={() => { console.log('yes') }}><span className="Symbol Plus">+</span></div>
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
                    {isCartEmpty ? 'Start Shopping': 'Proceed to Checkout'}
                </div>
                {!isCartEmpty && (<div>
                    Rs. {totalPrice.price}
                </div>)}
            </button>
        </div>
    </div>)
}

export default CartDetail;