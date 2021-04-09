import { useState } from 'react';
import Header from '../../common/components/Header';
import DropDown from '../../common/components/DropDown';
import ProductCard from '../../common/components/ProductCard';
import ProductsData from '../../server/products/index.get.json';
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

function Plp() {
    const [selectedFilter, setSelectedFilter] = useState('Fruits & Vegetables')
    console.log(ProductsData);

    function handleChangeSelect(event) {
        setSelectedFilter(event.target.value)
    }
    return (
        <div className="Plp-Container Width-Full">
            <Header />
            <div className="Prduct-Listing-Detail">
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
                        {ProductsData.map((element) => (
                            <ProductCard key={element.sku} data={element} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plp;