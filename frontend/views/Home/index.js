import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Header from '../../components/common/Header';
import withCategoriesProvider from './withCategoriesProvider';
import CartDetail from '../../components/organisms/CartDetail';

import './home.scss';

function Plp({categoriesData, offersData}) {
    const [isCartVisible, setIsCartVisible] = useState(false);
    function handleCart() {
        setIsCartVisible(!isCartVisible);
    }
    const activeCategories = categoriesData.filter((element) => element.enabled);
    return (
        <div className={`Home-Main-Wrap  ${isCartVisible ? 'Cart-Open-Main' : ''}`}>
            {isCartVisible && <div className="Overlay" />}
        <Header handleClickCart={handleCart} isCartVisible={isCartVisible} />
        {isCartVisible && <CartDetail handleClickCross={handleCart} />}
        <div className={`Home-Container Width-Full ${isCartVisible ? 'Cart-Open' : ''}`}>
            <div className="Home-Data-Wrapper">
                <div className="Caraousel-Wrapper">
                    <Carousel>
                        {offersData.map((element) => (
                            <div>
                                <img src={element.bannerImageUrl} alt="name" />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="Categories-Wrapper">
                    {activeCategories.map((element, index) => (
                        <div className={`Category ${index % 2 === 1 ? 'Reverse-Flex' : ''}`}>
                            <div className="Image-Wrapper">
                                <img src={element.imageUrl} alt="name" />
                            </div>
                            <div className="Category-Description">
                                <h4 className="Category-Name">{element.name}</h4>
                                <p className="Category-Des">{element.description}</p>
                                <button className="Explore-Button">
                                    {`Explore ${element.key}`}
                                </button>
                            </div>
                        </div>
                    )
                    )}

                </div>
            </div>
        <div className="Copy">
            Copyright @ 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd
        </div>
        
        </div>
        </div>
    )
}

export default withCategoriesProvider(Plp);