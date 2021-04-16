import { useState } from 'react';
import Header from '../../components/common/Header';
import DropDown from '../../components/common/DropDown';
import CartDetail from '../../components/organisms/CartDetail';
import withProductsProvider from './withProductsProvider';
import ProductCard from '../../components/organisms/ProductCard';
import './plp.scss';

const options = [{
    label: 'Fruits & Vegetables',
    value: 'Fruits & Vegetables'
},
{
    label: 'Bakery Cakes and Dairy',
    value: 'Bakery Cakes and Dairy'
},
{
    label: 'Beverages',
    value: 'Beverages'
},
{
    label: 'Beauty and Hygiene',
    value: 'Beauty and Hygiene'
},
{
    label: 'Baby Care',
    value: 'Baby Care'
},
]

function Plp({productsData}) {
    const [selectedFilter, setSelectedFilter] = useState('Fruits & Vegetables')
    const [isCartVisible, setIsCartVisible] = useState(false);
    const cartData = [];
    function handleCart() {
        setIsCartVisible(!isCartVisible);
    }

    function handleChangeSelect(event) {
        setSelectedFilter(event.target.value)
    }
    return (
        <div className="Plp-Container Width-Full">
            {isCartVisible && <div className="Overlay" />}
            <Header handleClickCart={handleCart} isCartVisible={isCartVisible} />
            {isCartVisible && <CartDetail handleClickCross={handleCart} cartData={cartData} />}
            <div className={`Prduct-Listing-Detail ${isCartVisible ? 'Cart-Open' : ''}`}>
                <div className="Width-Full Filter-DropDown">
                    <DropDown selectedValue={selectedFilter} options={options} handleChange={handleChangeSelect} />
                </div>
                <div className="Product-List">
                    <div className="Product-Filter">
                        {options.map((element) => (
                            <button key={element.label} className="Filter-Options">
                                {element.label}
                            </button>
                        ))}
                    </div>
                    <div className="Flex Flex-Wrap List">
                        {productsData.map((element) => (
                            <ProductCard key={element.sku} data={element} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withProductsProvider(Plp);