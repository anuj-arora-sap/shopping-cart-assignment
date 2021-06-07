import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from '../../redux/actions/notification';
import ContentWrap from '../../components/common/ContentWrap';
import { fetchProducts } from '../../apis/products';

function withProductsProvider(Component) {
    function ComponentWithProductsProvider(props) {
        const [isFetching, setIsFetching] = useState(true);
        const [productsData, setProductsData] = useState([]);

        useEffect(() => {
            fetchProducts().then((res) => {
                const data = res?.body?.data || [];
                setProductsData(data);
                setIsFetching(false);
            }).catch((err) => {
                props.notify(err);
                setIsFetching(false);
            });
        }, []);

        return (
            <ContentWrap isFetching={isFetching}
            >
                <Component
                    productsData={productsData}
                />
            </ContentWrap>
        );
    }
    ComponentWithProductsProvider.propTypes = {
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
    )(ComponentWithProductsProvider);

}

export default withProductsProvider;
