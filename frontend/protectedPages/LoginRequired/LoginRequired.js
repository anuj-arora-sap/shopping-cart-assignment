
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function LoginRequired({
  children, login
}) {
  const {
    push,
  } = useRouter();
  const { isProcessing, info: userInfo } = login;
  useEffect(() => {
    if (!login.info.token) {
      push('/login');
    }
  }, [login.info]);
  if (isProcessing || !Object.keys(userInfo).length) {
    return <div>Loading...</div>;
  }
  return (<div>{children}</div>);
}

LoginRequired.propTypes = {
  children: PropTypes.element.isRequired,
  login: PropTypes.object.isRequired,
};

function mapStateToProps({ login }) {
  return { login };
}
export default connect(mapStateToProps, {
})(LoginRequired);