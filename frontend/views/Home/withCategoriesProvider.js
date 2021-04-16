import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from '../../redux/actions/notification';
import ContentWrap from '../../components/common/ContentWrap';
import { fetchCategories } from '../../apis/categories';
import { fetchOffers } from '../../apis/offers';

function withCategoriesProvider(Component) {
    function ComponentWithCategoriesProvider(props) {
        const [isFetching, setIsFetching] = useState(true);
        const [categoriesData, setCategoriesData] = useState([]);
        const [isOffersFetching, setIsOffersFetching] = useState(true);
        const [offersData, setOffersData] = useState([]);

        useEffect(() => {
            fetchCategories().then((res) => {
                const data = res?.body?.data || [];
                setCategoriesData(data);
                setIsFetching(false);
            }).catch((err) => {
                props.notify(err);
                setIsFetching(false);
            });
            fetchOffers().then((res) => {
                const data = res?.body?.data || [];
                setOffersData(data);
                setIsOffersFetching(false);
            }).catch((err) => {
                props.notify(err);
                setIsOffersFetching(false);
            });
        }, []);

        return (
            <ContentWrap isFetching={isFetching || isOffersFetching}
            >
                <Component
                    categoriesData={categoriesData}
                    offersData={offersData}
                />
            </ContentWrap>
        );
    }
    ComponentWithCategoriesProvider.propTypes = {
        notify: PropTypes.func.isRequired,
    };

    function mapStateToProps({
        login,
    }) {
        return {
            login
        };
    }
    return connect(
        mapStateToProps,
        { notify },
    )(ComponentWithCategoriesProvider);

}

export default withCategoriesProvider;
